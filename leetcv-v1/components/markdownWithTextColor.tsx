import React from "react";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
interface ChildNodeProps {
  children: React.ReactNode;
}

const CustomParagraph = ({ children }: ChildNodeProps) => {
  return (
    <p className="px-1 sm:px-0 print:leading-3 tracking-wide text-sm last:mb-0">
      {children}
    </p>
  );
};

const CustomList = ({ children }: ChildNodeProps) => {
  return (
    <ul className="mb-2 last:mb-0">
      <li className="print:leading-4 tracking-wide text-sm">{children}</li>
    </ul>
  );
};

const CustomStrong = ({ children }: ChildNodeProps) => {
  return <strong className="font-medium text-gray-700">{children}</strong>;
};

const CustomEmphasis = ({ children }: ChildNodeProps) => {
  return (
    <em
      // className="text-gray-600 from-indigo-400 to-pink-500 bg-gradient-to-r bg-clip-text text-transparent"
      className="text-gray-900 font-semibold"
    >
      {children}
    </em>
  );
};
interface MarkdownWithTextColorProps {
  content: string;
}

const MarkdownWithTextColor = ({ content }: MarkdownWithTextColorProps) => {
  return (
    <MemoizedReactMarkdown
      className="prose break-words text-[16px] markdown-color dark:prose-invert text-gray-700 prose-p:leading-relaxed prose-pre:p-0"
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p: CustomParagraph,
        li: CustomList,
        strong: CustomStrong,
        em: CustomEmphasis,
      }}
    >
      {content}
    </MemoizedReactMarkdown>
  );
};

export default MarkdownWithTextColor;
