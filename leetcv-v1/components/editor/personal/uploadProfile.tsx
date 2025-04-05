import { resumeState, userIdState } from "@state/state";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useTranslations } from "next-intl";

const getSignedUrl = async (image: string, id: string) => {
  const res = await fetch(`/api/getSignedUrl?signedUrl=${image}&id=${id}`, {
    method: "GET",
  });

  const { signedUrl } = await res.json();
  return signedUrl;
};

function UploadProfile() {
  const t = useTranslations("Dashboard");
  const [file, setFile] = useState<any>();
  const [isSelected, setSelected] = useState<boolean>(false);
  const [userId] = useRecoilState(userIdState);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [url, setUrl] = useState<any>(userInfo.image);

  const handleFile = async (e: any) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg","image/gif"];
    if (e.target.files[0] && !allowedTypes.includes(e.target.files[0].type)) {
     toast.error(t("onlyAllowedImage"));
      e.target.value = null;
      return;
    }
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    async function getProfilePicture() {
      const storage = getStorage();
      const imageRef = ref(storage, `uploads/${userId}/${userInfo?.avatar}`);
      const downloadURL = await getDownloadURL(imageRef);
      setUrl(downloadURL);
      return downloadURL;
    }

    async function getAvatar() {
      let userImage = await getProfilePicture();
      setUserInfo({
        ...userInfo,
        image: userImage,
      });
    }

    if (userInfo.avatar && isSelected) {
      setTimeout(() => {
        getAvatar();
      }, 2000);
    }
  }, [isSelected]);

  const handleClick = async () => {
    if (file === undefined) {
      toast.error(t("selectFile"));
      return;
    }
    const signedUrl = await getSignedUrl(file.name, userId);

    await fetch(signedUrl, {
      method: "PUT",
      body: file,
    });

    toast.success(t("success"));
    setSelected(true);
    setUserInfo({
      ...userInfo,
      image: url,
      avatar: file.name,
    });
    setFile("");
  };

  return (
    <>
      <div>
        <div className=" flex flex-col md:flex-row max-w-lg justify-center items-center border border-gray-300 space-x-6 md:gap-0 gap-3 bg-white px-5 py-2 rounded-md">
          <div className="flex items-center gap-3 w-full">
            <label className="block w-56 md:w-64 lg:w-80">
              <input
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                onChange={handleFile}
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
            </label>
          </div>
          <div className="flex justify-end items-center w-full pr-2 md:pr-0">
            <button
              onClick={handleClick}
              className="px-4 py-1.5 bg-indigo-600 items-center rounded-md cursor-pointer overflow-hidden duration-300 ease-out hover:bg-indigo-700"
            >
              <span className="text-center text-white font-semibold z-10 pointer-events-none">
                {t("upload")}
              </span>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UploadProfile;
