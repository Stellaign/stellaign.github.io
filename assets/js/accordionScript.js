// Custom script for toggling Accordion
function setupAccordion() {
    const isMobile = window.innerWidth < 768;
    const buttons = document.querySelectorAll(".accordion-btn");
    const contents = document.querySelectorAll(".accordion-content");

    buttons.forEach(btn => {
      const id = btn.getAttribute("data-accordion");
      const content = document.getElementById(`answer-${id}`);

      if (isMobile) {
        btn.classList.remove("md:pointer-events-none"); // enable clicks
        btn.onclick = () => {
          contents.forEach(el => {
            if (el !== content) {
              el.style.maxHeight = null;
              el.style.paddingBottom = null;
            }
          });
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.paddingBottom = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.paddingBottom = "1rem";
          }
        };
      } else {
        btn.onclick = null; // disable JS clicks
      }
    });

    // Reset inline styles on desktop
    if (!isMobile) {
      contents.forEach(el => {
        el.style.maxHeight = null;
        el.style.paddingBottom = null;
      });
    }
  }

  // Run on load + resize
  window.addEventListener("load", setupAccordion);
  window.addEventListener("resize", setupAccordion);