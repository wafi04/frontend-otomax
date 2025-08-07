import { PaginationResponse } from "@/types/response";
import { Button } from "../ui/button";

export const PaginationComponents = ({
    pagination
} : {
    pagination  : PaginationResponse
}) => {
    return (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page)} to {pagination.limit} of 
            {pagination.total} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled={pagination.page <= 1}>
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={
                        pageNum === pagination.page ? "default" : "outline"
                      }
                      size="sm"
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                }
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      
    )
}