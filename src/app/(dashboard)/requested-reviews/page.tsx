"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useListRequestedReviews } from "@/common/hooks/queries";
import {
  columns,
  DataTable,
  RequestedReviewType,
} from "@/components/features/requested-reviews";
import { AssignModal } from "@/components/modals";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardPage() {
  const router = useRouter();
  const { listRequestedReviews } = useListRequestedReviews();
  const [requestedReviews, setRequestedReviews] = useState<
    RequestedReviewType[] | undefined
  >();

  const listAdminRequestedReviews = async () => {
    try {
      const response = await listRequestedReviews();

      const requested_reviews: RequestedReviewType[] | undefined =
        response.data?.listRequestedReviews.edges.map((edge) => ({
          id: edge.node.id,
          course_version_id: edge.node.course_version?.id,
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
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    listAdminRequestedReviews();
  }, []);
  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-5 px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Requested Reviews
          </h1>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Requested Reviews</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full px-8">
        <DataTable columns={columns} data={requestedReviews || []} />
      </div>
    </div>
  );
}
