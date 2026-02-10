"use client";

import dynamic from "next/dynamic";

const RouteMapClient = dynamic(() => import("./RouteMapClient"), { ssr: false });

export default function RouteMap(props: {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    height?: number;
    className?: string;
}) {
    return <RouteMapClient {...props} />;
}
