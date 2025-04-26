// src/demo/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CourseCatalogueCore } from '../core/services';
import '../styles/globals.css';

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

const core = new CourseCatalogueCore(typesenseConfig, catalogueConfig);
const searchClient = core.getSearchClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
    	<App locale="hr" searchClient={searchClient} config={catalogueConfig} />
  	</React.StrictMode>
);