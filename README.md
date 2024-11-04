# Brameda Website

A high-performance business website showcasing clean code, modern development practices, and optimal user experience.

[![Powered by Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)

> ⭐ **99+ Lighthouse Score** | 🚀 **Sub-second Load Times** | 📱 **100% Responsive**

## Quick Links

[Technical Details](#-key-technical-highlights) | [Setup Guide](#-quick-start) | [Live Demo](http://www.brameda.lt)

## 🎯 Key Technical Highlights

- **Performance**: Static site generation, optimized images, 99+ Lighthouse score
- **Modern Stack**: TypeScript, Astro, Contentful headless CMS
- **Clean Code**: ESLint & Prettier, strict TypeScript configuration
- **CI/CD**: Automated deployments via GitHub Actions
- **Type Safety**: Full type coverage, content-type validation

## 🎓 Skills Demonstrated

- **Frontend**: TypeScript, HTML5, CSS3, Web Components
- **Architecture**: Static Site Generation, Headless CMS
- **DevOps**: CI/CD, GitHub Actions, FTP Deployment
- **Performance**: Image Optimization, Lighthouse Optimization
- **Best Practices**: Type Safety, Code Quality, SEO

## 💼 Business Features

- Responsive product catalog with variant selection
- Mobile-first design with custom navigation
- Integrated contact form with validation
- SEO optimized with automatic sitemap
- Content management through Contentful

## 🌐 Browser & Device Support

- **Desktop Browsers**:
  - Chrome (last 2 versions)
  - Firefox (last 2 versions)
  - Safari (last 2 versions)
  - Edge (last 2 versions)
- **Mobile**: Full responsive support for iOS and Android devices
- **Tablets**: Optimized layouts for iPad and Android tablets

## 🛠️ Implementation Details

### Architecture Decisions

- Static site generation for optimal performance
- Content management through Contentful for easy updates
- Type-safe environment variables for security
- Custom CSS architecture with CSS variables

### Key Files

- [GitHub Actions Workflow](.github/workflows/main.yml)
- [Contentful Client](src/lib/contentful/client.ts)
- [Contentful Constants](src/lib/contentful/constants.ts#L13)
- [Environment Schema](astro.config.mjs#L19)

## ⚡ Quick Start

```bash
git clone https://github.com/BMRicardas/brameda.git
cd brameda
npm install
# Configure environment variables (see "#-environment-variables")
npm run dev
```

## 📋 Detailed Setup

### Prerequisites

- Node.js (v20.0.0 or higher)
- npm (included with Node.js)
- A Contentful account with required content model
- A Web3Forms account

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
WEB3FORMS_PUBLIC_ACCESS_KEY=your_web3forms_key
```

## 📦 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── product/
│   │   └── ui/
│   ├── content/
│   ├── layouts/
│   ├── lib/
│   │   └── contentful/
│   ├── pages/
│   ├── schemas/
│   └── types/
├── public/
└── package.json
```

## 🔧 Configuration

### Contentful Setup

This project requires a Contentful space with the following content models:

- `Product`: Main product information
- `ProductVariants`: Product color and price variations

Required fields are detailed in the content model types at `src/types/contentful.types.ts`

### Form Setup

The contact form uses Web3Forms for processing. To set up:

1. Create an account at [Web3Forms](https://web3forms.com/)
2. Get your access key
3. Add it to your environment variables

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands
- `npm run compile` - Run TypeScript compiler
- `npm run lint` - Run all linting checks
- `npm run lint:fix` - Fix linting issues
- `npm run lint:code` - Run ESLint
- `npm run lint:format` - Run Prettier

### Type Safety

The project uses TypeScript and enforces strict type checking. Content types from Contentful are automatically typed using generated type definitions.

## 🚀 Building & Deployment

### Building

To create a production build:

```bash
npm run build
```

This will generate static files in the `dist/` directory.

### Deployment

The project uses GitHub Actions for automated FTP deployment:

- Triggers:
  - Push to main branch
  - Contentful content updates
  - Manual workflow dispatch

To set up deployment:

1. Add the following secrets to your GitHub repository:

```
GH_PAT
FTP_SERVER
FTP_USERNAME
FTP_PASSWORD
FTP_SERVER_PUBLIC_DIR
FTP_SERVER_PRIVATE_DIR
CONTENTFUL_SPACE_ID
CONTENTFUL_DELIVERY_TOKEN
CONTENTFUL_PREVIEW_TOKEN
WEB3FORMS_PUBLIC_ACCESS_KEY
```

2. Configure Contentful webhook to trigger GitHub Actions workflow

## 🔄 Content Updates

To update the website content:

1. Make changes in Contentful
2. Content changes will automatically trigger a rebuild and deployment
3. For code changes, push to the main branch to trigger deployment

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

For any questions or concerns, please find contact information on my portfolio webpage: [ricardas.io](https://ricardas.io/).

## ✨ Acknowledgments

- [Astro](https://astro.build/) for the amazing static site generator
- [Contentful](https://www.contentful.com/) for the headless CMS
- [Web3Forms](https://web3forms.com/) for form handling

## 📝 License

This project is proprietary software. All rights reserved.
