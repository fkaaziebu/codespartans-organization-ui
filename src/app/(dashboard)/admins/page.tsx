"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminResponse } from "@/common/graphql/generated/graphql";
import { useListAdmins } from "@/common/hooks/queries";
import { columns, DataTable } from "@/components/features/admins";
import { CreateAdminModal } from "@/components/modals";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function DashboardAdminPage() {
  const router = useRouter();
  const { listAdmins } = useListAdmins();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
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

      setAdmins(response.data?.listAdmins.edges.map((edge) => edge.node));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    listOrgAdmins();
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-5 px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Administrators
          </h1>
          <Button
            variant="outline"
            onClick={() => setIsAdminModalOpen(true)}
            className="px-3 py-5"
          >
            <PlusIcon />
            <span className="text-sm">Add Admin</span>
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
              <BreadcrumbPage>Administrators</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full px-8">
        <DataTable
          columns={columns}
          data={admins || []}
          onButtonClick={() => setIsAdminModalOpen(true)}
        />
      </div>
      <CreateAdminModal
        open={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        handleReload={async () => {
          await listOrgAdmins();
        }}
      />
    </div>
  );
}
