"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardSupportPage() {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
      </div>
    </div>
  );
}
