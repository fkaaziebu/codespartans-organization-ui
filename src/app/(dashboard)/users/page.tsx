"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AdminResponse,
  InstructorResponse,
  StatsResponse,
} from "@/common/graphql/generated/graphql";
import { useGetStats, useListAdmins } from "@/common/hooks/queries";
import useListInstructors from "@/common/hooks/queries/use-list-instructors";
import {
  AdminsTable,
  InstructorsTable,
  StatsCards,
} from "@/components/features/users";
import {
  AssignModal,
  CreateAdminModal,
  CreateInstructorModal,
  RequestsModal,
  ReviewsModal,
} from "@/components/modals";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>("");
  const [selectedAdminId, setSelectedAdminId] = useState<string>("");
  const [selectedVersionId, setSelectedVersionId] = useState<string>("");
  const [requestType, setRequestType] = useState("");
  const router = useRouter();
  const { getStats } = useGetStats();
  const { listInstructors } = useListInstructors();
  const { listAdmins } = useListAdmins();

  const [stats, setStats] = useState<StatsResponse | undefined>({
    total_instructors: 0,
    total_admins: 0,
    total_requested_reviews: 0,
    total_assigned_reviews: 0,
    total_completed_reviews: 0,
  });

  const [instructors, setInstructors] = useState<
    InstructorResponse[] | undefined
  >([]);

  const [admins, setAdmins] = useState<AdminResponse[] | undefined>([]);

  const handleViewReviews = (instructorId: string) => {
    setSelectedInstructorId(instructorId);
    setIsReviewsModalOpen(true);
  };

  const handleAssignRequest = (versionId: string) => {
    setSelectedVersionId(versionId);
    setIsAssignModalOpen(true);
  };

  const handleViewRequests = (adminId: string, type: string) => {
    setSelectedAdminId(adminId);
    setRequestType(type);
    setIsRequestsModalOpen(true);
  };

  const getOrgStats = async () => {
    try {
      const response = await getStats();

      setStats(response.data?.getStats);
    } catch (error) {
      console.error(error);
    }
  };

  const listOrgInstructors = async () => {
    try {
      const response = await listInstructors({
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

      setInstructors(
        response.data?.listInstructors.edges.map((edge) => edge.node),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    getOrgStats();
    listOrgInstructors();
    listOrgAdmins();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <h1 className="text-2xl font-bold text-gray-950">Dashboard</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => setIsInstructorModalOpen(true)}
              className="bg-gray-800 hover:bg-gray-950"
            >
              Add Instructor
            </Button>
            <Button
              onClick={() => setIsAdminModalOpen(true)}
              className="bg-gray-800 hover:bg-gray-950"
            >
              Add Admin
            </Button>
          </div>
        </div>

        <div className="flex-1 px-8 py-6">
          <StatsCards stats={stats} />

          <div className="mt-8">
            <Tabs defaultValue="instructors" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="instructors">Instructors</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
              </TabsList>

              <TabsContent value="instructors">
                <InstructorsTable
                  instructors={instructors}
                  onViewReviews={handleViewReviews}
                />
              </TabsContent>

              <TabsContent value="admins">
                <AdminsTable
                  admins={admins}
                  onViewRequests={handleViewRequests}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <CreateInstructorModal
        open={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        handleReload={() => {
          getOrgStats();
          listOrgInstructors();
          listOrgAdmins();
        }}
      />

      <CreateAdminModal
        open={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        handleReload={() => {
          getOrgStats();
          listOrgInstructors();
          listOrgAdmins();
        }}
      />

      <ReviewsModal
        open={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        handleAssignRequest={handleAssignRequest}
        instructorId={selectedInstructorId}
      />

      <RequestsModal
        open={isRequestsModalOpen}
        onClose={() => setIsRequestsModalOpen(false)}
        adminId={selectedAdminId}
        requestType={requestType}
      />

      <AssignModal
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        versionId={selectedVersionId}
        handleReload={() => {
          getOrgStats();
          listOrgInstructors();
          listOrgAdmins();
        }}
      />
    </div>
  );
}
