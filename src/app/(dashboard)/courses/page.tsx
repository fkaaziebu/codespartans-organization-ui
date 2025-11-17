"use client";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CourseBg from "@/../public/biology.webp";
import { CourseResponse } from "@/common/graphql/generated/graphql";
import { useListCourses } from "@/common/hooks/queries";
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
  const { listCourses } = useListCourses();
  const [courses, setCourses] = useState<CourseResponse[]>([]);

  const fetchOrganizationCourse = async () => {
    try {
      const response = await listCourses();
      setCourses(
        // @ts-expect-error error
        response.data?.listCourses.edges.map((edge) => edge.node) || [],
      );
    } catch (error) {}
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    fetchOrganizationCourse();
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-5 px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
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
              <BreadcrumbPage>Courses</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full px-8">
        <div className="grid grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col gap-4">
              <div className="relative h-76.5">
                <img
                  src={course.avatar_url}
                  alt="Course Background"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-5 text-white backdrop-blur-lg">
                  <div className="flex justify-between">
                    <div className="text-sm">
                      <div className="font-semibold">
                        {course.instructor?.name}
                      </div>
                      <div>{new Date(course.inserted_at).toDateString()}</div>
                    </div>
                    <div className="text-sm font-semibold italic">
                      {course?.approved_version ? "Approved" : "Pending"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
                <Link href="#" className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#6941C6]">
                    Go to course
                  </span>
                  <ArrowUpRightIcon className="h-5 w-5 text-[#9E77ED]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
