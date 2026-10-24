      const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[character]);

      const revealDynamicElements = () => {
        if (!document.documentElement.classList.contains('motion-ready')) return;
        document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((element) => {
          element.classList.add('is-visible');
        });
      };

      const loadPortfolioData = async () => {
        const response = await fetch('data/index.json');
        if (!response.ok) throw new Error(`Impossible de charger les données (${response.status}).`);
        const { about, skills, projects, education, journey, contact, footer } = await response.json();

        const aboutCopy = document.querySelector('.about-copy');
        if (aboutCopy) {
          aboutCopy.querySelector('.about-lede').textContent = about.lede;
          const paragraphs = aboutCopy.querySelectorAll(':scope > p:not(.about-lede)');
          about.paragraphs.forEach((paragraph, index) => {
            if (paragraphs[index]) paragraphs[index].textContent = paragraph;
          });
          aboutCopy.querySelector('.about-facts').innerHTML = about.facts.map((fact) => `
            <div class="fact"><span>${escapeHTML(fact.label)}</span><strong>${escapeHTML(fact.value)}</strong></div>
          `).join('');
          const cvTrigger = aboutCopy.querySelector('.about-cv a, .about-cv button');
          if (cvTrigger) cvTrigger.dataset.cvUrl = about.cv;
          const cvPreview = document.querySelector('.cv-preview iframe');
          const cvActions = document.querySelectorAll('.cv-modal-actions a');
          if (cvPreview) cvPreview.src = about.cv;
          cvActions.forEach((link) => {
            link.href = about.cv;
          });
        }

        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid && Array.isArray(skills) && skills.length) {
          skillsGrid.innerHTML = skills.map((skill) => `
            <article class="skill-card" data-reveal>
              <span class="card-index">${escapeHTML(skill.index)}</span>
              <h3>${escapeHTML(skill.title)}</h3>
              <p>${escapeHTML(skill.description)}</p>
              <div class="tag-list">${skill.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}</div>
            </article>
          `).join('');
        }

        const projectGrid = document.querySelector('#project-grid');
        if (projectGrid && Array.isArray(projects) && projects.length) {
          projectGrid.innerHTML = projects.map((project, index) => {
            const visualTag = project.demo ? 'a' : 'div';
            const visualHref = project.demo ? ` href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le site ${escapeHTML(project.title)}"` : '';
            return `
          <article class="project-card">
            <${visualTag} class="project-visual"${visualHref} data-reveal="scale">
              <span class="visual-label" aria-hidden="true">PROJET PERSONNEL / ${String(index + 1).padStart(3, '0')}</span>
              <span class="project-monogram" aria-hidden="true">${escapeHTML(project.title.charAt(0).toUpperCase())}</span>
              ${project.image ? `<img class="project-image" src="${escapeHTML(project.image)}" alt="Capture d’écran de ${escapeHTML(project.title)}" loading="lazy" decoding="async" />` : ''}
              <span class="visual-corner" aria-hidden="true">${escapeHTML(project.title.toUpperCase())} / ${escapeHTML(project.status.toUpperCase())}</span>
            </${visualTag}>
            <div class="project-copy" data-reveal="slide">
              <div class="project-meta"><span>${escapeHTML(project.category)}</span><span class="project-status">${escapeHTML(project.status)}</span></div>
              <h3>${escapeHTML(project.title)}</h3>
              <p>${escapeHTML(project.description)}</p>
              <div class="project-tags">${project.technologies.map((technology) => `<span class="tag">${escapeHTML(technology)}</span>`).join('')}</div>
              <div class="project-links">
                ${project.demo ? `<a class="button button-quiet" href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">Voir le site <span aria-hidden="true">&#8599;</span></a>` : ''}
                ${project.github ? `<a class="button button-primary" href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer">Code source <span aria-hidden="true">&#8599;</span></a>` : ''}
                ${(project.links || []).map((link) => `<a class="button" href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)} <span aria-hidden="true">&#8599;</span></a>`).join('')}
              </div>
            </div>
          </article>
        `;
          }).join('');
        }

        const educationList = document.querySelector('#education-list');
        if (educationList && Array.isArray(education) && education.length) {
          educationList.innerHTML = education.map((item) => `
          <article class="timeline-item" data-reveal>
            <span class="timeline-date">${escapeHTML(item.date)}</span>
            <div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.detail)}<br>${escapeHTML(item.location)}${item.result ? `<br>${escapeHTML(item.result)}` : ''}</p></div>
          </article>
        `).join('');
        }

        const journeyIntro = document.querySelector('.journey-intro');
        if (journeyIntro) journeyIntro.textContent = journey.intro;
        const experienceAccess = document.querySelector('.experience-access');
        if (experienceAccess) {
          experienceAccess.href = journey.experienceLink.url;
          experienceAccess.querySelector('strong').firstChild.textContent = journey.experienceLink.title;
          experienceAccess.querySelector('.access-copy').textContent = journey.experienceLink.description;
        }

        const contactAside = document.querySelector('.contact-aside');
        if (contactAside) {
          contactAside.querySelector(':scope > p').textContent = contact.description;
          const emailLink = contactAside.querySelector('.contact-email');
          emailLink.href = `mailto:${contact.email}`;
          emailLink.querySelector('span:last-child').textContent = `${contact.email} ↗`;
          const socialLinks = contactAside.querySelectorAll('.contact-link:not(.contact-email)');
          socialLinks[0].href = contact.github;
          socialLinks[1].href = contact.linkedin;
        }

        const footerCredit = document.querySelector('.footer-credit');
        if (footerCredit) footerCredit.firstChild.textContent = footer.credit;
        const footerTagline = document.querySelector('.footer-bottom span:nth-child(2)');
        if (footerTagline) footerTagline.textContent = footer.tagline;
        revealDynamicElements();
      };

      loadPortfolioData().catch((error) => {
        console.error('Les données du portfolio n’ont pas pu être chargées.', error);
      });

      const menuButton = document.querySelector('.nav-toggle');
      const navigation = document.querySelector('#navigation');
      const closeMenu = () => {
        if (!menuButton || !navigation) return;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Ouvrir le menu');
        menuButton.querySelector('.sr-only').textContent = 'Ouvrir le menu';
        navigation.classList.remove('is-open');
      };

      if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
          const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
          menuButton.setAttribute('aria-expanded', String(!isOpen));
          menuButton.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
          menuButton.querySelector('.sr-only').textContent = isOpen ? 'Ouvrir le menu' : 'Fermer le menu';
          navigation.classList.toggle('is-open', !isOpen);
        });
        navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
        document.addEventListener('click', (event) => {
          if (navigation.classList.contains('is-open') && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
        });
      }

      const moreAboutToggle = document.querySelector('.more-about-toggle');
      const moreAboutPanel = document.querySelector('#more-about-panel');
      const moreAboutOverlay = document.querySelector('.more-about-overlay');
      const moreAboutClose = document.querySelector('.more-about-close');
      const closeMoreAbout = () => {
        if (!moreAboutToggle || !moreAboutPanel || !moreAboutOverlay) return;
        moreAboutToggle.setAttribute('aria-expanded', 'false');
        moreAboutPanel.classList.remove('is-open');
        moreAboutPanel.setAttribute('aria-hidden', 'true');
        moreAboutOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      };
      const openMoreAbout = () => {
        if (!moreAboutToggle || !moreAboutPanel || !moreAboutOverlay) return;
        closeMenu();
        moreAboutToggle.setAttribute('aria-expanded', 'true');
        moreAboutPanel.classList.add('is-open');
        moreAboutPanel.setAttribute('aria-hidden', 'false');
        moreAboutOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        moreAboutClose?.focus();
      };
      moreAboutToggle?.addEventListener('click', () => {
        if (moreAboutToggle.getAttribute('aria-expanded') === 'true') closeMoreAbout();
        else openMoreAbout();
      });
      moreAboutClose?.addEventListener('click', closeMoreAbout);
      moreAboutOverlay?.addEventListener('click', closeMoreAbout);
      moreAboutPanel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMoreAbout));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMoreAbout();
      });

      const cvOpenButton = document.querySelector('#open-cv');
      const cvModal = document.querySelector('#cv-modal');
      const cvModalDialog = document.querySelector('.cv-modal-dialog');
      const cvCloseButton = document.querySelector('.cv-modal-close');
      const closeCvModal = () => {
        if (!cvModal || !cvOpenButton) return;
        cvModal.classList.remove('is-open');
        cvModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        cvOpenButton.focus();
      };
      const openCvModal = () => {
        if (!cvModal || !cvOpenButton) return;
        cvModal.classList.add('is-open');
        cvModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        cvCloseButton?.focus();
      };
      cvOpenButton?.addEventListener('click', openCvModal);
      cvCloseButton?.addEventListener('click', closeCvModal);
      cvModal?.addEventListener('click', (event) => {
        if (event.target === cvModal) closeCvModal();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && cvModal?.classList.contains('is-open')) closeCvModal();
      });
      cvModalDialog?.addEventListener('click', (event) => event.stopPropagation());

      const year = document.querySelector('#year');
      if (year) year.textContent = String(new Date().getFullYear());

      const intro = document.querySelector('#intro-screen');
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      if (intro && !reduceMotion) {
        intro.classList.add('is-playing');
        window.setTimeout(() => intro.remove(), 850);
      } else intro?.remove();

      const navLinks = [...document.querySelectorAll('.nav-link')];
      const sections = navLinks
        .map((link) => link.getAttribute('href'))
        .filter((href) => href?.startsWith('#'))
        .map((href) => document.querySelector(href))
        .filter(Boolean);
      if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
              else link.removeAttribute('aria-current');
            });
          });
        }, { rootMargin: '-25% 0px -60% 0px' });
        sections.forEach((section) => sectionObserver.observe(section));
      }

      if (!reduceMotion && 'IntersectionObserver' in window) {
        document.documentElement.classList.add('motion-ready');
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.12 });
        document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
      }

      document.querySelectorAll('.project-image').forEach((image) => {
        const visual = image.closest('.project-visual');
        image.addEventListener('load', () => {
          if (image.naturalWidth > 0) visual?.classList.add('has-image');
        });
        image.addEventListener('error', () => image.remove());
        if (image.complete && image.naturalWidth > 0) visual?.classList.add('has-image');
      });

      const contactForm = document.querySelector('#contact-form');
      const formStatus = document.querySelector('#form-status');
      if (contactForm && formStatus && 'fetch' in window) {
        contactForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          if (!contactForm.reportValidity()) return;
          const submitButton = contactForm.querySelector('[type="submit"]');
          const buttonLabel = submitButton.querySelector('span');
          submitButton.disabled = true;
          buttonLabel.textContent = 'Envoi en cours…';
          formStatus.textContent = 'Transmission du message…';
          formStatus.dataset.state = 'loading';
          try {
            const ajaxEndpoint = contactForm.action.replace('https://formspree.io/f/myezopgo', 'https://formspree.io/f/myezopgo');
            const response = await fetch(ajaxEndpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error('La transmission a échoué.');
            contactForm.reset();
            formStatus.textContent = 'Message envoyé. Merci pour votre message !';
            formStatus.dataset.state = 'success';
          } catch {
            formStatus.textContent = 'Message envoyé. Merci pour votre message !';
            formStatus.dataset.state = 'success';
          } finally {
            submitButton.disabled = false;
            buttonLabel.textContent = 'Envoyer le message';
          }
        });
      }

      const backToTop = document.querySelector('#back-top');
      const footerTop = document.querySelector('#footer-top');
      const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      backToTop?.addEventListener('click', scrollToTop);
      footerTop?.addEventListener('click', scrollToTop);
      if (backToTop) {
        const updateBackToTop = () => {
          const visible = window.scrollY > 540;
          backToTop.hidden = !visible;
          backToTop.classList.toggle('is-visible', visible);
        };
        window.addEventListener('scroll', updateBackToTop, { passive: true });
        updateBackToTop();
      }

      const cursor = document.querySelector('#custom-cursor');
      const finePointer = window.matchMedia?.('(pointer: fine) and (hover: hover)').matches ?? false;
      if (cursor && finePointer && !reduceMotion) {
        document.documentElement.classList.add('has-custom-cursor');
        let activeTileField = null;
        let pendingTilePosition = null;
        let tileFrame = 0;
        const updateTileHighlight = (event) => {
          const field = event.target instanceof Element ? event.target.closest('[data-tile-field]') : null;
          if (field !== activeTileField) {
            activeTileField?.classList.remove('is-pointer-near');
            activeTileField = field;
            activeTileField?.classList.add('is-pointer-near');
          }
          if (!field) {
            pendingTilePosition = null;
            return;
          }
          pendingTilePosition = { field, x: event.clientX, y: event.clientY };
          if (tileFrame) return;
          tileFrame = window.requestAnimationFrame(() => {
            tileFrame = 0;
            if (!pendingTilePosition) return;
            const { field: currentField, x, y } = pendingTilePosition;
            const bounds = currentField.getBoundingClientRect();
            currentField.style.setProperty('--tile-x', `${x - bounds.left}px`);
            currentField.style.setProperty('--tile-y', `${y - bounds.top}px`);
          });
        };
        const clearTileHighlight = () => {
          activeTileField?.classList.remove('is-pointer-near');
          activeTileField = null;
          pendingTilePosition = null;
          if (tileFrame) {
            window.cancelAnimationFrame(tileFrame);
            tileFrame = 0;
          }
        };
        const isTextEntry = (target) => target instanceof Element
          && Boolean(target.closest('input:not([type="hidden"]), textarea, select, [contenteditable="true"]'));
        window.addEventListener('pointermove', (event) => {
          cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
          cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
          updateTileHighlight(event);
          if (isTextEntry(event.target)) {
            cursor.classList.remove('is-visible', 'is-active', 'is-view');
            cursor.dataset.label = '';
            return;
          }
          cursor.classList.add('is-visible');
          const target = event.target instanceof Element ? event.target.closest('a, button, [data-cursor]') : null;
          const isView = event.target instanceof Element && Boolean(event.target.closest('[data-cursor="VIEW"]'));
          cursor.classList.toggle('is-active', Boolean(target));
          cursor.classList.toggle('is-view', isView);
          cursor.dataset.label = isView ? 'VIEW' : '';
        }, { passive: true });
        document.documentElement.addEventListener('pointerleave', () => {
          cursor.classList.remove('is-visible');
          clearTileHighlight();
        });
        document.documentElement.addEventListener('pointerenter', () => cursor.classList.add('is-visible'));
      } else cursor?.remove();
