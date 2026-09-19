// Chargement des articles de blog depuis les fichiers Markdown de src/content/blog/.
// Chaque fichier .md commence par un frontmatter YAML simple :
//   ---
//   title: "Mon titre"
//   date: "2026-07-20"
//   excerpt: "Résumé court."
//   tags: [Data Engineering, Databricks]
//   lang: fr
//   ---
//   Contenu en Markdown...

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO (AAAA-MM-JJ)
  excerpt: string;
  tags: string[];
  lang?: string;
  content: string; // corps Markdown
  readingMinutes: number;
};

const rawFiles = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const [, frontmatter, body] = match;
  const data: Record<string, string | string[]> = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    // Liste : tags: [a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
      continue;
    }

    // Retire les guillemets éventuels
    value = value.replace(/^['"]|['"]$/g, "");
    data[key] = value;
  }

  return { data, body };
}

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const posts: BlogPost[] = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      excerpt: (data.excerpt as string) ?? "",
      tags: (data.tags as string[]) ?? [],
      lang: data.lang as string | undefined,
      content: body,
      readingMinutes: readingTime(body),
    };
  })
  // Plus récents en premier
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
