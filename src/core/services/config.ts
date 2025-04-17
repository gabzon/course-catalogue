// src/core/services/config.ts
import type { CatalogueConfig } from '../types/index';

export class ConfigurationService {
    private config: CatalogueConfig;

    constructor(initialConfig: Partial<CatalogueConfig> = {}) {
        this.config = this.mergeWithDefaults(initialConfig);
    }

    private defaultConfig: CatalogueConfig = {
        location: {
            coordinates: { lat: 45.8, lng: 15.97 }, // Zagreb default
            radius: 100000 // 100km
        },
        filters: {
            show: {
                city: true,
                activities: true,
                styles: true,
                levels: true,
                focus: true,
                public: true
            }
        },
        search: {
            hitsPerPage: 300
        },
        ui: {
            showMap: true,
            defaultView: 'map',
            theme: 'light'
        }
    };

    private mergeWithDefaults(config: Partial<CatalogueConfig>): CatalogueConfig {
        return {
            ...this.defaultConfig,
            ...config,
            filters: {
                show: {
                    ...this.defaultConfig.filters?.show,
                    ...config.filters?.show
                }
            }
        };
    }

    getConfig(): CatalogueConfig {
        return this.config;
    }

    updateConfig(newConfig: Partial<CatalogueConfig>): void {
        this.config = this.mergeWithDefaults(newConfig);
    }

    getFilterConfig() {
        return this.config.filters;
    }

    getLocationConfig() {
        return this.config.location;
    }

    getUIConfig() {
        return this.config.ui;
    }
}