import { Button } from "shadcn/components/ui/button";
import { motion } from "framer-motion";
interface CustomHeroProps {
  title: string;
  description: string;
  primaryButtonText: string;
  onPrimaryButtonClick: () => void;
  padding?: string;
}

const CustomHero: React.FC<CustomHeroProps> = ({
  title,
  description,
  primaryButtonText,
  onPrimaryButtonClick,
  padding,
}) => {
  return (
    <>
      <div className="section pt-28 no-top-space bg-primary-3 flex flex-col items-center justify-center w-full bg-gradient-to-r from-pink-500 to-indigo-500 rotate-180 py-10">
        <img
          src="/assets/curve.svg"
          alt="leetCV asset"
          className="divider blog-divider-top"
        />
        <div className="blog-container text-center rotate-180 px-4 md:px-8 lg:px-9">
          <h2 className="text-3xl px-4 md:text-5xl font-bold text-white mb-8">
            {title}
          </h2>
          <p className="text-white px-4 mx-auto max-w-xl mb-8">{description}</p>
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 1 }}
            className="flex px-4 justify-center relative z-10"
          >
            <Button
              className={`${
                padding ?? "px-8"
              } text-lg font-semibold bg-white py-3 text-blue-600 rounded-full`}
              onClick={onPrimaryButtonClick}
            >
              {primaryButtonText}
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CustomHero;
