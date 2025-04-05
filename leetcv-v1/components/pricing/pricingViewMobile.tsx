import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { useTranslations } from "next-intl";
import {
  comparingTimeZone,
  Frequency,
  MobileTierProps,
  showPricingInfo,
} from "@constants/defaults";
import { classNames } from "@utils/classNames";

type PricingViewMobileProps = {
  currencySymbol: string;
  frequency: Frequency;
  handleBuyPlan: (tier: MobileTierProps) => void;
};

const PricingViewMobile = ({
  frequency,
  currencySymbol,
  handleBuyPlan,
}: PricingViewMobileProps) => {
  const t = useTranslations("Pricing");
  const tiers = showPricingInfo(t);
  const [selectedPricing, setSelectedPricing] = useState<string>(
    t("premiumPlanType")
  );

  const handleSelect = (id: string) => {
    const selected = tiers.find((tier) => tier.id === id);
    if (selected) {
      setSelectedPricing(selected?.id);
    }
  };

  const getTokenFeature = (tier: MobileTierProps) => {
    if (tier.id === t("tierFree")) {
      return "2,500 tokens";
    }

    const tokenCount =
      tier.tokens?.[frequency.value as keyof typeof tier.tokens];
    return tokenCount ? `${Number(tokenCount).toLocaleString()} tokens` : "";
  };

  const getAllFeatures = (tier: MobileTierProps) => {
    const tokenFeature = getTokenFeature(tier);
    const filteredFeatures = tier.features.filter(
      (feature) => !feature.toLowerCase().includes("token")
    );
    return [...filteredFeatures, tokenFeature].filter(Boolean);
  };

  return (
    <div className="isolate lg:hidden mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          onClick={() => handleSelect(tier.id)}
          className={classNames(
            selectedPricing === tier.id
              ? "ring-2 ring-indigo-600 border border-transparent"
              : "border border-gray-300 ring-2 ring-transparent",
            "rounded-3xl p-8 xl:p-10 cursor-pointer"
          )}
        >
          <div className="flex items-center justify-between gap-x-4">
            <h3
              id={tier.id}
              className={classNames(
                selectedPricing === tier.id
                  ? "text-indigo-600"
                  : "text-gray-900 dark:text-gray-100",
                "text-lg font-semibold leading-8"
              )}
            >
              {tier.name}
            </h3>
            {tier.mostPopular ? (
              <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                {t("mostPopular")}
              </p>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-6 dark:text-gray-100 text-gray-600">
            {tier.description}
          </p>
          <div className="space-y-1">
            {(frequency.value === "annually" ||
              frequency.value === "semiAnnually") &&
              tier.percentageSaved && (
                <div className="flex justify-end">
                  <p className="text-green-500 text-xs font-medium bg-green-100 rounded-full px-2 py-1.5 my-2">
                    {t("save")}{" "}
                    {frequency.value === "annually"
                      ? tier.percentageSaved?.annually
                      : tier.percentageSaved?.semiAnnually}
                    %
                  </p>
                </div>
              )}
            <div className="flex items-center space-x-1 text-gray-900  py-2">
              {frequency.value === "annually" ? (
                <>
                  <span className="text-3xl font-semibold">
                    {tier.name !== t("free") && currencySymbol}
                    {tier.name !== t("free") &&
                      (
                        Number(
                          tier.price[frequency.value as keyof typeof tier.price]
                        ) * 12
                      ).toFixed(0)}
                  </span>
                  {tier.name !== t("free") && (
                    <span className="text-sm text-gray-500">/year</span>
                  )}
                </>
              ) : frequency.value === "semiAnnually" ? (
                <>
                  <span className="text-3xl font-semibold">
                    {tier.name !== t("free") && currencySymbol}
                    {tier.name !== t("free") &&
                      (
                        Number(
                          tier.price[frequency.value as keyof typeof tier.price]
                        ) * 6
                      ).toFixed(0)}
                  </span>
                  {tier.name !== t("free") && (
                    <span className="text-sm text-gray-500">/6 months</span>
                  )}
                </>
              ) : null}
            </div>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span
                className={`${
                  frequency.value === "monthly"
                    ? "text-3xl"
                    : "text-base text-gray-500"
                } font-bold`}
              >
                {tier.name !== t("free") && currencySymbol}
                {tier.price[frequency.value as keyof typeof tier.price]}
              </span>
              <span className="text-sm font-semibold leading-6 dark:text-gray-100 text-gray-600">
                {tier.name === t("free") ? (
                  <span className="text-4xl font-bold tracking-tight dark:text-gray-100 text-gray-900">
                    {t("free")}
                  </span>
                ) : (
                  frequency.priceSuffix
                )}
              </span>
            </p>
          </div>
          {tier.name !== t("free") && (
            <button
              onClick={() => handleBuyPlan(tier)}
              aria-describedby={tier.id}
              className={classNames(
                selectedPricing === tier.id
                  ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                  : "hover:text-white text-indigo-600 border border-gray-300 hover:bg-indigo-600 dark:text-gray-100",
                "mt-6 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              )}
            >
              {t("buyPlan")}
            </button>
          )}
          <ul className="mt-8 space-y-3 text-sm leading-6 dark:text-gray-100 text-gray-600 xl:mt-10">
            {getAllFeatures(tier).map((feature) => (
              <li key={feature} className="flex text-left gap-x-3">
                <CheckIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingViewMobile;
