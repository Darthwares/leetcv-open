import { referStats } from "@constants/defaults";
import { userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";

const ReferStats = () => {
  const t = useTranslations("Referral");
  const [userId] = useRecoilState(userIdState);

  const { data: hasReferralPeers } = trpc.useQuery([
    "fs.refer.getRefferalPeers",
    { id: userId },
  ]);

  const stats = referStats(hasReferralPeers, t);

  return (
    <>
      {stats.map((item) => (
        <div
          key={item.id}
          className=" overflow-hidden rounded-lg bg-white dark:bg-gray-800/50 p-4 md:p-6"
        >
          <dt className="flex items-center gap-4">
            <div className=" rounded-md bg-indigo-500 dark:bg-indigo-600 p-3">
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-left font-semibold text-lg dark:text-white text-gray-600">
                {item.name}
              </p>
              <p className="text-sm text-left dark:text-gray-300 text-gray-500">
                {item.description}
              </p>
            </div>
          </dt>
        </div>
      ))}
    </>
  );
};

export default ReferStats;
