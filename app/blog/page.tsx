"use client";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import blogPosts from "@/data/blog-posts.json";
import siteData from "@/data/site-data.json";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BlogPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className='container py-24 md:py-32 relative overflow-hidden'>
        <div className='absolute inset-0 bg-[url("https://picsum.photos/seed/picsum/400/600")] bg-cover bg-center opacity-5' />
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-primary/10 to-background bg-[length:200%_100%]'
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className='mx-auto max-w-4xl text-center space-y-8 relative z-10'>
          <FadeIn delay={0.1}>
            <Badge variant='secondary' className='mb-4 shadow-glow'>
              {siteData.blog.hero.badge}
            </Badge>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-balance'>
              {siteData.blog.hero.titlePrefix}{" "}
              <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow'>
                {siteData.blog.hero.titleHighlight}
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className='text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed'>
              {siteData.blog.hero.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className='container py-24 relative '>
        {/* Decorative Elements */}
        <div className='absolute top-10 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse' />

        <div className='mx-auto max-w-6xl relative z-10'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-16'>
              <Badge variant='outline' className='mb-2 border-primary/50'>
                {siteData.blog.section.badge}
              </Badge>
              <h2 className='text-3xl md:text-5xl font-bold'>
                {siteData.blog.section.heading}
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                {siteData.blog.section.description}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.1}
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {blogPosts.map((post) => (
              <StaggerItem key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className='group'
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className='h-full hover:shadow-glow-lg transition-all border-primary/30 relative overflow-hidden bg-transparent'>
                      {/* Gradient Overlay */}
                      <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />

                      {/* Background Pattern */}
                      <div className='absolute inset-0  bg-center opacity-5' />

                      <div className='aspect-video w-full overflow-hidden rounded-t-lg relative'>
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                          width={400}
                          height={225}
                          priority={false}
                        />
                      </div>

                      <CardHeader className='relative z-10'>
                        <div className='flex items-center gap-2 mb-3'>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 250 }}
                          >
                            <Badge
                              variant='secondary'
                              className='bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors'
                            >
                              {post.category}
                            </Badge>
                          </motion.div>
                          <span className='text-xs text-muted-foreground'>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <CardTitle className='line-clamp-2 group-hover:text-primary transition-colors'>
                          {post.title}
                        </CardTitle>
                        <CardDescription className='line-clamp-2'>
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className='relative z-10'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-muted-foreground font-medium'>
                            {post.author}
                          </span>
                          <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 250 }}
                          >
                            <ArrowRight className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors' />
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </MarketingLayout>
  );
}
