import React, { useEffect, useState } from "react";
import { fetchPostJSON } from "@lib/stripe/helper";
import { useRouter } from "next/router";
import { resumeState } from "@state/state";
import {
  DesktopTierProps,
  LOCAL_SUBSCRIPTION_ID,
  MobileTierProps,
  comparingTimeZone,
  currencySymbol,
  handleNavigation,
  handleSubscriptionCheck,
  loadScript,
  priceToPlanMap,
  timeZone,
  isIndianTimeZone,
} from "@constants/defaults";
import { useTranslations } from "next-intl";
import {
  calculatePlanAndPriceId,
  frequencies,
  mailingLists,
} from "@constants/defaults";
import { useRecoilState } from "recoil";
import getStripe from "@lib/stripe";
import { useSession } from "next-auth/react";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "@utils/classNames";
import PaymentModal from "../paymentModal";
import { trpc } from "@utils/trpc";
import Modal from "../modal";
import { ToastContainer, toast } from "react-toastify";
import RazorPayLoadingModel from "../razorPayLoadingModel";
import PricingViewMobile from "./pricingViewMobile";
import PricingViewDesktop from "./pricingViewDesktop";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Tiers = ({ razorpayCustomerId }: { razorpayCustomerId: string }) => {
  const { data: session, status } = useSession();
  const { data: isPremiumMember } = trpc.useQuery(["fs.stripe.proUser"], {
    enabled: status === "authenticated",
  });

  const t = useTranslations("Pricing");
  const [userInfo] = useRecoilState(resumeState);
  const router = useRouter();
  const [frequency, setFrequency] = useState(frequencies[1]);
  const [loadingState, setLoadingState] = useState(false);
  const [selectedMailingLists, setSelectedMailingLists] = useState(
    mailingLists[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showAlertModal, setAlertModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState({
    order_id: "",
    price: "",
  });

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };

  const displayRazorpay = async (order_id: string, price: string) => {
    if (status === "unauthenticated") {
      return router.push("/auth/signin?redirect=/pricing");
    }

    setLoadingState(true);

    const selectedPrice = priceToPlanMap[price];

    const resp = await initializeRazorpay();
    if (!resp) {
      setLoadingState(false);
      return;
    }

    let customerID;

    if (razorpayCustomerId) {
      customerID = razorpayCustomerId;
    } else if (isPremiumMember?.stripeCustomerId) {
      if (typeof isPremiumMember.stripeCustomerId === 'string' && 
          isPremiumMember.stripeCustomerId.startsWith("cus_")) {
        customerID = "";
      } else {
        customerID = isPremiumMember.stripeCustomerId;
      }
    } else {
      customerID = "";
    }
    const response = await fetch("/api/razorpay_checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id: selectedPrice,
        total_count: 12,
        id: userInfo.id,
        name: userInfo.displayName,
        email: session?.user.email,
        contact: userInfo.phoneNumber,
        amount: price,
        customerId: customerID,
        paidBy: isPremiumMember?.paidBy,
      }),
    });

    const result = await response.json();

    if (response.ok && result.subscription) {
      setLoadingState(false);
      const subscriptionId = result.subscription.id;
      localStorage.setItem(
        LOCAL_SUBSCRIPTION_ID,
        JSON.stringify(subscriptionId)
      );
    } else {
      setLoadingState(false);
      console.error("Error creating subscription:", result.error);
    }

    let options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      plan_id: selectedPrice!,
      currency: "INR",
      name: "LeetCV",
      description: "ordered Items",
      subscription_id: result?.subscription?.id!,
      image: "https://www.leetcv.com/icon-284x284.png",
      prefill: {
        name: userInfo.displayName,
        email: session?.user?.email,
        contact: userInfo.phoneNumber,
      },
      notes: {
        address: `(${userInfo.id}) + ${userInfo.address}`,
      },
      theme: {
        color: "#4F45E4",
      },
      modal: {
        backdropclose: true,
        escape: true,
        handleback: true,
        confirm_close: true,
      },
      callback_url: `${window.location.origin}/api/razorpay_paymet`,
      redirect: true,
    };

    const paymentObject: any = new (window as any).Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response: any) {
      setLoadingState(false);
    });
    paymentObject.on("payment.success", function (response: any) {
      setLoadingState(false);
    });
    paymentObject.on("modal.close", function () {
      setLoadingState(false);
    });
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.integrity = "";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handleStripBuy = async (order_id: string, price: any) => {
    if (status === "unauthenticated") {
      return router.push("/auth/signin?redirect=/pricing");
    }

    const { plan } = calculatePlanAndPriceId(order_id, price);

    const response = await fetchPostJSON("/api/checkout_session", {
      client_reference_id: userInfo?.id,
      customer_email: session?.user?.email,
      metadata: { order_id, plan },
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const handleContinue = async () => {
    if (selectedMailingLists.id === 2) {
      const subscriptionId = isPremiumMember?.stripeSubscriptionId;
      if (subscriptionId) {
        const results = await handleSubscriptionCheck(
          "/api/stripe_check_subscription",
          subscriptionId
        );

        if (results.subscription === true) {
          setAlertModal(true);
          closeModal();
          return;
        }
      }
      handleStripBuy(selectedTier.order_id, selectedTier.price);
    } else if (selectedMailingLists.id === 1) {
      // Razorpay Payment Flow - Only for Indian region
      if (!isIndianTimeZone) {
        toast.error("Razorpay is only available for Indian users. Please use Stripe for international payments.");
        return;
      }

      if (userInfo.phoneNumber!.length < 5) {
        toast.error("Please enter a valid phone number in editor.");
        return;
      }

      const subscriptionId = isPremiumMember?.stripeSubscriptionId;
      if (subscriptionId) {
        const results = await handleSubscriptionCheck(
          "/api/razorpay_check_subscription",
          subscriptionId
        );

        if (results.subscription === true) {
          setAlertModal(true);
          closeModal();
          return;
        }
      }
      displayRazorpay(selectedTier.order_id, selectedTier.price);
    }
    closeModal();
  };

  const handleBuyPlan = async (tier: MobileTierProps | DesktopTierProps) => {
    if (status === "unauthenticated") {
      return handleNavigation("/pricing", status, router);
    }

    if (status === "authenticated") {
      // Check timezone for payment method
      const isInIndianRegion = isIndianTimeZone();

      const selectedPrice = tier.price[frequency.value as keyof typeof tier.price];

      if (isPremiumMember?.paidBy === "Stripe") {
        if (isPremiumMember?.stripeSubscriptionId) {
          const results = await handleSubscriptionCheck(
            "/api/stripe_check_subscription",
            isPremiumMember?.stripeSubscriptionId
          );

          if (results.subscription === true) {
            setAlertModal(true);
            return;
          }
        }
      } else if (isPremiumMember?.stripeSubscriptionId) {
        const res = await fetch("/api/razorpay_check_subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription_id: isPremiumMember?.stripeSubscriptionId,
            email: session?.user?.email,
            id: userInfo.id,
          }),
        });

        const results = await res.json();

        if (results.subscription === true) {
          setAlertModal(true);
          return;
        }
      }

      // Direct payment gateway selection based on timezone
      if (isInIndianRegion) {
        // For Indian users -> Use Razorpay
        displayRazorpay(tier.order_id, selectedPrice.toString());
      } else {
        // For non-Indian users -> Use Stripe
        const subscriptionId = isPremiumMember?.stripeSubscriptionId;
        if (subscriptionId) {
          const results = await handleSubscriptionCheck(
            "/api/stripe_check_subscription",
            subscriptionId
          );

          if (results.subscription === true) {
            setAlertModal(true);
            closeModal();
            return;
          }
        handleStripBuy(tier.order_id, selectedPrice);
      }
    }
    }
  };

  return (
    <div>
      <RazorPayLoadingModel open={loadingState} setOpen={setLoadingState} />
      <div className="mx-auto max-w-7xl lg:px-3 xl:px-4">
        <div className="mt-10 sm:mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-3 gap-x-1 rounded-full p-1.5 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked
                      ? "bg-indigo-600 text-white"
                      : "dark:text-gray-300 text-gray-500",
                    "cursor-pointer rounded-full px-2.5 py-1"
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <PricingViewMobile
          currencySymbol={currencySymbol}
          frequency={frequency}
          handleBuyPlan={handleBuyPlan}
        />
        <PricingViewDesktop
          currencySymbol={currencySymbol}
          frequency={frequency}
          handleBuyPlan={handleBuyPlan}
        />
      </div>
      <PaymentModal
        isOpen={isOpen}
        closeModal={closeModal}
        mailingLists={mailingLists}
        selectedMailingLists={selectedMailingLists}
        setSelectedMailingLists={setSelectedMailingLists}
        handleContinue={handleContinue}
      />
      {showAlertModal && (
        <Modal
          content={`${
            isPremiumMember?.paidBy === "Stripe"
              ? `Please upgrade your plan. Go to settings > Subscription`
              : t(`unsubscribeCurrentPlan`)
          }`}
          title={`${isPremiumMember?.stripePlanType} ${
            isPremiumMember?.subscriptionPlan!
              ? isPremiumMember?.subscriptionPlan
              : "Your"
          } ${t("planRunning")}`}
          isOpen={showAlertModal}
          closeModal={closeAlertModal}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Tiers;
