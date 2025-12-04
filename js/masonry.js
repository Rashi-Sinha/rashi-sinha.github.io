function resizeAllGridItems(){
  const allItems = document.querySelectorAll('.masonry-item');
  const rowHeight = parseInt(window.getComputedStyle(document.querySelector('.masonry-grid')).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(document.querySelector('.masonry-grid')).getPropertyValue('gap'));
  
  allItems.forEach(item => {
    const media = item.querySelector('img, video');
    const mediaHeight = media.getBoundingClientRect().height;
    const rowSpan = Math.ceil((mediaHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
  });
}



// inside masonry.js, after resizeAllGridItems definition
// window.resizeAllGridItems = resizeAllGridItems;
window.addEventListener('load', resizeAllGridItems);
window.addEventListener('resize', resizeAllGridItems);


// Select all images inside your masonry grid
document.querySelectorAll('.masonry-item img').forEach(img => {
  img.style.cursor = 'pointer'; // show it's clickable

  img.addEventListener('click', () => {
    if (img.requestFullscreen) {
      img.requestFullscreen();
    } else if (img.webkitRequestFullscreen) { /* Safari */
      img.webkitRequestFullscreen();
    } else if (img.msRequestFullscreen) { /* IE11 */
      img.msRequestFullscreen();
    }
  });
});

