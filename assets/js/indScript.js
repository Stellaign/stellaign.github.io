document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Service Items Accordion ---
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length > 0) {
        serviceItems.forEach(item => {
            const header = item.querySelector('.service-header');
            const background = item.querySelector('.service-bg');
            const content = item.querySelector('.service-content');
            const names = item.querySelectorAll('.service-name');
            const arrow = item.querySelector('.arrow');

            if (header) {
                header.addEventListener('click', () => {
                    // Prevent accordion toggle if text is being selected
                    const selection = window.getSelection();
                    if (selection && !selection.isCollapsed) {
                        return;
                    }

                    const isOpen = !content.classList.contains('max-h-0');

                    // Close all
                    serviceItems.forEach(i => {
                        const iContent = i.querySelector('.service-content');
                        const iArrow = i.querySelector('.arrow');
                        const iHeader = i.querySelector('.service-header');
                        const iBg = i.querySelector('.service-bg');

                        if (iContent) iContent.classList.replace('max-h-[600px]', 'max-h-0');
                        if (iArrow) iArrow.classList.replace('rotate-[-45deg]', 'rotate-[45deg]');
                        if (iBg) iBg.classList.replace('opacity-100', 'opacity-0');

                        if (iHeader) {
                            iHeader.classList.replace('text-white', 'text-brand-primary');
                            iHeader.classList.remove('selection:!bg-brand-secondary', 'selection:!text-brand-primary');
                        }

                        i.querySelectorAll('.service-name').forEach(n => {
                            n.classList.add('group-hover:scale-[103%]', 'group-hover:text-shadow-lg');
                        });
                    });

                    // Open current
                    if (!isOpen) {
                        header.classList.replace('text-brand-primary', 'text-white');
                        header.classList.add('selection:!bg-brand-secondary', 'selection:!text-brand-primary');
                        content.classList.replace('max-h-0', 'max-h-[600px]');
                        arrow.classList.replace('rotate-[45deg]', 'rotate-[-45deg]');
                        background.classList.replace('opacity-0', 'opacity-100');

                        names.forEach(n => {
                            n.classList.remove('group-hover:scale-[103%]', 'group-hover:text-shadow-lg');
                        });
                    }
                });
            }
        });
    }


    // --- 2. Hero Slider ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let current = 0;
        const interval = 4500;

        setInterval(() => {
            slides[current].classList.remove('opacity-100', 'translate-x-0');
            slides[current].classList.add('opacity-0', 'translate-x-4');

            current = (current + 1) % slides.length;

            slides[current].classList.remove('opacity-0', 'translate-x-4');
            slides[current].classList.add('opacity-100', 'translate-x-0');
        }, interval);
    }

});
