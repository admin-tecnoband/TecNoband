import { MarketingLayout } from "@/components/marketing/marketing-layout";

export default function TermsPage() {
  return (
    <MarketingLayout>
      <div className='container py-24 max-w-4xl'>
        <div className='space-y-8'>
          <div className='space-y-4'>
            <h1 className='text-4xl md:text-5xl font-bold'>
              Terms & Conditions
            </h1>
            <p className='text-muted-foreground'>
              Last updated: January 15, 2024
            </p>
          </div>

          <div className='prose prose-lg dark:prose-invert max-w-none space-y-8'>
            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>1. Agreement to Terms</h2>
              <p className='text-muted-foreground leading-relaxed'>
                By accessing or using TecNoBand&apos;s services, you agree to be
                bound by these Terms and Conditions. If you disagree with any
                part of these terms, you may not access the service.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>2. Use License</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Permission is granted to temporarily access and use
                TecNoBand&apos;s services for personal or commercial use. This
                is the grant of a license, not a transfer of title, and under
                this license you may not:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose without
                  authorization
                </li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>
                  Transfer the materials to another person or &quot;mirror&quot;
                  the materials on any other server
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>3. Service Description</h2>
              <p className='text-muted-foreground leading-relaxed'>
                TecNoBand provides an AI-powered IoT management platform that
                enables users to monitor, control, and analyze connected
                devices. We reserve the right to modify, suspend, or discontinue
                any part of the service at any time with or without notice.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>4. User Accounts</h2>
              <p className='text-muted-foreground leading-relaxed'>
                When you create an account with us, you must provide accurate,
                complete, and current information. Failure to do so constitutes
                a breach of the Terms. You are responsible for safeguarding your
                account password and for any activities or actions under your
                account.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>5. Acceptable Use</h2>
              <p className='text-muted-foreground leading-relaxed'>
                You agree not to use the service to:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any malicious code or viruses</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service or servers</li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>6. Payment Terms</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Certain aspects of the service may be provided for a fee. You
                agree to pay all fees associated with your account. All fees are
                non-refundable unless otherwise stated. We reserve the right to
                change our pricing with 30 days notice.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>
                7. Intellectual Property
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                The service and its original content, features, and
                functionality are owned by TecNoBand and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>
                8. Limitation of Liability
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                In no event shall TecNoBand, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>9. Termination</h2>
              <p className='text-muted-foreground leading-relaxed'>
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms. Upon termination,
                your right to use the service will immediately cease.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>
                10. Contact Information
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                If you have any questions about these Terms, please contact us
                at: legal@tecnoband.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
