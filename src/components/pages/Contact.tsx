import { useState } from "react";
import Section from "../ui/Section";
import { profile, colors } from "../../data/content";

const FORMSPREE_ID = ""; // ← Mets ton ID Formspree ici si tu en utilises un.

export default function Contact() {
  return (
    <Section title="Contact" subtitle="Une idée, un projet, ou juste envie de parler data ?">
      <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Discutons de vos projets</h3>
            <p className="mt-2 max-w-prose text-sm text-zinc-700 dark:text-slate-300">
              J’adore collaborer sur des sujets data/BI. Pour une opportunité, une question technique ou simplement réseauter, contactez-moi.
            </p>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm">
              <a href={`mailto:${profile.email}`} className={`rounded-xl bg-white px-3 py-2 font-medium ring-1 ring-zinc-200 dark:bg-slate-900 dark:ring-slate-700 ${colors.ring}`}>
                {profile.email}
              </a>
              <a href={`tel:${profile.phone.replaceAll(" ", "")}`} className={`rounded-xl bg-white px-3 py-2 font-medium ring-1 ring-zinc-200 dark:bg-slate-900 dark:ring-slate-700 ${colors.ring}`}>
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
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

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
          setMsg("Message envoyé avec succès ! ✅");
          (e.currentTarget as HTMLFormElement).reset();
        } else {
          const json = await res.json();
          setStatus("error");
          setMsg(json?.error || "Une erreur est survenue.");
        }
      } catch {
        setStatus("error");
        setMsg("Impossible d'envoyer le message.");
      }
    } else {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(String(data.subject) || "Prise de contact via portfolio")}&body=${encodeURIComponent(`${String(data.message)}\n\n— ${String(data.name)} <${String(data.email)}>`)}`;
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input name="name" required placeholder="Votre nom" className={`h-10 rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`} />
        <input name="email" required type="email" placeholder="Votre email" className={`h-10 rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`} />
      </div>
      <input name="subject" placeholder="Sujet" className={`h-10 w-full rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`} />
      <textarea name="message" required rows={4} placeholder="Votre message..." className={`w-full rounded-md border p-3 outline-none focus:ring-2 ${colors.ring}`} />
      <button type="submit" disabled={status === "sending"} className={`w-full rounded-xl bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-4 py-2 font-semibold text-white shadow-sm disabled:opacity-60`}>
        {status === "sending" ? "Envoi..." : "Envoyer"}
      </button>
      {status !== "idle" && (
        <p className={`text-sm ${status === "ok" ? "text-emerald-600" : status === "error" ? "text-red-600" : "text-zinc-500 dark:text-slate-500"}`}>
          {msg}
        </p>
      )}
    </form>
  );
}
