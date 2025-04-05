import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef } from "react";
import { Badge } from "shadcn/components/ui/badge";
import { Button } from "shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "shadcn/components/ui/cards";
import { Input } from "shadcn/components/ui/input";
import { Label } from "shadcn/components/ui/label";
import { ScrollArea } from "shadcn/components/ui/scroll-area";

interface EnterTopicProps {
  filteredSkills: string[];
  selectedSkill: string;
  handleSkillClick: (skill: string) => void;
  topic: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  previousStep: () => void;
  handleStartInterview: () => void;
}

const EnterTopic: React.FC<EnterTopicProps> = ({
  filteredSkills,
  selectedSkill,
  handleSkillClick,
  topic,
  handleInputChange,
  isLoading,
  previousStep,
  handleStartInterview,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });



  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollRef]);

  return (
    <div ref={scrollRef} className="pt-20">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900 dark:to-pink-900 p-6 items-center justify-center hidden sm:flex">
            <lottie-player
              src="/assets/lottie/select-topic.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              style={{ width: "100%", maxWidth: "400px", aspectRatio: "1" }}
            ></lottie-player>
          </div>
          <CardContent className="p-6 relative">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                Enter Your Interview Topic
              </CardTitle>
            </CardHeader>
            <ScrollArea
              className={`${filteredSkills.length == 0 ? "h-[120px]" : "h-[280px]"
                } pr-4 mb-6`}
            >
              {filteredSkills.length == 0 ? null : (
                <div className="mb-5">
                  <p className="font-semibold text-slate-600 mb-4 text-xl">
                    Recommended Topics
                  </p>
                  <div className="recommendations flex gap-2 flex-wrap">
                    {filteredSkills.map((skill: string) => {
                      const isSelected = selectedSkill === skill;
                      return (
                        <Badge
                          key={skill}
                          onClick={() => handleSkillClick(skill)}
                          variant="outline"
                          className={`text-muted-foreground cursor-pointer border border-gray-300 px-3 py-2 ${isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-transparent"
                            }`}
                        >
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </ScrollArea>
            <div className="">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="topic">Enter Topic Name</Label>
                <Input
                  type="text"
                  className="w-full p-2 px-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-sm transition duration-300 mb-4"
                  placeholder="Ex - Artificial Intelligence, Python etc."
                  value={topic}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-between pt-5 gap-4">
                <Button
                  className={`${isLoading ? "cursor-not-allowed bg-indigo-300" : ""
                    } text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5`}
                  onClick={previousStep}
                  disabled={isLoading}
                >
                  <ChevronLeftIcon className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleStartInterview}
                  disabled={isLoading || !topic}
                  className={`text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 ${!topic || isLoading
                    ? "cursor-not-allowed bg-indigo-300"
                    : ""
                    }`}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      Next
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
                <span className="text-red-500">
                  Note<sup>*</sup>
                </span>
                - Once Interview started you cannot go back and change the
                topic.{" "}
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default EnterTopic;
