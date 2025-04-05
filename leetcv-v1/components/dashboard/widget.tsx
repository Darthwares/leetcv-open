import { useTranslations } from "next-intl";
import React from "react";

const Widget = ({ widgetElement }: any) => {
  const t = useTranslations("DashboardWidget");

  return (
    <>
      {widgetElement?.map((card: any, id: number) => (
        <div
          key={card.name}
          data-testid={`actions-${id}`}
          className="overflow-hidden rounded-lg p-4 md:p-6 dark:bg-gray-800/30 bg-white shadow border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <card.icon
                data-testid="icon"
                className={`text-indigo-400 dark:text-indigo-600 w-12 h-12 md:h-14 md:w-14 ${card.rotate} `}
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1 dark:text-white text-gray-900">
              <dl>
                <dt className="truncate text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                  <span data-testid="cardName">{card.name}</span>
                  <div className="flex items-center space-x-3">
                    {card.new && (
                      <span className="inline-flex items-center rounded-full px-2 py-1 bg-indigo-600 text-xs font-medium text-white">
                        {t("new")}
                      </span>
                    )}
                  </div>
                </dt>
                
                <dd>
                  <div
                    className="text-2xl md:text-4xl font-medium dark:text-white text-gray-900"
                    data-testid="cardCount"
                  >
                    {card?.count}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <p
            className={`font-medium text-gray-500 dark:text-gray-300 ${card.style} mt-3 md:mt-3.5`}
            data-testid="cardDescription"
          >
            {card.description}
          </p>
          <div className={`${card.disabled}`}>
            <div
              className={`${
                card.actionButton && "mt-4 flex gap-10 items-center"
              } ${card.actionButtonTwo && "mt-4"} text-sm`}
            >
              <a
                onClick={() => {
                  card.actionButtonPath();
                }}
                className="brand-grad-link"
                data-testid="cardLink"
              >
                {card.actionButton}
              </a>
              {card.actionButtonTwo && (
                <a
                  onClick={() => {
                    card.actionButtonTwoPath();
                  }}
                  className="brand-grad-link"
                  data-testid="cardLink"
                >
                  {card.actionButtonTwo}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
      
    </>
  );
};

export default Widget;