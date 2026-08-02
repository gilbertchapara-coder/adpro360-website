import type { Metadata } from "next";
import {
  Button,
  Container,
  Section,
  Card,
  Badge,
  Input,
  Textarea,
  Label,
  Link,
  Heading,
  Paragraph,
  IconWrapper,
  Divider,
} from "@/components/primitives";
import { SignatureAccent } from "@/components/shared/SignatureAccent";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function TokenProbe() {
  return (
    <main>
      <Section tone="midnight" paddingY="default">
        <Container>
          <Heading variant="eyebrow">Design system probe</Heading>
          <Heading as="h1" variant="display-hero" className="text-ivory">
            Proactive. <SignatureAccent dot>Never reactive.</SignatureAccent>
          </Heading>
          <Paragraph size="lede" tone="inverse-muted" className="max-w-copy">
            Every primitive rendered once, in every variant, so a broken token shows up here instead
            of on a real page later.
          </Paragraph>
          <Divider tone="ivory" className="my-s21" />
          <div className="gap-s09 flex flex-wrap">
            <Button tone="primary" size="lg">
              Book a consultation
            </Button>
            <Button tone="accent" size="lg">
              Accent CTA
            </Button>
            <Button tone="secondary-inverse" size="md">
              See the work
            </Button>
            <Button tone="ghost" size="sm">
              Ghost
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <Heading variant="h2">Section head</Heading>
          <Heading variant="h3" as="h3">
            Card title
          </Heading>
          <Paragraph size="base" tone="muted">
            Regular body copy in the muted tone.
          </Paragraph>
          <div className="mt-s21 gap-s09 flex flex-wrap">
            <Badge tone="teal">Positioning</Badge>
            <Badge tone="dark" size="md">
              Media Buying
            </Badge>
            <Badge tone="outline">Filter · idle</Badge>
          </div>
          <div className="mt-s21 gap-s09 flex flex-wrap">
            <IconWrapper size="sm">↗</IconWrapper>
            <IconWrapper size="md" tone="gradient">
              ↗
            </IconWrapper>
          </div>
          <Card surface="card" radius="2xl" padding="md" className="mt-s21">
            Card surface
          </Card>
          <Link href="/" variant="underline" className="mt-s21 inline-block">
            All services ↗
          </Link>
        </Container>
      </Section>

      <Section tone="midnight">
        <Container width="card">
          <Label htmlFor="probe-name">Name</Label>
          <Input id="probe-name" placeholder="Your name" />
          <Textarea placeholder="Brief" rows={4} className="mt-s09" />
        </Container>
      </Section>
    </main>
  );
}
