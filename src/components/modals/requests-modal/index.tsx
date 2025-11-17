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

export default function RequestsModal({
  open,
  onClose,
  adminId,
  requestType,
}: {
  open: boolean;
  onClose: () => void;
  adminId: string;
  requestType: string;
}) {
  const [requestedReviews, setRequestedReviews] = useState<
    | {
        id: string;
        course_name: string | undefined;
        instructor_name: string | undefined;
        status: VersionStatusType | undefined;
      }[]
    | undefined
  >();
  const { listRequestedReviews } = useListRequestedReviews();

  const title =
    requestType === "assigned" ? "Assigned Requests" : "Completed Requests";

  const listAdminRequestedReviews = async () => {
    try {
      const response = await listRequestedReviews({
        variables: {
          filter: {
            adminId,
          },
        },
      });

      const requested_reviews:
        | {
            id: string;
            course_name: string | undefined;
            instructor_name: string | undefined;
            status: VersionStatusType | undefined;
          }[]
        | undefined = response.data?.listRequestedReviews.edges.map((edge) => ({
        id: edge.node.id,
        course_name: edge.node.course_version?.course?.title,
        instructor_name: edge.node.course_version?.course?.instructor?.name,
        status: edge.node.course_version?.status,
      }));

      setRequestedReviews(requested_reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (adminId && open) {
      listAdminRequestedReviews();
    }
  }, [adminId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase">
                      Instructor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requestType === "assigned" &&
                    requestedReviews?.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {request.course_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {request.instructor_name}
                          </div>
                        </td>
                      </tr>
                    ))}

                  {requestType !== "assigned" &&
                    requestedReviews
                      ?.filter(
                        (reqrev) =>
                          reqrev.status === VersionStatusType.Approved,
                      )
                      ?.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {request.course_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {request.instructor_name}
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
