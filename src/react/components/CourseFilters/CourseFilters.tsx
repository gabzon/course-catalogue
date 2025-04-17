// src/react/components/CourseFilters/CourseFilters.tsx
import React, { useState } from 'react';
import { SearchBox, RefinementList, ToggleRefinement, Stats, CurrentRefinements } from 'react-instantsearch';
import type { CourseFiltersProps } from './types';
import { AdjustmentsVerticalIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";



import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
  import { Button } from "@/components/ui/button"


import type { CurrentRefinementsProps } from "react-instantsearch";

// import { CourseLevelLabels } from '../../utils/enums';

const transformItems: CurrentRefinementsProps["transformItems"] = (items) => {
	return items.map((item) => {
	  if (item.attribute === "genres") {
		item.label = "Genre";
	  }
	  if (item.attribute === "activities") {
		item.label = "Activities";
	  }
	  if (item.attribute === "city") {
		item.label = "City";
	  }
	  if (item.attribute === "level") {
		item.label = "Level";
	  }
	  if (item.attribute === "focus") {
		item.label = "Focus";
	  }
	  if (item.attribute === "styles") {
		item.label = "Styles";
	  }
	  return item;
	});
};

export const CourseFilters: React.FC<CourseFiltersProps> = ({ 
    config = {} 
}) => {
    const {
        show = {
            city: true,
            activities: true,
            styles: true,
            levels: true,
            focus: true,
            public: true
        },
        defaults = {},
        labels = {
            city: 'City',
            activities: 'Activities',
            styles: 'Styles',
            levels: 'Levels',
            focus: 'Focus',
            public: 'Public Classes'
        }
    } = config;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between space-x-3">
                <div className='flex-grow relative'>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <SearchBox 
                        classNames={{
                            root: 'relative',
                            form: 'relative',
                            input: 'w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300',
                            submit: 'hidden',
                            reset: 'hidden',
                            loadingIndicator: 'hidden'
                        }}
                        placeholder="Search courses..."
                    />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-gray-900 bg-white hover:bg-gray-100 h-10"
                        >
                            <AdjustmentsVerticalIcon aria-hidden="true" className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                            <SheetDescription>
                            Please select the filters you want to apply to your search.
                            </SheetDescription>
                            <Stats classNames={{ root: "text-xs text-gray-500",}}/>
                            <CurrentRefinements 
                                transformItems={transformItems}
                                classNames={{ 
                                    list:'flex flex-wrap', 
                                    item: "rounded-full flex items-center bg-gray-100 px-2 py-1 text-xs", 
                                    category: "flex items-center", 
                                    delete:'hover:bg-red-200 hover:text-red-800 rounded-full px-1.5 py-0.5 text-xs ml-1'
                                    }}/>
                            <hr />
                        </SheetHeader>
                        
                        <div className="space-y-2 -mt-5 px-4 overflow-y-auto max-h-[calc(100vh-160px)]">
                            {show.city && (
                                <div className="filter-group">
                                    <h3 className="text-xs font-medium text-gray-900 mb-2 uppercase">
                                        {labels.city}
                                    </h3>
                                    <RefinementList 
                                        attribute="city"
                                        classNames={{
                                            root: 'space-y-2',
                                            label: 'flex items-center space-x-2 text-sm text-gray-600',
                                            checkbox: 'h-4 w-4 text-gray-900 rounded border-gray-300 focus:ring-gray-500 checked:bg-gray-900 checked:border-gray-900',
                                            count: 'ml-auto text-xs text-gray-500 bg-gray-100 border border-gray-200 px-1 py-0.5 m-0.5 rounded-md'
                                        }}
                                        style={{accentColor: 'black'}}
                                    />
                                </div>
                            )}

                            {show.activities && (
                                <div className="filter-group">
                                    <h3 className="text-xs font-medium text-gray-900 mb-2 uppercase">
                                        {labels.activities}
                                    </h3>
                                    <RefinementList 
                                        attribute="activities"
                                        classNames={{
                                            root: 'space-y-2',
                                            label: 'flex items-center space-x-2 text-sm text-gray-600',
                                            checkbox: 'h-4 w-4 text-gray-900 rounded border-gray-300 focus:ring-gray-500 checked:bg-gray-900 checked:border-gray-900',
                                            count: 'ml-auto text-xs text-gray-500 bg-gray-100 border border-gray-200 px-1 py-0.5 m-0.5 rounded-md'
                                        }}
                                        style={{accentColor: 'black'}}
                                    />
                                </div>
                            )}

                            {show.styles && (
                                <div className="filter-group">
                                    <h3 className="text-xs font-medium text-gray-900 mb-2 uppercase">
                                        {labels.styles}
                                    </h3>
                                    <RefinementList 
                                        attribute="styles"
                                        classNames={{
                                            root: 'space-y-2',
                                            label: 'flex items-center space-x-2 text-sm text-gray-600',
                                            checkbox: 'h-4 w-4 text-gray-900 rounded border-gray-300 focus:ring-gray-500 checked:bg-gray-900 checked:border-gray-900',
                                            count: 'ml-auto text-xs text-gray-500 bg-gray-100 border border-gray-200 px-1 py-0.5 m-0.5 rounded-md'
                                        }}
                                        style={{accentColor: 'black'}}
                                    />
                                </div>
                            )}

                            {show.levels && (
                                <div className="filter-group">
                                    <h3 className="text-xs font-medium text-gray-700 mb-2 uppercase">
                                        {labels.levels}
                                    </h3>
                                    <RefinementList 
                                        attribute="level"
                                        classNames={{
                                            root: 'space-y-2',
                                            label: 'flex items-center space-x-2 text-sm text-gray-600',
                                            checkbox: 'h-4 w-4 text-gray-900 rounded border-gray-300 focus:ring-gray-500 checked:bg-gray-900 checked:border-gray-900',
                                            count: 'ml-auto text-xs text-gray-500 bg-gray-100 border border-gray-200 px-1 py-0.5 m-0.5 rounded-md'
                                        }}
                                        style={{accentColor: 'black'}}
                                    />
                                </div>
                            )}
                            {show.focus && (
                                <div className="filter-group">
                                    <h3 className="text-xs font-medium text-gray-700 mb-2 uppercase">
                                        {labels.focus}
                                    </h3>
                                    <RefinementList 
                                        attribute="focus"
                                        classNames={{
                                            root: 'space-y-2',
                                            label: 'flex items-center space-x-2 text-sm text-gray-600',
                                            checkbox: 'h-4 w-4 text-gray-900 rounded border-gray-300 focus:ring-gray-500 checked:bg-gray-900 checked:border-gray-900',
                                            count: 'ml-auto text-xs text-gray-500 bg-gray-100 border border-gray-200 px-1 py-0.5 m-0.5 rounded-md'
                                        }}
                                        style={{accentColor: 'black'}}
                                    />
                                </div>
                            )}
                            {show.public && (
                                <div className="filter-group">
                                    <h3 className="text-xs font-medium text-gray-700 mb-2 uppercase">
                                        {labels.public}
                                    </h3>
                                    <ToggleRefinement 
                                        attribute="public"
                                        label="Show public classes only"
                                        classNames={{
                                            root: 'flex items-center space-x-2',
                                            checkbox: 'h-4 w-4 text-gray-900 rounded border-gray-300 focus:ring-gray-500 checked:bg-gray-900 checked:border-gray-900',
                                            label: 'text-sm text-gray-600'
                                        }}
                                        style={{accentColor: 'black'}}
                                    />
                                </div>
                            )}
                            </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
};