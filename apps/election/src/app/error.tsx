"use client";

import { NotFound } from "@/components/not-found";

export default function ErrorBoundary({}: { error: Error }) {
  return <NotFound />;
}
