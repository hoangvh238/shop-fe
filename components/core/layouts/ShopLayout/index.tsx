import React from "react";

import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";

function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default ShopLayout;
