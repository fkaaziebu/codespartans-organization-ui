import Image from "next/image";
import { useRouter } from "next/navigation";
import VercelImg from "@/../public/globe.svg";
import { ChevronSelectorIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserAccount = () => {
  const router = useRouter();
  return (
    <div className="rounded-lg border border-gray-200 p-3">
      <div className="relative flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border">
          <Image src={VercelImg} className="object-cover" alt="avatar image" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Olivia Rhye</div>
          <div className="text-sm text-gray-600">olivia@untitledui.com</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="absolute -top-1.5 -right-1.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-all hover:bg-gray-100">
              <ChevronSelectorIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push("settings?tab=profile")}
              >
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("settings")}>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/support")}>
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                sessionStorage.clear();
                router.push("/");
              }}
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
