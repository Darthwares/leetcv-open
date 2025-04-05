import DescList from "@components/descList";
import SocialMediaHeader from "./socialMediaHeader";
import SocialMediaSection from "./socialMediaSection";

export default function SocialMediaDetails() {
  return (
    <section id="socialMedia" data-testid="socialMediaDetails">
      <DescList>
        <SocialMediaHeader />
        <SocialMediaSection />
      </DescList>
    </section>
  );
}
