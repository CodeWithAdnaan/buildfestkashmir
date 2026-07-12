import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { homeFaq } from "@/lib/constants/faq";

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="container-content">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <PillBadge dot={false} className="mb-4">
            QUESTIONS
          </PillBadge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Before you register.
          </h2>
        </Reveal>

        <Reveal>
          <div className="glass mx-auto max-w-[760px] rounded-2xl px-6 sm:px-8">
            <Accordion type="single" collapsible>
              {homeFaq.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
