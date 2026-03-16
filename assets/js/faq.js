/**
 * FAQ Accordion
 * Vanilla JS implementation with accessibility support
 */
(function () {
  'use strict';

  const faqItems = document.querySelectorAll('.faq__item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other items (accordion behavior)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherButton = otherItem.querySelector('.faq__question');
          const otherAnswer = otherItem.querySelector('.faq__answer');
          if (otherButton && otherAnswer) {
            otherButton.setAttribute('aria-expanded', 'false');
            otherAnswer.hidden = true;
            otherItem.classList.remove('faq__item--open');
          }
        }
      });

      // Toggle current item
      button.setAttribute('aria-expanded', !isExpanded);
      answer.hidden = isExpanded;
      item.classList.toggle('faq__item--open', !isExpanded);
    });

    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      const buttons = Array.from(
        document.querySelectorAll('.faq__question')
      );
      const index = buttons.indexOf(button);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (index < buttons.length - 1) {
            buttons[index + 1].focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (index > 0) {
            buttons[index - 1].focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          buttons[0].focus();
          break;
        case 'End':
          e.preventDefault();
          buttons[buttons.length - 1].focus();
          break;
      }
    });
  });
})();
