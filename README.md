# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional layout with dark mode support
- **Responsive**: Optimized for all device sizes
- **Fast Loading**: Optimized images and lazy loading
- **Smooth Animations**: Framer Motion animations throughout
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessible**: WCAG compliant design

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── utils/              # Utility functions
├── data/               # Static data files
└── assets/             # Images and static assets
```

## 🎨 Pages

- **Home**: Hero section with introduction and quick navigation
- **About**: Personal background, skills, and technical expertise
- **Experience**: Professional work history and achievements
- **Projects**: Showcase of development projects with filtering
- **Blog**: Technical articles and thoughts
- **Photography**: Personal photography gallery
- **RSS**: Blog feed and subscription

## 🖼️ Image Optimization

To ensure fast loading times, please optimize your images before adding them:

### For Project Images (`public/projects/photos/`)
- **Format**: PNG or WebP preferred
- **Size**: Maximum 800x600px
- **File Size**: Keep under 200KB
- **Compression**: Use tools like TinyPNG or ImageOptim

### For Photography (`public/photos/`)
- **Format**: JPEG or WebP
- **Size**: Maximum 1200x800px for thumbnails
- **File Size**: Keep under 500KB per image
- **Compression**: 80-85% quality is usually sufficient

### Optimization Tools
- **Online**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **CLI**: `imagemin`, `sharp-cli`
- **Batch**: Use ImageOptim (Mac) or similar tools

### Current Issues
Some images are currently 3-6MB which causes slow loading. Run this command to optimize:

```bash
# Example using imagemin-cli
npx imagemin public/photos/**/*.{jpg,jpeg,png} --out-dir=public/photos/optimized --plugin=imagemin-mozjpeg --plugin=imagemin-pngquant
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/burakintisah/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

The site is automatically deployed to GitHub Pages using **GitHub Actions** when changes are pushed to the main branch.

**Live Site**: [https://burakintisah.com](https://burakintisah.com)

### Automatic Deployment (GitHub Actions)

Every push to `main` triggers automatic deployment. See [Deployment Guide](.github/DEPLOYMENT.md) for setup details.

### Manual Deployment (Legacy - Not Recommended)
```bash
npm run deploy  # Uses gh-pages package (old method)
```

**Note**: GitHub Actions deployment is now the recommended method.

## 📝 Content Management

### Adding Projects
Edit `src/pages/Projects.tsx` and add your project to the `projects` array:

```typescript
{
  id: 7,
  title: 'Your Project',
  description: 'Project description',
  tags: ['React', 'Node.js'],
  imageUrl: 'projects/photos/your-project.png',
  githubUrl: 'https://github.com/username/repo',
  liveUrl: 'https://your-project.com'
}
```

### Adding Photos
1. Add images to `public/photos/[category]/`
2. Update `src/data/photoManifest.ts`
3. Ensure images are optimized (see Image Optimization section)

### Updating Experience
Edit `src/pages/Experience.tsx` to add new work experiences or update existing ones.

## 🎨 Customization

### Colors
The site uses a custom color palette defined in `tailwind.config.js`. Main colors:
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray shades
- **Accent**: Custom gradients

### Fonts
- **Headings**: Inter (font-bold)
- **Body**: Inter (font-normal)

### Dark Mode
Automatic dark mode support using Tailwind's `dark:` prefix. Toggle implemented in the header.

## 📱 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Image Optimization**: Lazy loading and WebP support
- **Code Splitting**: Automatic with Vite
- **Caching**: Service worker for offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: burak@intisah.com
- **LinkedIn**: [linkedin.com/in/burakintisah](https://linkedin.com/in/burakintisah)
- **GitHub**: [github.com/burakintisah](https://github.com/burakintisah)
- **Medium**: [@burakintisah](https://medium.com/@burakintisah) 