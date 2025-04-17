// src/core/types/index.ts

// Search related types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  location?: {
      lat: number;
      lng: number;
      radius?: number;
  };
  hitsPerPage?: number;
  page?: number;
}

export interface SearchResponse<T> {
  hits: T[];
  nbHits: number;
  page: number;
  nbPages: number;
  processingTimeMS: number;
}

export interface TypesenseConfig {
  apiKey: string;
  nodes: Array<{
      host: string;
      port: number;
      protocol: string;
  }>;
  connectionTimeoutSeconds?: number;
}

// Main configuration interface
export interface CatalogueConfig {
  // Location Settings
  location?: {
      city?: string;
      coordinates?: {
          lat: number;
          lng: number;
      };
      radius?: number;
  };

  // Filter Defaults
  defaults?: {
      activities?: string[];
      styles?: string[];
      levels?: string[];
      focus?: string[];
      public?: boolean;
  };

  // Filter Visibility
  filters?: {
      show: {
          city?: boolean;
          activities?: boolean;
          styles?: boolean;
          levels?: boolean;
          focus?: boolean;
          public?: boolean;
      };
  };

  // Style Configuration
  styles?: {
      colors?: {
          primary?: string;
          secondary?: string;
          background?: string;
      };
      card?: {
          layout?: 'compact' | 'full';
          imageSize?: 'small' | 'medium' | 'large';
      };
  };

  // Search Configuration
  search?: {
      hitsPerPage?: number;
      sortBy?: 'relevance' | 'distance' | 'level';
  };

  // UI Configuration (added from Map component)
  ui?: {
      showMap?: boolean;
      defaultView?: 'map' | 'list';
      theme?: 'light' | 'dark';
  };
}

// Course data interface
export interface GeoHit {
  objectID: string;
  name: string;
  cover_image?: string;
  level_number: number;
  level_code: string;
  level: string;
  focus: string;
  status_label: string;
  address: string;
  schedule: string[];
  activity_names: string[];
  public: boolean;
  place?: string;
  organization_name?: string;
  full_slug?: string;
  styles?: string[];
  _geoloc: { lat: number; lng: number; };
  timetable?: string; // Added for schedule parsing
}