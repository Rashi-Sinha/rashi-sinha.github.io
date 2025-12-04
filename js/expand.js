document.addEventListener('DOMContentLoaded', () => {
  const expandedSection = document.querySelectorAll('#expand-click [data-target]')
  expandedSection.forEach(sec => {sec.addEventListener('click', () => {
    const targetId = sec.dataset.target;
    const targetSection = document.getElementById(targetId);

    const isCurrentlyHidden = targetSection.classList.contains('hidden-section');

    // hide other sectios
    document.querySelectorAll('.expandable-section').forEach(expSec => {
      if (expSec !== targetSection) expSec.classList.add('hidden-section');
    });

    targetSection.classList.toggle('hidden-section');

    if (!targetSection.classList.contains('hidden-section')) {
      targetSection.scrollIntoView({ behavior: 'smooth',
        block: 'start'
      });
    }

    // 3. TOGGLE THE ARROW CHECKBOX (THE IMPORTANT PART)
      const arrowCheckbox = sec.querySelector('.arrow-label input');
      arrowCheckbox.checked = !arrowCheckbox.checked;


    // --- Smooth scroll into view when collapsing ---
    if (!isCurrentlyHidden && targetSection.classList.contains('hidden-section')) {
    // It was open, and now it just closed
    document.getElementById('expand-click').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    }


  });
});
});

