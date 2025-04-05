import { XIcon } from "@heroicons/react/outline";
import Carousel from "./carousel";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";

export default function CarouselList(props: any) {
  const t = useTranslations("Dashboard");
  return (
    <div data-testid="carouselList">
      <Carousel show={props.show}>
        {props.uniqueUploadedImages?.map((image: string, id: number) => {
          return (
            <div
              className={`relative w-full ${id === 0 ? "pr-1.5 py-2" : "p-2"}`}
              key={image}
            >
              <div className="relative h-full w-full hover:scale-105 opacity-90 transition duration-300 ease-in-out hover:opacity-100 border border-dashed border-gray-400 rounded-md ">
                <img
                  src={image}
                  alt={`projectImage-${id}`}
                  data-testid={`image-${id}`}
                  className={`w-full rounded-lg cursor-pointer object-cover h-full`}
                  onClick={() => {
                    props.setIndex(id);
                    props.setIsOpen(true);
                  }}
                />
                {location.pathname === "/s/resumeEditor" && image && (
                  <div
                    className="absolute right-1.5 top-1.5 text-red-600 hover:bg-red-500 hover:text-white hover:border-transparent text-sm border border-red-400 rounded-full p-0.5 cursor-pointer transition-all duration-300"
                    onClick={() => {
                      props.handleDelete(id, image);
                      toast.success(t("deletedImage"));
                    }}
                  >
                    <XIcon className="w-4" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Carousel>
      <ToastContainer />
    </div>
  );
}
