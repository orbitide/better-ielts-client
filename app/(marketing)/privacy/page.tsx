export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: June 2025</p>

          <h2 className="text-xl font-bold mt-10 mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Better IELTS ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and the choices you have. By using our platform, you agree to the practices described here.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">What we collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We collect information you provide directly — such as your name, email address, and payment details when you register or subscribe. We also collect usage data automatically: pages visited, test scores, practice session lengths, and device/browser information. This helps us understand how the platform is used and where it can be improved.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">How we use your data</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use your data to deliver and personalise the service — for example, tracking your progress, recommending practice activities, and saving your test results. We also use it to process payments, send transactional emails (such as receipts and password resets), and improve the platform based on aggregate usage patterns.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            With your consent, we may send you product updates and IELTS preparation tips. You can opt out of marketing emails at any time via the unsubscribe link in any email or through your account settings.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Data sharing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We do not sell your personal data. We share it only with trusted third-party service providers who help us operate the platform — such as payment processors, email delivery services, and cloud infrastructure providers. These providers are contractually obligated to handle your data securely and only for the purposes we specify.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may disclose data if required by law or to protect the rights, property, or safety of Better IELTS, our users, or the public.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how you use the platform. For full details, see our{' '}
            <a href="/cookies" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
              Cookie Policy
            </a>
            .
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Data retention</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We keep your account data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where we are required to retain it for legal or financial compliance purposes.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Your rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Depending on your location, you may have the right to access, correct, or delete the personal data we hold about you. You may also have the right to restrict or object to certain processing, or to request a copy of your data in a portable format. To exercise any of these rights, contact us at the address below.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Contact</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have questions about this Privacy Policy or how we handle your data, please contact us at{' '}
            <a href="mailto:privacy@betterielts.com" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
              privacy@betterielts.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
