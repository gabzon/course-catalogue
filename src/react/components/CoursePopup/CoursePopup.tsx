// src/react/components/CoursePopup/CoursePopup.tsx
import React from 'react';
import type { CoursePopupProps } from './types';
import { CoursePopupItem } from './CoursePopupItem';

export const CoursePopup: React.FC<CoursePopupProps> = ({
    courses,
    onCourseSelect,
    selectedCourse,
    config = {}
}) => {
    const {
        maxHeight = '300px',
        layout = 'full'
    } = config;

    return (
        <div className="bg-white shadow-lg overflow-hidden w-full mt-2">
            <div 
                className="overflow-y-auto divide-y divide-gray-200"
                style={{ maxHeight }}
            >
                {courses.map((course) => (
                    <CoursePopupItem
                        key={course.objectID}
                        course={course}
                        onClick={() => onCourseSelect?.(course)}
                        isSelected={selectedCourse?.objectID === course.objectID}
                        data-course-id={course.objectID}
                        config={{ ...config, layout }}
                    />
                ))}
            </div>
            {courses.length > 1 && (
                <div className="px-2 py-1 bg-gray-50 text-xs text-gray-500">
                    {courses.length} courses at this location
                </div>
            )}
        </div>
    );
};