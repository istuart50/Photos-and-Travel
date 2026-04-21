// src/components/Portfolio.js
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LOCATIONS from '../data/locations';

function ClickableMarker({ loc, onSelect }) {
  return (
    <CircleMarker
      center={loc.coords}
      radius={12}
      pathOptions={{ color: '#fff', weight: 2, fillColor: '#c9a84c', fillOpacity: 1 }}
      eventHandlers={{ click: () => onSelect(loc) }}
    >
      <Tooltip direction="top" offset={[0, -14]} opacity={1}>
        {loc.name}
      </Tooltip>
    </CircleMarker>
  );
}

function Gallery({ location, onClose }) {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActivePhoto(p => Math.min(p + 1, location.photos.length - 1));
      if (e.key === 'ArrowLeft') setActivePhoto(p => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [location, onClose]);

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="gallery-header">
          <h2>{location.name}</h2>
          <p>{location.description}</p>
        </div>
        <div className="gallery-main">
          <button
            className="gallery-nav gallery-nav-prev"
            onClick={() => setActivePhoto(p => Math.max(p - 1, 0))}
            disabled={activePhoto === 0}
            aria-label="Previous photo"
          >‹</button>
          <img
            src={location.photos[activePhoto]}
            alt={`${location.name} ${activePhoto + 1}`}
            className="gallery-photo"
          />
          <button
            className="gallery-nav gallery-nav-next"
            onClick={() => setActivePhoto(p => Math.min(p + 1, location.photos.length - 1))}
            disabled={activePhoto === location.photos.length - 1}
            aria-label="Next photo"
          >›</button>
        </div>
        <div className="gallery-thumbs">
          {location.photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`${location.name} thumbnail ${i + 1}`}
              className={`gallery-thumb${i === activePhoto ? ' gallery-thumb-active' : ''}`}
              onClick={() => setActivePhoto(i)}
            />
          ))}
        </div>
        <div className="gallery-counter">{activePhoto + 1} / {location.photos.length}</div>
      </div>
    </div>
  );
}

function Portfolio() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="section-content portfolio-content">
        <h2>Travel Portfolio</h2>
        <p className="portfolio-subtitle">
          Click a pin to explore photos from that destination.
        </p>
        <div className="map-container">
          <MapContainer
            center={[39.5, -98.35]}
            zoom={4}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {LOCATIONS.map((loc) => (
              <ClickableMarker key={loc.id} loc={loc} onSelect={setSelectedLocation} />
            ))}
          </MapContainer>
        </div>
        <div className="location-list">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              className="location-chip"
              onClick={() => setSelectedLocation(loc)}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>
      {selectedLocation && (
        <Gallery location={selectedLocation} onClose={() => setSelectedLocation(null)} />
      )}
    </section>
  );
}

export default Portfolio;
