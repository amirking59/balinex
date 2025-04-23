import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-12 md:px-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-muted p-4">
          <div className="text-6xl font-bold">404</div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
        <p className="max-w-[500px] text-muted-foreground">
          We couldn&apos;t find the page you were looking for. The page might have been moved or deleted.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}
