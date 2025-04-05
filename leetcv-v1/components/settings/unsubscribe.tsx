import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { trpc } from "@utils/trpc";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { resumeState, userIdState } from "@state/state";
import { useRouter } from "next/router";
import { AnnouncementSvg, CreditCardIcon, SpinnerIcon } from "@components/svg";
import { useSession } from "next-auth/react";
import { DatabaseIcon } from "@heroicons/react/outline";
import { Card, CardContent } from "../../shadcn/components/ui/card";
import { Badge } from "../../shadcn/components/ui/badge";
import { Progress } from "../../shadcn/components/ui/progress";
import {
  currencySymbol,
  formatFirestoreTimestamp,
  formatPurchasedPlan,
} from "@constants/defaults";
import DeleteModal from "@components/deleteModal";

interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

const Unsubscribe = () => {
  const { status } = useSession();
  const t = useTranslations("Unsubscribe");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: proUser } = trpc.useQuery(["fs.stripe.proUser"], {
    enabled: status === "authenticated",
  });
  const [userId] = useRecoilState(userIdState);
  const [unsubscribeUser, setUnsubscribeUser] = useState(false);
  const [userInfo] = useRecoilState(resumeState);

  const { data: tokenCount } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userId, handle: userInfo.handle }],
    {
      enabled: status === "authenticated" && !!userInfo.id,
    }
  );

  const handleUnsubscribe = async () => {
    const isStripe = proUser?.paidBy === "Stripe";
    const apiEndpoint = isStripe
      ? "/api/cancel-subscription"
      : "/api/cancel-razorpay";
    const requestBody = isStripe
      ? {
          subscriptionId: proUser?.stripeSubscriptionId,
          client_reference_id: userId,
        }
      : { subscription_id: proUser?.stripeSubscriptionId, id: userId };

    try {
      await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      router.push("/pricing");
      toast.success(t("successfullyUnsubscribed"));
    } catch (error) {
      console.error(error);
    }
  };

  const loadPortal = async () => {
    setLoading(true);
    const resp = await fetch("/api/portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const { url, error } = await resp.json();
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    router.push(url);
  };

  const formattedDateWithComma = formatFirestoreTimestamp(
    proUser?.stripePeriodEnd as Timestamp | undefined
  );

  const getTotalTokens = (subscriptionPlan: number | undefined): number => {
    switch (subscriptionPlan) {
      case 500:
      case 430:
      case 600:
      case 700:
        return 15000;
      case 1500:
      case 1261.14:
      case 1800:
        return 25000;
      case 2100:
      case 1765.62:
      case 3000:
      case 3600:
      case 1806:
      case 2200:
        return 30000;
      case 8100:
      case 6810.18:
      case 5296:
      case 6300:
        return 40000;
      case 2522.28:
        return 60000;
      case 12000:
      case 10089.12:
      case 4500:
      case 5400:
      case 3354:
      case 4000:
        return 80000;
      case 9836:
      case 11600:
        return 100000;
      default:
        return 2500;
    }
  };

  const calculateTokenUsagePercentage = (
    tokenCount: number,
    totalTokens: number
  ): number => {
    return Number((100 - (tokenCount / totalTokens) * 100).toFixed(0));
  };

  const totalTokens = getTotalTokens(proUser?.purchasedPlan);
  const tokenUsagePercentage = calculateTokenUsagePercentage(
    tokenCount,
    totalTokens
  );
  const planTokensMap: { [key: number]: string } = {
    430: " / month",
    1261.14: " / month",
    1765.62: " / 6 months", // 5 usd
    6810.18: " / 6 months",
    2522.28: " / year",
    10089.12: " / year",
    4500: " / year",
    3000: " / 6 months", // inr
    3600: " / 6 months", // usd
    1806: " / 6 months", // usd
    5296: " / 6 months", // usd
    3354: " / year", // usd
    9836: " / year", // usd

    2200: " / 6 months",
    4000: " / year",

    6300: " / 6 months",
    11600: " / year",

    700: " / month",
    1800: " / month",

    2100: " / 6 months",
    8100: " / 6 months",
    500: " / month",
    600: " / month",
    1500: " / month",
    12000: " / year",
    5400: " / year", // usd
  };

  const purchasedPlanTokens = planTokensMap[proUser?.purchasedPlan!];

  return (
    <div
      className="w-full space-y-3 px-3 lg:p-8 min-h-[60vh]]"
      data-testid="unsubscribe"
    >
      <h2
        className="text-xl mt-6 lg:mt-0 text-gray-700 font-bold"
        data-testid="unSubscribeTitle"
      >
        {t("unSubscribe")}
      </h2>
      <p data-testid="unSubscribeCurrentPlan">{t("unsubscribeDescription")}</p>
      <div className="w-full rounded-2xl">
        <div className="md:py-[20px] gap-5 flex flex-col">
          {proUser?.subscriptionPlan &&
            proUser.stripeMembershipStatus === "Active" && (
              <div className="rounded-md bg-indigo-50 p-5">
                <div className="w-full mx-auto sm:p-4 space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h2 className="text-xl font-bold"> {t("planBilling")}</h2>
                      <p className="text-muted-foreground">{t("managePlan")}</p>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <div className="">
                        {proUser?.paidBy === "Razorpay" &&
                        proUser?.stripeUserSubscriptionStatus ===
                          "subscribed" ? (
                          <>
                            <div className="md:flex md:w-full justify-end lg:justify-start">
                              <button
                                onClick={() => {
                                  setUnsubscribeUser(true);
                                }}
                                className={`flex cursor-pointer bg-red-500 text-white text-sm items-center gap-1.5 font-medium py-2 px-3 rounded-md max-w-fit`}
                                data-testid="unSubButton"
                              >
                                <CreditCardIcon className="w-6 h-6" />
                                <span data-testid="unSubButtonText">
                                  {t("cancelSubscription")}
                                </span>
                              </button>
                            </div>
                            <DeleteModal
                              handleDelete={handleUnsubscribe}
                              open={unsubscribeUser}
                              setOpen={setUnsubscribeUser}
                              title={t("unSubscribe")}
                              deleteProfileMsg={t("unsubscribeMessage")}
                            />
                          </>
                        ) : (
                          <>
                            {proUser?.paidBy === "Stripe" &&
                              proUser.stripeMembershipStatus === "Active" && (
                                <button
                                  onClick={loadPortal}
                                  className="flex text-sm items-center gap-1.5 font-medium cursor-pointer bg-indigo-600 text-white py-2 px-3 rounded-md max-w-fit"
                                  disabled={loading}
                                >
                                  {loading ? (
                                    <span className="flex items-center space-x-1">
                                      <SpinnerIcon className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" />
                                      {t("Wait")}
                                    </span>
                                  ) : (
                                    <div className="flex gap-2 items-center">
                                      <CreditCardIcon className="w-6 h-6" />
                                      <span>{t("manageSubscription")}</span>
                                    </div>
                                  )}
                                </button>
                              )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {proUser?.paidBy === "Razorpay" &&
                    proUser?.stripeUserSubscriptionStatus ===
                      "unsubscribed" && (
                      <div className="flex flex-col gap-2 sm:flex-row w-full rounded-lg items-start sm:items-center bg-indigo-500 text-white px-6 py-3">
                        <div className="flex rounded-lg dark:bg-gray-600/30 bg-white text-indigo-600 p-2">
                          <AnnouncementSvg className="sm:h-5 h-4 w-4 sm:w-5" />
                        </div>
                        <p className="w-full font-medium dark:text-gray-200 text-sm md:text-base">
                          {t("cancelledMessage")}
                        </p>
                      </div>
                    )}
                  <div className="space-y-4">
                    <div className="">
                      <h2 className="text-lg font-bold">{t("currentPlan")}</h2>
                    </div>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <Card className="flex-1 pt-6">
                        <CardContent className="space-y-2">
                          <div className="flex space-x-2">
                            {proUser?.subscriptionPlan && (
                              <Badge className="capitalize font-bold bg-indigo-50 text-indigo-600">
                                {proUser?.subscriptionPlan} {t("plan")}
                              </Badge>
                            )}

                            <Badge className="capitalize bg-indigo-600 text-white">
                              {t("active")}
                            </Badge>
                          </div>
                          {proUser?.purchasedPlan &&
                            proUser?.stripePlanType && (
                              <p className="sm:text-2xl font-bold">
                                {currencySymbol}
                                {formatPurchasedPlan(
                                  proUser?.purchasedPlan,
                                  proUser?.paidBy
                                )}
                                {purchasedPlanTokens}
                                {/* {proUser?.stripePlanType.toLowerCase() ===
                                  "monthly" && "month"}
                                {proUser?.stripePlanType.toLowerCase() ===
                                  "annual" && "year"} */}
                              </p>
                            )}
                        </CardContent>
                      </Card>
                      {formattedDateWithComma !== "01 January, 1970" &&
                        formattedDateWithComma !== "" && (
                          <Card className="flex-1 pt-6">
                            <CardContent className="space-y-2">
                              <p className="text-muted-foreground">
                                {proUser?.stripeUserSubscriptionStatus ===
                                  "unsubscribed" &&
                                proUser?.stripeMembershipStatus === "Active"
                                  ? t("expiringOn")
                                  : t("RenewAt")}
                              </p>
                              <p className="sm:text-2xl font-bold">
                                {formattedDateWithComma}
                              </p>
                            </CardContent>
                          </Card>
                        )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold">{t("TokenUsage")}</h2>
                    <p className="text-muted-foreground">
                      {t("YourToken")}{" "}
                      {proUser?.stripePlanType?.toLowerCase() === "monthly"
                        ? "month"
                        : "year"}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <Card className="pt-5">
                        <CardContent className="space-y-3">
                          <div className="flex flex-col space-y-2 justify-between sm:flex-row">
                            <div className="flex items-center gap-2">
                              <DatabaseIcon className="h-6 w-6" />
                              <p className="text-muted-foreground">
                                {t("TokensLeft")}{" "}
                                {tokenCount && totalTokens && (
                                  <>
                                    (
                                    {totalTokens === tokenCount
                                      ? 0
                                      : tokenUsagePercentage}
                                    %)
                                  </>
                                )}
                              </p>
                            </div>
                            <p className="sm:text-xl font-bold">
                              {tokenCount} {t("outOf")} {totalTokens}
                            </p>
                          </div>
                          <Progress
                            value={
                              totalTokens === tokenCount
                                ? 0
                                : tokenUsagePercentage
                            }
                            className="w-full"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {proUser?.stripeUserSubscriptionStatus === "unsubscribed" &&
            proUser?.stripeMembershipStatus === "Inactive" && (
              <button
                onClick={() => {
                  router.push("/pricing");
                }}
              >
                <div className="flex items-center gap-2 cursor-pointer bg-indigo-500 text-white p-2 rounded-lg max-w-fit">
                  {t("subscribe")}
                </div>
              </button>
            )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Unsubscribe;
