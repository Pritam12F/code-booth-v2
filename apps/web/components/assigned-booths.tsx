import { Booth } from "@workspace/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import BoothCard from "./booth-card";

export default function AssignedBooths({
  booths,
  changeBoothHanlder,
}: {
  booths?: Booth[];
  changeBoothHanlder: (booth: Booth) => void;
}) {
  return (
    <Accordion type="single" className="mx-5" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center h-20 cursor-pointer">
          <div className="text-2xl hover:outline-none hover:border-0">✅</div>
          <div>Assigned Booths</div>
        </AccordionTrigger>
        <AccordionContent>
          {booths?.map((booth) => {
            return (
              <BoothCard
                selectedBooth={booth}
                type={"ASSIGNED"}
                handleBoothChange={changeBoothHanlder}
              />
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
