// This file serves as a dedicated entry point for UMD builds
import CourseCatalogueWebComponent from './webComponent';

// Add type declaration for the global window object
declare global {
  interface Window {
    CorazonCourseCatalogue: any;
    process?: any;
  }
}

// Polyfill for process.env in browser environments
if (typeof window !== 'undefined' && !window.process) {
  window.process = { env: { NODE_ENV: 'production' } };
}

// Make sure the web component is registered
if (!customElements.get('course-catalogue')) {
  customElements.define('course-catalogue', CourseCatalogueWebComponent);
}

// Add a global hook for debugging
if (typeof window !== 'undefined') {
  window.CorazonCourseCatalogue = CourseCatalogueWebComponent;
}

// Export the web component
export default CourseCatalogueWebComponent;