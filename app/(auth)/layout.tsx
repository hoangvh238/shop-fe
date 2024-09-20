import AuthLayout from "@/components/core/layouts/AuthLayout";

function AuthRootLayout({ children }: { children: React.ReactElement }) {
  return <AuthLayout>{children}</AuthLayout>;
}

export default AuthRootLayout;
