// src/react/components/CourseCard/types.ts
import type { GeoHit } from '../../../core/types';
import type { Hit, BaseHit } from 'instantsearch.js';

export type GeoHitWithPosition = GeoHit & Hit<BaseHit>;

export interface TimeSlot {
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    start_time: string;
    end_time: string;
}

export interface CourseCardProps {
    course: GeoHitWithPosition;
    onClick: (course: GeoHit | null) => void;
    currentCourse?: GeoHit | null;
    config?: {
        layout?: 'compact' | 'full';
        imageSize?: 'small' | 'medium' | 'large';
        showLevel?: boolean;
        showFocus?: boolean;
        showPublic?: boolean;
        showStyles?: boolean;
        showSchedule?: boolean;
    };
}

export type Course = {
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
    __position?: number;
};