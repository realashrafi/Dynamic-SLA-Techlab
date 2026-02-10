"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// @ts-ignore
import polyline from "@mapbox/polyline";

import marker2x from "../components/location.png";
import marker1x from "../components/location.png";
import shadow from "../components/location.png";

// Fix default marker icons (Next bundling issue)
L.Icon.Default.mergeOptions({
    iconRetinaUrl: (marker2x as any).src,
    iconUrl: (marker1x as any).src,
    shadowUrl: null,
});

function FitBounds({ points }: { points: [number, number][] }) {
    const map = useMap();

    useEffect(() => {
        if (!points?.length) return;
        const b = L.latLngBounds(points.map(([lat, lng]) => L.latLng(lat, lng)));
        map.fitBounds(b, { padding: [20, 20] });
    }, [map, points]);

    return null;
}

type OSRMRoute = {
    geometry: string; // polyline
    distance: number; // meters
    duration: number; // seconds
};

export default function RouteMapClient({
                                           origin,
                                           destination,
                                           height = 420,
                                           className,
                                       }: {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    height?: number;
    className?: string;
}) {
    const points = useMemo<[number, number][]>(() => {
        if (!origin?.lat || !origin?.lng || !destination?.lat || !destination?.lng) return [];
        return [
            [origin.lat, origin.lng],
            [destination.lat, destination.lng],
        ];
    }, [origin, destination]);

    const [route, setRoute] = useState<{
        line: [number, number][];
        distanceKm: number;
        durationMin: number;
    } | null>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let aborted = false;

        async function fetchRoute() {
            if (points.length !== 2) {
                setRoute(null);
                return;
            }

            setLoading(true);
            setRoute(null);

            // OSRM expects: lng,lat
            const o = `${origin.lng},${origin.lat}`;
            const d = `${destination.lng},${destination.lat}`;

            // overview=full => full geometry, geometries=polyline => encoded polyline
            const url = `https://router.project-osrm.org/route/v1/driving/${o};${d}?overview=full&geometries=polyline&alternatives=false&steps=false`;

            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`OSRM error: ${res.status}`);

                const json = await res.json();
                const r: OSRMRoute | undefined = json?.routes?.[0];
                if (!r?.geometry) throw new Error("No route geometry");

                const decoded = polyline.decode(r.geometry) as [number, number][];

                if (!aborted) {
                    setRoute({
                        line: decoded,
                        distanceKm: Math.round((r.distance / 1000) * 10) / 10,
                        durationMin: Math.round((r.duration / 60) * 10) / 10,
                    });
                }
            } catch (e) {
                // Fallback: straight line if OSRM fails
                if (!aborted) {
                    setRoute({
                        line: points,
                        distanceKm: 0,
                        durationMin: 0,
                    });
                }
            } finally {
                if (!aborted) setLoading(false);
            }
        }

        fetchRoute();
        return () => {
            aborted = true;
        };
    }, [origin.lat, origin.lng, destination.lat, destination.lng]); // stable deps

    const center = useMemo<[number, number]>(() => {
        if (points.length === 2) return points[0];
        return [35.6892, 51.389] as [number, number]; // Tehran fallback
    }, [points]);

    return (
        <div
            className={className}
            style={{ height, width: "100%", borderRadius: 16, overflow: "hidden" }}
        >
            <MapContainer center={center} zoom={6} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {points.length === 2 && <FitBounds points={points} />}

                {points.length === 2 && (
                    <>
                        <Marker position={points[0]}>
                            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                                Origin
                            </Tooltip>
                        </Marker>

                        <Marker position={points[1]}>
                            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                                Destination
                            </Tooltip>
                        </Marker>
                    </>
                )}

                {/* Route */}
                {route?.line?.length ? (
                    <Polyline positions={route.line} pathOptions={{ weight: 5, opacity: 0.9 }} />
                ) : null}
            </MapContainer>

            {/* Lightweight status overlay (optional) */}
            <div
                style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    right: 12,
                    pointerEvents: "none",
                }}
            >
                {/* فقط اگر خواستید عدد route را هم نمایش دهید */}
                {/* شما می‌تونید اینو خاموش کنید، کارت خودتون overlay داره */}
                {loading ? (
                    <div
                        style={{
                            display: "inline-flex",
                            gap: 8,
                            alignItems: "center",
                            padding: "8px 12px",
                            borderRadius: 12,
                            background: "rgba(10,37,64,0.75)",
                            border: "1px solid rgba(255,107,0,0.25)",
                            color: "white",
                            fontSize: 12,
                        }}
                    >
                        Calculating route…
                    </div>
                ) : route && route.distanceKm ? (
                    <div
                        style={{
                            display: "inline-flex",
                            gap: 10,
                            alignItems: "center",
                            padding: "8px 12px",
                            borderRadius: 12,
                            background: "rgba(10,37,64,0.75)",
                            border: "1px solid rgba(255,107,0,0.25)",
                            color: "white",
                            fontSize: 12,
                        }}
                    >
                        <span>Distance: {route.distanceKm} km</span>
                        <span>ETA: {route.durationMin} min</span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
