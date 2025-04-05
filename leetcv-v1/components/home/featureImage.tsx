import { useEffect } from "react";

interface FeatureImageProps {
  id: number;
  src: string;
  orderStyle: string;
}

const FeatureImage = ({ src, orderStyle, id }: FeatureImageProps) => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div
      className={`w-full ${orderStyle} ${
        (id === 1 || id === 3) && "lg:order-2"
      } dark:z-10`}
    >
      <div className="h-[18rem] md:h-[25rem] w-full">
        <lottie-player
          src={src}
          background=""
          speed="1"
          loop
          autoplay
          className="bg-gradient-to-r from-indigo-100 to-pink-200"
        />
      </div>
    </div>
  );
};

export default FeatureImage;
