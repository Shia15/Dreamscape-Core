# Security Policy

We take the security of the AETHER ecosystem seriously. Thank you for responsibly disclosing vulnerabilities.

## Supported Versions

| Version / Branch | Supported |
|------------------|-----------|
| `main`           | ✅        |
| `v1.x`           | ✅        |
| `< v1.0`         | ❌        |

> We backport critical fixes to `v1.x` when feasible. Otherwise, update to the latest release.

## Reporting a Vulnerability (Private)

- **Preferred:** Use GitHub’s **Private Vulnerability Report** (“Security” tab → *Report a vulnerability*).  
- **Alternate:** Email `security@<your-domain>` (PGP optional; see below).  
- **Please do not** open public issues for vulnerabilities.

### What to include
- Affected repo and commit/Tag (e.g., `Shia15/Dreamscape-Core@abcdef1`)
- Impact & severity (data exposure, RCE, DoS, etc.)
- Steps to reproduce / PoC (minimal)
- Any known mitigations or workarounds

### Our process & timelines
- **Triage SLA:** 3 business days to acknowledge; status updates at least weekly.
- **Fix SLA (targets):**
  - Critical/High: 7–30 days
  - Medium: 30–60 days
  - Low/Informational: 90 days or next minor
- We coordinate a release and publish an advisory. We credit reporters by default (opt out if you prefer).

### CVEs
We use **GitHub Security Advisories** to coordinate fixes and will request a **CVE ID** when appropriate.

### Safe Harbor
Good-faith security research is welcome. As long as you:
- Do not access, modify, or exfiltrate data you do not own
- Do not degrade or disrupt service for others
- Respect rate limits and privacy
- Give us reasonable time to remediate before public disclosure

…we will not pursue legal action. Bug bounty **not offered** at this time.

### In Scope / Out of Scope

**In scope**
- This repository and the related AETHER repos:
  - `Shia15/Dreamscape-Core` (this repo)
  - `Dreamscape-Core/mari-core`
  - `Dreamscape-Core/aether-core`
  - `Dreamscape-Core/aether-frontend`
- Build and release pipelines (GitHub Actions)

**Out of scope (examples)**
- Issues requiring physical access or social engineering
- Self-XSS and clickjacking without a demonstrated impact
- Missing security headers on non-production or static preview builds
- Vulnerabilities in third-party dependencies with no exploitable path

### Optional Encryption
If you prefer encrypted email, publish a PGP key and list it here:

