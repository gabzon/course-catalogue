// src/react/components/CoursePopup/CoursePopupItem.tsx
import React, { useState } from 'react';
import { 
    BuildingLibraryIcon, 
    ChartBarSquareIcon, 
    ViewfinderCircleIcon, 
    ChevronDownIcon, 
    ClockIcon,
    ArrowTopRightOnSquareIcon,
    MapPinIcon,
    UsersIcon,
    TagIcon,
    CalendarDaysIcon,
    ChevronUpIcon } from '@heroicons/react/24/outline';
import { getLabel, CoursePublicLabels, CourseLevelLabels, CourseFocusLabels } from '../../../utils/enums';
import type { CoursePopupItemProps } from './types';
import { useLocale } from '../../../i18n/LocalContext';

interface TimeSlot {
    day: string;
    start_time: string;
    end_time: string;
}

export const CoursePopupItem: React.FC<CoursePopupItemProps> = ({
    course,
    onClick,
    isSelected,
    'data-course-id': dataCourseId,
    config = {}
}) => {
    const {
        layout = 'full',
        showImage = true,
        showLevel = true,
        showFocus = true,
        showAddress = true,
        showStyles = true
    } = config;
    const [showDetails, setShowDetails] = useState(false);
    const { t } = useLocale();

    const timetableData = React.useMemo(() => {
        try {
            return JSON.parse(course.timetable) as TimeSlot[];
        } catch (e) {
            console.warn('Failed to parse timetable:', e);
            return [];
        }
    }, [course.timetable]);


    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (course.full_slug) {
          const url = course.full_slug.startsWith('https://') 
            ? course.full_slug 
            : `${course.full_slug}`;
          window.open(url, '_blank');
        } else if (course.slug) {
          const url = `${course.slug}`;
          window.open(url, '_blank');
        }
    };

    return (
        <div
            onClick={onClick}
            data-course-id={dataCourseId}
            className={`
                p-2 cursor-pointer
                ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}
                ${layout === 'compact' ? 'space-y-1' : 'space-y-2'}
            `}
        >
            <div className="flex items-start space-x-2">
                {showImage && (
                    <img
                        src={course.cover_image || `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(course.name)}&background=4338ca&color=ffffff`}
                        alt={course.name}
                        className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    />
                )}
                <div className="flex-1 min-w-0">
                    <div className='flex justify-between items-center'>
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                            {course.name}
                        </h3>
                        <button 
                            className="toggle-details p-1 text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDetails(!showDetails);
                            }}
                        >
                            {showDetails ? (
                                <ChevronUpIcon className="w-4 h-4" />
                            ) : (
                                <ChevronDownIcon className="w-4 h-4 transform -rotate-90" />
                            )}
                        </button>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <CalendarDaysIcon className='w-4 h-4 text-gray-500 group-hover:text-indigo-600'/>
                        <ul className='flex items-center space-x-1'>
                            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                            <li 
                                key={day}
                                className={`
                                    text-xs 
                                    ${course.days?.includes(day) ? 'font-bold text-indigo-600' : 'text-gray-500'} 
                                    group-hover:text-indigo-600
                                `}
                            >
                                {/* {day.charAt(0).toUpperCase() + day.slice(1)} */}
                                {t(`course.days.${day}`)}
                            </li>
                            ))}
                        </ul>
                    </div>
                    <p className='text-xs text-gray-500'>
                        {showLevel && (
                            <span className="flex items-center">
                                <ChartBarSquareIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                                {getLabel(course.level, CourseLevelLabels, t)}
                            </span>
                        )}
                    </p>


                    {showDetails && (
                        <div>
                                
                            <div className="text-xs text-gray-500 group-hover:text-indigo-600">
                                <div className="flex items-start space-x-1">
                                    <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div className="space-y-1">
                                        {timetableData.map((timeSlot, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <span className="font-medium capitalize">{timeSlot.day}</span>
                                                <span>{timeSlot.start_time} - {timeSlot.end_time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                                

                            
                            {showStyles && course.styles && course.styles.length > 0 && (
                                <p className='flex items-center text-gray-500'>
                                    <TagIcon className='w-4 h-4 mr-1 flex-shrink-0'/>
                                    <p className="text-xs text-gray-500 truncate">
                                        {course.styles.join(', ')}
                                    </p>
                                </p>
                            )}

                            <p className="text-xs text-gray-500 group-hover:text-indigo-600 flex items-center">
                                <UsersIcon className='w-4 h-4 mr-1'/>
                                {getLabel(course.public, CoursePublicLabels,t)}
                            </p>

                            {showFocus && (
                                <p className='flex items-center text-gray-500'>
                                    <span className="flex items-center">
                                        <ViewfinderCircleIcon className="w-3 h-3 mr-1" />
                                        {getLabel(course.focus, CourseFocusLabels,t)}
                                    </span>
                                </p>
                            )}

                            <p className="text-xs text-gray-500 group-hover:text-indigo-600 flex items-start">
                                <BuildingLibraryIcon className='w-4 h-4 mr-1'/>
                                <span>{course.organization_name}</span>
                            </p>
                            {showAddress && (
                                <p className="text-xs text-gray-500 flex items-center">
                                    <MapPinIcon className='w-4 h-4 mt-0.5 mr-1 flex-shrink-0'/>
                                    <span className="truncate">{course.address}</span>
                                </p>
                            )}
                            <div className="pt-2">
                                <button 
                                    onClick={handleLinkClick}
                                    className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded-md"
                                >
                                    <span>View Details</span>
                                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                                </button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};
