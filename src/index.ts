// src/index.ts
export { CourseCatalogue } from './react/CourseCatalogue';
export { CourseCatalogueCore } from './core/services';
export type { CatalogueConfig, GeoHit, TypesenseConfig } from './core/types';
export { default as App } from './demo/App';

// Add these exports to make subpath imports unnecessary
export { LocaleProvider } from './i18n/LocalContext';
export type { Locale } from './i18n/translations';

// Make sure to export map-related components
export { CoursesMap } from './react/components/Map';
export type { MapConfig } from './react/components/Map/types';

// Export the web component directly
export { default as CourseCatalogueWebComponent } from './webComponent';

// Optionally, also export the React component if you want to use it directly
export { CourseCatalogueComponent } from './webComponent';
