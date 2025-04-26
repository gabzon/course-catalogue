// This file serves as a dedicated entry point for ESM builds
import CourseCatalogueWebComponent from './webComponent';

// Make sure the web component is registered
if (typeof window !== 'undefined' && !customElements.get('course-catalogue')) {
  customElements.define('course-catalogue', CourseCatalogueWebComponent);
}

export default CourseCatalogueWebComponent;