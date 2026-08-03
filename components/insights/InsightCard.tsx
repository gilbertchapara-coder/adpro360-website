import NextLink from "next/link";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { cn } from "@/lib/utils/cn";
import type { Insight } from "@/lib/content";

type InsightCardProps = {
  post: Insight;
  /** Lead-position treatment — CD review: "cards are uniform with no entry
   * point. Feature one lead article at larger scale." */
  featured?: boolean;
};

/** Shared by Home's insights preview (first 3) and the full Insights index —
 * same card, same data, no duplicated markup between the two. */
export function InsightCard({ post, featured = false }: InsightCardProps) {
  return (
    <NextLink
      href={`/insights/${post.id}`}
      className={cn(
        "ease-signature border-ink/10 bg-card text-ink hover:-translate-y-s03 hover:border-teal/55 flex h-full flex-col overflow-hidden rounded-2xl border transition-[transform,border-color] duration-[var(--duration-slower)]",
        featured && "sm:flex-row"
      )}
    >
      <div
        className={cn(
          "bg-card-alt relative aspect-[16/9] flex-none overflow-hidden",
          featured && "sm:aspect-auto sm:w-[46%]"
        )}
      >
        <MediaSlot
          src={post.photo}
          alt={`${post.title} — cover`}
          sizes={featured ? "(min-width: 640px) 46vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
        />
      </div>

      <div className={cn("gap-s15 px-s21 py-s21 flex flex-1 flex-col", featured && "sm:justify-center")}>
        <div className="tracking-eyebrow-2 text-ink/62 flex items-center justify-between text-xs font-bold uppercase">
          <span>{post.kind}</span>
          <span>{post.read}</span>
        </div>
        <h3
          className={cn(
            "leading-relaxed-3 tracking-tight-1 line-clamp-2 font-semibold text-pretty",
            featured ? "text-h2 font-normal" : "text-h3-a"
          )}
        >
          {post.title}
        </h3>
        <p className="leading-body text-ink/48 text-base line-clamp-3">{post.excerpt}</p>
      </div>
    </NextLink>
  );
}
