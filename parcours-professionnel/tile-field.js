(function () {
  "use strict";

  var supportsFinePointer = window.matchMedia && window.matchMedia("(pointer: fine) and (hover: hover)").matches;
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!supportsFinePointer || reducedMotion) return;

  var fields = Array.prototype.slice.call(document.querySelectorAll("[data-tile-field], .tile-field"));
  if (!fields.length) return;

  var bounds = new Map();
  var activeField = null;
  var boundsFrame = 0;

  fields.forEach(function (field) {
    var glow = document.createElement("span");
    glow.className = "tile-glow";
    glow.setAttribute("aria-hidden", "true");
    field.insertBefore(glow, field.firstChild);
  });

  function updateBounds() {
    bounds.clear();
    fields.forEach(function (field) {
      bounds.set(field, field.getBoundingClientRect());
    });
  }

  function scheduleBoundsUpdate() {
    if (boundsFrame) return;
    boundsFrame = window.requestAnimationFrame(function () {
      boundsFrame = 0;
      updateBounds();
    });
  }

  function clearActiveField() {
    if (activeField) activeField.classList.remove("is-pointer-near");
    activeField = null;
  }

  updateBounds();
  window.addEventListener("resize", scheduleBoundsUpdate, { passive: true });
  window.addEventListener("scroll", scheduleBoundsUpdate, { passive: true });
  window.addEventListener("pointermove", function (event) {
    var target = event.target instanceof Element ? event.target.closest(".tile-field") : null;
    if (target !== activeField) {
      clearActiveField();
      activeField = target;
      if (activeField) activeField.classList.add("is-pointer-near");
    }
    if (!target) return;
    var glow = target.querySelector(".tile-glow");
    var rect = bounds.get(target);
    if (!glow || !rect) return;
    glow.style.setProperty("--tile-x", (event.clientX - rect.left) + "px");
    glow.style.setProperty("--tile-y", (event.clientY - rect.top) + "px");
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", clearActiveField);
}());
