// src/demo/App.tsx
import { CourseCatalogue } from '../react/CourseCatalogue';
import { CourseCatalogueCore } from '../core/services';
import { LocaleProvider } from '../i18n/LocalContext';
import { Locale } from '../i18n/translations';

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
    coordinates: { lat: 45.8150, lng: 15.9819 },
    // coordinates: { lat: 45.49370599039489, lng: 15.55604178448852 },
    radius: 15000,
    zoom: 12
  },
  defaults: {
    activities: [],
    levels: ['b1']
  },
  filters: {
    show: {
      city: false,
      activities: true,
      styles: false,
      levels: true,
	  days: true,
      focus: false,
      public: true,
	  dropIn: true,
	  organization: false
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

interface AppProps {
	locale?: Locale;  // Using the Locale type from translations
  }

function App({ locale = 'en' }: AppProps) {
  return (
    <div className="h-screen">
        <LocaleProvider initialLocale={locale}>
        	<CourseCatalogue  searchClient={core.getSearchClient()} config={catalogueConfig} />      
        </LocaleProvider>
    </div>
  );
}

export default App;