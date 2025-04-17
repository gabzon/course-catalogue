// src/utils/enums.ts

export const CoursePublicLabels: Record<string, string> = {
    'everyone': 'audience.everyone',
    'women': 'audience.women',
    'men': 'audience.men',
    'youth': 'audience.youth',
    'teens': 'audience.teens',
    'girl_teens': 'audience.girl_teens',
    'boy_teens': 'audience.boy_teens',
    'kids': 'audience.kids',
    'girl_kids': 'audience.girl_kids',
    'boy_kids': 'audience.boy_kids',
    'toddlers': 'audience.toddlers',
    'senior': 'audience.senior',
    'other': 'audience.other'
};

export const CourseLevelLabels: Record<string, string> = {
    'op': 'levels.op',
    'a1': 'levels.a1',
    'a2': 'levels.a2',
    'a3': 'levels.a3',
    'b1': 'levels.b1',
    'b2': 'levels.b2',
    'b3': 'levels.b3',
    'c1': 'levels.c1',
    'c2': 'levels.c2',
    'c3': 'levels.c3',
    'm1': 'levels.m1',
    'm2': 'levels.m2',
    'm3': 'levels.m3'
};

export const CourseFocusLabels: Record<string, string> = {
    'individual': 'focusOptions.technique',
    'groupwork': 'focusOptions.styling',
    'partnerwork': 'focusOptions.partnerwork',
    'theory': 'focusOptions.theory',
    'other': 'focusOptions.other'
};

export function getLabel(value: string | undefined, mapping: Record<string, string>, t: (key: string) => string): string {
    if (!value) return '';
    const translationKey = mapping[value];
    if (!translationKey) return value;
    
    const translated = t(translationKey);
    // If no translation found, return the original value
    return translated === translationKey ? value : translated;
}