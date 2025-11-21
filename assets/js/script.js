
document.addEventListener("DOMContentLoaded", () => {
    // --- Dropdown toggle functionality ---
    const servicesBtn = document.getElementById("services-btn");
    const servicesMenu = document.getElementById("services-menu");
    const contactModal = document.getElementById("contactUsModal");

    // --- Automatic disable link functionality (NavBar) ---
    const pageName = document.title;
    const homeAnc = document.getElementById("home-anchor");
    const prodAnc = document.getElementById("product-anchor");
    const aboutAnc = document.getElementById("about-anchor");
    const conAnc = document.getElementById("contact-anchor");
    var changeAnc = null;

    if (pageName === "Home") changeAnc = homeAnc;
    else if (pageName === "Our Products") changeAnc = prodAnc;
    else if (pageName === "About Us") changeAnc = aboutAnc;
    else if (pageName === "Contact Us") changeAnc = conAnc;
    else changeAnc = null;

    changeAnc?.addEventListener("click", function (event) {
        event.preventDefault();
    });

    changeAnc?.classList.remove("md:hover:text-brand-primary");
    changeAnc?.classList.add("md:text-brand-primary");



    servicesBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        servicesMenu?.classList.toggle("hidden");
    });

    // Close dropdown if clicking outside (safely handle missing contactModal)
    document.addEventListener("click", (e) => {
        const clickedInsideModal = contactModal && contactModal.contains(e.target);
        if (!servicesMenu?.contains(e.target) && !servicesBtn?.contains(e.target) && !clickedInsideModal) {
            servicesMenu?.classList.add("hidden");
        }
    });

    // --- Flowbite modal helpers (use data attributes) ---
    function getModalId(modalEl) {
        return modalEl?.id || null;
    }

    function findToggleForModal(modalId) {
        if (!modalId) return null;
        return document.querySelector(`[data-modal-toggle="${modalId}"]`) || document.querySelector(`[data-modal-target="${modalId}"]`);
    }

    function findHideForModal(modalId) {
        if (!modalId) return null;
        return document.querySelector(`[data-modal-hide="${modalId}"]`) || document.querySelector(`[data-modal-close="${modalId}"]`);
    }

    function showModalWithFlowbite(modalEl) {
        const modalId = getModalId(modalEl);
        if (!modalId) return;

        // If there's already a toggle button, click it
        const toggle = findToggleForModal(modalId);
        if (toggle) {
            toggle.click();
            return;
        }

        // Otherwise create a temporary trigger using data attributes that Flowbite listens to
        const tmp = document.createElement("button");
        tmp.type = "button";
        tmp.style.display = "none";
        tmp.setAttribute("data-modal-toggle", modalId);
        document.body.appendChild(tmp);
        tmp.click();
        // remove after short delay to allow Flowbite to pick up (immediate removal is usually fine)
        setTimeout(() => tmp.remove(), 50);
    }

    function hideModalWithFlowbite(modalEl) {
        const modalId = getModalId(modalEl);
        if (!modalId) return;

        const hideTrigger = findHideForModal(modalId);
        if (hideTrigger) {
            hideTrigger.click();
            return;
        }

        // fallback: if Flowbite not wired up or no hide trigger, use basic hide (keeps aria consistent)
        modalEl.classList.add("hidden");
        modalEl.setAttribute("aria-hidden", "true");
    }

    // Close modal on Escape (using Flowbite hide trigger if available)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && contactModal) {
            hideModalWithFlowbite(contactModal);
        }
    });

    // --- Menu hover highlight + data switch functionality ---
    const menuItems = document.querySelectorAll(".menu-item");
    const menuDatas = document.querySelectorAll(".menu-data");

    if (menuItems.length > 0 && menuDatas.length > 0) {
        // Track currently selected element index and last action guard
        let selectedIndex = 0;

        // Helper: select item by index (desktop behavior)
        function selectItem(index) {
            if (index === selectedIndex) return;
            menuItems[selectedIndex]?.classList.remove("bg-brand-primary-2");
            menuDatas[selectedIndex]?.classList.add("hidden");

            menuItems[index].classList.add("bg-brand-primary-2");
            menuDatas[index].classList.remove("hidden");

            selectedIndex = index;
        }

        // Initial state
        menuItems.forEach((_, i) => {
            menuDatas[i].classList.toggle("hidden", i !== 0);
        });
        menuItems[0].classList.add("bg-brand-primary-2");

        // Attach unified handlers
        menuItems.forEach((item, index) => {
            const unifiedHandler = (eventType) => (e) => {

                // If this is a click and viewport is mobile (<768px), open modal via Flowbite instead of selecting
                if (eventType === "click" && window.innerWidth < 768) {
                    e.stopPropagation?.();
                    if (contactModal) {
                        showModalWithFlowbite(contactModal);
                    } else {
                        // fallback: if modal missing, keep normal behavior
                        selectItem(index);
                    }
                    return;
                }

                // Desktop/tablet or non-click events: run the selection logic
                e.stopPropagation?.();
                selectItem(index);
            };

            // click (modal on mobile) and pointerenter (desktop hover)
            item.addEventListener("click", unifiedHandler("click"));
            item.addEventListener("pointerenter", unifiedHandler("pointerenter"));

            // keyboard support (Enter / Space)
            item.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    // simulate click behavior (modal on mobile, select on desktop)
                    unifiedHandler("click")(e);
                }
            });
        });
    }
});