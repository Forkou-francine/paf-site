import { useParams, Link } from "react-router-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiArrowLeft, FiClock } from "react-icons/fi";
import { getPostBySlug } from "../../lib/blog";
import Mermaid from "../ui/Mermaid";
import AuthorCard from "../ui/AuthorCard";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";
import { useLanguage } from "../../hooks/LanguageProvider";

// Rendu Markdown personnalisé : les blocs ```mermaid deviennent des diagrammes.
const markdownComponents: Components = {
  code({ className, children, ...props }) {
    if (/\blanguage-mermaid\b/.test(className ?? "")) {
      return <Mermaid chart={String(children).replace(/\n$/, "")} />;
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  // Évite d'emballer le diagramme Mermaid dans un <pre> stylé comme un bloc de code.
  pre({ children }) {
    const child = Array.isArray(children) ? children[0] : children;
    const childClass =
      child && typeof child === "object" && "props" in child
        ? ((child as { props?: { className?: string } }).props?.className ?? "")
        : "";
    if (/\blanguage-mermaid\b/.test(childClass)) {
      return <>{children}</>;
    }
    return <pre>{children}</pre>;
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const { labels } = usePortfolioContent();
  const { language } = useLanguage();
  const post = slug ? getPostBySlug(slug) : undefined;

  const locale = language === "fr" ? "fr-FR" : "en-US";
  const backLink = (
    <Link
      to="/blog"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
    >
      <FiArrowLeft className="h-4 w-4" />
      {labels.blog.back}
    </Link>
  );

  if (!post) {
    return (
      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-zinc-600 dark:text-slate-400">{labels.blog.notFound}</p>
        <div className="mt-6">{backLink}</div>
      </div>
    );
  }

  const formattedDate = post.date
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.date))
    : "";

  return (
    <div className="relative">
      <article className="mx-auto max-w-3xl px-4 py-16">
        {backLink}

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500 dark:text-slate-400">
            <span>{formattedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <FiClock className="h-4 w-4" />
              {post.readingMinutes} {labels.blog.minRead}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-slate-100 sm:text-4xl">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert prose-headings:font-display prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-violet-400">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </div>

        <AuthorCard />

        <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-slate-800">{backLink}</div>
      </article>
    </div>
  );
}
