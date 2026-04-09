/**
 * Credentials List Toggle
 * Vanilla JS implementation for show more/less functionality
 */
(function () {
  'use strict';

  const toggleButtons = document.querySelectorAll('.credentials-list__toggle');
  if (!toggleButtons.length) return;

  toggleButtons.forEach((button) => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);
    const textSpan = button.querySelector('.credentials-list__toggle-text');
    if (!target || !textSpan) return;

    const showText = textSpan.dataset.show;
    const hideText = textSpan.dataset.hide;

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', !isExpanded);
      button.classList.toggle('is-expanded', !isExpanded);
      target.classList.toggle('is-visible', !isExpanded);
      textSpan.textContent = isExpanded ? showText : hideText;
    });
  });
})();
