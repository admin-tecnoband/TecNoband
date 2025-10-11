import { MarketingLayout } from "@/components/marketing/marketing-layout"

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <div className="container py-24 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 15, 2024</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to TecNoBand. We respect your privacy and are committed to protecting your personal data. This
                privacy policy will inform you about how we look after your personal data when you visit our website or
                use our services and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Data We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped
                together as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Identity Data: first name, last name, username or similar identifier</li>
                <li>Contact Data: email address, telephone numbers, billing address</li>
                <li>Technical Data: IP address, browser type and version, device information</li>
                <li>Usage Data: information about how you use our website and services</li>
                <li>Device Data: information from IoT devices you connect to our platform</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal
                data in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally
                lost, used or accessed in an unauthorized way, altered or disclosed. We use industry-standard encryption
                and security protocols to protect your data both in transit and at rest.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it
                for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Your Legal Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Under certain circumstances, you have rights under data protection laws in relation to your personal
                data, including the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                privacy@tecnoband.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
