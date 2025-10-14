"use client";

import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import siteData from "@/data/site-data.json";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { motion } from "framer-motion";

const pricingData = siteData.pricing;

export default function PricingPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className='relative container py-24 px-4 overflow-hidden'>
        {/* Background image + animated gradient */}
        <div className='absolute inset-0 bg-[url("https://picsum.photos/seed/picsum/400/600")] bg-cover bg-center opacity-5' />
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 bg-[length:200%_100%]'
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <div className='relative max-w-6xl mx-auto text-center'>
          <FadeIn delay={0.1}>
            <Badge variant='outline' className='mb-4'>
              <Sparkles className='w-3 h-3 mr-1' />
              {pricingData.hero.badge}
            </Badge>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              {pricingData.hero.titlePrefix}{" "}
              <span className='text-gradient'>
                {pricingData.hero.titleHighlight}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              {pricingData.hero.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className='container py-32 px-4'>
        <div className='mx-auto'>
          <StaggerContainer>
            <div className='grid md:grid-cols-3 gap-8'>
              {pricingData.tiers.map((tier, idx) => (
                <StaggerItem key={tier.name}>
                  <Card
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-glow-lg bg-transparent ${
                      tier.popular
                        ? "border-primary shadow-glow scale-105 md:scale-110"
                        : "hover:scale-105"
                    }`}
                  >
                    {tier.popular && (
                      <div className='absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold rounded-bl-lg'>
                        Most Popular
                      </div>
                    )}

                    <CardHeader className='text-center pb-8 pt-8'>
                      <CardTitle className='text-2xl mb-2'>
                        {tier.name}
                      </CardTitle>
                      <CardDescription className='text-sm mb-6'>
                        {tier.description}
                      </CardDescription>

                      <div className='mb-2'>
                        {tier.price === "Custom" ? (
                          <div className='text-4xl font-bold'>Custom</div>
                        ) : (
                          <>
                            <span className='text-5xl font-bold'>
                              ${tier.price}
                            </span>
                            {tier.period && (
                              <span className='text-muted-foreground'>
                                /{tier.period}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <Button
                        asChild
                        className={`w-full mb-6 ${
                          tier.popular
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                      >
                        <Link
                          href={
                            tier.price === "Custom"
                              ? "/contact"
                              : "/auth/signup"
                          }
                        >
                          {tier.cta}
                        </Link>
                      </Button>

                      <ul className='space-y-3'>
                        {tier.features.map((feature) => (
                          <li key={feature} className='flex items-start gap-2'>
                            <Check className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' />
                            <span className='text-sm'>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className='container py-20 px-4 bg-muted/30'>
        <div className='max-w-6xl mx-auto'>
          <FadeIn delay={0.1}>
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Connect & Compare to Match Your Needs
              </h2>
              <p className='text-muted-foreground'>
                Choose the plan that best fits your needs
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left p-4 font-semibold'>Feature</th>
                    {pricingData.tiers.map((tier) => (
                      <th
                        key={tier.name}
                        className='text-center p-4 font-semibold'
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b'>
                    <td className='p-4'>Devices</td>
                    <td className='text-center p-4'>10</td>
                    <td className='text-center p-4'>100</td>
                    <td className='text-center p-4'>Unlimited</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-4'>Data Storage</td>
                    <td className='text-center p-4'>1GB</td>
                    <td className='text-center p-4'>50GB</td>
                    <td className='text-center p-4'>Unlimited</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-4'>Support</td>
                    <td className='text-center p-4'>Email</td>
                    <td className='text-center p-4'>24/7 Priority</td>
                    <td className='text-center p-4'>24/7 Premium</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-4'>AI Analytics</td>
                    <td className='text-center p-4'>Basic</td>
                    <td className='text-center p-4'>
                      <Check className='w-5 h-5 text-primary mx-auto' />
                    </td>
                    <td className='text-center p-4'>Dedicated</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-4'>Team Members</td>
                    <td className='text-center p-4'>1</td>
                    <td className='text-center p-4'>5</td>
                    <td className='text-center p-4'>Unlimited</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-4'>SLA</td>
                    <td className='text-center p-4'>-</td>
                    <td className='text-center p-4'>99%</td>
                    <td className='text-center p-4'>99.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='container py-20 px-4'>
        <div className='max-w-3xl mx-auto'>
          <FadeIn delay={0.1}>
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Control Center Insights
              </h2>
              <p className='text-muted-foreground'>
                Everything you need to know about our pricing
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Accordion type='single' collapsible className='w-full'>
              {pricingData.faq.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className='text-left'>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground'>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container py-20 px-4 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10'>
        <div className='max-w-4xl mx-auto text-center'>
          <FadeIn delay={0.1}>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to Get Started?
            </h2>
            <p className='text-xl text-muted-foreground mb-8'>
              Join thousands of companies already using TecNoBand to manage
              their IoT infrastructure
            </p>
            <div className='flex gap-4 justify-center flex-wrap'>
              <Button asChild size='lg'>
                <Link href='/auth/signup'>Start Free Trial</Link>
              </Button>
              <Button asChild variant='outline' size='lg'>
                <Link href='/contact'>Contact Sales</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </MarketingLayout>
  );
}
