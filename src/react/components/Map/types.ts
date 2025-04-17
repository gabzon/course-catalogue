// src/react/components/Map/types.ts
import type { GeoHit } from '../../../core/types';
import type { CourseCardProps } from '../CourseCard/types';
import type { CourseFiltersProps } from '../CourseFilters/types';
import type { CoursePopupProps } from '../CoursePopup/types';

interface Location {
    lat: number;
    lng: number;
}

interface MapViewState {
    latitude: number;
    longitude: number;
    zoom: number;
}

interface ClusterProperties {
    cluster: boolean;
    clusterId: number;
    pointCount: number;
    courseIds: string[];
}

type PointFeature<T> = {
    type: "Feature";
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
    properties: T;
};

export interface MapConfig {
    initialView?: {
        center?: Location;
        zoom?: number;
    };
    style?: {
        mapStyle?: string;
        clusterColor?: string;
        markerColor?: string;
        selectedMarkerColor?: string;
    };
    controls?: {
        showZoom?: boolean;
        showCompass?: boolean;
        enableClustering?: boolean;
        clusterRadius?: number;
        maxZoom?: number;
    };
    layout?: {
        showSidebar?: boolean;
        sidebarWidth?: string;
        mapPosition?: 'left' | 'right';
    };
}

export interface MapProps {
    config?: MapConfig;
    courseCardConfig?: CourseCardProps['config'];
    filterConfig?: CourseFiltersProps['config'];
    popupConfig?: CoursePopupProps['config'];
}

export type {
    Location,
    MapViewState,
    ClusterProperties,
    PointFeature
};