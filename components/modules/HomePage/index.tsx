"use client";
import AvailableProducts from "./AvailableProducts";
import Banner from "./Banner";
import Trending from "./Trending";

function HomePageModule() {

  
  return (
    <div className="flex w-full flex-col">
      <Banner />
      <div className="px-2 lg:px-24">
        <Trending />
        <AvailableProducts />
      </div>
      {/* <Blog /> */}
    </div>
  );
}

export default HomePageModule;
