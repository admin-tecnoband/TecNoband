"use client";

import type React from "react";

import { MarketingLayout } from "@/components/marketing/marketing-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast as shadToast } from "@/hooks/use-toast";
import siteData from "@/data/site-data.json";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const siteKey =
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
      (window as any).NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    // load grecaptcha script for v3
    const id = "recaptcha-v3-script";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // keep script for other pages; no cleanup required
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Acquire reCAPTCHA token
      const siteKey =
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
        (window as any).NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      let token = undefined;

      if (siteKey && (window as any).grecaptcha) {
        token = await (window as any).grecaptcha.execute(siteKey, {
          action: "contact",
        });
      }

      const supabase = getSupabaseBrowserClient();

      // Build body and only include recaptchaToken when it's available.
      const body: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      };
      if (token) body.recaptchaToken = token;

      const { data, error } = await supabase.functions.invoke("contact-form", {
        body,
      });

      if (error) {
        console.error("Supabase function error:", error);
        shadToast({
          title: "Failed to send message",
          description: "Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data?.error) {
        console.error("Function returned error:", data.error);
        shadToast({
          title: "Failed to send message",
          description: String(data.error),
          variant: "destructive",
        });
        return;
      }

      // Success
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      shadToast({
        title: "Message sent",
        description: data?.message || "We'll get back to you within 24 hours.",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Unexpected error:", err);
      shadToast({
        title: "An unexpected error occurred",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className='w-full py-24 md:py-32 relative overflow-hidden'>
        {/* Background image and animated gradient (homepage-style) */}
        <div className='absolute inset-0 bg-[url("/images/contact.webp")] bg-cover bg-center bg-no-repeat opacity-15' />
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-primary/10 to-background bg-[length:200%_100%]'
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse",
          }}
        />
        <div className='mx-auto max-w-4xl text-center space-y-8 relative z-10'>
          <FadeIn delay={0.1}>
            <Badge variant='secondary' className='mb-4 shadow-glow'>
              {siteData.contact?.hero?.badge ?? "Contact Us"}
            </Badge>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-balance'>
              {siteData.contact?.hero?.titlePrefix ?? "Get in"}{" "}
              <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow'>
                {siteData.contact?.hero?.titleHighlight ?? "Touch"}
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className='text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed'>
              {siteData.contact?.hero?.subtitle ??
                "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className='container py-24'>
        <div className='mx-auto max-w-6xl'>
          <StaggerContainer
            staggerDelay={0.15}
            className='grid md:grid-cols-2 gap-12'
          >
            {/* Contact Form */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className='border-primary/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity' />
                  <div className='absolute inset-0  bg-center opacity-5' />

                  <CardHeader className='relative z-10'>
                    <CardTitle className='text-2xl'>
                      {siteData.contact?.form?.title ?? "Send us a message"}
                    </CardTitle>
                    <CardDescription>
                      {siteData.contact?.form?.description ??
                        "Fill out the form below and we'll get back to you within 24 hours"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='relative z-10'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                          id='name'
                          placeholder={
                            siteData.contact?.form?.placeholders?.name ??
                            "John Doe"
                          }
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          placeholder={
                            siteData.contact?.form?.placeholders?.email ??
                            "john@example.com"
                          }
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='company'>Company</Label>
                        <Input
                          id='company'
                          placeholder={
                            siteData.contact?.form?.placeholders?.company ??
                            "Acme Inc."
                          }
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='message'>Message</Label>
                        <Textarea
                          id='message'
                          placeholder={
                            siteData.contact?.form?.placeholders?.message ??
                            "Tell us about your IoT needs..."
                          }
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        transition={{ type: "spring", stiffness: 250 }}
                      >
                        <Button
                          type='submit'
                          className='w-full shadow-glow-lg'
                          disabled={isSubmitting || submitted}
                        >
                          {isSubmitting
                            ? "Sending..."
                            : submitted
                            ? "Message Sent!"
                            : "Send Message"}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>

            {/* Contact Info */}
            <StaggerItem>
              <div className='space-y-6'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card className='border-primary/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity' />
                    <CardContent className='pt-6 relative z-10'>
                      <div className='flex gap-4'>
                        <motion.div
                          whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                          transition={{ duration: 0.6 }}
                          className='flex-shrink-0'
                        >
                          <div className='h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/30'>
                            <Mail className='h-6 w-6 text-primary' />
                          </div>
                        </motion.div>
                        <div className='space-y-1'>
                          <h3 className='font-semibold text-lg'>Email</h3>
                          {(
                            siteData.contact?.info?.emails ?? [
                              "support@tecnoband.com",
                            ]
                          ).map((e: string, i: number) => (
                            <p
                              key={i}
                              className='text-sm text-muted-foreground'
                            >
                              {e}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card className='border-secondary/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                    <div className='absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity' />
                    <CardContent className='pt-6 relative z-10'>
                      <div className='flex gap-4'>
                        <motion.div
                          whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                          transition={{ duration: 0.6 }}
                          className='flex-shrink-0'
                        >
                          <div className='h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center shadow-lg shadow-secondary/30'>
                            <Phone className='h-6 w-6 text-secondary' />
                          </div>
                        </motion.div>
                        <div className='space-y-1'>
                          <h3 className='font-semibold text-lg'>Phone</h3>
                          <p className='text-sm text-muted-foreground'>
                            {siteData.contact?.info?.phone ??
                              "+1 (555) 123-4567"}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {siteData.contact?.info?.hours ??
                              "Mon-Fri 9am-6pm EST"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card className='border-accent/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                    <div className='absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity' />
                    <CardContent className='pt-6 relative z-10'>
                      <div className='flex gap-4'>
                        <motion.div
                          whileHover={{ rotate: 2, scale: 1.06, y: -2 }}
                          transition={{ duration: 0.6 }}
                          className='flex-shrink-0'
                        >
                          <div className='h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-lg shadow-accent/30'>
                            <MapPin className='h-6 w-6 text-accent' />
                          </div>
                        </motion.div>
                        <div className='space-y-1'>
                          <h3 className='font-semibold text-lg'>Office</h3>
                          <p className='text-sm text-muted-foreground'>
                            {siteData.contact?.info?.office?.line1 ??
                              "123 Tech Street"}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {siteData.contact?.info?.office?.city ??
                              "San Francisco, CA 94105"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='container py-24 relative overflow'>
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background'
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className='absolute inset-0  bg-center opacity-5' />

        {/* Decorative Elements */}
        <div className='absolute top-10 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse' />

        <div className='mx-auto max-w-4xl relative z-10'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-16'>
              <Badge variant='outline' className='mb-2 border-primary/50'>
                Frequently Asked Questions
              </Badge>
              <h2 className='text-3xl md:text-5xl font-bold'>
                Got Questions? We&apos;ve Got Answers
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Find answers to common questions about our IoT platform and
                services
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className='border-primary/30 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent' />
                <CardContent className='pt-6 pb-6 relative z-10'>
                  <Accordion type='single' collapsible className='w-full'>
                    {(siteData.contact?.faq ?? []).length > 0 ? (
                      (
                        siteData.contact.faq as Array<{
                          question: string;
                          answer: string;
                        }>
                      ).map((f, idx) => (
                        <AccordionItem key={idx} value={`item-${idx + 1}`}>
                          <AccordionTrigger className='text-left'>
                            {f.question}
                          </AccordionTrigger>
                          <AccordionContent>{f.answer}</AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      // fallback static content
                      <>
                        <AccordionItem value='item-1'>
                          <AccordionTrigger className='text-left'>
                            What is TecNoBand and how does it work?
                          </AccordionTrigger>
                          <AccordionContent>
                            TecNoBand is an AI-powered IoT device management
                            platform that helps enterprises monitor, control,
                            and optimize their connected devices at scale. Our
                            platform uses machine learning to provide predictive
                            maintenance, real-time analytics, and automated
                            device management.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='item-2'>
                          <AccordionTrigger className='text-left'>
                            How secure is the TecNoBand platform?
                          </AccordionTrigger>
                          <AccordionContent>
                            Security is our top priority. We employ
                            enterprise-grade encryption, multi-factor
                            authentication, role-based access control, and
                            regular security audits. All data is encrypted in
                            transit and at rest, and we comply with industry
                            standards including SOC 2, GDPR, and ISO 27001.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='item-3'>
                          <AccordionTrigger className='text-left'>
                            What types of IoT devices are supported?
                          </AccordionTrigger>
                          <AccordionContent>
                            TecNoBand supports a wide range of IoT devices
                            including sensors, actuators, gateways, and edge
                            computing devices. We offer SDKs for major IoT
                            protocols (MQTT, CoAP, HTTP) and can integrate with
                            custom devices through our flexible API framework.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='item-4'>
                          <AccordionTrigger className='text-left'>
                            What kind of support do you offer?
                          </AccordionTrigger>
                          <AccordionContent>
                            We offer multiple support tiers: Basic (email
                            support with 24-48 hour response), Professional
                            (priority email and chat with 12-hour response), and
                            Enterprise (24/7 phone, email, and chat support with
                            dedicated account manager and 1-hour SLA). All plans
                            include access to our comprehensive documentation
                            and community forums.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='item-5'>
                          <AccordionTrigger className='text-left'>
                            Can I try TecNoBand before committing?
                          </AccordionTrigger>
                          <AccordionContent>
                            Yes! We offer a 14-day free trial with full access
                            to all platform features. No credit card required.
                            You can connect up to 10 devices and explore all
                            capabilities including AI analytics, predictive
                            maintenance, and real-time monitoring. Our team is
                            available to help you get started.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='item-6'>
                          <AccordionTrigger className='text-left'>
                            How does pricing work?
                          </AccordionTrigger>
                          <AccordionContent>
                            Our pricing is based on the number of connected
                            devices and features you need. We offer flexible
                            plans starting from $99/month for small deployments
                            up to custom enterprise pricing for large-scale
                            operations. Volume discounts are available, and we
                            offer annual payment options with additional
                            savings.
                          </AccordionContent>
                        </AccordionItem>
                      </>
                    )}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className='container py-24'>
        <div className='mx-auto max-w-6xl'>
          <FadeIn delay={0.1}>
            <div className='text-center space-y-4 mb-12'>
              <Badge variant='outline' className='mb-2 border-secondary/50'>
                Visit Us
              </Badge>
              <h2 className='text-3xl md:text-5xl font-bold'>Our Location</h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Find us in the heart of San Francisco&apos;s tech district
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className='border-primary/30 py-0 shadow-glow hover:shadow-glow-lg transition-all relative overflow-hidden bg-background/80 backdrop-blur-sm'>
                <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity' />
                <CardContent className='p-4 relative z-10'>
                  <div className='aspect-video w-full overflow-hidden rounded-lg'>
                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0198535619877!2d-122.39914368468213!3d37.79245097975753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c4e3b9c07%3A0x3b0d8f5b5b5b5b5b!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s'
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      allowFullScreen
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                      title='TecNoBand Office Location'
                      className='w-full h-full'
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </MarketingLayout>
  );
}
