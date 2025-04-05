import React, { useState } from "react";
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  getString,
} from "firebase/remote-config";

const RELEASE_FLAG = "release";
const DEFAULT_RELEASE_FLAG = "Beta";
const LOCAL_STORAGE_KEY = "leetresume_flags";

type Flags = {
  release: string;
};
const FlagKeys: string[] = [RELEASE_FLAG];

export function useRemoteConfig() {
  const [releaseFlag, setReleaseFlag] = useState<Flags>({ release: "Beta" });
  const [reviewState, setReviewState] = useState<string>("");
  const [attestationState, setAttestationState] = useState<string>("");
  const [multipleImage, setMultipleImage] = useState<string>("");
  const [wizardFlag, setWizardFlag] = useState<string>("");
  const [blogs, setBlogs] = useState<string>("");
  const [isLinkedinRelease, setIsLinkedinRelease] = useState<string>("");
  const [razorpayAllowedUsers, setRazorpayAllowedUsers] = useState<string>("");

  React.useEffect(() => {
    if (process.browser) {
      const cachedFlags = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cachedFlags) setReleaseFlag(JSON.parse(cachedFlags));

      const remoteConfig = getRemoteConfig();
      remoteConfig.settings.minimumFetchIntervalMillis = 4000;
      remoteConfig.defaultConfig = {
        RELEASE_FLAG: DEFAULT_RELEASE_FLAG,
      };

      fetchAndActivate(remoteConfig).then(() => {
        let flagValues: string[] = [];
        FlagKeys.forEach((key) => {
          flagValues.push(getValue(remoteConfig, key).asString());
        });
        const flags = {
          release: flagValues[0],
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(flags));
        setReleaseFlag(flags);
      });
    }
  }, [process.browser]);

  React.useEffect(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

    fetchAndActivate(remoteConfig).then(() => {
      const val = getString(remoteConfig, "review");
      setReviewState(val);
    });
  }, []);

  React.useEffect(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

    fetchAndActivate(remoteConfig).then(() => {
      const value = getString(remoteConfig, "attestation");
      setAttestationState(value);
    });
  }, []);

  React.useEffect(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

    fetchAndActivate(remoteConfig).then(() => {
      const value = getString(remoteConfig, "multiUpload");
      setMultipleImage(value);
    });
  }, []);

  React.useEffect(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

    fetchAndActivate(remoteConfig).then(() => {
      const value = getString(remoteConfig, "blog_api");
      setBlogs(value);
    });
  }, []);

  React.useEffect(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
    fetchAndActivate(remoteConfig)
      .then(() => {
        const value = getString(remoteConfig, "wizardFlag");
        setWizardFlag(value);
      })
      .catch((error) => {
        console.error("Error fetching remote config:", error);
      });
  }, []);

  React.useEffect(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
    fetchAndActivate(remoteConfig)
      .then(() => {
        const value = getString(remoteConfig, "linkedin_release");
        setIsLinkedinRelease(value);
      })
      .catch((error) => {
        console.error("Error fetching remote config:", error);
      });
  }, []);

  React.useEffect(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

    fetchAndActivate(remoteConfig).then(() => {
      const value = getString(remoteConfig, "razorpay");
      setRazorpayAllowedUsers(value);
    });
  }, []);

  return {
    releaseFlag,
    reviewState,
    attestationState,
    multipleImage,
    blogs,
    wizardFlag,
    isLinkedinRelease,
    razorpayAllowedUsers,
  };
}
