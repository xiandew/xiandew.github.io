# xiandew.github.io

Modern personal website and blog built with **Astro** and **Tailwind CSS**.

## 🚀 Why Astro?

Migrated from Jekyll to Astro for:
- ⚡ **Zero Ruby dependencies** - No more bundle install issues
- 🏃 **Lightning fast builds** - 10x faster than Jekyll
- 📝 **Native markdown support** - Same `.md` files, better DX
- 🎨 **Built-in Tailwind CSS** - No CDN needed
- 🔧 **Modern tooling** - TypeScript, Vite, and more
- 📦 **Simple deployment** - GitHub Actions handles everything

## 🎨 Design Features

- **Modern, Card-Based UI** inspired by Ali Abdaal's website
- **Teal/Cyan color scheme** with dark backgrounds
- **Fully responsive** mobile-first design
- **Fast & Lightweight** with optimized assets
- **Blog-ready** with markdown posts and categories

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start dev server with hot reload
pnpm dev
```

Visit http://localhost:4321

### Build for Production

```bash
# Create optimized production build
pnpm build

# Preview production build locally
pnpm preview
```

## 📝 Adding Blog Posts

Blog posts are markdown files in `src/content/blog/`.

### File Naming

Posts must follow: `YYYY-MM-DD-title.md`

Example: `2026-01-25-my-awesome-post.md`

### Post Template

```markdown
---
title: 'Your Post Title'
description: 'A brief description of your post'
pubDate: 2026-01-25
author: 'Your Name'
tags: ['technology', 'tutorial']
---

Your content starts here. You can use all markdown features.

## Headings

- Bullet points
- More points

**Bold text** and *italic text*

\`\`\`javascript
// Code blocks with syntax highlighting
console.log('Hello, world!');
\`\`\`
```

## 🎨 Customization

### Colors

Edit `tailwind.config.mjs` to change the color scheme:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#14b8a6',    // Teal
        secondary: '#0891b2',  // Cyan
        accent: '#06b6d4',
      }
    }
  }
}
```

### Site Settings

Edit `src/consts.ts` for site-wide settings:

```typescript
export const SITE_TITLE = 'Your Name';
export const SITE_DESCRIPTION = 'Your bio';
```

## 📁 Project Structure

```
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/
│   │   └── blog/       # Blog posts (markdown)
│   ├── layouts/        # Page templates
│   ├── pages/          # Routes
│   └── styles/         # Global styles
├── public/             # Static assets
├── astro.config.mjs    # Astro configuration
└── package.json        # Dependencies
```

## 🌐 Deployment

### GitHub Pages (Automatic)

The site automatically deploys when you push to `main`:

1. Push your changes:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

2. GitHub Actions builds and deploys automatically
3. Your site will be live at `https://yourusername.github.io`

### First-Time Setup

1. Go to repository **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. That's it! The workflow will handle everything

## 🛠 Technologies

- **[Astro](https://astro.build)** - Static site framework
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[MDX](https://mdxjs.com/)** - Markdown with components
- **[pnpm](https://pnpm.io/)** - Fast package manager

## 📦 Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm astro add` | Add integrations |

## 🔄 Migration from Jekyll

All your Jekyll posts from `_posts/` have been migrated to `src/content/blog/`. The site is now:

- ✅ Faster to build
- ✅ Easier to develop
- ✅ No Ruby dependencies
- ✅ Modern tooling
- ✅ Same great content!

Old Jekyll backup: `jekyll-backup-YYYYMMDD.tar.gz`

---

Built with ❤️ using Astro and Tailwind CSS
