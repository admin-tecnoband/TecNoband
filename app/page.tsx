"use client";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Shield,
  Zap,
  BarChart3,
  Bell,
  Lock,
  Users,
  Globe,
  TrendingUp,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import siteData from "@/data/site-data.json";

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        "The real-time monitoring and predictive insights have completely improved our production efficiency. We can now anticipate equipment issues and reduce downtime significantly.",
      author: "Matteo Rossi",
      role: "Operations Manager, Apex Industries",
      gradient: "from-primary to-secondary",
    },
    {
      quote:
        "Managing medical devices and patient monitoring systems has become effortless. The integrated controls help our team stay proactive and maintain high operational standards.",
      author: "Sofia Alvarez",
      role: "CTO, Horizon Medical",
      gradient: "from-secondary to-accent",
    },
    {
      quote:
        "From energy consumption to environmental sensors, we now have actionable insights across all city systems. This has helped us optimize resources and improve overall efficiency.",
      author: "Kwame Mensah",
      role: "Director, Metro City Council",
      gradient: "from-accent to-primary",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className='container py-24 md:py-32 relative overflow-visible'>
        <div className='absolute inset-0 bg-[url("https://picsum.photos/seed/picsum/400/600")] bg-cover bg-center opacity-5' />
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent bg-[length:200%_100%]'
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className='mx-auto max-w-4xl text-center space-y-8 relative z-10'>
          <FadeIn delay={0.1}>
            <Badge variant='secondary' className='mb-4 shadow-glow'>
              {siteData.home.hero.badge}
            </Badge>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance'>
              {siteData.home.hero.titlePrefix}{" "}
              <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow'>
                {siteData.home.hero.titleHighlight}
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className='text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed'>
              {siteData.home.hero.subtitle}
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
                    {siteData.home.heroCTAs.primary}{" "}
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
                  <Link href='/features'>
                    {siteData.home.heroCTAs.secondary}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section className='container py-24 relative overflow-visible'>
        {/* Decorative Elements */}
        <div className='absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse' />

        <div className='mx-auto max-w-7xl relative z-10'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-16'>
              <Badge variant='outline' className='mb-2 border-primary/50'>
                {siteData.home.stats.badge}
              </Badge>
              <h2 className='text-3xl md:text-5xl font-bold'>
                {siteData.home.stats.heading}
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                {siteData.home.stats.description}
              </p>
            </div>
          </FadeIn>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Stat 1 - Devices Managed */}
            <FadeIn delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='relative group'
              >
                <Card className='p-8 text-center border-primary/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />

                  {/* Animated Background Pattern */}
                  <div className='absolute inset-0  bg-center opacity-5' />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.6 }}
                    className='h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30 relative z-10'
                  >
                    <Cpu className='h-8 w-8 text-primary' />
                  </motion.div>

                  {/* Number with Counter Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className='relative z-10'
                  >
                    <div className='text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-2'>
                      {siteData.home.stats.items[0].value}
                    </div>
                    <div className='text-lg font-semibold text-foreground mb-1'>
                      {siteData.home.stats.items[0].title}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {siteData.home.stats.items[0].desc}
                    </p>
                  </motion.div>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Stat 2 - Uptime SLA */}
            <FadeIn delay={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='relative group'
              >
                <Card className='p-8 text-center border-secondary/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-secondary/20 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0 bg-center opacity-5' />

                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.6 }}
                    className='h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/30 relative z-10'
                  >
                    <Shield className='h-8 w-8 text-secondary' />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.4 }}
                    className='relative z-10'
                  >
                    <div className='text-5xl md:text-6xl font-bold bg-gradient-to-br from-secondary to-secondary/60 bg-clip-text text-transparent mb-2'>
                      {siteData.home.stats.items[1].value}
                    </div>
                    <div className='text-lg font-semibold text-foreground mb-1'>
                      {siteData.home.stats.items[1].title}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {siteData.home.stats.items[1].desc}
                    </p>
                  </motion.div>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Stat 3 - Enterprise Clients */}
            <FadeIn delay={0.4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='relative group'
              >
                <Card className='p-8 text-center border-secondary/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-secondary/20 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0  bg-center opacity-5' />

                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.6 }}
                    className='h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/30 relative z-10'
                  >
                    <Users className='h-8 w-8 text-secondary' />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.5 }}
                    className='relative z-10'
                  >
                    <div className='text-5xl md:text-6xl font-bold bg-gradient-to-br from-secondary to-secondary/60 bg-clip-text text-transparent mb-2'>
                      {siteData.home.stats.items[2].value}
                    </div>
                    <div className='text-lg font-semibold text-foreground mb-1'>
                      {siteData.home.stats.items[2].title}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {siteData.home.stats.items[2].desc}
                    </p>
                  </motion.div>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Stat 4 - Support */}
            <FadeIn delay={0.5}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='relative group'
              >
                <Card className='p-8 text-center border-primary/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0  bg-center opacity-5' />

                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.6 }}
                    className='h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30 relative z-10'
                  >
                    <Zap className='h-8 w-8 text-primary' />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.6 }}
                    className='relative z-10'
                  >
                    <div className='text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-2'>
                      {siteData.home.stats.items[3].value}
                    </div>
                    <div className='text-lg font-semibold text-foreground mb-1'>
                      {siteData.home.stats.items[3].title}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {siteData.home.stats.items[3].desc}
                    </p>
                  </motion.div>
                </Card>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Grid - Redesigned */}
      <section className='container py-24 bg-card/30 relative overflow-hidden'>
        <motion.div
          className='absolute inset-0 bg-no-repeat bg-gradient-to-br from-background via-primary/5 to-background bg-[length:200%_100%]'
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Decorative Gradient Orbs */}
        <div className='absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse' />

        <div className='mx-auto max-w-7xl relative z-10'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-16'>
              <Badge variant='outline' className='mb-2 border-accent/50'>
                {siteData.home.features.badge}
              </Badge>
              <h2 className='text-3xl md:text-5xl font-bold'>
                {siteData.home.features.heading}
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                {siteData.home.features.description}
              </p>
            </div>
          </FadeIn>

          {/* Bento Grid Layout */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Feature 1 - Device Management (Large Card) */}
            <FadeIn delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='lg:col-span-2 lg:row-span-1 group'
              >
                <Card className='h-full p-8 hover:shadow-glow-lg transition-all border-primary/30 relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />

                  {/* Background Pattern */}
                  <div className='absolute inset-0  bg-center opacity-5' />

                  {/* Animated Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.8 }}
                    className='h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 shadow-lg shadow-primary/30 relative z-10'
                  >
                    <Cpu className='h-8 w-8 text-primary' />
                  </motion.div>

                  <div className='relative z-10'>
                    <h3 className='text-2xl font-bold mb-3'>
                      {siteData.home.features.items[0].title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed mb-4'>
                      {siteData.home.features.items[0].description}
                    </p>

                    {/* Feature Pills */}
                    <div className='flex flex-wrap gap-2'>
                      {siteData.home.features.items[0].pills?.map((pill, i) => (
                        <Badge
                          key={i}
                          variant='secondary'
                          className='bg-primary/10 text-primary border-primary/20'
                        >
                          {pill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Feature 2 - AI Analytics */}
            <FadeIn delay={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='group'
              >
                <Card className='h-full p-8 hover:shadow-glow-lg transition-all border-secondary/30 relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0  bg-center opacity-5' />

                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.8 }}
                    className='h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-6 shadow-lg shadow-secondary/30 relative z-10'
                  >
                    <BarChart3 className='h-8 w-8 text-secondary' />
                  </motion.div>

                  <div className='relative z-10'>
                    <h3 className='text-2xl font-bold mb-3'>
                      {siteData.home.features.items[1].title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {siteData.home.features.items[1].description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Feature 3 - Enterprise Security */}
            <FadeIn delay={0.4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='group'
              >
                <Card className='h-full p-8 hover:shadow-glow-lg transition-all border-accent/30 relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0  bg-center opacity-5' />

                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.8 }}
                    className='h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 shadow-lg shadow-accent/30 relative z-10'
                  >
                    <Shield className='h-8 w-8 text-accent' />
                  </motion.div>

                  <div className='relative z-10'>
                    <h3 className='text-2xl font-bold mb-3'>
                      {siteData.home.features.items[2].title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {siteData.home.features.items[2].description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Feature 4 - Real-time Updates */}
            <FadeIn delay={0.5}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='group'
              >
                <Card className='h-full p-8 hover:shadow-glow-lg transition-all border-primary/30 relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0  bg-center opacity-5' />

                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.8 }}
                    className='h-16 w-16 rounded-2xl bg-gradient-to-br from-chart-2/20 to-chart-2/5 flex items-center justify-center mb-6 shadow-lg shadow-primary/30 relative z-10'
                  >
                    <Zap className='h-8 w-8 text-chart-2' />
                  </motion.div>

                  <div className='relative z-10'>
                    <h3 className='text-2xl font-bold mb-3'>
                      {siteData.home.features.items[3].title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {siteData.home.features.items[3].description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Feature 5 - Smart Alerts */}
            <FadeIn delay={0.6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='group'
              >
                <Card className='h-full p-8 hover:shadow-glow-lg transition-all border-destructive/30 relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0  bg-center opacity-5' />

                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.8 }}
                    className='h-16 w-16 rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center mb-6 shadow-lg shadow-destructive/30 relative z-10'
                  >
                    <Bell className='h-8 w-8 text-destructive' />
                  </motion.div>

                  <div className='relative z-10'>
                    <h3 className='text-2xl font-bold mb-3'>
                      {siteData.home.features.items[4].title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed mb-4'>
                      {siteData.home.features.items[4].description}
                    </p>

                    {/* Feature Pills */}
                    <div className='flex flex-wrap gap-2'>
                      {siteData.home.features.items[4].pills?.map((pill, i) => (
                        <Badge
                          key={i}
                          variant='secondary'
                          className='bg-destructive/10 text-destructive border-destructive/20'
                        >
                          {pill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Feature 6 - Access Control */}
            <FadeIn delay={0.7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className='group'
              >
                <Card className='h-full p-8 hover:shadow-glow-lg transition-all border-accent/30 relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0  bg-center opacity-5' />

                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                    transition={{ duration: 0.8 }}
                    className='h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 shadow-lg shadow-accent/30 relative z-10'
                  >
                    <Lock className='h-8 w-8 text-accent' />
                  </motion.div>

                  <div className='relative z-10'>
                    <h3 className='text-2xl font-bold mb-3'>
                      {siteData.home.features.items[5].title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {siteData.home.features.items[5].description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className='container py-24 relative overflow-hidden'>
        <div className='mx-auto max-w-7xl relative z-10'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-16'>
              <h2 className='text-3xl md:text-5xl font-bold'>
                {siteData.home.industry.heading}
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                {siteData.home.industry.description}
              </p>
            </div>
          </FadeIn>

          {/* Central Image with Floating Cards Layout */}
          <div className='relative flex items-center justify-center min-h-[600px]'>
            {/* Central Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className='relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse' />
              <Image
                src='https://picsum.photos/seed/picsum/400/600'
                alt='IoT Industry Solutions'
                className='w-full h-full object-cover'
                width={800}
                height={450}
                priority={true}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent' />
              <div className='absolute inset-0 backdrop-blur-[2px]' />
            </motion.div>

            {/* Floating Cards positioned at corners - rendered from siteData.home.floatingCards */}
            <StaggerContainer
              staggerDelay={0.15}
              className='absolute flex flex-col gap-2 inset-0 pointer-events-none'
            >
              {siteData.home.floatingCards?.map((card, idx) => {
                const Icon =
                  {
                    Globe,
                    Users,
                    TrendingUp,
                    Shield,
                  }[card.icon] || Globe;

                const variantClasses = {
                  primary:
                    "border-primary/30 bg-background/35 md:bg-background/95 shadow-glow-lg shadow-primary/50",
                  secondary:
                    "border-secondary/30 bg-background/35 md:bg-background/95 shadow-glow-lg shadow-secondary/50",
                  accent:
                    "border-accent/30 bg-background/35 md:bg-background/95 shadow-glow-lg shadow-accent/50",
                }[card.variant || "primary"];

                return (
                  <StaggerItem key={idx}>
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: idx % 2 === 0 ? -50 : 50,
                        y: idx < 2 ? -50 : 50,
                      }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.05,
                        rotate: idx % 2 === 0 ? 2 : -2,
                        y: -8,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className={card.positionClass}
                    >
                      <Card
                        className={`p-10 ${variantClasses} backdrop-blur-md relative overflow-hidden`}
                      >
                        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent' />
                        <div className='flex items-start gap-4 relative z-10'>
                          <div
                            className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              card.variant === "secondary"
                                ? "bg-secondary/20 shadow-secondary/50"
                                : card.variant === "accent"
                                ? "bg-accent/20 shadow-accent/50"
                                : "bg-primary/20 shadow-primary/50"
                            }`}
                          >
                            <Icon className='h-6 w-6 text-current' />
                          </div>
                          <div>
                            <h3 className='text-xl font-bold mb-2'>
                              {card.title}
                            </h3>
                            <p className='text-muted-foreground text-sm'>
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className='container py-24 bg-card/30 relative overflow-hidden'>
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-secondary/5'
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src='https://picsum.photos/seed/picsum/400/600'
            alt='Testimonials Background'
            fill
            className='object-cover opacity-10'
            priority={false}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/80' />
        </div>

        <div className='mx-auto max-w-6xl relative z-10'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-16'>
              <h2 className='text-3xl md:text-5xl font-bold'>
                {siteData.home.testimonials.heading}
              </h2>
              <p className='text-xl text-muted-foreground'>
                {siteData.home.testimonials.subtitle}
              </p>
            </div>
          </FadeIn>

          {/* Carousel Container */}
          <div className='relative flex items-center justify-center min-h-[400px]'>
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className='absolute left-0 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-glow hover:shadow-glow-lg transition-all'
              aria-label='Previous testimonial'
            >
              <ChevronLeft className='h-6 w-6 text-primary' />
            </motion.button>

            {/* Testimonial Cards */}
            <div className='relative w-full max-w-4xl h-[350px] flex items-center justify-center'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100, rotateY: 20 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: -20 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className='absolute inset-0 flex items-center justify-center'
                >
                  <Card className='p-8 md:p-12 shadow-glow-lg border-primary/30 bg-background/95 backdrop-blur-md relative overflow-hidden max-w-3xl w-full'>
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10' />
                    <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/20 to-transparent rounded-full blur-3xl' />

                    {/* Stars */}
                    <div className='flex gap-1 mb-6 justify-center relative z-10'>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                        >
                          <Star className='h-6 w-6 fill-primary text-primary' />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className='text-xl md:text-2xl text-center mb-8 relative z-10 leading-relaxed font-medium'>
                      &quot;{testimonials[currentTestimonial].quote}&quot;
                    </p>

                    {/* Author */}
                    <div className='flex items-center justify-center gap-4 relative z-10'>
                      <div
                        className={`h-16 w-16 rounded-full bg-gradient-to-br ${testimonials[currentTestimonial].gradient} shadow-lg`}
                      />
                      <div className='text-left'>
                        <p className='font-bold text-lg'>
                          {testimonials[currentTestimonial].author}
                        </p>
                        <p className='text-muted-foreground'>
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>

                    {/* Decorative Quote Mark */}
                    <div className='absolute top-4 left-4 text-8xl text-primary/10 font-serif leading-none'>
                      &ldquo;
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className='absolute right-0 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-glow hover:shadow-glow-lg transition-all'
              aria-label='Next testimonial'
            >
              <ChevronRight className='h-6 w-6 text-primary' />
            </motion.button>
          </div>

          {/* Carousel Indicators */}
          <div className='flex justify-center gap-2 mt-8'>
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentTestimonial
                    ? "w-8 bg-primary shadow-glow"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className='container py-24 relative overflow-hidden'>
        <div className='mx-auto max-w-6xl relative z-10'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-16'>
              <h2 className='text-3xl md:text-5xl font-bold'>
                Why Choose TecNoBand?
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                We&apos;re not just another IoT platform. Here&apos;s what sets
                us apart
              </p>
            </div>
          </FadeIn>

          <div className='grid md:grid-cols-2 gap-8'>
            <FadeIn delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className='p-8 hover:shadow-glow-lg transition-all border-primary/20 relative overflow-hidden'>
                  <div className='absolute inset-0  bg-center opacity-5' />
                  <CheckCircle2 className='h-12 w-12 text-primary mb-4 relative z-10' />
                  <h3 className='text-2xl font-bold mb-3 relative z-10'>
                    Enterprise-Grade Reliability
                  </h3>
                  <p className='text-muted-foreground leading-relaxed relative z-10'>
                    Built on robust infrastructure with 99.9% uptime SLA,
                    automatic failover, and disaster recovery. Your devices stay
                    connected, always.
                  </p>
                </Card>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className='p-8 hover:shadow-glow-lg transition-all border-secondary/20 relative overflow-hidden'>
                  <div className='absolute inset-0  bg-center opacity-5' />
                  <CheckCircle2 className='h-12 w-12 text-secondary mb-4 relative z-10' />
                  <h3 className='text-2xl font-bold mb-3 relative z-10'>
                    AI-Powered Insights
                  </h3>
                  <p className='text-muted-foreground leading-relaxed relative z-10'>
                    Our machine learning algorithms analyze patterns, predict
                    failures, and provide actionable recommendations to optimize
                    your operations.
                  </p>
                </Card>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className='p-8 hover:shadow-glow-lg transition-all border-accent/20 relative overflow-hidden'>
                  <div className='absolute inset-0  bg-center opacity-5' />
                  <CheckCircle2 className='h-12 w-12 text-accent mb-4 relative z-10' />
                  <h3 className='text-2xl font-bold mb-3 relative z-10'>
                    Seamless Integration
                  </h3>
                  <p className='text-muted-foreground leading-relaxed relative z-10'>
                    Connect with existing systems through our comprehensive API,
                    webhooks, and pre-built integrations with popular platforms.
                  </p>
                </Card>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className='p-8 hover:shadow-glow-lg transition-all border-primary/20 relative overflow-hidden'>
                  <div className='absolute inset-0  bg-center opacity-5' />
                  <CheckCircle2 className='h-12 w-12 text-primary mb-4 relative z-10' />
                  <h3 className='text-2xl font-bold mb-3 relative z-10'>
                    World-Class Support
                  </h3>
                  <p className='text-muted-foreground leading-relaxed relative z-10'>
                    24/7 expert support, dedicated account managers for
                    enterprise clients, and comprehensive documentation to help
                    you succeed.
                  </p>
                </Card>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container py-24 relative overflow-visible'>
        <div className='absolute inset-0 bg-radial from-primary/20 to-transparent to-60% blur-3xl' />
        <FadeIn>
          <div className='mx-auto max-w-4xl text-center space-y-8 relative z-10'>
            <h2 className='text-3xl md:text-5xl font-bold'>
              {siteData.home.cta.heading}
            </h2>
            <p className='text-xl text-muted-foreground leading-relaxed'>
              {siteData.home.cta.description}
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
                    {siteData.home.cta.primary}{" "}
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
                  <Link href='/contact'>{siteData.home.cta.secondary}</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </section>
    </MarketingLayout>
  );
}
