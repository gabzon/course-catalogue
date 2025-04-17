// src/core/services/index.ts
import { SearchService } from './search';
import { GeolocationService } from './geo';
import { ConfigurationService } from './config';
import type { TypesenseConfig, CatalogueConfig } from '../types/index';

export class CourseCatalogueCore {
    private searchService: SearchService;
    private geoService: GeolocationService;
    private configService: ConfigurationService;

    constructor(
        typesenseConfig: TypesenseConfig,
        catalogueConfig?: Partial<CatalogueConfig>
    ) {
        this.searchService = new SearchService(typesenseConfig);
        this.geoService = new GeolocationService();
        this.configService = new ConfigurationService(catalogueConfig);
    }

    getSearchClient() {
        return this.searchService.getSearchClient();
    }

    async getUserLocation() {
        return this.geoService.getCurrentPosition();
    }

    getConfig() {
        return this.configService.getConfig();
    }

    updateConfig(newConfig: Partial<CatalogueConfig>) {
        this.configService.updateConfig(newConfig);
    }
}

export { SearchService } from './search';
export { GeolocationService } from './geo';
export { ConfigurationService } from './config';