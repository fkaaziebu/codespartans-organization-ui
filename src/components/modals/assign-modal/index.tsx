"use client";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminResponse } from "@/common/graphql/generated/graphql";
import { useAssignCourseVersionForReview } from "@/common/hooks/mutations";
import { useListAdmins } from "@/common/hooks/queries";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function AssignModal({
  open,
  onClose,
  versionId,
}: {
  open: boolean;
  onClose: () => void;
  versionId: string | undefined;
}) {
  const { assignCourseVersionForReview } = useAssignCourseVersionForReview();
  const { listAdmins } = useListAdmins();
  const router = useRouter();
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [admins, setAdmins] = useState<AdminResponse[] | undefined>([]);

  const listOrgAdmins = async () => {
    try {
      const response = await listAdmins({
        variables: {
          searchTerm: "",
          pagination: {
            first: 1000,
          },
        },
      });

      // @ts-expect-error err
      if (response?.errors?.[0]?.extensions?.code === "UNAUTHENTICATED") {
        sessionStorage.clear();
        router.push("/login");
      }

      // @ts-expect-error err
      if (response?.errors?.length) {
        // @ts-expect-error err
        throw new Error(response.errors[0].message);
      }

      setAdmins(response.data?.listAdmins.edges.map((edge) => edge.node));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssign = async () => {
    if (!selectedAdminId) return;
    try {
      setIsAssigning(true);

      const response = await assignCourseVersionForReview({
        variables: {
          versionId: versionId || "",
          adminId: selectedAdminId || "",
        },
      });

      console.log(response);
      setIsAssigning(false);
      setSelectedAdminId(null);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setSelectedAdminId(null);
    onClose();
  };

  useEffect(() => {
    if (open) {
      listOrgAdmins();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Assign Course Version to Admin
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Select an admin to assign this course version for review
          </p>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex flex-col space-y-3 max-h-96 overflow-y-auto">
            {admins?.map((admin) => (
              <div
                key={admin.id}
                onClick={() => setSelectedAdminId(admin.id || null)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all",
                  selectedAdminId === admin.id
                    ? "border-gray-800 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400 bg-white",
                )}
              >
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-bold text-gray-900">
                    {admin.name}
                  </span>
                  <span className="text-sm text-gray-600">{admin.email}</span>
                  <span className="text-xs text-gray-500">
                    Current assigned requests: {admin.total_course_versions}
                  </span>
                </div>

                {selectedAdminId === admin.id && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-800">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={isAssigning}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 bg-gray-800 hover:bg-gray-950"
              onClick={handleAssign}
              disabled={!selectedAdminId || isAssigning}
            >
              {isAssigning ? "Assigning..." : "Assign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
