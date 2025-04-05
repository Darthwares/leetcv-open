import { useState, useEffect, useCallback } from "react";
import { trpc } from "@utils/trpc";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageTitleState, resumeState } from "@state/state";
import { StarIcon } from "@heroicons/react/solid";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import Container from "@components/container";
import Footer from "@components/home/footer";
import {
  AutoComplete,
  AutoCompleteChangeParams,
} from "primereact/autocomplete";
import { feedbackFeatures, uploader } from "@constants/defaults";
import { UploadButton } from "react-uploader";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Carousel from "@components/carousel";
import { XIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { UploadSvg } from "@components/svg";
import { ReactImageCarouselViewer } from "react-image-carousel-viewer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className={`${
          star <= rating ? "text-yellow-400" : "text-gray-300"
        } focus:outline-none`}
        aria-label={`Rate ${star} stars out of 5`}
      >
        <StarIcon className="w-8 h-8" />
      </button>
    ))}
  </div>
);

export default function UserFeedbackPage() {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("Settings");
  const [resume] = useRecoilState(resumeState);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const [index, setIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    feedbackType: "",
    message: "",
    feature: "",
    screenshotUrls: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredFeatures, setFilteredFeatures] = useState<string[]>([]);

  const saveFeedback = trpc.useMutation(["fs.feedback.saveFeedback"]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const handleUploadComplete = useCallback(
    (files: Array<{ fileUrl: string }>) => {
      const newFiles = files.map((file) => file.fileUrl);
      setFormData((prev) => ({
        ...prev,
        screenshotUrls: [...prev.screenshotUrls, ...newFiles].slice(0, 3),
      }));
    },
    []
  );

  const deleteImage = useCallback((url: string) => {
    setFormData((prev) => ({
      ...prev,
      screenshotUrls: prev.screenshotUrls.filter((image) => image !== url),
    }));
  }, []);

  const searchFeatures = useCallback((event: { query: string }) => {
    setFilteredFeatures(
      feedbackFeatures(t).filter((feature) =>
        feature.toLowerCase().includes(event.query.toLowerCase())
      )
    );
  }, []);

  const isButtonDisabled =
    isSubmitting ||
    !formData.rating ||
    !formData.message ||
    !formData.feedbackType ||
    !formData.feature;

  useEffect(() => {
    import("@lottiefiles/lottie-player");
    setProdTitle(t("feedback"));
  }, [setProdTitle, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await saveFeedback.mutateAsync({
        id: resume?.id,
        message: formData.message,
        rating: formData.rating,
        email: formData.email || resume?.email || "not Provided",
        name: formData.name || resume?.displayName || "not Provided",
        type: formData.feedbackType,
        page: formData.feature,
        screenshotUrls: formData.screenshotUrls,
      });

      toast.success(t("thankYouFeedback"));
      setFormData({
        name: "",
        email: "",
        rating: 0,
        feedbackType: "",
        message: "",
        feature: "",
        screenshotUrls: [],
      });
    } catch (error) {
      toast.error(t("errorSubmittingFeedback"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  return (
    <>
      <NextSeo
        title="User Feedback | LeetCV"
        description="Share your thoughts and experiences with LeetCV. Your feedback helps us improve our resume-building platform and provide better services to job seekers and professionals."
        key="LeetCV, User Feedback, Resume Builder Feedback, Improve LeetCV, Customer Experience"
        canonical="https://www.leetcv.com/s/settings/feedback"
        openGraph={{
          url: "https://www.leetcv.com/s/settings/feedback",
          title: "User Feedback | LeetCV",
          description:
            "Share your thoughts and experiences with LeetCV. Your feedback helps us improve our resume-building platform and provide better services to job seekers and professionals.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV User Feedback",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "User Feedback",
          description:
            "Share your thoughts and experiences with LeetCV. Your feedback helps us improve our resume-building platform and provide better services to job seekers and professionals.",
          url: "https://www.leetcv.com/s/settings/feedback",
        })}
      </script>
      <Container>
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-1 text-left text-gray-700">
              {t("userFeedback")}
            </h1>
            <p className="text-gray-600 mb-6">{t("feedbackHeaderdesc")}</p>
            <div className="rounded-lg shadow border border-gray-300 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="hidden lg:flex justify-center items-center bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-l-lg">
                <div className="h-full w-full xl:h-[30rem] xl:w-[30rem]">
                  <lottie-player
                    src="/assets/lottie/feedback.json"
                    background=""
                    speed={1}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
              </section>
              <section className="bg-white p-6 rounded-lg lg:rounded-r-lg">
                <h2 className="text-lg md:text-2xl font-semibold text-indigo-600 mb-4">
                  {t("submitFeedback")}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder={t("enteryour") + t("name")}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm  "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder={t("enteryour") + t("email")}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm  "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("rating")} <span className="text-red-500">*</span>
                    </label>
                    <StarRating
                      rating={formData.rating}
                      setRating={(rating) =>
                        handleInputChange("rating", rating)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="feedbackType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("feedbackType")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="feedbackType"
                      value={formData.feedbackType}
                      onChange={(e) =>
                        handleInputChange("feedbackType", e.target.value)
                      }
                      required
                      className="text-sm text-gray-700 mt-1 block w-full rounded-md border-indigo-300 shadow-sm  "
                    >
                      <option value="">{t("selectFeedbackztype")}</option>
                      <option value="general">{t("general")}</option>
                      <option value="bug">{t("bugReport")}</option>
                      <option value="feature">{t("featureRequest")}</option>
                      <option value="other">{t("other")}</option>
                    </select>
                  </div>
                  <div className="feature-select w-full">
                    <label
                      htmlFor="feature-page"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("feedbackPage")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <AutoComplete
                      inputId="feature-page"
                      id="feature-page"
                      value={formData.feature}
                      placeholder={t("selectFeaturePage")}
                      suggestions={filteredFeatures}
                      completeMethod={searchFeatures}
                      onChange={(e: AutoCompleteChangeParams) =>
                        handleInputChange("feature", e.value)
                      }
                      className="w-full pl-1 rounded-md border mt-1 mb-2 border-indigo-300 shadow-sm"
                      dropdown
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                  <div className="screenshot-upload text-sm flex justify-between items-start flex-wrap gap-2">
                    <label
                      htmlFor="screenshot-upload"
                      className="font-bold text-gray-700 mb-2"
                    >
                      {t("attachScreenshot")}
                    </label>
                    <div className="flex-col gap-2">
                      <UploadButton
                        uploader={uploader}
                        options={{
                          multi: true,
                          maxFileCount: 3,
                          maxFileSizeBytes: 1024 * 1024,
                          mimeTypes: ["image/jpeg", "image/png", "image/webp"],
                          showFinishButton: true,
                          path: {
                            folderPath: `/${
                              resume.id
                            }/feedbacks/${new Date().toISOString()}`,
                          },
                          metadata: {
                            title: `${resume.id}-${new Date().toISOString()}`,
                          },
                        }}
                        onComplete={handleUploadComplete}
                      >
                        {({ onClick }) => (
                          <button
                            onClick={onClick}
                            className="p-2 bg-indigo-500 text-white rounded flex gap-1"
                          >
                            <span>
                              <UploadSvg className="w-4 h-4" />
                            </span>
                            {t("uploadScreenshot")}
                          </button>
                        )}
                      </UploadButton>
                    </div>
                  </div>
                  {formData.screenshotUrls.length > 0 && (
                    <div className="image-carousel flex justify-end">
                      <div className="w-full">
                        <Carousel show={2}>
                          {formData.screenshotUrls.map((url, index) => (
                            <div key={url} className="relative px-2">
                              <img
                                src={url}
                                alt={`Uploaded Screenshot ${index + 1}`}
                                className="w-full h-auto rounded-lg shadow"
                                onClick={() => {
                                  setIndex(index);
                                  setIsOpen(true);
                                }}
                              />
                              <button
                                onClick={() => deleteImage(url)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                              >
                                <XIcon className="w-3" />
                              </button>
                            </div>
                          ))}
                        </Carousel>
                      </div>
                    </div>
                  )}

                  <ReactImageCarouselViewer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    images={formData.screenshotUrls.map((url) => ({
                      src: url,
                    }))}
                    startIndex={index}
                    style={{ position: "relative", top: "50%" }}
                    leftArrow={
                      <ArrowLeftIcon className="carousel-arrow carousel-left-arrow" />
                    }
                    rightArrow={
                      <ArrowLeftIcon className="carousel-arrow carousel-right-arrow rotate-90" />
                    }
                  />
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("message")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      placeholder={t("writeMessage")}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                      className="max-h-[6rem] mt-1 block w-full rounded-md border-indigo-300 shadow-sm   min-h-[100px]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={`w-full text-white font-bold py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 ${
                      isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? t("submitting") : t("submit")}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
        <div className="pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
