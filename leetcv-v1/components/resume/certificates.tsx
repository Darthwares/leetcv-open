import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { profileResumeState, resumeFontState } from "@state/state";
import { DateRange } from "./dateRange";
import { Certificate } from "data/models/Certificate";
import { generateValidHref } from "@constants/defaults";
import ResumeSectionHeader from "./resumeSectionHeader";

function Certificates() {
  const [profileResume] = useRecoilState(profileResumeState);
  const certificates = profileResume.certificates;
  const t = useTranslations("CertificateData");
  const [selectedFont] = useRecoilState(resumeFontState);

  return (
    <div data-testid="certificate">
      {certificates?.length !== 0 && (
        <div data-testid="certificates" className="w-full sm:p-0 print:mt-1">
          {certificates?.some(() => certificates.length > 0) && (
            <ResumeSectionHeader title={t("certifications")} />
          )}
          {certificates?.map((certificate: Certificate, id: number) => {
            return (
              <div key={id} className="pl-5">
                <ol className="relative pl-1 border-l border-gray-200">
                  <li className="mb-2 pl-6 space-y-1">
                    <span className="brand-grad-bg flex absolute -left-4 justify-center items-center w-8 h-8 bg-gray-200 rounded-full ring-8 ring-white">
                      <img
                        src="/icons/certificate3.png"
                        alt={`certificate-${id}`}
                        className="w-4"
                      />
                    </span>
                    <a
                      href={generateValidHref(certificate?.credentialURL!)}
                      className={`font-semibold text-gray-900 print:text-sm ${
                        certificate?.credentialURL
                          ? "hover:text-blue-600 external cursor-pointer"
                          : "cursor-text"
                      } ${selectedFont.className}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {certificate.name}
                    </a>
                    <p
                      className={`${selectedFont.className} font-semibold text-sm text-gray-500 bg-white rounded-md`}
                    >
                      {certificate.issuingOrganization}
                    </p>
                    <div className="mb-1 text-sm font-semibold text-gray-500">
                      <span className="flex gap-1 w-full items-center">
                        <span
                          className={`${selectedFont.className} w-full font-semibold`}
                        >
                          {certificate.expirationDate &&
                            certificate.issueDate && (
                              <DateRange
                                id={id}
                                start={certificate.issueDate}
                                end={certificate.expirationDate}
                                category="certificates"
                              />
                            )}
                          {!certificate.expirationDate && (
                            <span
                              className={`${selectedFont.className} flex space-x-1 text-sm`}
                            >
                              <DateRange
                                id={id}
                                start={certificate.issueDate}
                                end={certificate.expirationDate}
                                category="certificates"
                              />{" "}
                              <span>{t("noExpiry")}</span>
                            </span>
                          )}
                        </span>
                      </span>
                    </div>
                    {certificate.credentialID && (
                      <p
                        className={`${selectedFont.className} text-sm font-semibold w-64 sm:w-[26rem] xl:w-48 truncate text-gray-500`}
                      >
                        <span>{t("CredentialId")} </span>
                        {certificate.credentialID}
                      </p>
                    )}
                  </li>
                </ol>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Certificates;
