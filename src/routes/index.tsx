import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const WaslaApp = lazy(() => import("@/wasla/WaslaApp.jsx"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "وصلة — منصة وصل المعلنين بالمؤثرين" },
      { name: "description", content: "وصلة: منصة عربية تربط المعلنين بالمؤثرين لإدارة الحملات والدعوات والتفاوض." },
      { property: "og:title", content: "وصلة — منصة وصل المعلنين بالمؤثرين" },
      { property: "og:description", content: "منصة عربية تربط المعلنين بالمؤثرين لإدارة الحملات والتفاوض." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const fallback = <div className="h-screen bg-sand" />;
  return (
    <ClientOnly fallback={fallback}>
      <Suspense fallback={fallback}>
        <WaslaApp />
      </Suspense>
    </ClientOnly>
  );
}
