/**
 * Pricing Filter Module
 *
 * Real-time search and category filtering for pricing tables.
 * Features:
 * - Text search by service name and tags
 * - Category filter buttons
 * - Combined filtering (search + category)
 * - "No results" message handling
 * - Progressive enhancement (works without JS)
 */
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('pricing-search-input');
  const noResults = document.getElementById('pricing-no-results');
  const categories = document.querySelectorAll('.pricing__category');
  const filterBtns = document.querySelectorAll('.pricing__filter-btn');

  if (!searchInput) return;

  function filterPricing() {
    const query = searchInput.value.toLowerCase().trim();
    const activeFilter = document.querySelector('.pricing__filter-btn.active');
    const activeCategory = activeFilter ? activeFilter.dataset.category : 'all';
    let totalVisible = 0;

    categories.forEach(function(category) {
      const categoryName = category.dataset.category || '';
      const rows = category.querySelectorAll('.pricing__row');
      let categoryVisible = 0;

      rows.forEach(function(row) {
        const name = row.dataset.name || '';
        const tags = row.dataset.tags || '';
        const matchesSearch = !query || name.includes(query) || tags.includes(query);
        const matchesCategory = activeCategory === 'all' || categoryName === activeCategory;

        if (matchesSearch && matchesCategory) {
          row.hidden = false;
          categoryVisible++;
        } else {
          row.hidden = true;
        }
      });

      category.hidden = categoryVisible === 0;
      totalVisible += categoryVisible;
    });

    noResults.hidden = totalVisible > 0;
  }

  searchInput.addEventListener('input', filterPricing);

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      filterPricing();
    });
  });
});
