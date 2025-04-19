// src/index.ts
export { CourseCatalogue } from './react/CourseCatalogue';
export { CourseCatalogueCore } from './core/services';
export type { CatalogueConfig, GeoHit, TypesenseConfig } from './core/types';
export { default as App } from './demo/App';

// Add these exports to make subpath imports unnecessary
export { LocaleProvider } from './i18n/LocalContext';
export type { Locale } from './i18n/translations';
