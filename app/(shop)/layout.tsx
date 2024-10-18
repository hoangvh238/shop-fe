import ShopLayout from "@/components/core/layouts/ShopLayout";


function ShopRootLayout({ children }: { children: React.ReactNode }) {
  return <ShopLayout>{children}</ShopLayout>;
}

export default ShopRootLayout;
