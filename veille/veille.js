(function () {
  "use strict";

  var buttons = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll(".journal-card");
  var emptyState = document.getElementById("empty-state");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      var visibleCount = 0;

      buttons.forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      cards.forEach(function (card) {
        var visible = filter === "all" || card.getAttribute("data-category") === filter;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      emptyState.hidden = visibleCount > 0;
    });
  });
}());
