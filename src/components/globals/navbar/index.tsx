"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VersionStatusType } from "@/common/graphql/generated/graphql";
import { useListRequestedReviews } from "@/common/hooks/queries";
import { cn } from "@/lib/utils";
import {
  BarChartIcon,
  BookOpenTextIcon,
  LogoIcon,
  RowsIcon,
  SearchLgIcon,
  SettingsIcon,
  SupportIcon,
  UsersIcon,
  UsersLockIcon,
} from "../../icons";
import { Input } from "../../ui/input";
import { UserAccount } from "./user-account";

export const Navbar = () => {
  const router = useRouter();
  const { listRequestedReviews } = useListRequestedReviews();
  const [pendingRequestedReviews, setPendingRequestedReviews] = useState(0);
  const pathName = usePathname();
  const navLinks: {
    icon: React.JSX.Element;
    label: string;
    href: string;
    hasBadge: boolean;
    count?: number;
  }[] = [
    {
      icon: <BarChartIcon />,
      label: "Dashboard",
      href: "/dashboard",
      hasBadge: false,
    },
    {
      icon: <RowsIcon />,
      label: "Requested Reviews",
      href: "/requested-reviews",
      hasBadge: true,
      count: pendingRequestedReviews,
    },
    {
      icon: <UsersIcon />,
      label: "Instructors",
      href: "/instructors",
      hasBadge: false,
    },
    {
      icon: <UsersLockIcon />,
      label: "Admins",
      href: "/admins",
      hasBadge: false,
    },
    {
      icon: <BookOpenTextIcon />,
      label: "Courses",
      href: "/courses",
      hasBadge: false,
    },
  ];

  const listAdminRequestedReviews = async () => {
    try {
      const response = await listRequestedReviews({
        variables: {
          filter: {
            status: VersionStatusType.Pending,
          },
        },
      });

      setPendingRequestedReviews(
        response.data?.listRequestedReviews.count || 0,
      );
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
    <div className="h-full w-74 border-r border-gray-200">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex flex-col gap-4 pt-6">
          <div className="flex flex-col gap-5 px-5">
            <div className="flex items-start gap-2">
              <LogoIcon height={32} width={32} />
              <span className="text-lg font-bold text-gray-900">
                Codespartans
              </span>
            </div>
            <div className="flex w-full items-center gap-1.5">
              <div className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-gray-300 px-3 py-2">
                <div className="relative">
                  <div className="absolute top-[22%] left-0">
                    <SearchLgIcon />
                  </div>
                  <Input
                    placeholder="Search"
                    className="border-none shadow-none ring-0 outline-none placeholder:pl-4 placeholder:text-base focus:border-none focus:shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                  />
                </div>
                <div className="rounded border border-gray-200 px-1 py-0.25 text-xs text-gray-500">
                  ⌘K
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 px-4">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.href}
                href={navLink.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100",
                  pathName.includes(navLink.href) && "bg-gray-100",
                )}
              >
                {!navLink.hasBadge ? (
                  <>
                    {navLink.icon}
                    <span className="text-base font-semibold text-gray-700">
                      {navLink.label}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mr-auto flex items-center gap-2">
                      {navLink.icon}
                      <span className="text-base font-semibold text-gray-700">
                        {navLink.label}
                      </span>
                    </div>
                    <div className="flex h-5.5 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700">
                      {navLink.count}
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 pb-6">
          <div className="space-y-2 px-4">
            <Link
              href="/support"
              className={cn(
                "flex items-center gap-2 rounded px-3 py-2 hover:bg-gray-100",
                pathName.includes("/support") && "bg-gray-100",
              )}
            >
              <SupportIcon />
              <span className="text-base font-semibold text-gray-700">
                Support
              </span>
            </Link>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-2 rounded px-3 py-2 hover:bg-gray-100",
                pathName.includes("/settings") && "bg-gray-100",
              )}
            >
              <SettingsIcon />
              <span className="text-base font-semibold text-gray-700">
                Settings
              </span>
            </Link>
          </div>
          {/*<div>Campaign stuffs</div>*/}
          <UserAccount />
        </div>
      </div>
    </div>
  );
};
