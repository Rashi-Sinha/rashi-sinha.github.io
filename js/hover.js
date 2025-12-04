
const hoverElement = document.querySelector('.hoverElement');

// 2. Add the mouseenter event listener (when the cursor enters the element)
hoverElement.addEventListener('mouseenter', (event) => {
    // Change the background color on hover
    // event.target.style.backgroundColor = 'lightgray';
    event.target.classList.add('hover-active');
    console.log('Mouse entered the element.');
});

// 3. Add the mouseleave event listener (when the cursor leaves the element)
hoverElement.addEventListener('mouseleave', (event) => {
    // Revert the background color when the cursor leaves
    // event.target.style.backgroundColor = '#fafafa';
    event.target.classList.remove('hover-active');
    console.log('Mouse left the element.');
});
