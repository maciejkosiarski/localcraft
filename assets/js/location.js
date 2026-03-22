/**
 * Location page - Map & Opening status
 */
(function() {
  'use strict';

  // Escape HTML to prevent XSS
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Custom terracotta marker SVG
  const markerSvg = `
    <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 28 16 28s16-16 16-28C32 7.163 24.837 0 16 0z" fill="#C4714A"/>
      <circle cx="16" cy="16" r="8" fill="#FAF7F0"/>
    </svg>
  `;

  // Initialize map
  function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    const lat = parseFloat(mapEl.dataset.lat);
    const lng = parseFloat(mapEl.dataset.lng);
    const name = mapEl.dataset.name || '';

    const map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    // Custom icon
    const customIcon = L.divIcon({
      html: markerSvg,
      className: 'location-marker',
      iconSize: [32, 44],
      iconAnchor: [16, 44],
      popupAnchor: [0, -44]
    });

    L.marker([lat, lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`<strong>${escapeHtml(name)}</strong>`)
      .openPopup();
  }

  // Update opening status
  function updateOpenStatus() {
    const statusEl = document.getElementById('open-status');
    if (!statusEl || !window.openingHours || !window.locationStrings) return;

    const now = new Date();
    const dayIndex = (now.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const todayHours = window.openingHours[dayIndex];
    const indicator = statusEl.querySelector('.location-status__indicator');
    const text = statusEl.querySelector('.location-status__text');

    if (!todayHours || todayHours.closed) {
      statusEl.classList.add('is-closed');
      statusEl.classList.remove('is-open', 'is-closing-soon');
      text.textContent = window.locationStrings.closed;
      return;
    }

    const [openH, openM] = todayHours.open.split(':').map(Number);
    const [closeH, closeM] = todayHours.close.split(':').map(Number);
    const openTime = openH * 60 + openM;
    const closeTime = closeH * 60 + closeM;

    if (currentTime >= openTime && currentTime < closeTime) {
      // Open
      if (closeTime - currentTime <= 30) {
        // Closing soon (within 30 min)
        statusEl.classList.add('is-closing-soon');
        statusEl.classList.remove('is-open', 'is-closed');
        text.textContent = window.locationStrings.closingSoon;
      } else {
        statusEl.classList.add('is-open');
        statusEl.classList.remove('is-closed', 'is-closing-soon');
        text.textContent = window.locationStrings.open;
      }
    } else {
      // Closed
      statusEl.classList.add('is-closed');
      statusEl.classList.remove('is-open', 'is-closing-soon');
      text.textContent = window.locationStrings.closed;
    }

    // Highlight current day in hours list
    const hoursList = document.getElementById('opening-hours-list');
    if (hoursList) {
      const items = hoursList.querySelectorAll('.location-hours__item');
      items.forEach((item, index) => {
        item.classList.toggle('is-today', index === dayIndex);
      });
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', function() {
    initMap();
    updateOpenStatus();
    // Update status every minute
    setInterval(updateOpenStatus, 60000);
  });
})();
