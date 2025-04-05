import { HandsOutline } from "@components/clapSvg";
import {
  BookmarkAltIcon,
  CheckIcon,
  ChevronRightIcon,
  LockClosedIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { classNames } from "@utils/classNames";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import { Button } from "shadcn/components/ui/button";
import { Card } from "shadcn/components/ui/cards";
import { Progress } from "shadcn/components/ui/progress";
import Feedback from "@components/home/feedback";

export default function LeetLingo() {
  return (
    <div className="max-w-7xl mx-auto">
    </div>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
