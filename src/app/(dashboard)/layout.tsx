"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const logOut = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <>
      <Button onClick={logOut} className="w-full rounded-none cursor-pointer">
        Log Out
      </Button>
      {children}
    </>
  );
}
