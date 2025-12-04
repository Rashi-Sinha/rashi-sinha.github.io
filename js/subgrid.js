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



      // scroll back up by 150px (adjust to taste)
      setTimeout(() => {
        window.scrollBy({ top: -200, behavior: "smooth" });
      }, 275);
    }

    // --- Smooth scroll into view when collapsing ---
    if (!isCurrentlyHidden && targetGrid.classList.contains('hidden-grid')) {
    // It was open, and now it just closed
    document.getElementById('category-row').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    }

  });
});
});

// document.addEventListener('DOMContentLoaded', () => {
//     const saved = localStorage.getItem('expandedGrid');
//     if (saved) {
//         const savedGrid = document.getElementById(saved);
//         if (savedGrid) {
//             savedGrid.classList.remove('hidden-grid');
            
//             // optional: scroll to it
//             // savedGrid.scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const savedGrid = localStorage.getItem('expandedGrid');

    if (savedGrid) {
        // restore expanded grid
        const grid = document.getElementById(savedGrid);
        if (grid) {
            grid.classList.remove('hidden-grid');

            // find corresponding card via data-target
            const card = document.querySelector(`[data-target="${savedGrid}"]`);
            if (card) {
                card.classList.add("card_style_active");
            }
        }
    }
});





// document.addEventListener('DOMContentLoaded', () => {
//   // Select all main category cards
//   const categoryCards = document.querySelectorAll('[data-target]');

//   categoryCards.forEach(card => {
//     card.addEventListener('click', () => {
//       const category = card.dataset.target; // e.g. "tech"

//       // Hide expandable cards for all other categories
//       document.querySelectorAll('.expandable-grid').forEach(gridCard => {
//         if (!gridCard.classList.contains(category)) {
//           gridCard.classList.add('hidden-grid');
//         }
//       });

//       // Toggle visibility of expandable cards for clicked category
//       document.querySelectorAll(`.expandable-grid.${category}`).forEach(gridCard => {
//         gridCard.classList.toggle('hidden-grid');
//       });
//     });
//   });
// });

// ===================================================================================================


// document.addEventListener('DOMContentLoaded', () => {
//   const categoryCards = document.querySelectorAll('#category-row .card_style');

//   categoryCards.forEach(card => {
//     card.addEventListener('click', () => {
//       const targetId = card.dataset.target;
//       const targetGrid = document.getElementById(targetId);

//       // Only hide other expandable grids, not the main category row
//       document.querySelectorAll('.expandable-grid').forEach(grid => {
//         if (grid.id !== targetId) grid.classList.add('hidden-grid');
//       });

//       // Toggle the clicked grid
//       targetGrid.classList.toggle('hidden-grid');

//       // Optional: scroll to the expanded section
//       if (!targetGrid.classList.contains('hidden-grid')) {
//         targetGrid.scrollIntoView({ behavior: 'smooth' });
//       }
//     });
//   });
// });