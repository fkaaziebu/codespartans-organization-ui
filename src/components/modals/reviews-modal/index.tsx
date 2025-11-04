"use client";
import { useEffect, useState } from "react";
import { VersionStatusType } from "@/common/graphql/generated/graphql";
import { useListRequestedReviews } from "@/common/hooks/queries";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ReviewsModal({
  open,
  onClose,
  handleAssignRequest,
  instructorId,
}: {
  open: boolean;
  onClose: () => void;
  handleAssignRequest: (versionId: string) => void;
  instructorId: string;
}) {
  const [requestedReviews, setRequestedReviews] = useState<
    | {
        id: string;
        version_id: string | undefined;
        course_name: string | undefined;
        status: VersionStatusType | undefined;
        assigned_to: string | undefined;
      }[]
    | undefined
  >();
  const { listRequestedReviews } = useListRequestedReviews();
  // Mock data - replace with actual API call based on instructorId

  const listInstructorRequestedReviews = async () => {
    try {
      const response = await listRequestedReviews({
        variables: {
          filter: {
            instructorId,
          },
        },
      });

      const requested_reviews:
        | {
            id: string;
            version_id: string | undefined;
            course_name: string | undefined;
            status: VersionStatusType | undefined;
            assigned_to: string | undefined;
          }[]
        | undefined = response.data?.listRequestedReviews.edges.map((edge) => ({
        id: edge.node.id,
        version_id: edge.node.course_version?.id,
        course_name: edge.node.course_version?.course?.title,
        status: edge.node.course_version?.status,
        assigned_to: edge.node.course_version?.assigned_admin?.name,
      }));

      setRequestedReviews(requested_reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadge = (status: VersionStatusType | undefined) => {
    if (status === VersionStatusType.Approved) {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Approved
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        Pending
      </Badge>
    );
  };

  useEffect(() => {
    if (instructorId && open) {
      listInstructorRequestedReviews();
    }
  }, [instructorId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Requested Reviews
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Assigned To
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requestedReviews?.map((review) => (
                    <tr
                      key={review.id}
                      className="hover:bg-gray-50"
                      onClick={() =>
                        !review.assigned_to &&
                        handleAssignRequest(review.version_id || "")
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {review.course_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(review.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {review.assigned_to || "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
