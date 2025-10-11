import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import blogPosts from "@/data/blog-posts.json";
import { notFound } from "next/navigation";

// Markdown rendering
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <MarketingLayout>
      <article className='container py-24'>
        <div className='mx-auto max-w-4xl space-y-8'>
          {/* Back Button */}
          <Button variant='ghost' asChild>
            <Link href='/blog'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Blog
            </Link>
          </Button>

          {/* Post Header */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Badge variant='secondary'>{post.category}</Badge>
              <span className='text-sm text-muted-foreground'>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-balance'>
              {post.title}
            </h1>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary' />
              <div>
                <div className='font-semibold'>{post.author}</div>
                <div className='text-sm text-muted-foreground'>Author</div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className='aspect-video w-full overflow-hidden rounded-lg border border-border/50'>
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Post Content (rendered from Markdown) */}
          <div className='prose prose-lg dark:prose-invert max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              // Allow rendering HTML from markdown but sanitize it first
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Related Posts CTA */}
          <div className='pt-8 border-t border-border'>
            <div className='text-center space-y-4'>
              <h3 className='text-2xl font-semibold'>Want to learn more?</h3>
              <Button asChild>
                <Link href='/blog'>Read More Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </MarketingLayout>
  );
}
