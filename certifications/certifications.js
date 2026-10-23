const cursor = document.querySelector('#custom-cursor');
const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const finePointer = window.matchMedia?.('(pointer: fine) and (hover: hover)').matches ?? false;

if (cursor && finePointer && !reducedMotion) {
  document.documentElement.classList.add('has-custom-cursor');
  window.addEventListener('pointermove', (event) => {
    cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
    cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
    cursor.classList.add('is-visible');
  }, { passive: true });
}
