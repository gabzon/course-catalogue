// src/demo/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CourseCatalogueCore } from '../core/services';
import '../styles/globals.css';

// Check for config.js first (for shared hosting)
declare global {
  interface Window {
    TYPESENSE_CONFIG?: {
      apiKey: string;
      host: string;
      port: number;
      protocol: string;
    };
  }
}

// Use external config (for shared hosting) or environment variables
const typesenseConfig = {
  apiKey: window.TYPESENSE_CONFIG?.apiKey || import.meta.env.VITE_TYPESENSE_API_KEY,
  nodes: [
    {
      host: window.TYPESENSE_CONFIG?.host || import.meta.env.VITE_TYPESENSE_HOST,
      port: window.TYPESENSE_CONFIG?.port || parseInt(import.meta.env.VITE_TYPESENSE_PORT || '443'),
      protocol: window.TYPESENSE_CONFIG?.protocol || import.meta.env.VITE_TYPESENSE_PROTOCOL || 'https'
    }
  ],
  connectionTimeoutSeconds: 2
};


const catalogueConfig = {
	location: {
		city: 'zagreb',
		coordinates: { lat: 45.8150, lng: 15.9819 },
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
		styles: true,
		levels: true,
			days: true,
		focus: true,
		public: true,
			dropIn: true,
			organization: true
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

// Only initialize if we have the required credentials
if (typesenseConfig.apiKey && typesenseConfig.nodes[0].host) {
  const core = new CourseCatalogueCore(typesenseConfig, catalogueConfig);
  const searchClient = core.getSearchClient();

  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App locale="hr" searchClient={searchClient} config={catalogueConfig} />
      </React.StrictMode>
    );
  }
} else {
  // Display error message if credentials are missing
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; text-align: center;">
        <h1>Configuration Error</h1>
        <p>Typesense API credentials are missing. Please check your configuration.</p>
      </div>
    `;
  }
}