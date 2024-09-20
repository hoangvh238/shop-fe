import { useSwiper } from "swiper/react";

export const SwiperButtonNext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const swiper = useSwiper();

  return <button onClick={() => swiper.slideNext()}>{children}</button>;
};
