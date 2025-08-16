import { Booth } from "@workspace/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import BoothCard from "./booth-card";

export default function OwnedBooths({
  booths,
  handleBoothChange,
}: {
  booths?: Booth[];
  handleBoothChange: (booth: Booth) => void;
}) {
  return (
    <Accordion type="single" className="mx-5 border-b" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center h-20 cursor-pointer">
          <div className="text-2xl hover:outline-none hover:border-0">👨‍💻</div>
          <div>Owned Booths</div>
        </AccordionTrigger>
        <AccordionContent>
          {booths?.map((booth) => {
            return (
              <BoothCard
                selectedBooth={booth}
                type={"OWNED"}
                handleBoothChange={handleBoothChange}
              />
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
