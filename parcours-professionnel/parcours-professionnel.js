      const experiences = [
        {
          company: 'Institut des Hautes Études du Ministère de l’Intérieur',
          location: 'Paris',
          logo: '../assets/companies/Capture d\'écran 2026-10-07 110959.png',
          periods: [
            { start: '10/03/2025', startISO: '2025-03-10', end: '05/04/2025', endISO: '2025-04-05' },
            { start: '29/09/2025', startISO: '2025-09-29', end: '18/10/2025', endISO: '2025-10-18' }
          ],
          description: 'Une immersion dans des exercices de crise liés à des situations d’attaque cyber, complétée par une participation au support et à la gestion de systèmes informatiques, notamment autour de baies de brassage.',
          missions: [
            'Découvrir les environnements informatiques d’une organisation professionnelle.',
            'Prendre part au support et à la gestion de systèmes informatiques.',
            'Observer l’organisation d’exercices de crise autour de situations d’attaque cyber.',
            'Découvrir des éléments d’infrastructure, dont des baies de brassage.'
          ],
          knowledge: [
            'Gestion d’un SI en contexte de crise',
            'Support informatique',
            'Rôle des baies de brassage',
            'Organisation en environnement sensible'
          ],
          technicalNote: 'Ces exercices m’ont aidé à comprendre les enjeux de continuité et de coordination autour d’un système d’information en situation de crise. Le travail autour des baies de brassage m’a permis de mieux situer leur rôle dans l’infrastructure réseau, sans présumer de l’administration d’outils ou de matériels non précisés.'
        },
        {
          company: 'TIBCO',
          location: 'Le Mans',
          logo: '../assets/companies/tibco.png',
          periods: [
            { start: '25/11/2024', startISO: '2024-11-25', end: '20/12/2024', endISO: '2024-12-20' }
          ],
          description: 'Une expérience autour du support technique de postes informatiques et d’imprimantes, avec des opérations de mise à jour, de paramétrage et d’assistance aux utilisateurs.',
          missions: [
            'Intervenir sur du matériel informatique.',
            'Mettre à jour et paramétrer des PC.',
            'Mettre à jour et paramétrer des imprimantes.',
            'Participer au support technique et à l’assistance des utilisateurs.'
          ],
          knowledge: [
            'Préparation et configuration de postes',
            'Maintenance informatique',
            'Assistance utilisateur',
            'Lien entre matériel, réglages et usages'
          ],
          technicalNote: 'Ces missions m’ont permis de mieux comprendre le cycle de maintenance d’un poste : préparer sa configuration, appliquer des mises à jour et tenir compte des périphériques comme des besoins de la personne qui l’utilise. J’ai aussi découvert les étapes de diagnostic et d’assistance dans un contexte de support.'
        },
        {
          company: 'Mairie de Mantes-la-Jolie',
          location: 'Mantes-la-Jolie',
          logo: '../assets/companies/Capture d\'écran 2026-10-07 111341.png',
          periods: [
            { start: '11/03/2024', startISO: '2024-03-11', end: '22/03/2024', endISO: '2024-03-22' }
          ],
          description: 'Une première immersion dans le suivi d’une infrastructure informatique : gestion de tickets utilisateurs, participation à la maintenance et découverte de problématiques réseau concrètes.',
          missions: [
            'Gérer des tickets et contribuer au support des utilisateurs.',
            'Participer à la maintenance et au suivi de l’infrastructure informatique.',
            'Découvrir des sujets de VLAN, de routage et de boucles réseau en couche 2 avec STP.'
          ],
          knowledge: [
            'Gestion de tickets utilisateurs',
            'Segmentation réseau avec VLAN',
            'Routage entre réseaux',
            'STP et prévention des boucles en couche 2'
          ],
          technicalNote: 'Cette expérience m’a permis de relier plusieurs notions de réseau à un environnement professionnel réel : les VLAN segmentent les réseaux, le routage permet les échanges entre réseaux, et STP contribue à prévenir les boucles de couche 2. Elle m’a aussi fait découvrir le lien entre le support utilisateur et le suivi de l’infrastructure.'
        }
      ];

      const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[character]);
      const stack = document.querySelector('#experience-stack');
      const count = document.querySelector('#experience-count');
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      const finePointer = window.matchMedia?.('(pointer: fine) and (hover: hover)').matches ?? false;
      if (count) count.textContent = String(experiences.length).padStart(2, '0');

      if (stack) {
        stack.innerHTML = experiences.map((experience, index) => {
          const number = String(index + 1).padStart(2, '0');
          const progress = Math.round(((index + 1) / experiences.length) * 100);
          const logo = `<img src="${escapeHTML(experience.logo)}" alt="Logo de ${escapeHTML(experience.company)}" loading="lazy" decoding="async" />`;
          const periods = experience.periods.map((period) => `
            <div class="period-row"><time datetime="${escapeHTML(period.startISO)}">${escapeHTML(period.start)}</time><span aria-hidden="true">→</span><time datetime="${escapeHTML(period.endISO)}">${escapeHTML(period.end)}</time></div>
          `).join('');
          return `
            <div class="step-trigger" data-step-trigger="${index}" aria-hidden="true"></div>
            <article class="experience-slide" data-experience-index="${index}" aria-labelledby="experience-title-${number}" style="--slide-order:${index + 1};--pin-top:${98 + index * 16}px">
              <div class="experience-card">
                <div class="experience-identity">
                  <div class="step-label"><span>ÉTAPE / ${number}</span><strong>${String(experiences.length).padStart(2, '0')}</strong></div>
                  <div class="company-logo">${logo}</div>
                  <p class="company-type">Expérience professionnelle</p>
                  <h2 id="experience-title-${number}">${escapeHTML(experience.company)}</h2>
                  <p class="company-location">${escapeHTML(experience.location)}</p>
                  <div class="period-list" role="group" aria-label="Période${experience.periods.length > 1 ? 's' : ''} de l’expérience">${periods}</div>
                </div>
                <div class="experience-details">
                  <p class="experience-summary">${escapeHTML(experience.description)}</p>
                  <div class="detail-rule" aria-hidden="true"></div>
                  <div class="detail-grid">
                    <section class="detail-group" aria-labelledby="missions-${number}">
                      <h3 id="missions-${number}">Missions</h3>
                      <ul class="mission-list">${experience.missions.map((mission) => `<li>${escapeHTML(mission)}</li>`).join('')}</ul>
                    </section>
                    <section class="detail-group" aria-labelledby="knowledge-${number}">
                      <h3 id="knowledge-${number}">Connaissances développées</h3>
                      <div class="knowledge-list">${experience.knowledge.map((item) => `<span class="knowledge-tag">${escapeHTML(item)}</span>`).join('')}</div>
                    </section>
                  </div>
                  <aside class="technical-note"><h3>Lecture technique</h3><p>${escapeHTML(experience.technicalNote)}</p></aside>
                  <div class="experience-card-foot"><span>Parcours / ${number}</span><div class="progress-track" role="meter" aria-label="Progression du parcours" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><span style="--progress:${progress}%"></span></div><span>${number} / ${String(experiences.length).padStart(2, '0')}</span></div>
                </div>
              </div>
            </article>
          `;
        }).join('');
      }

      const slides = [...document.querySelectorAll('.experience-slide')];
      if (!reducedMotion && 'IntersectionObserver' in window) {
        document.documentElement.classList.add('motion-ready');
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
        slides.forEach((slide) => revealObserver.observe(slide));

        const setCurrentSlide = (activeIndex) => {
          slides.forEach((slide, index) => {
            slide.classList.toggle('is-current', index === activeIndex);
            slide.classList.toggle('is-past', index < activeIndex);
          });
        };
        const stepObserver = new IntersectionObserver((entries) => {
          const activeSteps = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (!activeSteps.length) return;
          const activeIndex = Number(activeSteps[activeSteps.length - 1].target.dataset.stepTrigger);
          setCurrentSlide(activeIndex);
        }, { threshold: 0, rootMargin: '-26% 0px -58% 0px' });
        document.querySelectorAll('[data-step-trigger]').forEach((trigger) => stepObserver.observe(trigger));
      } else {
        slides.forEach((slide) => slide.classList.add('is-visible'));
      }

      const cursor = document.querySelector('#custom-cursor');
      if (cursor && finePointer && !reducedMotion) {
        document.documentElement.classList.add('has-custom-cursor');
        let activeTileField = null;
        let pendingTilePosition = null;
        let tileFrame = 0;
        const updateTileHighlight = (event) => {
          const field = event.target instanceof Element ? event.target.closest('[data-tile-field]') : null;
          if (field !== activeTileField) {
            activeTileField?.classList.remove('is-highlighted');
            activeTileField = field;
            activeTileField?.classList.add('is-highlighted');
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
            currentField.style.setProperty('--grid-x', `${x - bounds.left}px`);
            currentField.style.setProperty('--grid-y', `${y - bounds.top}px`);
          });
        };
        const clearTileHighlight = () => {
          activeTileField?.classList.remove('is-highlighted');
          activeTileField = null;
          pendingTilePosition = null;
          if (tileFrame) {
            window.cancelAnimationFrame(tileFrame);
            tileFrame = 0;
          }
        };
        window.addEventListener('pointermove', (event) => {
          cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
          cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
          updateTileHighlight(event);
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
      } else {
        cursor?.remove();
      }
