
const categoryBtn = document.getElementById('categoryBtn');
const categoryMenu = document.getElementById('categoryMenu');

if (categoryBtn && categoryMenu) {
    categoryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        categoryMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!categoryMenu.contains(e.target) && !categoryBtn.contains(e.target)) {
            categoryMenu.classList.remove('show');
        }
    });
}
const allSliders = document.querySelectorAll('.slider-track');
const SCROLL_AMOUNT = 260;
const AUTO_SLIDE_INTERVAL = 3000;

allSliders.forEach(track => {
    const sliderId = track.id;
    const nextBtn = document.querySelector(`.slider-btn-right[data-slider="${sliderId}"]`);
    const prevBtn = document.querySelector(`.slider-btn-left[data-slider="${sliderId}"]`);

    if (!nextBtn || !prevBtn) return;

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    });

    let autoSlide = setInterval(() => scrollNext(track), AUTO_SLIDE_INTERVAL);

    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => scrollNext(track), AUTO_SLIDE_INTERVAL);
    });

    toggleSliderButtons(track, nextBtn, prevBtn);
    window.addEventListener('resize', () => {
        toggleSliderButtons(track, nextBtn, prevBtn);
    });
});

function scrollNext(track) {
    const isAtStart = track.scrollLeft <= -(track.scrollWidth - track.clientWidth - 10);
    if (isAtStart) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    }
}

function toggleSliderButtons(track, nextBtn, prevBtn) {
    const needsScroll = track.scrollWidth > track.clientWidth + 5;
    nextBtn.style.display = needsScroll ? 'flex' : 'none';
    prevBtn.style.display = needsScroll ? 'flex' : 'none';
}