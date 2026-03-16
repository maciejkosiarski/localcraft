/**
 * Gallery: Before/After Slider, Breed Filters & Lightbox
 * Vanilla JS implementation
 */
(function () {
  'use strict';

  // ==================
  // Before/After Slider
  // ==================
  function initSlider(slider) {
    const beforeLayer = slider.querySelector('.ba-slider__before');
    const handle = slider.querySelector('.ba-slider__handle');
    if (!beforeLayer || !handle) return;

    let isDragging = false;

    function setPosition(percent) {
      percent = Math.max(0, Math.min(100, percent));
      beforeLayer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = percent + '%';
      handle.setAttribute('aria-valuenow', Math.round(percent));
    }

    function getPercent(clientX) {
      const rect = slider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onStart(e) {
      e.preventDefault();
      isDragging = true;
      slider.classList.add('ba-slider--active');

      const clientX = e.type.startsWith('touch')
        ? e.touches[0].clientX
        : e.clientX;
      setPosition(getPercent(clientX));
    }

    function onMove(e) {
      if (!isDragging) return;

      const clientX = e.type.startsWith('touch')
        ? e.touches[0].clientX
        : e.clientX;
      setPosition(getPercent(clientX));
    }

    function onEnd() {
      isDragging = false;
      slider.classList.remove('ba-slider--active');
    }

    // Mouse events
    slider.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    // Touch events
    slider.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend', onEnd);

    // Keyboard support for accessibility
    handle.addEventListener('keydown', function (e) {
      const step = 5;
      const current = parseFloat(handle.style.left) || 50;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        setPosition(current - step);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        setPosition(current + step);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPosition(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPosition(100);
      }
    });

    // Initialize at 50%
    setPosition(50);
  }

  function initSliders() {
    const sliders = document.querySelectorAll('.ba-slider');
    sliders.forEach(initSlider);
  }

  // ==================
  // Breed Filters
  // ==================
  function initFilters() {
    const filterContainer = document.querySelector('.gallery__filters');
    if (!filterContainer) return;

    const buttons = filterContainer.querySelectorAll('.gallery__filter-btn');
    const cards = document.querySelectorAll('.gallery__card');

    filterContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('.gallery__filter-btn');
      if (!btn) return;

      const breed = btn.dataset.breed;

      // Update active button
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Filter cards
      cards.forEach(function (card) {
        if (breed === 'all' || card.dataset.breed === breed) {
          card.hidden = false;
        } else {
          card.hidden = true;
        }
      });
    });
  }

  // ==================
  // Lightbox
  // ==================
  function initLightbox() {
    const dialog = document.querySelector('.lightbox');
    if (!dialog) return;

    const image = dialog.querySelector('.lightbox__image');
    const caption = dialog.querySelector('.lightbox__caption');
    const closeBtn = dialog.querySelector('.lightbox__close');
    const prevBtn = dialog.querySelector('.lightbox__nav--prev');
    const nextBtn = dialog.querySelector('.lightbox__nav--next');

    let visibleCards = [];
    let currentIndex = 0;

    function getVisibleCards() {
      return Array.from(document.querySelectorAll('.gallery__card:not([hidden])'));
    }

    function getImageFromCard(card) {
      // Prefer after image, fallback to before
      const afterImg = card.querySelector('.ba-slider__after .ba-slider__image');
      const beforeImg = card.querySelector('.ba-slider__before .ba-slider__image');
      return afterImg || beforeImg;
    }

    function showImage(index) {
      visibleCards = getVisibleCards();
      if (visibleCards.length === 0) return;

      currentIndex = (index + visibleCards.length) % visibleCards.length;
      const card = visibleCards[currentIndex];
      const img = getImageFromCard(card);
      const name = card.querySelector('.gallery__name');
      const breed = card.querySelector('.gallery__breed');

      if (img) {
        image.src = img.src;
        image.alt = img.alt;
      }

      const captionText = name ? name.textContent : '';
      const breedText = breed ? ' — ' + breed.textContent : '';
      caption.textContent = captionText + breedText;

      // Update nav visibility
      prevBtn.style.visibility = visibleCards.length > 1 ? 'visible' : 'hidden';
      nextBtn.style.visibility = visibleCards.length > 1 ? 'visible' : 'hidden';
    }

    function openLightbox(card) {
      visibleCards = getVisibleCards();
      currentIndex = visibleCards.indexOf(card);
      if (currentIndex === -1) currentIndex = 0;
      showImage(currentIndex);
      dialog.showModal();
    }

    function closeLightbox() {
      dialog.close();
    }

    function showPrev() {
      showImage(currentIndex - 1);
    }

    function showNext() {
      showImage(currentIndex + 1);
    }

    // Click on card to open lightbox
    document.querySelector('.gallery__grid')?.addEventListener('click', function (e) {
      const card = e.target.closest('.gallery__card');
      // Don't open if interacting with slider handle
      if (e.target.closest('.ba-slider__handle')) return;
      if (card) {
        openLightbox(card);
      }
    });

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Navigation buttons
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Click on backdrop closes lightbox
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      }
      // ESC is handled natively by <dialog>
    });
  }

  // ==================
  // Init
  // ==================
  function init() {
    initSliders();
    initFilters();
    initLightbox();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
