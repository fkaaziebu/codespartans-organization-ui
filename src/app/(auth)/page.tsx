"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthBgPattern from "@/../public/auth_bg_pattern.png";
import { LogInTab, SignUpTab } from "@/components/features/auth";
import { LogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);
  const [tab, setTab] = useState<"sign_up" | "log_in">("sign_up");
  return (
    <div className="flex h-screen w-screen justify-center pt-12 pb-12 sm:pt-24">
      <Image
        height={768}
        width={768}
        src={AuthBgPattern}
        alt="Auth bg background"
        className="absolute -top-[14%]"
      />
      <div className="w-md px-4 sm:px-8">
        <div className="flex h-full w-full flex-col gap-8">
          <div className="z-30 flex w-full flex-col items-center gap-6">
            <LogoIcon />
            {tab === "sign_up" ? (
              <div className="flex flex-col items-center gap-3">
                <h1 className="text-center text-3xl font-semibold text-gray-900">
                  Create an account
                </h1>
                <span className="text-sm text-gray-600">
                  Start your 30-day free trial.
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <h1 className="text-center text-3xl font-semibold text-gray-900">
                  Log in to your account
                </h1>
                <span className="text-sm text-gray-600">
                  Welcome back! Please enter your details.
                </span>
              </div>
            )}
            <div className="flex w-full items-center justify-between gap-0.5 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
              <Button
                className={cn(
                  "w-[49.5%] cursor-pointer bg-white hover:bg-gray-100",
                  tab === "sign_up"
                    ? "border border-gray-300 text-gray-700"
                    : "bg-gray-50 text-gray-500",
                )}
                onClick={() => setTab("sign_up")}
              >
                Sign up
              </Button>
              <Button
                className={cn(
                  "w-[49.5%] cursor-pointer bg-white hover:bg-gray-100",
                  tab === "log_in"
                    ? "border border-gray-300 text-gray-700"
                    : "bg-gray-50 text-gray-500",
                )}
                onClick={() => setTab("log_in")}
              >
                Log in
              </Button>
            </div>
          </div>
          {tab === "sign_up" ? (
            <SignUpTab handleTabChange={setTab} />
          ) : (
            <LogInTab handleTabChange={setTab} />
          )}
        </div>
      </div>
    </div>
  );
}
