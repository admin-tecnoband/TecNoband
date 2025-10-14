"use client";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  BarChart3,
  Shield,
  Zap,
  Bell,
  Lock,
  Cloud,
  Smartphone,
  GitBranch,
  Database,
  Activity,
  Settings,
  ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import siteData from "@/data/site-data.json";

export default function FeaturesPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className='container py-24 md:py-32 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl' />
        <div className='absolute inset-0 bg-[url("https://picsum.photos/seed/picsum/400/600")] bg-cover bg-center opacity-5' />
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5'
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className='absolute inset-0  bg-center opacity-5' />
        <div className='mx-auto max-w-4xl text-center space-y-8 relative z-10'>
          <FadeIn delay={0.1}>
            <Badge variant='secondary' className='mb-4 shadow-glow'>
              {siteData.features.hero.badge}
            </Badge>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-balance'>
              {siteData.features.hero.titlePrefix}{" "}
              <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow'>
                {siteData.features.hero.titleHighlight}
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className='text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed'>
              {siteData.features.hero.subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Button
                  size='lg'
                  asChild
                  className='shadow-glow-lg hover:shadow-glow transition-all'
                >
                  <Link href='/auth/signup'>
                    {siteData.features.heroCTAs.primary}{" "}
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Button
                  size='lg'
                  variant='outline'
                  asChild
                  className='hover:border-glow transition-all bg-transparent'
                >
                  <Link href='/dashboard'>
                    {siteData.features.heroCTAs.secondary}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Features */}
      <section className='container py-24 relative'>
        {/* <motion.div
          className='absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-secondary/10 bg-[length:200%_100%] bg-no-repeat'
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        /> */}

        {/* Decorative Elements */}
        <div className='absolute top-10 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse' />

        <div className='mx-auto max-w-7xl relative z-10'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-16'>
              <Badge variant='outline' className='mb-2 border-primary/50'>
                {siteData.features.section.badge}
              </Badge>
              <h2 className='text-3xl md:text-5xl font-bold'>
                {siteData.features.section.heading}
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                {siteData.features.section.description}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.08}
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {siteData.features.items.map((item, idx) => {
              // Map icons to index to roughly preserve original visuals
              const icons = [
                Cpu,
                BarChart3,
                Shield,
                Zap,
                Bell,
                Lock,
                Cloud,
                Smartphone,
                GitBranch,
                Database,
                Activity,
                Settings,
              ];
              const Icon = icons[idx] || Cpu;

              // Make the first item span two columns like the original layout
              const containerClass =
                idx === 0 ? "lg:col-span-2 lg:row-span-1 group" : "group";

              return (
                <StaggerItem key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={containerClass}
                  >
                    <Card className='h-full p-8 hover:shadow-glow-lg transition-all border-primary/30 relative overflow-hidden bg-transparent'>
                      <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                      <div className='absolute inset-0  bg-center opacity-5' />

                      <motion.div
                        whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                        transition={{ duration: 0.8 }}
                        className='h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 shadow-lg shadow-primary/30 relative z-10'
                      >
                        <Icon className='h-8 w-8 text-primary' />
                      </motion.div>

                      <div className='relative z-10'>
                        <h3 className='text-2xl font-bold mb-3'>
                          {item.title}
                        </h3>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                          {item.description}
                        </p>

                        {item.pills && item.pills.length > 0 && (
                          <div className='flex flex-wrap gap-2'>
                            {item.pills.map((pill, i) => (
                              <Badge
                                key={i}
                                variant='secondary'
                                className='bg-primary/10 text-primary border-primary/20'
                              >
                                {pill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container py-24 relative overflow-hidden'>
        <div className='absolute inset-0 bg-radial from-primary/20 to-transparent to-60% blur-3xl' />
        <FadeIn>
          <div className='mx-auto max-w-4xl text-center space-y-8 relative z-10'>
            <h2 className='text-3xl md:text-5xl font-bold'>
              Ready to Transform Your IoT Infrastructure?
            </h2>
            <p className='text-xl text-muted-foreground leading-relaxed'>
              Join hundreds of enterprises already using TecNoBand to manage
              their connected devices. Start your free trial today, no credit
              card required.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Button
                  size='lg'
                  asChild
                  className='shadow-glow-lg hover:shadow-glow transition-all'
                >
                  <Link href='/auth/signup'>
                    Start Free Trial <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Button
                  size='lg'
                  variant='outline'
                  asChild
                  className='hover:border-glow transition-all bg-transparent'
                >
                  <Link href='/contact'>Talk to Sales</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </section>
    </MarketingLayout>
  );
}
