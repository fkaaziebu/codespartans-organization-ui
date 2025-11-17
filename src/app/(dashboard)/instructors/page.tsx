"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InstructorResponse } from "@/common/graphql/generated/graphql";
import useListInstructors from "@/common/hooks/queries/use-list-instructors";
import { columns, DataTable } from "@/components/features/instructors";
import { UsersIcon } from "@/components/icons";
import { CreateInstructorModal } from "@/components/modals";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function DashboardInstructorPage() {
  const router = useRouter();
  const { listInstructors } = useListInstructors();
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [instructors, setInstructors] = useState<
    InstructorResponse[] | undefined
  >([]);

  const listOrgInstructors = async () => {
    try {
      const response = await listInstructors({
        variables: {
          searchTerm: "",
          pagination: {
            first: 1000,
          },
        },
        fetchPolicy: "no-cache",
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

      setInstructors(
        response.data?.listInstructors.edges.map((edge) => edge.node),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
    listOrgInstructors();
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-5 px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Instructors</h1>
          <Button
            variant="outline"
            onClick={() => setIsInstructorModalOpen(true)}
            className="px-3 py-5"
          >
            <PlusIcon />
            <span className="text-sm">Add Instructor</span>
          </Button>
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
              <BreadcrumbPage>Instructors</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full px-8">
        <DataTable
          columns={columns}
          data={instructors || []}
          onButtonClick={() => setIsInstructorModalOpen(true)}
        />
      </div>
      <CreateInstructorModal
        open={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        handleReload={async () => {
          await listOrgInstructors();
        }}
      />
    </div>
  );
}
