import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/ThemeProvider";

// Rend un diagramme Mermaid. La librairie (lourde) est importée dynamiquement :
// elle n'est chargée que lorsqu'un article contient réellement un diagramme.
export default function Mermaid({ chart }: { chart: string }) {
  const { resolved } = useTheme();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolved === "dark" ? "dark" : "default",
          fontFamily: "inherit",
        });
        const id = "mermaid-" + Math.random().toString(36).slice(2);
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(svg);
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, resolved]);

  // Repli : tant que le rendu n'est pas prêt (ou en cas d'erreur), on montre la source.
  if (!svg || failed) {
    return (
      <pre className="overflow-x-auto rounded-xl bg-zinc-100 p-4 text-xs text-zinc-600 dark:bg-slate-800 dark:text-slate-300">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto rounded-2xl bg-white/60 p-4 ring-1 ring-zinc-200 dark:bg-slate-900/50 dark:ring-slate-700"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
