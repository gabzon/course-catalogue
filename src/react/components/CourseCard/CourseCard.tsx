// src/react/components/CourseCard/CourseCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Highlight } from 'react-instantsearch';
import { 
    ChartBarSquareIcon, 
    MapPinIcon, 
    ViewfinderCircleIcon, 
    TagIcon, 
    UsersIcon, 
    CalendarDaysIcon, 
    ChevronDownIcon, 
    ChevronUpIcon,
    ClockIcon, 
    ArrowTopRightOnSquareIcon,
    BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import { getLabel, CoursePublicLabels, CourseLevelLabels, CourseFocusLabels } from '../../../utils/enums';
import type { CourseCardProps, TimeSlot } from './types';
import { useLocale } from '../../../i18n/LocalContext';

export const CourseCard: React.FC<CourseCardProps> = ({ 
    course, 
    onClick, 
    currentCourse,
    config = {} // Default empty object for config
}) => {
    const cardRef = useRef<HTMLElement>(null);
    const [isSelected, setSelected] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [schedule, setSchedule] = useState<TimeSlot[]>([]);

    const {
        layout = 'full',
        imageSize = 'medium',
        showLevel = true,
        showFocus = true,
        showPublic = true,
        showStyles = true,
        showSchedule = true
    } = config;

    useEffect(() => {
        const wasSelected = isSelected;
        setSelected(currentCourse?.objectID === course.objectID);
        
        // Only scroll into view when the card becomes selected (not when it becomes unselected)
        if (!wasSelected && currentCourse?.objectID === course.objectID) {
            cardRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [currentCourse]);

    useEffect(() => {
        if (course.timetable) {
            try {
                const parsedSchedule = JSON.parse(course.timetable);
                setSchedule(parsedSchedule);
            } catch (error) {
                console.error('Error parsing timetable:', error);
                setSchedule([]);
            }
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

    const handleClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.toggle-details')) {
            e.stopPropagation();
            setShowDetails(!showDetails);
            return;
        }
        
        if (isSelected) {
            onClick(null);
        } else {
            onClick(course);
        }
    };

    const getImageSizeClass = () => {
        switch (imageSize) {
            case 'small': return 'w-12 h-12';
            case 'large': return 'w-20 h-20';
            default: return 'w-16 h-16';
        }
    };
    
    const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
    const { t } = useLocale();

    return (
        <article 
            ref={cardRef}
            onClick={handleClick}
            className={`
                ${isSelected ? 'bg-indigo-200 hover:bg-indigo-200 ring ring-indigo-800' : 'bg-white hover:bg-indigo-100'}
                ${layout === 'compact' ? 'p-2' : 'p-3'}
                flex w-full overflow-hidden cursor-pointer group
            `}
        >
            <div className='flex justify-between items-start space-x-2 w-full'>
                <img 
                    src={course.cover_image || `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(course.name)}&background=4338ca&color=ffffff`} 
                    alt={course.name} 
                    className={`${getImageSizeClass()} rounded-md object-cover`}
                />
                <div className='flex-1 shrink-0'>
                    <div className='flex justify-between items-start'>
                        <h3 className="font-bold text-gray-800 group-hover:text-indigo-800">
                            <Highlight attribute="name" hit={course} />
                        </h3>
                        <button 
                            className="toggle-details p-1 text-gray-500 hover:text-indigo-600"
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
                    <div className='space-y-1'>
                        <div className='flex items-center space-x-1'>
                            <CalendarDaysIcon className='w-4 h-4 text-gray-500 group-hover:text-indigo-600'/>
                            <ul className='flex items-center space-x-1'>
                                {DAYS.map((day) => (
                                    <li 
                                        key={day}
                                        className={`
                                            text-xs 
                                            ${course.days?.includes(day) ? 'font-bold text-indigo-600' : 'text-gray-500'} 
                                            group-hover:text-indigo-600
                                        `}
                                    >
                                        {t(`course.days.${day}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {showLevel && (
                            <p className="text-xs text-gray-500 group-hover:text-indigo-600 flex justify-between items-center">
                                <span className='flex items-center'>
                                    <ChartBarSquareIcon className='w-4 h-4 mr-1'/>
                                    {getLabel(course.level, CourseLevelLabels, t)}
                                </span>
                            </p>
                        )}
                        
                        {showDetails && (
                            <>

                                {showSchedule && schedule.length > 0 && (
                                    <div className="text-xs text-gray-500 group-hover:text-indigo-600">
                                        <div className="flex items-start space-x-2">
                                            <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <div className="space-y-1">
                                                {schedule.map((timeSlot, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <span className="font-medium capitalize">{timeSlot.day}</span>
                                                        <span>{timeSlot.start_time} - {timeSlot.end_time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {showStyles && course.styles && (
                                    <p className="text-xs text-gray-500 group-hover:text-indigo-600 flex items-start">
                                        <TagIcon className='w-4 h-4 mr-1 flex-shrink-0'/>
                                        <Highlight attribute="styles" hit={course} />
                                    </p>
                                )}

                                {showPublic && (
                                    <p className="text-xs text-gray-500 group-hover:text-indigo-600 flex items-center">
                                        <UsersIcon className='w-4 h-4 mr-1'/>
                                        {getLabel(course.public, CoursePublicLabels, t)}
                                    </p>
                                )}
                                
                                {showFocus && (
                                    <p className="text-xs text-gray-500 group-hover:text-indigo-600 flex justify-between items-center">
                                        <span className='flex items-center justify-end'>
                                            <ViewfinderCircleIcon className='w-4 h-4 mr-1'/>
                                            {getLabel('partnerwork', CourseFocusLabels, t)}
                                        </span>
                                    </p>
                                )}

                                <p className="text-xs text-gray-500 group-hover:text-indigo-600 flex items-center">
                                    <MapPinIcon className="w-4 h-4 flex-shrink-0"/>
                                    <span className='text-wrap break-words'>{course.address}</span>
                                </p>

                                <p className="text-xs text-gray-500 group-hover:text-indigo-600 flex items-start">
                                    <BuildingLibraryIcon className='w-4 h-4 mr-1'/>
                                    <Highlight attribute="organization_name" hit={course} />
                                </p>

                                <div className="pt-2">
                                    <button 
                                        onClick={handleLinkClick}
                                        className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded-md"
                                    >
                                        <span>{t('course.viewDetails')}</span>
                                        <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};