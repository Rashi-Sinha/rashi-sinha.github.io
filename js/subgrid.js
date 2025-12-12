document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('#category-row [data-target]')
  categoryCards.forEach(card => {card.addEventListener('click', () => {
    const targetId = card.dataset.target;
    const targetGrid = document.getElementById(targetId);

    const isCurrentlyHidden = targetGrid.classList.contains('hidden-grid');

    // hide other grids
    document.querySelectorAll('.expandable-grid').forEach(grid => {
      if (grid !== targetGrid) grid.classList.add('hidden-grid');
    });

    targetGrid.classList.toggle('hidden-grid');


    // MASONRY After expanding the section
    if (!targetGrid.classList.contains('hidden-grid')) {

      // does this expanded section contain a masonry grid?
      const masonryGrid = targetGrid.querySelector('.masonry-grid');

      if (masonryGrid) {
        // delay so the browser can render it
        setTimeout(() => {
          if (typeof resizeAllGridItems === "function") {
            resizeAllGridItems();
          }
        }, 50);
      }
    }


    // --- Highlight the main category card ---
    categoryCards.forEach(c => c.classList.remove('card_style_active')); // reset all

    if (!targetGrid.classList.contains('hidden-grid')) {
        card.classList.add('card_style_active'); // highlight clicked card
        // Grid is now open → remember it
        localStorage.setItem('expandedGrid', targetGrid.id);
    }
    else {
        // Grid is now closed → clear memory
        localStorage.removeItem('expandedGrid');
    }

    if (!targetGrid.classList.contains('hidden-grid')) {
      targetGrid.scrollIntoView({ behavior: 'smooth',
        block: 'start'
      });



      // scroll back up by 200px (adjust to taste)
      setTimeout(() => {
        window.scrollBy({ top: -200, behavior: "smooth" });
      }, 300);
    }

    // --- Smooth scroll into view when collapsing ---
    if (!isCurrentlyHidden && targetGrid.classList.contains('hidden-grid')) {
    document.getElementById('category-row').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    }

  });
});
});


// remember last expanded grid and restore when returning to portfolio page, reselect active card

document.addEventListener('DOMContentLoaded', () => {
    const savedGrid = localStorage.getItem('expandedGrid');

    if (savedGrid) {
        // restore expanded grid
        const grid = document.getElementById(savedGrid);
        if (grid) {
            grid.classList.remove('hidden-grid');
            grid.scrollIntoView({ behavior: "smooth", block: "start" });
            

            // find corresponding card via data-target and set as active
            const card = document.querySelector(`[data-target="${savedGrid}"]`);
            if (card) {
                card.classList.add("card_style_active");
            }
            // scroll back up by 200px (adjust to taste)
            setTimeout(() => {
              window.scrollBy({ top: -200, behavior: "smooth" });
            }, 300);
        }
    }
});


