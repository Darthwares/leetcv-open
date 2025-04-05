import { profileResumeState } from "@state/state";
import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";
import CardStackUi from "./cardStackUi";
import { Badge } from "../../shadcn/components/ui/badge";

const Certification = () => {
  const resume = useRecoilValue(profileResumeState);
  if (!resume?.certificates?.length) return null;

  return (
    <CardStackUi
      id="certifications"
      Card={CertificationCard}
      lottiesrc="education-certification.json"
      dir="flex-row-reverse"
    />
  );
};

export default Certification;

const CertificationCard = () => {
  const t = useTranslations("Portfolio");
  const resume = useRecoilValue(profileResumeState);
  const sortedCertificates = [...(resume.certificates || [])].sort((a, b) => {
    return JSON.stringify(a).length - JSON.stringify(b).length;
  });

  return (
    <>
      {sortedCertificates.map((certificate, index) => (
        <div
          key={certificate.id}
          className="duration-500 group overflow-hidden rounded bg-indigo-100 p-5 flex flex-col justify-evenly sticky top-10 pt-[1.5em]"
        >
          <div className="relative">
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-violet-200 right-1 -bottom-24"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-200 right-12 bottom-12"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-100 right-1 -top-12"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-24 h-24 bg-purple-100 rounded-full group-hover:-translate-x-12"></div>
            <div className="z-20 flex flex-col justify-evenly w-full h-full">
              <p className="text-xl font-bold line-clamp-3 my-4 text-wrap break-words">
                {certificate.name}
              </p>

              {certificate.issuingOrganization && (
                <p className="line-clamp-2 font-bold">
                  {certificate.issuingOrganization}
                </p>
              )}
              <div className="flex flex-wrap gap-2 my-4 justify-between dark:text-white">
                <p>
                  <span className="font-medium">{t("issueDate")}</span>
                  <Badge variant="secondary">{certificate.issueDate}</Badge>
                  
                </p>
                {certificate.expirationDate && (
                  <p>
                    <span className="font-medium">{t("expiryDate")}</span>
                    <Badge variant="secondary">{certificate.expirationDate}</Badge>
                    
                  </p>
                )}
              </div>
              {certificate.credentialURL && (
                <a
                  href={certificate.credentialURL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-gray-100 text-center transition-all duration-200 bg-neutral-50 rounded text-neutral-800 font-extrabold w-full p-3 mt-5"
                >
                  {t("viewCertificate")}
                </a>
                
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
