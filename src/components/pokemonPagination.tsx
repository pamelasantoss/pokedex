import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination"

interface PokemonPaginationProps {
  totalCount: number | undefined
  pageIndex: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function PokemonPagination({
  totalCount,
  pageIndex,
  perPage,
  onPageChange
}: PokemonPaginationProps) {
  const pages = totalCount ? Math.ceil(totalCount / perPage) || 1 : 1
  const lastPage = (pages - 1) * perPage

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={pageIndex === 0}
            variant="ghost"
            onClick={() => onPageChange(pageIndex - perPage)}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={lastPage <= pageIndex + 1}
            variant="ghost"
            onClick={() => onPageChange(pageIndex + perPage)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
