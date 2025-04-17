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
      zoom?: number;
  };

  // Filter Defaults
  defaults?: {
      activities?: string[];
      styles?: string[];
      levels?: string[];
      focus?: string[];
      public?: string[];
      dropIn?: boolean;
      organization?: string[];
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

export interface TimeSlot {
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    start_time: string;
    end_time: string;
}


export type GeoHit = {
    objectID: string;
    id: string;
    city: string;
    country: string;
    name: string;
    level_label: string;
    level: string;
    type: string;
    focus: string;
    status: string;
    address: string;
    full_address: string;
    schedule: string[];
    genres: string[];
    activities: string[];
    public: string;
    place?: string;
    organization_id?: string;
    organization_name?: string;
    organization_has_corazon?: boolean;
    full_slug?: string;
    average_overall_rating?: number;
    manage_registrations?: boolean;
    instructors?: string[];
    neighborhood?: string;
    location_id?: string;
    location_name?: string;
    cover_image?: string;
    created_at?: string;
    styles?: string[];
    days?: string[];
    excerpt?: string;
    description?: string;
    drop_in?: boolean;
    video?: string;
    slug?: string;
    srcset?: string;
    tagline?: string;
    updated_at: number;
    start_date: string;
    end_date: string;
    timetable: string | TimeSlot[];
    _geoloc: {
      lat: number;
      lng: number;
    };
    __position: number;
};