import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/study-plan',
          '/reading/',
          '/listening/',
          '/writing/',
          '/speaking/',
          '/mock-test/',
          '/vocabulary/',
          '/lesson/',
          '/account',
          '/settings',
          '/subscription',
          '/support',
          '/call',
          '/onboarding',
        ],
      },
    ],
    sitemap: 'https://betterielts.com/sitemap.xml',
  }
}
