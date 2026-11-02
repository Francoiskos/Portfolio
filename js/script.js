/* ==========================
   MENU MOBILE
========================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function fermerMenu() {
  navLinks.classList.remove("active");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
}

menuToggle.addEventListener("click", () => {
  const estOuvert = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(estOuvert));

  menuToggle.setAttribute(
    "aria-label",
    estOuvert ? "Fermer le menu" : "Ouvrir le menu",
  );
});

/* Fermer après un clic sur un lien */

navLinks.querySelectorAll("a").forEach((lien) => {
  lien.addEventListener("click", fermerMenu);
});

/* Fermer avec la touche Échap */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fermerMenu();
  }
});

/* ==========================
   NAVIGATION ACTIVE
========================== */

const sections = document.querySelectorAll("main section");
const liensNavigation = document.querySelectorAll(".nav-links a");

const observerNavigation = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) return;

      const id = entree.target.id;

      liensNavigation.forEach((lien) => {
        const estActif = lien.getAttribute("href") === `#${id}`;

        lien.classList.toggle("active-link", estActif);
      });
    });
  },
  {
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => {
  observerNavigation.observe(section);
});

/* ==========================
   APPARITION DES SECTIONS
========================== */

const sectionsAnimees = document.querySelectorAll("main section:not(#accueil)");

if (
  "IntersectionObserver" in window &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches
) {
  const observerAnimation = new IntersectionObserver(
    (entrees, observer) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          entree.target.classList.add("visible");

          observer.unobserve(entree.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  sectionsAnimees.forEach((section) => {
    section.classList.add("reveal");
    observerAnimation.observe(section);
  });
}
