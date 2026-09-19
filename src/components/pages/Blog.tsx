import { Link } from "react-router-dom";
import { FiArrowRight, FiClock } from "react-icons/fi";
import Section from "../ui/Section";
import { getAllPosts } from "../../lib/blog";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";
import { useLanguage } from "../../hooks/LanguageProvider";

export default function Blog() {
  const { labels } = usePortfolioContent();
  const { language } = useLanguage();
  // On affiche les articles de la langue courante (ceux sans langue déclarée restent visibles).
  const posts = getAllPosts().filter((post) => !post.lang || post.lang === language);
  const locale = language === "fr" ? "fr-FR" : "en-US";

  const formatDate = (iso: string) =>
    iso
      ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso))
      : "";

  return (
    <div className="relative">
      <Section title={labels.blog.title} subtitle={labels.blog.subtitle}>
        {posts.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-slate-400">{labels.blog.empty}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-violet-300 dark:bg-slate-900/70 dark:ring-slate-700 dark:hover:ring-violet-500/50"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-slate-400">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <FiClock className="h-3 w-3" />
                      {post.readingMinutes} {labels.blog.minRead}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold text-zinc-900 dark:text-slate-100">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-slate-400">{post.excerpt}</p>

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

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400">
                    {labels.blog.readMore}
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
