# Code Style and Conventions

## Component Structure
- Use TypeScript interfaces for props (defined above component)
- Default exports for components
- Components are functional components (not class-based)

## Naming Conventions
- PascalCase for component names and files (e.g., `QuickInfoBar.tsx`)
- camelCase for variables and functions
- Props interfaces named as `{ComponentName}Props`

## Styling
- Tailwind CSS classes for all styling
- Inline SVG icons (not external icon libraries)
- Ocean color scheme for brand consistency
- Responsive design with mobile-first approach

## TypeScript
- Explicit type annotations for props
- Optional props marked with `?`

## File Organization
- Components in `/components` directory
- No subdirectories for components currently
