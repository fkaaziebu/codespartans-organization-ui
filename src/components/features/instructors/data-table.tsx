import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import AuthBgPattern from "@/../public/auth_bg_pattern.png";
import { IllustrationIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onButtonClick?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onButtonClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex w-full rounded-t-lg border border-b-0 border-gray-100 px-6 py-3">
        <Input
          className="w-[20%]"
          placeholder="Search for instructor by name"
        />
      </div>
      <div className="overflow-hidden rounded-b-lg border border-gray-100 shadow-lg shadow-gray-100">
        {table.getRowModel().rows?.length ? (
          <Table>
            <TableHeader className="bg-[#FAFAFA]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-[#717680]">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="overflow-hidden px-8 pt-10 pb-12">
            <div className="relative flex flex-col items-center gap-6">
              <Image
                src={AuthBgPattern}
                alt="Background pattern"
                className="absolute -top-40"
              />
              <div className="z-30 flex w-full flex-col items-center gap-4">
                <div>
                  <IllustrationIcon />
                </div>
                <div className="flex w-[40%] flex-col items-center gap-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    Start by Creating an Instructor
                  </h3>
                  <p className="text-sm text-wrap text-[#535862]">
                    Instructors are essential for managing courses and providing
                    support to students. Click the button below to create a new
                    instructor.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => onButtonClick?.()}
                className="z-30 bg-[#7F56D9] px-3 py-5 hover:bg-[#6941C6]"
              >
                <PlusIcon className="text-white" />
                <span className="text-sm text-white">Add Instructor</span>
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
