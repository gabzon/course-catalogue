// src/utils/enums.ts
export const CoursePublicLabels: Record<string, string> = {
    'everyone':'Everyone',
    'women':'Women',
    'men':'Men',
    'youth':'Youth',
    'teens':'Teens',
    'girl_teens':'Teenage Girls',
    'boy_teens':'Teenage Boys',
    'kids':'Kids',
    'girl_kids':'Girls',
    'boy_kids':'Boys',
    'toddlers':'Toddlers',
    'senior':'Seniors',
    'other':'Other'
};

export const CourseLevelLabels: Record<string, string> = {
    'op':'Open Level',
    'a1':'Beginner',
    'a2':'Medium Beginner',
    'a3':'High Beginner',
    'b1':'Intermediate',
    'b2':'Medium Intermediate',
    'b3':'High Intermediate',
    'c1':'Advanced',
    'c2':'Medium Advanced',
    'c3':'High Advanced',
    'm1':'Master',
    'm2':'Medium Master',
    'm3':'High Master'
};

export const CourseFocusLabels: Record<string, string> = {
    'technique': 'Technique',
    'styling': 'Styling',
    'choreography': 'Choreography',
    'performance': 'Performance',
    'social': 'Social',
    'fitness': 'Fitness'
};

export function getLabel(value: string | undefined, mapping: Record<string, string>): string {
    if (!value) return '';
    return mapping[value] || value;
}