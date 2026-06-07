export const metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div className="py-12 min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: June 2025</p>

          <h2 className="text-xl font-bold mt-10 mb-3">Acceptance of terms</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            By accessing or using Better IELTS ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to update these terms at any time; continued use of the Service after changes are posted constitutes your acceptance of the revised terms.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Description of service</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Better IELTS is an online IELTS preparation platform offering practice tests, mock exams, courses, vocabulary tools, and related educational content. Some features are available free of charge; others require a paid subscription.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">User accounts</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You must create an account to access most features. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Please notify us immediately at{' '}
            <a href="mailto:support@betterielts.com" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
              support@betterielts.com
            </a>{' '}
            if you believe your account has been compromised.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You must be at least 13 years old to create an account. By registering, you confirm that the information you provide is accurate and up to date.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Acceptable use</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You agree to use the Service only for lawful purposes. You must not: share your account credentials with others; attempt to access areas of the platform you are not authorised to use; scrape, copy, or redistribute our content without written permission; upload or transmit any harmful, unlawful, or offensive material; or interfere with the operation of the Service.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Subscriptions and payments</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Paid subscriptions are billed on a recurring basis (monthly or annually) depending on the plan you select. All prices are shown in USD and are inclusive of applicable taxes where required. You may cancel your subscription at any time from your account settings; access continues until the end of the current billing period.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Refunds are available within 7 days of purchase if you have not completed more than 10% of the content included in your plan. To request a refund, contact{' '}
            <a href="mailto:support@betterielts.com" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
              support@betterielts.com
            </a>
            .
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Intellectual property</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            All content on the Service — including practice questions, mock tests, courses, audio recordings, written materials, and software — is owned by or licensed to Better IELTS and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our prior written consent.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Disclaimers</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Service is provided "as is" without warranties of any kind, express or implied. We do not guarantee that use of the platform will result in a specific IELTS band score. IELTS is a registered trademark of the British Council, IDP: IELTS Australia, and Cambridge Assessment English; Better IELTS is not affiliated with or endorsed by these organisations.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Limitation of liability</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To the fullest extent permitted by law, Better IELTS shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability for any claim related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Governing law</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Contact</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For questions about these Terms, please contact us at{' '}
            <a href="mailto:legal@betterielts.com" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
              legal@betterielts.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
