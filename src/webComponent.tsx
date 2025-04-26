import React from 'react';
import reactToWebComponent from '@r2wc/react-to-web-component';
import { CourseCatalogue } from './react/CourseCatalogue';
import { LocaleProvider } from './i18n/LocalContext';
import type { Locale } from './i18n/translations';
import type { TypesenseConfig, CatalogueConfig } from './core/types'; 
import { CourseCatalogueCore } from './core/services/index';
import './styles/globals.css';


interface CourseCatalogueProps {
    typesenseInfo: TypesenseConfig,
    config: CatalogueConfig,
    locale?: Locale,
}

export const CourseCatalogueComponent = (props: CourseCatalogueProps) => {
    const { 
        typesenseInfo,
        config,
        locale = 'en',
    } = props;

    const typesenseConfig: TypesenseConfig = {
	    apiKey: typesenseInfo.apiKey,
	    nodes: [{
		    host: typesenseInfo.nodes[0].host,
		    port: typesenseInfo.nodes[0].port || 443,
		    protocol: typesenseInfo.nodes[0].protocol || 'https'
		}],
        connectionTimeoutSeconds: 2
    };

    // Ensure coordinates are properly formatted as an object with lat/lng
    let coordinates = config.location?.coordinates;
    if (Array.isArray(coordinates) && coordinates.length === 2) {
        // Convert from array format to {lat, lng} format
        coordinates = { lat: coordinates[0], lng: coordinates[1] };
    } else if (coordinates && typeof coordinates === 'object' && 'lat' in coordinates && 'lng' in coordinates) {
        // Object format is already correct
    } else {
        // Default coordinates for Zagreb
        coordinates = { lat: 45.815, lng: 15.9819 };
    }
    const catalogueConfig: CatalogueConfig = {
        location: {
            city: config.location?.city || 'Zagreb',
            coordinates: coordinates,
            radius: config.location?.radius || 15000,
            zoom: config.location?.zoom || 12
        },
        defaults: {
            activities: config.defaults?.activities || [],
            levels: config.defaults?.levels || [],
        },
        filters: {
            show: {
                city: config.filters?.show?.city || false,
                activities: config.filters?.show?.activities || false,
                styles: config.filters?.show?.styles || true,
                levels: config.filters?.show?.levels || true,
                days: config.filters?.show?.days || true,
                focus: config.filters?.show?.focus || true,
                public: config.filters?.show?.public || true,
                dropIn: config.filters?.show?.dropIn || true,
                organization: config.filters?.show?.organization || true
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
    const searchClient = core.getSearchClient();

    return (
        <React.StrictMode>
            <LocaleProvider initialLocale={locale as Locale}>
                <CourseCatalogue searchClient={searchClient} config={catalogueConfig} />
            </LocaleProvider>
        </React.StrictMode>
    );
};

// The @r2wc/react-to-web-component API is slightly different
const CourseCatalogueWebComponent = reactToWebComponent(CourseCatalogueComponent, {
    props: {
      typesenseInfo: 'json',
      config: 'json',
      locale: 'string'
    },
    shadow: 'open' // Use open shadow DOM
});
  

if (!customElements.get('course-catalogue')) {
  customElements.define('course-catalogue', CourseCatalogueWebComponent);
}

export default CourseCatalogueWebComponent;