import {
  comparingTimeZone,
  DesktopTierProps,
  Frequency,
  pricingOptionsLgDevices,
} from "@constants/defaults";
import { CheckIcon, MinusIcon } from "@heroicons/react/solid";
import { classNames } from "@utils/classNames";
import { useTranslations } from "next-intl";
import React from "react";

type PricingViewDesktopProps = {
  currencySymbol: string;
  frequency: Frequency;
  handleBuyPlan: (tier: DesktopTierProps) => void;
};

const PricingViewDesktop = ({
  currencySymbol,
  frequency,
  handleBuyPlan,
}: PricingViewDesktopProps) => {
  const t = useTranslations("Pricing");
  const pricingOptions = pricingOptionsLgDevices(t);

  const getTokenDisplay = (feature: any) => {
    if (feature.name === t("tokensToUseAiFeatures") && feature.tokens) {
      return (
        feature.tokens[frequency.value as keyof typeof feature.tokens] ||
        feature.included
      );
    }
    return feature.included;
  };

  return (
    <div className="bg-white py-4 hidden lg:block">
      <div className="mx-auto w-full">
        <div className="isolate mt-10">
          <div className="relative -mx-8">
            {pricingOptions.some((option) => option.popular) ? (
              <div className="absolute inset-x-4 inset-y-0 -z-10 flex border border-gray-900/10">
                <div
                  className="flex w-1/4 px-4"
                  aria-hidden="true"
                  style={{
                    marginLeft: `${
                      (pricingOptions.findIndex((option) => option.popular) +
                        1) *
                      25
                    }%`,
                  }}
                >
                  <div className="w-full rounded-t-xl" />
                </div>
              </div>
            ) : null}
            <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <thead>
                <tr>
                  <th scope="col" className="lg:px-5 xl:px-6 xl:pt-6">
                    <span className="sr-only">Feature</span>
                  </th>
                  {pricingOptions.map((option) => (
                    <th
                      key={option.title}
                      scope="col"
                      className="lg:px-5 xl:px-8 pt-6 pb-2 "
                    >
                      <div className="text-sm flex justify-between items-center font-semibold leading-7 text-gray-900">
                        <span>{option.title}</span>
                        {option.popular && (
                          <span className="bg-indigo-50 rounded-full text-indigo-500 text-xs px-2 py-1">
                            {t("mostPopular")}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="sr-only">
                    Price
                  </th>
                  {pricingOptions.map((option) => (
                    <td key={option.title} className="lg:px-5 xl:px-8 pt-2">
                      {option.title !== "Free" ? (
                        <div className="space-y-1">
                          <div className="flex items-baseline space-x-1 text-gray-900  py-2">
                            {frequency.value === "annually" ? (
                              <>
                                <span className="text-3xl font-semibold">
                                  {currencySymbol}
                                  {(
                                    Number(
                                      option.price[
                                        frequency.value as keyof typeof option.price
                                      ]
                                    ) * 12
                                  ).toFixed(0)}
                                </span>
                                <span className="text-sm font-semibold leading-6 pl-0.5">
                                  /year
                                </span>
                              </>
                            ) : frequency.value === "semiAnnually" ? (
                              <>
                                <span className="text-3xl font-semibold">
                                  {currencySymbol}
                                  {(
                                    Number(
                                      option.price[
                                        frequency.value as keyof typeof option.price
                                      ]
                                    ) * 6
                                  ).toFixed(0)}
                                </span>
                                <span className="text-sm font-semibold leading-6 pl-0.5">
                                  /6 months
                                </span>
                              </>
                            ) : null}
                          </div>
                          <div className="flex items-baseline gap-x-1 text-gray-900">
                            <span
                              className={`${
                                frequency.value === "monthly"
                                  ? "text-3xl"
                                  : "text-base text-gray-500"
                              } font-bold`}
                            >
                              {currencySymbol}
                              {Number(
                              option.price[
                                  frequency.value as keyof typeof option.price
                                ]
                              )}
                              <span className="text-sm font-semibold leading-6 pl-0.5">
                                {frequency.priceSuffix}
                              </span>
                            </span>
                          </div>

                          {(frequency.value === "annually" ||
                            frequency.value === "semiAnnually") &&
                            option.percentageSaved && (
                              <div className="flex justify-end">
                                <p className="text-green-500 text-xs font-medium bg-green-100 rounded-full px-2 py-1.5 mt-1">
                                  {t("save")}{" "}
                                  {frequency.value === "semiAnnually"
                                    ? option.percentageSaved.semiAnnually
                                    : option.percentageSaved.annually}
                                  %
                                </p>
                              </div>
                            )}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          {t("accessProFeature")}.
                        </p>
                      )}
                      {option.title !== "Free" && (
                        <button
                          onClick={() => handleBuyPlan(option)}
                          className={classNames(
                            option.popular
                              ? "bg-indigo-600 text-white hover:bg-indigo-500"
                              : "text-indigo-600 ring-1 ring-inset hover:ring-0 hover:text-white hover:bg-indigo-600 ring-indigo-200 hover:ring-indigo-300",
                            "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 w-full focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 mb-2"
                          )}
                        >
                          {t("buyPlan")}
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
                {pricingOptions[0].features.map((feature, featureIdx) => (
                  <tr key={feature.name}>
                    <th
                      scope="row"
                      className="py-4 pl-8 text-sm font-normal leading-6 text-gray-900"
                    >
                      {feature.name}
                      <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                    </th>
                    {pricingOptions.map((option) => (
                      <td key={option.title} className="px-6 py-4 xl:px-8">
                        {typeof option.features[featureIdx].included ===
                        "string" ? (
                          <div className="text-center text-sm leading-6 text-gray-500">
                            {getTokenDisplay(option.features[featureIdx])}
                          </div>
                        ) : (
                          <>
                            {option.features[featureIdx].included === true ? (
                              <CheckIcon
                                className="mx-auto h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : (
                              <MinusIcon
                                className="mx-auto h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            )}
                            <span className="sr-only">
                              {option.features[featureIdx].included === true
                                ? "Included"
                                : "Not included"}{" "}
                              in {option.title}
                            </span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingViewDesktop;
