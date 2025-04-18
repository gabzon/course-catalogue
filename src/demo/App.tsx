// src/demo/App.tsx
import { CourseCatalogue } from '../react/CourseCatalogue';
import { LocaleProvider } from '../i18n/LocalContext';
import { Locale } from '../i18n/translations';
import { CatalogueConfig, TypesenseConfig } from '../core/types'; // Assuming you have this type

interface AppProps {
	locale?: Locale;  
  searchClient: TypesenseConfig;
  config: CatalogueConfig;
}

function App({ locale = 'en', config, searchClient }: AppProps) {
  return (
    <div className="h-screen">
        <LocaleProvider initialLocale={locale}>
        	<CourseCatalogue searchClient={searchClient} config={config} />      
        </LocaleProvider>
    </div>
  );
}

export default App;
