import HeadSeo from "@components/headSeo";
import { AVATAR_IMAGE } from "@constants/defaults";
import { trpc } from "@utils/trpc";
import { Resume } from "data/models/UserInfo";
import { useTranslations } from "next-intl";
import Moment from "react-moment";

export default function PublicResume() {
  const { data: publicResume } = trpc.useQuery(["fs.publicResume.get"]);
  const t = useTranslations("PublicResumes");

  return (
    <>
      <HeadSeo title={t("publicResumes")} />
      <div className="">
        <div className="absolute inset-x-0 bottom-0 " />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 px-2">
          <div className="relative  sm:overflow-hidden sm:rounded-2xl">
            <div className="relative lg:px-8 my-8">
              <div className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl flex items-center justify-center flex-col">
                <h2 className="block text-3xl brand-grad sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  {t("publicResume")}
                </h2>
              </div>

              <p className="mx-auto text-base md:text-xl mt-4 md:w-full text-center  text-gray-600 w-60">
                {t("findListDescription")}
              </p>
            </div>
            <div className="w-full mx-auto max-w-3xl md:pt-10 ">
              <div className="overflow-hidden bg-white shadow sm:rounded-md ">
                <ul role="list" className="divide-y divide-gray-200 ">
                  {publicResume?.map((resume: Resume) => {
                    const timestamp = resume?.updatedAt;
                    const reviewedTime =
                      (timestamp?._seconds! +
                        timestamp?._nanoseconds! * 0.00000001) *
                      1000;

                    const newDate = new Date(reviewedTime);
                    return (
                      <li key={resume.email} className="cursor-pointer">
                        <a
                          href={`${location.origin}/r/${resume?.handle}`}
                          target="_blank"
                          rel="noreferrer"
                          className="block hover:bg-gray-50 "
                        >
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-12 w-12 rounded-full"
                                  src={resume?.image ?? AVATAR_IMAGE}
                                  alt={resume.displayName!}
                                />
                              </div>
                              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                <div>
                                  <p className="truncate text-base font-medium text-indigo-600">
                                    {resume.displayName}
                                  </p>
                                  <p className="mb-1 flex items-center text-sm text-gray-500">
                                    {t("atTheRate")}
                                    <span className="truncate">
                                      {resume.handle}
                                    </span>
                                  </p>
                                </div>
                                <div className="justify-self-end">
                                  <div>
                                    <p className="text-sm text-gray-900">
                                      {t("updated")}
                                      <Moment
                                        fromNow
                                        className="pr-5 text-sm capitalize text-indigo-600"
                                      >
                                        {newDate}
                                      </Moment>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
