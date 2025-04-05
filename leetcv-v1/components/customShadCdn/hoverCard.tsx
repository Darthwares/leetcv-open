import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../shadcn/components/ui/hover-card";
import { Avatar, AvatarImage } from "../../shadcn/components/ui/avatar";
import { uniqueAvatar } from "@constants/defaults";
import RedirectUser from "@components/redirectUser";
interface HoverCardDemoProps {
  requests: any;
}

const HoverContainer = ({ requests }: HoverCardDemoProps) => {
  const uniqueImage = uniqueAvatar(requests);

  return (
    <div>
      <HoverCard openDelay={0} closeDelay={1} defaultOpen={true}>
        <div className="flex -space-x-2">
          {uniqueImage?.slice(0, 5)?.map((request: any) => (
            <HoverCard key={request.id}>
              <HoverCardTrigger asChild className="">
                <Avatar>
                  <AvatarImage src={request.image} />
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="w-60 max-w-fit bg-white p-3 relative left-24">
                <div className="flex gap-2 ">
                  <Avatar>
                    <AvatarImage src={request.image} className="w-10 h-10" />
                  </Avatar>
                  <div className="space-y-1">
                    <RedirectUser
                      handle={request?.requesterHandle}
                      username={request?.username}
                    />
                    <p className="text-xs text-gray-500">
                      {request.requesterPosition}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </HoverCard>
    </div>
  );
};

export default HoverContainer;
