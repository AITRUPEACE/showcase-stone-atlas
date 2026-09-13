"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { sites, tourStops, TourStop } from "@/data/tour";
import { useTourStore } from "@/stores/tour-store";

function createSiteIcon(isActive: boolean, isSecondary: boolean = false) {
  const className = `site-marker ${isActive ? "active" : ""} ${isSecondary ? "secondary" : ""}`;
  return L.divIcon({
    className,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

interface MapControllerProps {
  targetCenter: [number, number];
  targetZoom: number;
  reducedMotion: boolean;
}

function MapController({ targetCenter, targetZoom, reducedMotion }: MapControllerProps) {
  const map = useMap();
  const isAnimating = useRef(false);

  useEffect(() => {
    if (isAnimating.current) return;
    
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();
    
    const isSamePosition =
      Math.abs(currentCenter.lat - targetCenter[0]) < 0.001 &&
      Math.abs(currentCenter.lng - targetCenter[1]) < 0.001 &&
      currentZoom === targetZoom;
    
    if (isSamePosition) return;

    isAnimating.current = true;
    
    if (reducedMotion) {
      map.setView(targetCenter, targetZoom, { animate: false });
      isAnimating.current = false;
    } else {
      map.flyTo(targetCenter, targetZoom, {
        duration: 0.8,
        easeLinearity: 0.25,
      });
      
      setTimeout(() => {
        isAnimating.current = false;
      }, 850);
    }
  }, [map, targetCenter, targetZoom, reducedMotion]);

  return null;
}

interface ConnectionLinesProps {
  sites: string[];
  showConnections: boolean;
  reducedMotion: boolean;
}

function ConnectionLines({ sites: activeSiteIds, showConnections, reducedMotion }: ConnectionLinesProps) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const prevShowConnections = useRef(showConnections);
  
  useEffect(() => {
    if (showConnections && !prevShowConnections.current) {
      const timer = setTimeout(() => setIsAnimationComplete(true), reducedMotion ? 0 : 300);
      prevShowConnections.current = true;
      return () => clearTimeout(timer);
    }
    if (!showConnections && prevShowConnections.current) {
      setIsAnimationComplete(false);
      prevShowConnections.current = false;
    }
    return undefined;
  }, [showConnections, reducedMotion]);

  const shouldShowLines = showConnections && (isAnimationComplete || reducedMotion);

  if (!shouldShowLines || activeSiteIds.length < 2) return null;

  const activeSites = activeSiteIds
    .map((id) => sites[id])
    .filter(Boolean);

  const lines: Array<[[number, number], [number, number]]> = [];
  
  for (let i = 0; i < activeSites.length; i++) {
    for (let j = i + 1; j < activeSites.length; j++) {
      lines.push([
        activeSites[i].coordinates,
        activeSites[j].coordinates,
      ]);
    }
  }

  return (
    <>
      {lines.map((positions, index) => (
        <Polyline
          key={index}
          positions={positions}
          pathOptions={{
            color: "#f97316",
            weight: 2,
            opacity: 0.6,
            dashArray: reducedMotion ? undefined : "5, 10",
          }}
        />
      ))}
    </>
  );
}

interface SiteMarkersProps {
  activeSites: string[];
  currentStop: TourStop;
  onSiteClick?: (siteId: string) => void;
}

function SiteMarkers({ activeSites, currentStop, onSiteClick }: SiteMarkersProps) {
  const allSites = Object.values(sites);
  const inTour = currentStop !== "idle" && currentStop !== "free";

  return (
    <>
      {allSites.map((site) => {
        const isActive = activeSites.includes(site.id);
        const isVisible = currentStop === "free" || isActive;
        
        if (!isVisible) return null;

        const isPrimarySite = site.id === "sacsayhuaman";
        
        return (
          <Marker
            key={site.id}
            position={site.coordinates}
            icon={createSiteIcon(isActive && inTour, !isPrimarySite && isActive)}
            eventHandlers={{
              click: () => onSiteClick?.(site.id),
            }}
          />
        );
      })}
    </>
  );
}

interface AtlasMapProps {
  onSiteClick?: (siteId: string) => void;
  onMapClick?: () => void;
}

export function AtlasMap({ onSiteClick, onMapClick }: AtlasMapProps) {
  const { currentStop, reducedMotion, openLeaveDialog } = useTourStore();
  
  const stopConfig = tourStops.find((s) => s.id === currentStop) || tourStops[0];
  
  const handleMapClick = () => {
    const inTour = currentStop !== "idle" && currentStop !== "free";
    if (inTour) {
      openLeaveDialog();
    }
    onMapClick?.();
  };

  return (
    <MapContainer
      center={stopConfig.center}
      zoom={stopConfig.zoom}
      className="w-full h-full"
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={currentStop === "free"}
      dragging={currentStop === "free"}
      doubleClickZoom={currentStop === "free"}
      touchZoom={currentStop === "free"}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MapController
        targetCenter={stopConfig.center}
        targetZoom={stopConfig.zoom}
        reducedMotion={reducedMotion}
      />
      <ConnectionLines
        sites={stopConfig.activeSites}
        showConnections={stopConfig.showConnections}
        reducedMotion={reducedMotion}
      />
      <SiteMarkers
        activeSites={stopConfig.activeSites}
        currentStop={currentStop}
        onSiteClick={onSiteClick}
      />
      <MapClickHandler onClick={handleMapClick} />
    </MapContainer>
  );
}

function MapClickHandler({ onClick }: { onClick: () => void }) {
  const map = useMap();
  
  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      const target = e.originalEvent.target as HTMLElement;
      if (!target.closest(".site-marker")) {
        onClick();
      }
    };
    
    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onClick]);

  return null;
}
