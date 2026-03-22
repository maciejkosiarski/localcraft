/**
 * Navigation Module
 *
 * Handles mobile navigation toggle with accessibility support.
 * Features:
 * - Hamburger menu toggle for mobile viewports
 * - ARIA attributes for screen readers
 * - Keyboard navigation (Escape to close)
 * - Click outside to close
 * - Auto-close on link click (mobile)
 */
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const nav = document.querySelector('.nav');

  if (!toggle || !menu) return;

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('active');
    const firstLink = menu.querySelector('.nav__link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('active');
    toggle.focus();
  }

  function isMenuOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  toggle.addEventListener('click', function() {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen()) {
      closeMenu();
    }
  });

  document.addEventListener('click', function(e) {
    if (isMenuOpen() && !nav.contains(e.target)) {
      closeMenu();
    }
  });

  menu.querySelectorAll('.nav__link').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });
});
