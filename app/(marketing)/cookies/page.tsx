export const metadata = { title: 'Cookie Policy' }

export default function CookiesPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: June 2025</p>

          <h2 className="text-xl font-bold mt-10 mb-3">What are cookies?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites work efficiently and to provide information to site owners. Cookies cannot run programs or deliver viruses to your device.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">How we use cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Better IELTS uses cookies to keep you signed in between sessions, remember your preferences (such as dark mode), and understand how the platform is used so we can improve it. Some cookies are set by us directly; others are set by third-party services we use.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Types of cookies we use</h2>
          <div className="space-y-4 mb-4">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold mb-1">Strictly necessary</h3>
              <p className="text-sm text-muted-foreground">
                Required for the platform to function. These include session cookies that keep you logged in and security tokens that protect your account. These cannot be disabled.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold mb-1">Functional</h3>
              <p className="text-sm text-muted-foreground">
                Remember your preferences — such as your chosen theme, language, and notification settings — so you don't have to re-configure them on every visit.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold mb-1">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Help us understand how users interact with the platform (pages visited, features used, errors encountered) so we can improve the experience. Data collected is aggregated and anonymised.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">Managing cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You can control and delete cookies through your browser settings. Most browsers allow you to refuse new cookies, delete existing cookies, or be notified when a new cookie is set. Note that disabling cookies may affect the functionality of the platform — for example, you may need to sign in on every visit.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For instructions on managing cookies, refer to your browser's help documentation (Chrome, Firefox, Safari, Edge).
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Contact</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have questions about our use of cookies, contact us at{' '}
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
