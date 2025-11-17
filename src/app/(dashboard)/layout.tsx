import { Navbar } from "@/components/globals";

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen items-start">
      <Navbar />
      <div className="h-screen w-[calc(100vw-18.5rem)] overflow-y-scroll px-10 pt-8 pb-12">
        {children}
      </div>
    </div>
  );
}
