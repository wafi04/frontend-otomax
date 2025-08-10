"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
} from "lucide-react";
import { CategoryData } from "../form/category";
import { PaginationComponents } from "@/components/custom/pagination";
import { PaginationResponse } from "@/types/response";
import { getStatusBadge } from "@/components/custom/status";
import { formatDate } from "@/utils/format";
import { useCategoryStore } from "../hooks/api";
import { DialogCreateCategory } from "./dialog";

interface CategoryTableProps {
  categories: CategoryData[];
  pagination?: PaginationResponse;
  onDelete?: (id: number) => void;
  onView?: (category: CategoryData) => void;
}

export function CategoryTable({
  categories,
  pagination,
  onDelete,
  onView,
}: CategoryTableProps) {
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter } =
    useCategoryStore();
  const [selectCategory, setSelectCategory] = useState<
    CategoryData | undefined
  >(undefined);
  const [open, setOpen] = useState({
    create: false,
    edit: false,
  });

  return (
    <>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-7  items-center justify-between">
        <div className="flex flex-1 gap-2  relative items-center">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex gap-2 items-center p-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                Inactive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size="sm"
            onClick={() => setOpen({ create: true, edit: false })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Data Table */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Sub Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {category.thumbnail ? (
                    <img
                      src={category.thumbnail}
                      alt={category.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.sub_name}</TableCell>
                <TableCell>{category.brand}</TableCell>
                <TableCell>
                  {category.code ? (
                    <Badge variant="outline">{category.code}</Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(category.status)}</TableCell>
                <TableCell>{formatDate(category.createdAt)}</TableCell>
                <TableCell className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView?.(category)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectCategory(category);
                          setOpen({ create: false, edit: true });
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onDelete?.(category.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {pagination && (
        <PaginationComponents pagination={pagination as PaginationResponse} />
      )}
      {open.create && (
        <DialogCreateCategory
          open={open.create}
          onClose={() => setOpen((prev) => ({ ...prev, create: !open.create }))}
        />
      )}
      {open.edit && (
        <DialogCreateCategory
          open={open.edit}
          initialData={selectCategory}
          onClose={() => setOpen((prev) => ({ ...prev, edit: !open.edit }))}
        />
      )}
    </>
  );
}
