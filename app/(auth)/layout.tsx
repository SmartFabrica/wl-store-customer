import { BrandPanel } from "@/components/shared/brand-panel";

const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-[420px_1fr]">
      <BrandPanel />
      <main className="flex items-start justify-center px-6 py-8 sm:px-10 sm:py-14">
        <div className="w-full max-w-110">{children}</div>
      </main>
    </div>
  );
};

export default AuthLayout;
