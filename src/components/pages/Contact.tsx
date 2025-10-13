import { useState } from "react";
import Section from "../ui/Section";
import { colors } from "../../data/content";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

const FORMSPREE_ID = ""; // Ajoute ton ID Formspree si tu en utilises un.

export default function Contact() {
  const { profile, labels } = usePortfolioContent();

  return (
    <Section title={labels.contact.title} subtitle={labels.contact.subtitle}>
      <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-slate-100">
              {labels.contact.headline}
            </h3>
            <p className="mt-2 max-w-prose text-sm text-zinc-700 dark:text-slate-300">
              {labels.contact.intro}
            </p>
            <div className="mt-4 rounded-xl bg-white/70 p-4 ring-1 ring-dashed ring-violet-400 dark:bg-slate-900/60 dark:ring-violet-500/60">
              <span className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">
                {labels.contact.searchTitle}
              </span>
              <p className="mt-1 text-sm text-zinc-700 dark:text-slate-300">
                {labels.contact.searchBody}
              </p>
            </div>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className={`rounded-xl bg-white px-3 py-2 font-medium ring-1 ring-zinc-200 dark:bg-slate-900 dark:ring-slate-700 ${colors.ring}`}
                aria-label={`${labels.contact.emailLink} ${profile.name}`}
              >
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replaceAll(" ", "")}`}
                className={`rounded-xl bg-white px-3 py-2 font-medium ring-1 ring-zinc-200 dark:bg-slate-900 dark:ring-slate-700 ${colors.ring}`}
                aria-label={`${labels.contact.phoneLink} ${profile.phone}`}
              >
                {profile.phone}
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200 dark:bg-slate-900 dark:ring-slate-700">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactForm() {
  const { profile, labels } = usePortfolioContent();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    if (!data.name || !data.email || !data.message) return;

    if (FORMSPREE_ID) {
      try {
        setStatus("sending");
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
        });
        if (res.ok) {
          setStatus("ok");
          setMessage(labels.contactForm.success);
          (e.currentTarget as HTMLFormElement).reset();
        } else {
          const json = await res.json();
          setStatus("error");
          setMessage(json?.error || labels.contactForm.error);
        }
      } catch {
        setStatus("error");
        setMessage(labels.contactForm.fallback);
      }
    } else {
      const subject = String(data.subject) || labels.contactForm.subjectPlaceholder;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `${String(data.message)}\n\n- ${String(data.name)} <${String(data.email)}>`
      )}`;
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <label
          className="flex flex-col gap-1 text-sm font-medium text-zinc-700 dark:text-slate-200"
          htmlFor="contact-name"
        >
          {labels.contactForm.name}
          <input
            id="contact-name"
            name="name"
            required
            placeholder={labels.contactForm.name}
            className={`h-10 rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`}
          />
        </label>
        <label
          className="flex flex-col gap-1 text-sm font-medium text-zinc-700 dark:text-slate-200"
          htmlFor="contact-email"
        >
          {labels.contactForm.email}
          <input
            id="contact-email"
            name="email"
            required
            type="email"
            placeholder={labels.contactForm.email}
            className={`h-10 rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`}
          />
        </label>
      </div>
      <label
        className="flex flex-col gap-1 text-sm font-medium text-zinc-700 dark:text-slate-200"
        htmlFor="contact-subject"
      >
        {labels.contactForm.subject}
        <input
          id="contact-subject"
          name="subject"
          placeholder={labels.contactForm.subjectPlaceholder}
          className={`h-10 w-full rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`}
        />
      </label>
      <label
        className="flex flex-col gap-1 text-sm font-medium text-zinc-700 dark:text-slate-200"
        htmlFor="contact-message"
      >
        {labels.contactForm.message}
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder={labels.contactForm.messagePlaceholder}
          className={`w-full rounded-md border p-3 outline-none focus:ring-2 ${colors.ring}`}
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className={`w-full rounded-xl bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-4 py-2 font-semibold text-white shadow-sm disabled:opacity-60`}
      >
        {status === "sending" ? labels.contactForm.submitSending : labels.contactForm.submitIdle}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`text-sm ${
          status === "ok"
            ? "text-emerald-600"
            : status === "error"
              ? "text-red-600"
              : "text-zinc-500 dark:text-slate-500"
        }`}
      >
        {status !== "idle" ? message : "\u00a0"}
      </p>
    </form>
  );
}
