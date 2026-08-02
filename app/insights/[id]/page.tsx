import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/insights/ArticleHeader";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ArticleSchema } from "@/components/insights/ArticleSchema";
import { insights } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adpro.co.zm";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return insights.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const post = insights.find((p) => p.id === id);
  if (!post) return {};

  const url = `${siteUrl}/insights/${post.id}`;
  const fullTitle = `${post.title} | AdPro 360`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      title: fullTitle,
      description: post.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const post = insights.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <>
      <ArticleSchema post={post} />
      <ArticleHeader post={post} />
      <ArticleBody post={post} />
    </>
  );
}
