import { contactMeDesc } from "@constants/defaults";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileResumeState } from "@state/state";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import UseSendMessage from "@components/customhooks/useSendMessage";
import crypto from "crypto";
import { toast } from "react-toastify";

const Contact = () => {
  const [msg, setMsg] = useState("");
  const [userInfo] = useRecoilState(profileResumeState);
  const t = useTranslations("Portfolio");
  const [desc, setDesc] = useState("");
  const sendMessage = UseSendMessage();

  useEffect(() => {
    function secureRandomNumber(max: number) {
      const randomBytes = crypto.randomBytes(4);
      const randomNumber = randomBytes.readUInt32BE(0);
      return randomNumber % max;
    }

    const randomNumber = secureRandomNumber(contactMeDesc.length);
    setDesc(contactMeDesc[randomNumber]);
  }, [userInfo]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location.pathname === "/s/portfolio") {
      toast.error(t("cantMsgYourself"));
      return;
    }

    if (!msg.trim()) {
      return;
    }

    try {
      sendMessage({ content: msg, userInfo, t });
      setMsg("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      id="contact"
      className="px-4 md:px-6 gap-y-6 bg-gradient-to-br from-gray-100 to-white shadow"
    >
      <div className="max-w-7xl mx-auto px-5 py-12 xl:py-14 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 space-y-4 dark:text-white">
        <div className="w-full overflow-hidden rounded-lg">
          <h2 className="font-semibold text-2xl md:text-2xl lg:hidden mb-3 text-gray-900 text-center">
            {t("contactMe")}
          </h2>
          <div
            data-testid="lottie-container"
            className="h-[18rem] md:h-[25rem] w-full"
          >
            <lottie-player
              src="/assets/lottie/portfolio-contact-me.json"
              background=""
              speed="1"
              loop
              autoplay
              className="bg-gradient-to-r from-indigo-100 to-pink-200"
            />
          </div>
        </div>
        <div className="space-y-3 lg:-top-3 lg:relative">
          <h2 className="font-semibold mb-6 text-xl md:text-2xl lg:block hidden text-gray-900 text-center">
            {t("contactMe")}
          </h2>
          <div className="text-gray-500 xl:text-lg dark:text-white">{desc}</div>
          <form onSubmit={handleOnSubmit}>
            <textarea
              name="message"
              id="message"
              rows={window.innerWidth > 1280 ? 5 : 4}
              className="w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 dark:bg-gray-800 dark:text-gray-100 placeholder:text-sm"
              aria-describedby="message-max"
              defaultValue={""}
              required={true}
              maxLength={500}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={t("typeMessage")}
            />
            <button
              type="submit"
              className={`${
                !msg
                  ? "opacity-70 cursor-default"
                  : "opacity-100 cursor-pointer"
              } inline-flex w-full items-center gap-2 justify-center rounded-md border border-transparent bg-indigo-600 px-6 mt-2 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700`}
            >
              {t("send")}
              <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
