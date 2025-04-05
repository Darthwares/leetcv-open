import LanguageHeader from "./languageHeader";
import LanguageSection from "./languageSection";

export default function LanguageDetails() {
  return (
    <div data-testid="languageDetails" id="languages">
      <LanguageHeader />
      <LanguageSection />
    </div>
  );
}
