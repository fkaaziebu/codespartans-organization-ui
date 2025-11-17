import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { InstructorResponse } from "@/common/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<InstructorResponse>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "total_created_courses",
    header: "Courses Created",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("total_created_courses")}</div>
    ),
  },
  {
    accessorKey: "total_requested_reviews",
    header: "Requested Reviews",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("total_requested_reviews")}</div>
    ),
  },
  {
    accessorKey: "total_approved_courses",
    header: "Approved Courses",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("total_approved_courses")}</div>
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
        <div className="ml-3 flex items-center gap-1 rounded-md border border-gray-300 px-1.5 py-0.5 text-xs font-medium capitalize">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>{`${row.getValue("status")}`.toLowerCase()}</span>
        </div>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
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
            <DropdownMenuItem className="cursor-pointer text-red-700 hover:text-red-800">
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
