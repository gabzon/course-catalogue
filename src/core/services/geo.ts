// src/core/services/geo.ts
interface Location {
    lat: number;
    lng: number;
}

interface GeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
}

export class GeolocationService {
    private defaultOptions: GeolocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    constructor(private options: GeolocationOptions = {}) {
        this.options = { ...this.defaultOptions, ...options };
    }

    async getCurrentPosition(): Promise<Location> {
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by this browser.');
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                },
                this.options
            );
        });
    }

    calculateDistance(point1: Location, point2: Location): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRad(point2.lat - point1.lat);
        const dLon = this.toRad(point2.lng - point1.lng);
        const lat1 = this.toRad(point1.lat);
        const lat2 = this.toRad(point2.lat);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    private toRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}

// Also export the interfaces if they're needed elsewhere
export type { Location, GeolocationOptions };