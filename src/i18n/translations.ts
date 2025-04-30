// src/i18n/translations.ts

export type FocusOption = 'individual' | 'groupwork' | 'partnerwork' | 'theory' | 'other';
export type Levels = 'op' | 'a1' | 'a2' | 'a3' | 'b1' | 'b2' | 'b3' | 'c1' | 'c2' | 'c3' | 'm1' | 'm2' | 'm3';
export type Audience = 'everyone' | 'women' | 'men' | 'youth' | 'teens' | 'girl_teens' | 'boy_teens' | 'kids' | 'girl_kids' | 'boy_kids' | 'toddlers' | 'senior' | 'other';


// Define the structure of our translations
export type TranslationsType = {
    [K in 'en' | 'es' | 'fr' | 'hr']: {
        filters: {
            title: string;
            description: string;
            searchPlaceholder: string;
            clearAll: string;
            city: string;
            activities: string;
            styles: string;
            levels: string;
            focus: string;
            public: string;
            others: string;
            drop_in: string;
        };
        course: {
            viewDetails: string;
            address: string;
            organization: string;
            schedule: string;
            level: string;
            days: {
                mon: string;
                tue: string;
                wed: string;
                thu: string;
                fri: string;
                sat: string;
                sun: string;
            };
        };
        focusOptions: {
            [K in FocusOption]: string;
        };
        levels: {
            [K in Levels]: string;
        };
        audience: {
            [K in Audience]: string;
        };
    };
};


export const translations: TranslationsType = {
    en: {
        filters: {
            title: 'Filters',
            description: 'Please select the filters you want to apply to your search.',
            searchPlaceholder: 'Search courses...',
            clearAll: 'Clear all',
            city: 'City',
            activities: 'Activities',
            styles: 'Styles',
            levels: 'Levels',
            focus: 'Focus',
            public: 'Audience',
            others: 'Others',
            drop_in: 'Drop-in classes'
        },
        course: {
            viewDetails: 'View Details',
            address: 'Address',
            organization: 'Organization',
            schedule: 'Schedule',
            level: 'Level',
            days: {
                mon: 'mon',
                tue: 'tue',
                wed: 'wed',
                thu: 'thu',
                fri: 'fri',
                sat: 'sat',
                sun: 'sun'
            }
        },
        focusOptions: {
            'individual': 'Technique',
            'groupwork': 'Choreography',
            'partnerwork': 'Performance',
            'theory': 'Theory',
            'other': 'Other'
        },
        levels: {
            'op':'Open level',
            'a1':'Beginner',
            'a2':'Medium beginner',
            'a3':'High beginner',
            'b1':'Intermediate',
            'b2':'medium intermediate',
            'b3':'High intermediate',
            'c1':'Advanced',
            'c2':'Medium advanced',
            'c3':'High advanced',
            'm1':'Master',
            'm2':'Medium master',
            'm3':'High master'
        },
        audience: {
            'everyone':'everyone',
            'women':'women',
            'men':'men',
            'youth':'youth',
            'teens':'all teens',
            'girl_teens':'girl teens',
            'boy_teens':'boy teens',
            'kids':'all kids',
            'girl_kids':'girl kids',
            'boy_kids':'boy kids',
            'toddlers':'toddlers',
            'senior':'senior',
            'other':'other',
        }
    },
    es: {
        filters: {
            title: 'Filtros',
            description: 'Selecciona los filtros que deseas aplicar a tu búsqueda.',
            searchPlaceholder: 'Buscar cursos...',
            clearAll: 'Borrar todo',
            city: 'Ciudad',
            activities: 'Actividades',
            styles: 'Estilos',
            levels: 'Niveles',
            focus: 'Enfoque',
            public: 'Audiencia',
            others: 'Otros',
            drop_in: 'Clases de drop-in'
        },
        course: {
            viewDetails: 'Ver Detalles',
            address: 'Dirección',
            organization: 'Organización',
            schedule: 'Horario',
            level: 'Nivel',
            days: {
                mon: 'Lun',
                tue: 'Mar',
                wed: 'Mié',
                thu: 'Jue',
                fri: 'Vie',
                sat: 'Sáb',
                sun: 'Dom'
            }
        },
        focusOptions: {
            'individual': 'Individual',
            'groupwork': 'Trabajo en grupo',
            'partnerwork': 'Trabajo en pareja',
            'theory': 'Teoría',
            'other': 'Otros'
        },
        levels: {
            'op':'Nivel abierto',
            'a1':'Principiante',
            'a2':'Principiante medio',
            'a3':'Principiante alto',
            'b1':'Intermedio',
            'b2':'Intermedio medio',
            'b3':'Intermedio alto',
            'c1':'Avanzado',
            'c2':'Avanzado medio',
            'c3':'Avanzado alto',
            'm1':'Maestro',
            'm2':'Maestro medio',
            'm3':'Maestro alto'
        },
        audience: {
            'everyone':'todo el público',
            'women':'mujeres',
            'men':'hombres',
            'youth':'jóvenes',
            'teens':'adolescentes',
            'girl_teens':'adolescentes chicas',
            'boy_teens':'adolescentes chicos',
            'kids':'niños',
            'girl_kids':'niñas',
            'boy_kids':'niños',
            'toddlers':'bebés',
            'senior':'adultos mayores',
            'other':'otro'
        }
    },
    fr:{
        filters: {
            title: 'Filtres',
            description: 'Sélectionnez les filtres que vous souhaitez appliquer à votre recherche.',
            searchPlaceholder: 'Rechercher des cours...',
            clearAll: 'Tout effacer',
            city: 'Ville',
            activities: 'Activités',
            styles: 'Styles',
            levels: 'Niveaux',
            focus: 'Enseignement',
            public: 'Public',
            others: 'Autres',
            drop_in: 'Cours de drop-in'
        },
        course: {
            viewDetails: 'Voir les détails',
            address: 'Adresse',
            organization: 'Organisation',
            schedule: 'Horaire',
            level: 'Niveau',
            days: {
                mon: 'Lun',
                tue: 'Mar',
                wed: 'Mer',
                thu: 'Jeu',
                fri: 'Ven',
                sat: 'Sam',
                sun: 'Dim'
            }
        },
        focusOptions: {
            'individual': 'Technique',
            'groupwork': 'Groupwork',
            'partnerwork': 'Partnerwork',
            'theory': 'Théorie',
            'other': 'Autres'
        },
        levels: {
            'op':'Niveau ouvert',
            'a1':'Débutant',
            'a2':'Débutant moyen',
            'a3':'Débutant élevé',
            'b1':'Intermédiaire',
            'b2':'Intermédiaire moyen',
            'b3':'Intermédiaire élevé',
            'c1':'Avancé',
            'c2':'Avancé moyen',
            'c3':'Avancé élevé',
            'm1':'Maître',
            'm2':'Maître moyen',
            'm3':'Maître élevé'
        },
        audience: {
            'everyone':'tout le public',
            'women':'femmes',
            'men':'hommes',
            'youth':'jeunes',
            'teens':'adolescents',
            'girl_teens':'adolescentes filles',
            'boy_teens':'adolescentes garçons',
            'kids':'enfants',
            'girl_kids':'filles',
            'boy_kids':'garçons',
            'toddlers':'bébés',
            'senior':'personnes âgées',
            'other':'autre'
        }
    },
    hr:{
        filters: {
            title: 'Filtri',
            description: 'Izaberite filtre koje želite primijeniti na svoj pretragu.',
            searchPlaceholder: 'Pretraži kurseve...',
            clearAll: 'Obriši sve',
            city: 'Grad',
            activities: 'Aktivnosti',
            styles: 'Stilovi',
            levels: 'Razina',
            focus: 'Fokus',
            public: 'Publika',
            others: 'Ostali',
            drop_in: 'Drop-in kursevi'
        },
        course: {
            viewDetails: 'Pogledaj detalje',
            address: 'Adresa',
            organization: 'Organizacija',
            schedule: 'Raspored',
            level: 'Razina',
            days: {
                mon: 'Pon',
                tue: 'Uto',
                wed: 'Sre',
                thu: 'Čet',
                fri: 'Pet',
                sat: 'Sub',
                sun: 'Ned'
            }
        },
        focusOptions: {
            'individual': 'Tehnika',
            'groupwork': 'Grupna vježba',
            'partnerwork': 'Partner vježba',
            'theory': 'Teorija',
            'other': 'Ostali'
        },
        levels: {
            'op':'Otvoreni nivo',
            'a1':'Početni nivo',
            'a2':'Srednji početni nivo',
            'a3':'Visoki početni nivo',
            'b1':'Srednji nivo',
            'b2':'Visoki srednji nivo',
            'b3':'Visoki srednji nivo',
            'c1':'Visoki nivo',
            'c2':'Visoki srednji nivo',
            'c3':'Visoki srednji nivo',
            'm1':'Master nivo',
            'm2':'Master srednji nivo',
            'm3':'Master visoki nivo'
        },
        audience: {
            'everyone':'svi',
            'women':'žene',
            'men':'muškarci',
            'youth':'mladi',
            'teens':'adolescenti',
            'girl_teens':'adolescentice',
            'boy_teens':'adolescenti',
            'kids':'deci',
            'girl_kids':'devojčice',
            'boy_kids':'dečaci',
            'toddlers':'beba',
            'senior':'stari',
            'other':'ostali'
        }
    }
};
  
export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
  
  // Create a type-safe translation function
export function t(locale: Locale, key: string): string {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) return key; // Return the key if translation is not found
    }
    
    return value as string;
}

export function getTranslatedFocus(focus: string, t: (key: string) => string): string {
    const translationKey = `focusOptions.${focus}`;
    const translated = t(translationKey);
    return translated === translationKey ? focus.charAt(0).toUpperCase() + focus.slice(1) : translated;
}

export function getTranslatedLevel(level: string, t: (key: string) => string): string {
    const translationKey = `levels.${level}`;
    const translated = t(translationKey);
    return translated === translationKey ? level.charAt(0).toUpperCase() + level.slice(1) : translated;
}

export function getTranslatedActivity(activity: string, t: (key: string) => string): string {
    const translationKey = `audience.${activity}`;
    const translated = t(translationKey);
    return translated === translationKey ? activity.charAt(0).toUpperCase() + activity.slice(1) : translated;
}