
export function initDropdown() {
    // dropdown button
    const togglers = document.querySelectorAll('.demo-btn-dropdown:not([data-initialised])');

    togglers.forEach((el) => {
        el.setAttribute('data-initialised', 'true');
        el.addEventListener('click', () => {
            el.classList.toggle('is-open')
        })
    })

    document.addEventListener('click', (e) => {
        const togglers = document.querySelectorAll('.demo-btn-dropdown');
        togglers.forEach((el) => {
            if (!el.contains(e.target)) {
                el.classList.remove('is-open')
            }
        })
    });
}

export function initFooter() {
    // footer block
    const footerBlockTitles = document.querySelectorAll('.aaifooterblock-title:not([data-initialised])')

    footerBlockTitles.forEach((el) => {
        el.setAttribute('data-initialised', 'true');
        el.addEventListener('click', () => {
            const cursor = window.getComputedStyle(el).cursor
            if (cursor === 'pointer') {
                el.parentElement.classList.toggle('open-style')
            }
        })
    })
}

console.log('### aemdemo js');