# Tag-it Security Audit & Actionable Recommendations

This report provides a security analysis of the **Tag-it** repository and deployed site at [https://tag-it-sigma.vercel.app](https://tag-it-sigma.vercel.app). It outlines steps to harden the repository codebase as well as configuration recommendations for the **Vercel Dashboard**.

---

## Executive Summary

Tag-it is a client-side browser-based watermark studio (processing images/videos locally via canvas/browser APIs). Because processing occurs in the user's browser without backend data persistence, client-side exposure and frontend security headers form the primary defense surface.

---

## 1. Repository Security Recommendations

### A. Environment & Secret Management
1. **Ensure `.gitignore` is properly configured:**
   - Exclude `.env`, `.env.local`, `.env.production`, `.env*.local`, `node_modules`, `.next`, and build artifacts.
2. **Enable Automated Secret Scanning:**
   - Enable GitHub Secret Scanning and Push Protection under Repository Settings > Code security and analysis.

### B. Dependency & Supply Chain Security
1. **Enable Dependabot & Security Alerts:**
   - Enable Dependabot Alerts and Dependabot Security Updates.
   - Run regular dependency audits (`npm audit` or `yarn audit`).
2. **Pin Dependencies & Lockfile Hygiene:**
   - Commit `package-lock.json` or `yarn.lock` to ensure reproducible, tamper-proof builds.

### C. Source Control & Access Controls
1. **Branch Protection Rules:**
   - Require pull request reviews before merging into `main`/`master`.
   - Require status checks to pass before merging.
   - Enforce signed commits if applicable.

### D. Security Headers in Application Code (`next.config.js` or `vercel.json`)
Currently, the live site returns `Access-Control-Allow-Origin: *` and lacks several standard HTTP security headers. Add the following security headers to `next.config.js` or `vercel.json`:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' data: blob:;",
          },
        ],
      },
    ];
  },
};
```

---

## 2. Vercel Dashboard Recommendations

To secure the deployment infrastructure, configure the following settings in the **Vercel Dashboard** (under Project Settings):

### A. Deployment Protection & Access Controls
1. **Vercel Authentication / Password Protection:**
   - Path: `Project Settings > Deployment Protection`
   - Recommendation: Enable **Vercel Authentication** or **Password Protection** for Preview Deployments to prevent public access or indexation of staging/PR builds.
2. **Disable Draft / Preview Indexing:**
   - Ensure header `X-Robots-Tag: noindex` is applied to non-production environments (enabled by default on Vercel Preview deployments).

### B. Environment Variables & Secret Scoping
1. **Scope Environment Variables Strictly:**
   - Path: `Project Settings > Environment Variables`
   - Recommendation: Separate variables into `Production`, `Preview`, and `Development`. Never expose secret keys to the browser (avoid prefixing secrets with `NEXT_PUBLIC_`).
2. **Sensitive Variable Protection:**
   - Enable "Sensitive" toggle on secret variables so they cannot be viewed in plain text in the Vercel UI by team members.

### C. Web Application Firewall (WAF) & DDoS Mitigation
1. **Attack Challenge Mode & DDoS Protection:**
   - Path: `Project Settings > Security / WAF`
   - Recommendation: Enable Vercel WAF rules and Attack Challenge Mode if suspicious traffic or automated scraping/abuse is detected.
2. **Rate Limiting & Directory Traversal Protection:**
   - Configure rate limiting rules for API routes if any backend endpoints are added in the future.

### D. Custom Domain, SSL/TLS, and HSTS
1. **Domain Configuration:**
   - Path: `Project Settings > Domains`
   - Recommendation: Ensure custom domain DNS is correctly pointed to Vercel (`cname.vercel-dns.com` or Vercel A records) with valid auto-renewing TLS certificates.
2. **HSTS Preload:**
   - Keep `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` enabled.

### E. Team Permissions & Audit Logs
1. **RBAC (Role-Based Access Control):**
   - Path: `Team Settings > Members`
   - Recommendation: Assign minimum necessary privileges (Viewer / Developer / Admin) to team members.
2. **Audit Logs:**
   - Periodically review Vercel Audit Logs for unauthorized domain changes, environment variable updates, or member additions.

---

## Conclusion & Next Steps
- Implement security headers in `next.config.js`.
- Review and restrict CORS headers (`Access-Control-Allow-Origin`).
- Apply the recommended Vercel Dashboard settings for Deployment Protection, WAF, and Environment Variable scoping.
