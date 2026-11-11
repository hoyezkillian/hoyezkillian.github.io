(function () {
  "use strict";

  function wrapTerms(selector, terms, tagName, className) {
    document.querySelectorAll(selector).forEach(function (element) {
      var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      var nodes = [];
      var node;
      while ((node = walker.nextNode())) {
        if (node.parentElement && !node.parentElement.closest("code, strong")) nodes.push(node);
      }
      nodes.forEach(function (textNode) {
        terms.forEach(function (term) {
          if (!textNode.parentNode || textNode.parentElement.closest("code, strong")) return;
          var parts = textNode.nodeValue.split(term);
          if (parts.length === 1) return;
          var fragment = document.createDocumentFragment();
          parts.forEach(function (part, index) {
            if (part) fragment.appendChild(document.createTextNode(part));
            if (index < parts.length - 1) {
              var mark = document.createElement(tagName);
              if (className) mark.className = className;
              mark.textContent = term;
              fragment.appendChild(mark);
            }
          });
          textNode.parentNode.replaceChild(fragment, textNode);
          textNode = fragment.lastChild;
        });
      });
    });
  }

  wrapTerms(".project-substeps li > p", [
    "RN-TPOS", "10.0.2.0/24", "8.8.8.8", "www.debian.org", "nmap -sn 10.0.2.0/24",
    "WIN-SRV-01", "10.0.2.10", "domaine.local", "session.cookie_httponly = on", "8080", "80"
  ], "code");
  wrapTerms(".project-step-content > p, .project-overview p", [
    "RN-TPOS", "10.0.2.0/24", "8.8.8.8", "www.debian.org", "nmap -sn 10.0.2.0/24",
    "WIN-SRV-01", "10.0.2.10", "domaine.local", "session.cookie_httponly", "8080", "80"
  ], "code");
  wrapTerms(".project-substeps li > p", [
    "réseau commun isolé", "accès à Internet", "prérequis", "nouvelle adresse MAC", "unique",
    "tests de connectivité", "problème DNS", "passerelle", "règle ICMPv4", "découverte ARP",
    "réseau autorisé", "retour à l'état sauvegardé", "résolution locale", "contrôleur de domaine",
    "domaine.local", "OU", "DNS", "fond d'écran", "ciblage utilisateur", "12 caractères minimum",
    "complexité", "90 jours", "historique de 24 mots de passe", "base", "fuseaux horaires",
    "session.cookie_httponly = on", "erreur bloquante", "redirection de port", "urgence",
    "impact", "priorité", "base de connaissances", "statistiques", "traçabilité du support"
  ], "strong");

  var images = document.querySelectorAll(".project-gallery img, .project-substeps figure img");
  if (!images.length) return;

  function closeLightbox(lightbox, onKeydown) {
    lightbox.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);
  }

  images.forEach(function (image) {
    image.tabIndex = 0;
    image.addEventListener("click", openLightbox);
    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox.call(image);
      }
    });
  });

  function openLightbox() {
    var image = this;
    var lightbox = document.createElement("div");
    var enlarged = document.createElement("img");
    var closeButton = document.createElement("button");

    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Image agrandie");
    enlarged.src = image.src;
    enlarged.alt = image.alt;
    closeButton.className = "lightbox-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Fermer l'image agrandie");
    closeButton.textContent = "×";
    lightbox.appendChild(enlarged);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);
    window.requestAnimationFrame(function () {
      lightbox.classList.add("is-visible");
    });
    document.body.style.overflow = "hidden";
    closeButton.focus();

    function onKeydown(event) {
      if (event.key === "Escape") closeLightbox(lightbox, onKeydown);
    }

    closeButton.addEventListener("click", function () {
      closeLightbox(lightbox, onKeydown);
    });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox(lightbox, onKeydown);
    });
    document.addEventListener("keydown", onKeydown);
  }
}());
