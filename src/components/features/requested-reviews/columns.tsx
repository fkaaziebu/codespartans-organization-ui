import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { VersionStatusType } from "@/common/graphql/generated/graphql";
import { AssignModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type RequestedReviewType = {
  id: string;
  course_version_id: string;
  course_name: string | undefined;
  instructor_name: string | undefined;
  status: VersionStatusType | undefined;
};

export const columns: ColumnDef<RequestedReviewType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "course_name",
    header: "Course Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("course_name")}</div>
    ),
  },
  {
    accessorKey: "instructor_name",
    header: "Instructor Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("instructor_name")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex w-full items-center">
        {`${row.getValue("status")}`.toLowerCase() === "pending" && (
          <div className="ml-3 flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-700 capitalize">
            <div className="h-2 w-2 animate-pulse rounded-full bg-gray-500" />
            <span>{`${row.getValue("status")}`.toLowerCase()}</span>
          </div>
        )}
        {`${row.getValue("status")}`.toLowerCase() === "in_progress" && (
          <div className="ml-3 flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 capitalize">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span>
              {`${row.getValue("status")}`.toLowerCase().split("_").join(" ")}
            </span>
          </div>
        )}
        {`${row.getValue("status")}`.toLowerCase() === "approved" && (
          <div className="ml-3 flex items-center gap-1 rounded-md border border-gray-300 px-1.5 py-0.5 text-xs font-medium capitalize">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>{`${row.getValue("status")}`.toLowerCase()}</span>
          </div>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reviewReq = row.original;
      const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={
                  `${row.getValue("status")}`.toLowerCase() !== "pending"
                }
                className="cursor-pointer"
                onClick={() => setIsAssignModalOpen(true)}
              >
                Assign Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AssignModal
            open={isAssignModalOpen}
            onClose={() => setIsAssignModalOpen(false)}
            versionId={reviewReq.course_version_id}
            handleReload={() => {}}
          />
        </>
      );
    },
  },
];
