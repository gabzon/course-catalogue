// src/react/components/Map/CoursesMap.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useGeoSearch } from "react-instantsearch";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import { MapPinIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Supercluster from "supercluster";
import type { GeoHit } from "../../../core/types";
import { CourseCard } from "../CourseCard";
import { CourseFilters } from "../CourseFilters";
import { CoursePopup } from "../CoursePopup";
import type { MapProps, MapViewState, ClusterProperties, PointFeature } from "./types";

const DEFAULT_MAP_CENTER = { lat: 45.8, lng: 15.97 }; // Zagreb, Croatia
const DEFAULT_MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export const CoursesMap: React.FC<MapProps> = ({
    config = {},
    courseCardConfig = {},
    popupConfig = {}
}) => {
    const {
        initialView = {
            center: config.location?.coordinates || DEFAULT_MAP_CENTER,
            zoom: config.location?.zoom || 12
        },
        style = {
            mapStyle: DEFAULT_MAP_STYLE,
            clusterColor: 'rgb(99 102 241)', // indigo-500
            markerColor: 'rgb(99 102 241)',
            selectedMarkerColor: 'rgb(67 56 202)' // indigo-700
        },
        controls = {
            showZoom: true,
            showCompass: true,
            enableClustering: true,
            clusterRadius: 40,
            maxZoom: 16
        },
        layout = {
            showSidebar: true,
            sidebarWidth: '25%',
            mapPosition: 'right'
        },
        filters = {
            show: {
                city: true,
                activities: true,
                styles: true,
                levels: true,
                days: true,
                focus: true,
                public: true,
                dropIn: true,
                organization: true
            }
        }
    } = config;

    const { items } = useGeoSearch<GeoHit>();
    const [currentCourse, setCurrentCourse] = useState<GeoHit | null>(null);
    const [viewState, setViewState] = useState<MapViewState>({
        latitude: initialView.center?.lat || DEFAULT_MAP_CENTER.lat,
        longitude: initialView.center?.lng || DEFAULT_MAP_CENTER.lng,
        zoom: initialView.zoom || 12
    });
    const [clusters, setClusters] = useState<any[]>([]);
    const [supercluster, setSupercluster] = useState<Supercluster<ClusterProperties> | null>(null);
    const [selectedCluster, setSelectedCluster] = useState<any | null>(null);
    const mapRef = useRef<any>(null);
    const [showMobileList, setShowMobileList] = useState(false);

    // Initialize supercluster
    useEffect(() => {
        if (items && items.length > 0) {
            // Group items by location
            const locationGroups = items.reduce((acc, item) => {
                const key = `${item._geoloc.lat},${item._geoloc.lng}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(item);
                return acc;
            }, {} as Record<string, typeof items>);

            // Create points for each location group
            const points: PointFeature<ClusterProperties>[] = Object.entries(locationGroups).map(
                ([_, groupItems], index) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [groupItems[0]._geoloc.lng, groupItems[0]._geoloc.lat],
                    },
                    properties: {
                        cluster: false,
                        clusterId: index,
                        pointCount: groupItems.length,
                        courseIds: groupItems.map(item => item.objectID),
                    },
                })
            );

            if (controls.enableClustering) {
                const index = new Supercluster<ClusterProperties>({
                    radius: controls.clusterRadius,
                    maxZoom: controls.maxZoom,
                    map: (props) => ({ courseIds: props.courseIds }),
                    reduce: (accumulated, props) => {
                        accumulated.courseIds = [
                            ...new Set([...accumulated.courseIds, ...props.courseIds]),
                        ];
                    },
                });
                index.load(points);
                setSupercluster(index);
            } else {
                setClusters(points);
            }
        }
    }, [items, controls.enableClustering, controls.clusterRadius, controls.maxZoom]);

    // Update clusters when view changes
    useEffect(() => {
        if (supercluster && controls.enableClustering) {
            const newClusters = supercluster.getClusters(
                [-180, -85, 180, 85],
                Math.floor(viewState.zoom)
            );
            setClusters(newClusters);
        }
    }, [supercluster, viewState.zoom, controls.enableClustering]);

    const handleMarkerClick = useCallback((cluster: any) => {
        setSelectedCluster(cluster);
    }, []);

    const handleCourseSelect = useCallback((course: GeoHit | null) => {
        setCurrentCourse(course);
        if (course) {
            setViewState(prev => ({
                ...prev,
                latitude: course._geoloc.lat,
                longitude: course._geoloc.lng,
                zoom: Math.max(prev.zoom, 14)
            }));
        }
    }, []);

    const renderCluster = useCallback(
        (cluster: any) => {
            if (!cluster || !cluster.geometry || !cluster.geometry.coordinates) {
                return null;
            }

            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, pointCount } = cluster.properties;

            if (isCluster && controls.enableClustering) {
                return (
                    <Marker
                        key={`cluster-${cluster.id}`}
                        longitude={longitude}
                        latitude={latitude}
                    >
                        <div
                            className="cluster-marker flex items-center justify-center rounded-full text-white text-sm font-bold"
                            style={{
                                backgroundColor: style.clusterColor,
                                width: `${10 + (pointCount / items.length) * 20}px`,
                                height: `${10 + (pointCount / items.length) * 20}px`,
                            }}
                            onClick={() => handleMarkerClick(cluster)}
                        >
                            {pointCount}
                        </div>
                    </Marker>
                );
            }

            return (
                <Marker
                    key={`course-${cluster.properties.courseIds[0]}`}
                    longitude={longitude}
                    latitude={latitude}
                    onClick={() => handleMarkerClick(cluster)}
                >
                    <MapPinIcon
                        className={`w-6 h-6 ${
                            currentCourse &&
                            currentCourse._geoloc.lat === latitude &&
                            currentCourse._geoloc.lng === longitude
                                ? 'text-indigo-600'
                                : 'text-black'
                        }`}
                    />
                </Marker>
            );
        },
        [items.length, currentCourse, style.markerColor, style.selectedMarkerColor, 
         style.clusterColor, controls.enableClustering]
    );

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Mobile Layout (below md breakpoint) */}
            <div className="md:hidden flex flex-col h-full">
                <header className="p-2 bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-2">
                        <CourseFilters config={filters} />
                        <button
                            onClick={() => setShowMobileList(!showMobileList)}
                            className="ml-2 p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label={showMobileList ? 'Close list' : 'Open list'}
                        >
                            {showMobileList ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </header>
                
                {showMobileList && (
                    <div className="h-1/2 overflow-y-auto border-b border-gray-300">
                        <div className="overflow-y-auto">
                            {items.map((course) => (
                                <CourseCard
                                    key={course.objectID}
                                    course={course}
                                    onClick={handleCourseSelect}
                                    currentCourse={currentCourse}
                                    config={courseCardConfig}
                                />
                            ))}
                        </div>
                    </div>
                )}
                
                <div className={`relative ${showMobileList ? 'h-1/2' : 'h-full'}`}>
                    <Map
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        mapStyle={style.mapStyle}
                        ref={mapRef}
                    >
                        {controls.showZoom && <NavigationControl showCompass={controls.showCompass} />}
                        {clusters.map(renderCluster)}
                        {selectedCluster && (
                            <Popup
                                longitude={selectedCluster.geometry.coordinates[0]}
                                latitude={selectedCluster.geometry.coordinates[1]}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setSelectedCluster(null)}
                                anchor="bottom"
                                className="corazon-popup"
                            >
                                <CoursePopup
                                    courses={items.filter(item => 
                                        selectedCluster.properties.courseIds.includes(item.objectID)
                                    )}
                                    onCourseSelect={handleCourseSelect}
                                    selectedCourse={currentCourse}
                                    config={popupConfig}
                                />
                            </Popup>
                        )}
                    </Map>
                </div>
            </div>

            {/* Desktop Layout (md and up) */}
            <div className={`hidden md:flex ${layout.mapPosition === 'right' ? 'flex-row' : 'flex-row-reverse'} h-full`}>
                {layout.showSidebar && (
                    <aside 
                        className="flex flex-col h-full border-r border-gray-300 overflow-y-auto md:w-2/5 lg:w-1/3 xl:w-1/4"
                    >
                        <header className="p-2 bg-white border-b border-gray-200 sticky top-0 z-10 flex-shrink-0">
                            <CourseFilters config={filters} />
                        </header>
                        <div className="flex-1 overflow-y-auto">
                            {items.map((course) => (
                                <CourseCard
                                    key={course.objectID}
                                    course={course}
                                    onClick={handleCourseSelect}
                                    currentCourse={currentCourse}
                                    config={courseCardConfig}
                                />
                            ))}
                        </div>
                    </aside>
                )}

                <main className="flex-1 relative">
                    <Map
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        mapStyle={style.mapStyle}
                        ref={mapRef}
                    >
                        {controls.showZoom && <NavigationControl showCompass={controls.showCompass} />}
                        {clusters.map(renderCluster)}
                        {selectedCluster && (
                            <Popup
                                longitude={selectedCluster.geometry.coordinates[0]}
                                latitude={selectedCluster.geometry.coordinates[1]}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setSelectedCluster(null)}
                                anchor="bottom"
                                className="corazon-popup"
                            >
                                <CoursePopup
                                    courses={items.filter(item => 
                                        selectedCluster.properties.courseIds.includes(item.objectID)
                                    )}
                                    onCourseSelect={handleCourseSelect}
                                    selectedCourse={currentCourse}
                                    config={popupConfig}
                                />
                            </Popup>
                        )}
                    </Map>
                </main>
            </div>
        </div>
    );
};