import React from "react";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import TopBar from "./TopBar";
import UserHeader from "./UserHeader";
import Footer from "./Footer";
import AuthHeader from "./AuthHeader";

import { constants } from "@/settings";

function ShopLayout({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(
    getCookie(constants.USER_INFO, { cookies }) ?? `false`,
  );

  return (
    <>
      <TopBar />
      {user ? <UserHeader user={user} /> : <AuthHeader />}
      {children}
      <Footer />
    </>
  );
}

export default ShopLayout;
