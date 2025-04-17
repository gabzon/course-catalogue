// src/demo/App.tsx
import { CourseCatalogue } from '../react/CourseCatalogue';
import { CourseCatalogueCore } from '../core/services';

const typesenseConfig = {
  apiKey: import.meta.env.VITE_TYPESENSE_API_KEY,
  nodes: [
    {
      host: import.meta.env.VITE_TYPESENSE_HOST,
      port: parseInt(import.meta.env.VITE_TYPESENSE_PORT || '443'),
      protocol: import.meta.env.VITE_TYPESENSE_PROTOCOL || 'https'
    }
  ],
  connectionTimeoutSeconds: 2
};

const catalogueConfig = {
  location: {
    city: 'zagreb',
    coordinates: { lat: 45.8150, lng: 15.9819 }
  },
  defaults: {
    activities: ['dance'],
    levels: ['beginner']
  },
  filters: {
    show: {
      city: true,
      activities: true,
      styles: true,
      levels: true,
      focus: true,
      public: true
    }
  },
  styles: {
    colors: {
      primary: '#4f46e5',
      secondary: '#818cf8'
    },
    card: {
      layout: 'full' as const,
      imageSize: 'medium' as const
    }
  }
};

const core = new CourseCatalogueCore(typesenseConfig, catalogueConfig);

function App() {
  return (
    <div className="h-screen">
      <CourseCatalogue 
        searchClient={core.getSearchClient()}
        config={catalogueConfig}
      />
    </div>
  );
}

export default App;