"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  Heading,
  Button,
  Input,
  Textarea,
  Label,
  Container,
  Section,
} from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SignatureAccent } from "@/components/shared/SignatureAccent";
import { cn } from "@/lib/utils/cn";
import { site, services } from "@/lib/content";

/** Direct-contact column stays visually tertiary to the form — CD review:
 * "form and contact details compete for attention... details tertiary." */
function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  // mailto:/tel: hand off to a native app on the same tab, nothing to
  // protect against; an http(s) href (WhatsApp) actually navigates the
  // browser to a third-party origin, so it gets the standard
  // target="_blank" + rel="noopener noreferrer" treatment.
  const isExternal = href?.startsWith("http");
  return (
    <div>
      <div className="tracking-eyebrow-2 text-ivory/40 mb-s03 text-xs font-bold uppercase">
        {label}
      </div>
      {href ? (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="ease-signature text-ivory/85 hover:text-teal-bright text-base font-semibold transition-colors duration-[var(--duration-base)]"
        >
          {value}
        </a>
      ) : (
        <div className="text-ivory/85 text-base font-semibold">{value}</div>
      )}
    </div>
  );
}

/** Small red asterisk after a required field's label — visible indicator to
 * match the `required`/`aria-required` attributes, not just an invisible
 * HTML validation state. */
function RequiredMark() {
  return (
    <span className="text-error ml-s02" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-error mt-s05 text-sm">
      {message}
    </p>
  );
}

type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Real business details from lib/content/site.ts, plus a real form that
 * posts to app/api/contact/route.ts (Resend). Replaced the earlier
 * mailto: fallback — that silently lost the lead for anyone without a
 * configured mail client, which isn't acceptable for a form whose entire
 * job is capturing leads.
 *
 * Validation is hand-rolled rather than left to the browser's native
 * bubble: native validation UI isn't reliably announced by screen readers
 * and gives no persistent, visible error text. `--color-error` was already
 * defined in the token system for exactly this (added in an earlier
 * accessibility pass on the source) but had never been wired up. The same
 * validation runs again server-side — client-side alone is a UX nicety,
 * never a trust boundary.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | undefined>();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  /** Honeypot — real visitors never see or reach this field (visually
   * hidden, `aria-hidden`, out of tab order). A bot that fills every input
   * it can find will fill this one too; app/api/contact/route.ts silently
   * no-ops the send when it's non-empty. */
  const honeypotRef = useRef<HTMLInputElement>(null);

  const toggleNeed = (title: string) => {
    setNeeds((current) =>
      current.includes(title) ? current.filter((n) => n !== title) : [...current, title]
    );
  };

  const validateField = (field: keyof FieldErrors, value: string): string | undefined => {
    if (field === "name") return value.trim() ? undefined : "Let us know who this is from.";
    if (field === "email") {
      if (!value.trim()) return "We need an email to reply to.";
      if (!EMAIL_PATTERN.test(value.trim())) return "That email doesn’t look complete.";
      return undefined;
    }
    return value.trim() ? undefined : "Tell us what you’re trying to move.";
  };

  /** Validates once the visitor leaves a field — CD review: "add... inline
   * validation" — rather than only surfacing errors on submit. */
  const handleBlur = (field: keyof FieldErrors, value: string) => {
    setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
  };

  const validate = (): FieldErrors => ({
    name: validateField("name", name),
    email: validateField("email", email),
    message: validateField("message", message),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return; // guards against a double-click firing two sends

    const nextErrors = validate();
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (nextErrors.message) {
      messageRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setServerError(undefined);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          needs,
          company: honeypotRef.current?.value ?? "",
        }),
      });

      const payload: { ok?: boolean; error?: string; errors?: FieldErrors } | null = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        if (payload?.errors) {
          setErrors(payload.errors);
        } else {
          setServerError(payload?.error ?? "Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("Couldn’t reach the server — check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <Section tone="midnight" paddingY="none" className="pb-section-y-lg pt-0">
      <Container className="gap-split-gap grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal>
          <form onSubmit={handleSubmit} noValidate className="gap-s18 grid">
            <div
              className="absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)]"
              aria-hidden="true"
            >
              <label htmlFor="contact-company">Company</label>
              <input
                ref={honeypotRef}
                id="contact-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <Label htmlFor="contact-name">
                Name
                <RequiredMark />
              </Label>
              <Input
                ref={nameRef}
                id="contact-name"
                name="name"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={(event) => handleBlur("name", event.target.value)}
                placeholder="Your name"
                className={cn("mt-s07", errors.name && "border-error")}
              />
              <FieldError id="contact-name-error" message={errors.name} />
            </div>

            <div>
              <Label htmlFor="contact-email">
                Email
                <RequiredMark />
              </Label>
              <Input
                ref={emailRef}
                id="contact-email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={(event) => handleBlur("email", event.target.value)}
                placeholder="you@company.com"
                className={cn("mt-s07", errors.email && "border-error")}
              />
              <FieldError id="contact-email-error" message={errors.email} />
            </div>

            <fieldset>
              <Label as="legend" className="p-0">
                What do you need?
              </Label>
              <div
                role="group"
                aria-label="What do you need"
                className="gap-s09 mt-s09 flex flex-wrap"
              >
                {services.map((service) => {
                  const active = needs.includes(service.title);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleNeed(service.title)}
                      aria-pressed={active}
                      className="group -m-[6px] p-[6px]"
                    >
                      <span
                        className={cn(
                          "ease-signature rounded-pill px-s13 py-s07 text-eyebrow tracking-eyebrow-2 block font-bold uppercase transition-[background-color,color,box-shadow] duration-[var(--duration-moderate)]",
                          active
                            ? "bg-teal shadow-glow text-white"
                            : "border-ivory/22 text-ivory/70 group-hover:border-ivory/40 border"
                        )}
                      >
                        {service.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <Label htmlFor="contact-message">
                Brief
                <RequiredMark />
              </Label>
              <Textarea
                ref={messageRef}
                id="contact-message"
                name="message"
                required
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onBlur={(event) => handleBlur("message", event.target.value)}
                placeholder="Tell us what you’re trying to move."
                className={cn("mt-s07", errors.message && "border-error")}
              />
              <FieldError id="contact-message-error" message={errors.message} />
            </div>

            <div className="mt-s07 gap-s16 flex flex-wrap items-center">
              <Button
                type="submit"
                tone="accent"
                size="lg"
                disabled={status === "submitting"}
                className="justify-self-start"
              >
                {status === "submitting" ? "Sending…" : "Send the brief ↗"}
              </Button>
              {status === "success" ? (
                <span role="status" className="gap-s06 text-teal-bright inline-flex items-center text-sm font-semibold">
                  <span aria-hidden="true">✓</span>
                  Sent — we’ll reply within one working day.
                </span>
              ) : status === "error" ? (
                <span role="alert" className="text-error text-sm">
                  {serverError}
                </span>
              ) : (
                <span className="gap-s06 text-ivory/50 inline-flex items-center text-sm">
                  <span className="rounded-pill bg-teal size-[6px] animate-[ap-pulse_2.6s_ease-in-out_infinite]" />
                  We reply within one working day
                </span>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal delay={80}>
          <div className="border-ivory/14 pt-s24 gap-s21 grid border-t lg:border-t-0 lg:border-l lg:pt-0 lg:pl-s26">
            <Heading variant="eyebrow" as="div" className="text-ivory/58">
              Direct
            </Heading>
            <ContactRow label="Email" value={site.email} href={site.emailHref} />
            <ContactRow label="Phone" value={site.phone} href={site.phoneHref} />
            <ContactRow label="WhatsApp" value="Message us" href={site.whatsappHref} />
            <ContactRow
              label="Studio"
              value={`${site.address.line1}, ${site.address.line2}`}
            />
            <p className="border-ivory/14 mt-s09 pt-s21 text-sm-plus tracking-tight-2 text-ivory/70 border-t font-light text-pretty">
              <SignatureAccent dot>Proactive.</SignatureAccent> We&rsquo;ll tell you honestly if
              we&rsquo;re not the right fit.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
