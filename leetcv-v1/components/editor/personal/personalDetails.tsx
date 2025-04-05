import DescList from "@components/descList";
import ProfessionList from "../profession/professionList";
import PersonalDetailsHeader from "./PersonalDetailsHeader";
import PersonalList from "./personalList";

export default function PersonalDetails() {
  return (
    <section id="#personaldetails" data-testid="descList">
      <DescList>
        <PersonalDetailsHeader />
        <PersonalList />
        <ProfessionList />
      </DescList>
    </section>
  );
}
