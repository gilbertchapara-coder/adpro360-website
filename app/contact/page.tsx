import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildPageMetadata } from "@/lib/utils/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Tell AdPro 360 what you’re trying to move — one conversation, no deck required.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
