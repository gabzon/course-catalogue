// src/core/services/search.ts
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import type { TypesenseConfig, SearchParams, SearchResponse, GeoHit } from '../types';

export class SearchService {
    private adapter: any;
    private searchClient: any;

    constructor(config: TypesenseConfig) {
        this.adapter = new TypesenseInstantSearchAdapter({
            server: {
                apiKey: config.apiKey,
                nodes: config.nodes,
                connectionTimeoutSeconds: config.connectionTimeoutSeconds || 2
            },
            additionalSearchParameters: {
                query_by: 'name,address,activities,styles,level'
            }
        });

        this.searchClient = this.adapter.searchClient;
    }

    getSearchClient() {
        return this.searchClient;
    }

    async search(params: SearchParams): Promise<SearchResponse<GeoHit>> {
        const searchParams = {
            q: params.query || '',
            per_page: params.hitsPerPage || 20,
            page: params.page || 1,
            filter_by: this.buildFilterString(params.filters),
            ...this.buildGeoFilter(params.location)
        };

        try {
            const response = await this.adapter.client.collections('courses').documents().search(searchParams);
            return this.formatResponse(response);
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }

    private buildFilterString(filters?: Record<string, any>): string {
        if (!filters) return '';

        return Object.entries(filters)
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return `${key}:[${value.join(',')}]`;
                }
                return `${key}:${value}`;
            })
            .join(' && ');
    }

    private buildGeoFilter(location?: SearchParams['location']) {
        if (!location) return {};

        return {
            filter_by: `_geoloc:(${location.lat}, ${location.lng}, ${location.radius || 100000})`,
            sort_by: '_geoloc(${location.lat}, ${location.lng}):asc'
        };
    }

    private formatResponse(response: any): SearchResponse<GeoHit> {
        return {
            hits: response.hits.map((hit: any) => ({
                ...hit.document,
                objectID: hit.document.id
            })),
            nbHits: response.found,
            page: response.page,
            nbPages: Math.ceil(response.found / response.per_page),
            processingTimeMS: response.search_time_ms
        };
    }
}