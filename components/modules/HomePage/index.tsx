import AvailableProducts from "./AvailableProducts";
import Banner from "./Banner";
import Blog from "./Blog";
import Trending from "./Trending";

function HomePageModule() {
  return (
    <div className="flex w-full flex-col">
      <Banner />
      <Trending />
      <AvailableProducts />
      {/* <Blog /> */}
    </div>
  );
}

export default HomePageModule;
