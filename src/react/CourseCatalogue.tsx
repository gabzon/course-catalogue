// src/react/CourseCatalogue.tsx
import React from 'react';
import { InstantSearch, Configure } from 'react-instantsearch';
import type { CatalogueConfig } from '../core/types';
import { CoursesMap } from './components';

interface CourseCatalogueProps {
  config?: CatalogueConfig;
  searchClient: any; // We'll type this properly later
}

export const CourseCatalogue: React.FC<CourseCatalogueProps> = ({ 
  config,
  searchClient
}) => {
  const defaultConfig: CatalogueConfig = {
    location: {
      coordinates: { lat: 45.8, lng: 15.97 }, // Zagreb default
      radius: 15000, // Default radius in meters (15km)
      zoom: 12 // Default zoom
    },
    defaults: {
      activities: [],
      styles: [],
      levels: [],
      focus: [],
      public: [],
      dropIn: false,
      organization: []
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
    search: {
      hitsPerPage: 250 // Updated to respect Typesense's limit
    }
  };

  const finalConfig = {
    ...defaultConfig,
    ...config,
    filters: {
      show: {
        ...defaultConfig.filters?.show,
        ...config?.filters?.show
      }
    }
  };

  const buildInitialFilters = () => {
    // Get the first activity from defaults if it exists
    const firstActivity = finalConfig.defaults?.activities?.[0];
    // If there's an activity, create a filter string, otherwise return empty string
    return firstActivity ? `activities:${firstActivity}` : '';
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="courses">
      <Configure 
        hitsPerPage={finalConfig.search?.hitsPerPage || 250}
        aroundLatLng={`${finalConfig.location?.coordinates?.lat},${finalConfig.location?.coordinates?.lng}`}
        aroundRadius={finalConfig.location?.radius || 15000}
        filters={buildInitialFilters()}
      />
      <CoursesMap 
        config={finalConfig}
      />
    </InstantSearch>
  );
};