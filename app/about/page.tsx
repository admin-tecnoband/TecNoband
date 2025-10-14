"use client";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import siteData from "@/data/site-data.json";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

export default function AboutPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className='container py-24 md:py-32 relative overflow-hidden'>
        {/* Background image + animated gradient like homepage */}
        <div className='absolute inset-0 bg-[url("https://picsum.photos/seed/picsum/400/600")] bg-cover bg-center opacity-5' />
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-primary/10 to-background bg-[length:200%_100%]'
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse",
          }}
        />
        <div className='mx-auto max-w-4xl text-center space-y-8 relative z-10'>
          <FadeIn delay={0.1}>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-balance'>
              {siteData.about.hero.titlePrefix}{" "}
              <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow'>
                {siteData.about.hero.titleHighlight}
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed'>
              {siteData.about.hero.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className='container py-44'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <FadeIn delay={0.1}>
            <h2 className='text-3xl md:text-4xl font-bold'>
              {siteData.about.story.heading}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className='prose prose-lg dark:prose-invert max-w-none space-y-6'>
              {siteData.about.story.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  className='text-muted-foreground leading-relaxed text-lg'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values Section */}
      <section className='container relative py-24'>
        <motion.div
          className='absolute inset-0 bg-radial from-primary/10 to-transparent to-60% bg-[length:100%_100%] bg-[position:50%_50%]'
          animate={{ backgroundSize: ["100% 100%", "200% 200%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse",
          }}
        />
        <div className='mx-auto max-w-6xl'>
          <FadeIn delay={0.1}>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
              {siteData.about.values.heading}
            </h2>
          </FadeIn>
          <StaggerContainer
            staggerDelay={0.1}
            className='grid md:grid-cols-2 gap-6'
          >
            {siteData.about.values.items.map((val, i) => (
              <StaggerItem key={val.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card
                    className={`h-full hover:shadow-glow-lg transition-all ${
                      i === 0
                        ? "border-primary/30"
                        : i === 1
                        ? "border-secondary/30"
                        : i === 2
                        ? "border-accent/30"
                        : "border-chart-2/30"
                    } relative overflow-hidden bg-background/80 backdrop-blur-sm`}
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                    <CardContent className='pt-8 pb-8 relative z-10'>
                      <div className='flex gap-6'>
                        <motion.div
                          whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                          transition={{ duration: 0.8 }}
                          className='flex-shrink-0 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-lg shadow-primary/30'
                        >
                          {/* Reuse icons in order: Target, Lightbulb, Users, Award */}
                          {i === 0 ? (
                            <Target className='h-8 w-8 text-primary' />
                          ) : i === 1 ? (
                            <Lightbulb className='h-8 w-8 text-secondary' />
                          ) : i === 2 ? (
                            <Users className='h-8 w-8 text-accent' />
                          ) : (
                            <Award className='h-8 w-8 text-chart-2' />
                          )}
                        </motion.div>
                        <div className='space-y-3'>
                          <h3 className='text-2xl font-semibold'>
                            {val.title}
                          </h3>
                          <p className='text-muted-foreground leading-relaxed'>
                            {val.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className='container py-24'>
        <div className='mx-auto max-w-6xl'>
          <FadeIn delay={0.1}>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
              {siteData.about.team.heading}
            </h2>
          </FadeIn>
          <StaggerContainer
            staggerDelay={0.15}
            className='grid md:grid-cols-3 gap-8'
          >
            {siteData.about.team.members.map((m, i) => (
              <StaggerItem key={m.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 + i * 50 }}
                >
                  <Card
                    className={`hover:shadow-glow-lg transition-all ${
                      i === 0
                        ? "border-primary/30"
                        : i === 1
                        ? "border-accent/30"
                        : "border-secondary/30"
                    } relative overflow-hidden bg-background/80 backdrop-blur-sm`}
                  >
                    <CardContent className='pt-8 pb-8 text-center space-y-6 relative z-10'>
                      <div
                        className={`w-24 h-24 rounded-full bg-gradient-to-br ${
                          i === 0
                            ? "from-primary to-secondary"
                            : i === 1
                            ? "from-accent to-destructive"
                            : "from-secondary to-accent"
                        } mx-auto shadow-lg ${
                          i === 0
                            ? "shadow-primary/30"
                            : i === 1
                            ? "shadow-accent/30"
                            : "shadow-secondary/30"
                        }`}
                      />
                      <div className='space-y-2'>
                        <h3 className='text-xl font-semibold'>{m.name}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {m.role}
                        </p>
                      </div>
                      <p className='text-sm text-muted-foreground leading-relaxed'>
                        {m.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </MarketingLayout>
  );
}
