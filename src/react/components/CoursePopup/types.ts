// src/react/components/CoursePopup/types.ts
import type { GeoHit } from '../../../core/types';

export interface CoursePopupConfig {
    layout?: 'compact' | 'full';
    maxHeight?: string;
    showImage?: boolean;
    showLevel?: boolean;
    showFocus?: boolean;
    showAddress?: boolean;
    showStyles?: boolean;
}

export interface CoursePopupItemProps {
    course: GeoHit;
    onClick?: () => void;
    isSelected?: boolean;
    'data-course-id'?: string;
    config?: CoursePopupConfig;
}

export interface CoursePopupProps {
    courses: GeoHit[];
    onCourseSelect?: (course: GeoHit) => void;
    selectedCourse?: GeoHit | null;
    config?: CoursePopupConfig;
}