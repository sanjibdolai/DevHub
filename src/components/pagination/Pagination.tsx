import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Button from "../button";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Pagination({ className = "", ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({ className = "", ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<"button">;

export function PaginationLink({ className = "", isActive, children, ...props }: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "primary" : "secondary"}
      className={cn(
        isActive ? "ring-2 ring-indigo-500" : "",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export function PaginationPrevious({ className = "", ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Go to previous page"
      variant="secondary"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeft size={18} />
      <span className="hidden sm:block">Previous</span>
    </Button>
  );
}

export function PaginationNext({ className = "", ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Go to next page"
      variant="secondary"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRight size={18} />
    </Button>
  );
}

export function PaginationEllipsis({ className = "", ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal size={18} />
      <span className="sr-only">More pages</span>
    </span>
  );
}
