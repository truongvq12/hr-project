# Vue 3 Template

A modern, production-ready Vue 3 project template with TypeScript, Vite, Pinia, and Vue Router.

## 🚀 Features

- ⚡ **Vite** - Lightning fast build tool and dev server
- 🔷 **TypeScript** - Full TypeScript support for better development experience
- 🗃️ **Pinia** - Modern state management for Vue applications
- 🛣️ **Vue Router** - Official router for Vue.js applications
- 🎨 **Modern CSS** - Clean, responsive design with utility classes
- 📦 **ESLint** - Code linting and formatting
- 🔧 **Pre-configured** - Ready to use with sensible defaults

## 📁 Project Structure

```
src/
├── components/     # Reusable Vue components
│   └── CounterDemo.vue
├── views/         # Page components
│   ├── Home.vue
│   └── About.vue
├── router/        # Vue Router configuration
│   └── index.ts
├── stores/        # Pinia stores
│   └── counter.ts
├── assets/        # Static assets
│   └── css/
│       └── main.css
├── utils/         # Utility functions
│   ├── api.ts
│   └── helpers.ts
├── types/         # TypeScript type definitions
│   └── index.ts
├── App.vue        # Root component
└── main.ts        # Application entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this template
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 What's Included

### State Management
- Pinia store example with counter functionality
- Reactive state with computed properties
- Actions for state mutations

### Routing
- Vue Router setup with basic routes
- Navigation component with active link highlighting
- Route-based code splitting ready

### Styling
- Modern CSS with utility classes
- Responsive design
- Clean, professional appearance
- Component-scoped styles

### TypeScript
- Full TypeScript configuration
- Type definitions for common patterns
- Type-safe API client
- Utility functions with proper typing

### API Integration
- Axios-based API client
- Request/response interceptors
- Error handling
- Authentication token management

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/views/`
2. Add the route in `src/router/index.ts`
3. Add navigation link in `src/App.vue`

### Adding New Components
1. Create component in `src/components/`
2. Import and use in your views or other components

### Adding New Stores
1. Create a new store in `src/stores/`
2. Use `defineStore` from Pinia
3. Import and use in your components

### Styling
- Global styles: `src/assets/css/main.css`
- Component styles: Use `<style scoped>` in Vue components
- Utility classes are available for common patterns

## 📦 Dependencies

### Core
- Vue 3.4+
- TypeScript 5.3+
- Vite 5.0+

### State Management
- Pinia 2.1+

### Routing
- Vue Router 4.2+

### HTTP Client
- Axios 1.6+

### Development Tools
- ESLint
- Vue TSC
- @vitejs/plugin-vue

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Vite team for the excellent build tool
- Pinia team for the state management solution
- All contributors and the Vue community

---

**Happy coding! 🎉**
