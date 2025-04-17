// src/react/components/CourseFilters/types.ts
export interface CourseFiltersConfig {
    show?: {
        city?: boolean;
        activities?: boolean;
        styles?: boolean;
        levels?: boolean;
        focus?: boolean;
        public?: boolean;
        dropIn?: boolean;
        days?: boolean;
        organization?: boolean;
    };
    defaults?: {
        city?: string[];
        activities?: string[];
        styles?: string[];
        levels?: string[];
        focus?: string[];
        public?: boolean;
    };
    labels?: {
        city?: string;
        activities?: string;
        styles?: string;
        levels?: string;
        focus?: string;
        public?: string;
    };
}

export interface CourseFiltersProps {
    config?: CourseFiltersConfig;
}