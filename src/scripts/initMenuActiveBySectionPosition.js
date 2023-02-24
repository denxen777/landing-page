export const initMenuActiveBySectionPosition = () => {
  const links = document.querySelectorAll('.js-link');
  const sections = document.querySelectorAll('.js-section');

  setActiveMenuAnchorBySectionPosition();
  document.addEventListener('scroll', setActiveMenuAnchorBySectionPosition);

  function setActiveMenuAnchorBySectionPosition () {
    let current = '';
    let currentPercent = 0;
    sections.forEach(section => {
      const sectionPercent = getViewPercentage(section);
      if (sectionPercent > currentPercent) {
        current = section.getAttribute('id');
        currentPercent = sectionPercent;
      }
    });

    links.forEach((link) => {
      link.classList.remove('active');
    })

    for (const link of links) {
      const sectionName = link.getAttribute('href').slice(1);

      if (sectionName === current) {
        link.classList.add('active');
        return;
      }
    }
  }

  function getViewPercentage(element) {
    const viewport = {
      top: scrollY,
      bottom: scrollY + innerHeight
    };

    const elementBoundingRect = element.getBoundingClientRect();
    const elementPos = {
      top: elementBoundingRect.y + scrollY,
      bottom: elementBoundingRect.y + elementBoundingRect.height + scrollY
    };

    if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
      return 0;
    }

    // Element is fully within viewport
    if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
      return 100;
    }

    // Element is bigger than the viewport
    if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
      return 100;
    }

    const elementHeight = elementBoundingRect.height;
    let elementHeightInView = elementHeight;

    if (elementPos.top < viewport.top) {
      elementHeightInView = elementHeight - (scrollY - elementPos.top);
    }

    if (elementPos.bottom > viewport.bottom) {
      elementHeightInView = elementHeightInView - (elementPos.bottom - viewport.bottom);
    }

    const percentageInView = (elementHeightInView / window.innerHeight) * 100;

    return Math.round(percentageInView);
  }
}
