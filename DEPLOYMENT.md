# Deployment Guide - Knights & Knaves Puzzle Quest

This guide covers how to deploy your game to various hosting platforms.

## Prerequisites

- Node.js 16+ and pnpm installed
- Git repository initialized
- GitHub account (for most platforms)

## Build for Production

First, build the web version:

```bash
pnpm run build
```

This creates a `dist/` folder with the optimized production build.

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Benefits:**
- Free tier with generous limits
- Automatic deployments from Git
- Fast CDN
- Built-in analytics

**Steps:**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Select "Expo" as the framework
6. Click "Deploy"

**Configuration:**
- Vercel automatically detects `vercel.json`
- Build command: `pnpm run build`
- Output directory: `dist`

**Custom Domain:**
1. Go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration steps

### 2. Netlify

**Benefits:**
- Free tier
- Simple Git integration
- Form handling
- Serverless functions

**Steps:**

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Configuration:**
- Netlify automatically detects `netlify.toml`
- Environment variables can be set in site settings

**Custom Domain:**
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS setup

### 3. GitHub Pages

**Benefits:**
- Free
- Integrated with GitHub
- No external account needed

**Steps:**

1. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/knights-and-knaves-game"
}
```

2. Install gh-pages:
```bash
pnpm add -D gh-pages
```

3. Add deploy scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
pnpm run deploy
```

5. Enable GitHub Pages:
   - Go to repository settings
   - Scroll to "GitHub Pages"
   - Select `gh-pages` branch as source

### 4. Firebase Hosting

**Benefits:**
- Free tier
- Real-time database ready
- CDN included
- SSL by default

**Steps:**

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase init hosting
```

3. Configure:
   - Public directory: `dist`
   - Configure as single-page app: `Yes`

4. Build and deploy:
```bash
pnpm run build
firebase deploy
```

### 5. AWS S3 + CloudFront

**Benefits:**
- Highly scalable
- Global CDN
- Pay-as-you-go

**Steps:**

1. Create S3 bucket
2. Enable static website hosting
3. Upload `dist/` contents
4. Create CloudFront distribution
5. Point to S3 bucket

### 6. Docker + Any Server

**Create Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
```

**Build and run:**

```bash
docker build -t knights-knaves .
docker run -p 3000:3000 knights-knaves
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update with your values:

```
EXPO_PUBLIC_APP_NAME=Knights & Knaves Puzzle Quest
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_DEBUG_MODE=false
```

## Performance Optimization

### Before Deployment

1. **Minify assets:**
```bash
pnpm run build
```

2. **Check bundle size:**
```bash
pnpm run analyze
```

3. **Test production build locally:**
```bash
pnpm run build
pnpm run serve
```

### After Deployment

1. **Enable GZIP compression** on your server
2. **Set cache headers** for static assets
3. **Use CDN** for faster global delivery
4. **Monitor performance** with tools like:
   - Google PageSpeed Insights
   - Lighthouse
   - WebPageTest

## SSL/HTTPS

All modern hosting platforms provide free SSL:
- Vercel: Automatic
- Netlify: Automatic
- GitHub Pages: Automatic
- Firebase: Automatic
- AWS: Use ACM (AWS Certificate Manager)

## Monitoring & Analytics

### Built-in Options

1. **Vercel Analytics**: Included in Vercel
2. **Netlify Analytics**: Available in paid plans
3. **Google Analytics**: Add to your app

### Custom Monitoring

Add error tracking:

```bash
pnpm add @sentry/react
```

## Database & Backend (Future)

When ready to add backend features:

1. **Firebase Realtime Database** - Easy setup
2. **Supabase** - PostgreSQL + Auth
3. **MongoDB Atlas** - NoSQL option
4. **AWS DynamoDB** - Serverless

## Domain Setup

### Popular Domain Registrars

- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### DNS Configuration

Point your domain to your hosting:

**For Vercel:**
```
A Record: 76.76.19.0
CNAME: cname.vercel-dns.com
```

**For Netlify:**
```
CNAME: your-site.netlify.app
```

**For GitHub Pages:**
```
A Record: 185.199.108.153
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Troubleshooting

### Build fails

```bash
# Clear cache
rm -rf node_modules dist .next
pnpm install
pnpm run build
```

### Blank page after deployment

1. Check browser console for errors
2. Verify `dist/index.html` exists
3. Check routing configuration
4. Ensure environment variables are set

### Slow performance

1. Enable compression
2. Optimize images
3. Use CDN
4. Check bundle size
5. Enable caching

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Enable CORS if needed
- [ ] Validate user input
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities

## Rollback

If deployment fails:

```bash
# Vercel
vercel rollback

# Netlify
# Use Netlify UI to select previous deploy

# GitHub Pages
# Push previous commit or revert
```

## Support

For platform-specific help:

- **Vercel**: https://vercel.com/docs
- **Netlify**: https://docs.netlify.com
- **GitHub Pages**: https://pages.github.com
- **Firebase**: https://firebase.google.com/docs

---

**Happy deploying! 🚀**
