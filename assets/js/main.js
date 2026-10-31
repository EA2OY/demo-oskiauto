/* OSKIAUTO — interacciones */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("js");

  /* ---------------------------------------------------------------------
     Cabecera
     --------------------------------------------------------------------- */
  var header = doc.querySelector(".site-header");

  function onScroll() {
    if (!header) return;
    var y = window.scrollY || window.pageYOffset;
    if (y > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------------------------------------------------------------
     Menú móvil
     --------------------------------------------------------------------- */
  var toggle = doc.querySelector(".menu-toggle");
  var mobileNav = doc.querySelector(".mobile-nav");

  function setNav(open) {
    doc.body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (mobileNav) mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(!doc.body.classList.contains("nav-open"));
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setNav(false);
      });
    });
  }

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && doc.body.classList.contains("nav-open")) {
      setNav(false);
      if (toggle) toggle.focus();
    }
  });

  /* ---------------------------------------------------------------------
     Rotador del hero
     --------------------------------------------------------------------- */
  var rotator = doc.querySelector("[data-rotator]");
  if (rotator) {
    var items = (rotator.getAttribute("data-rotator") || "").split("|").filter(Boolean);
    var index = 0;
    if (items.length && !reduceMotion) {
      setInterval(function () {
        if (doc.hidden) return;
        index = (index + 1) % items.length;
        rotator.classList.add("is-out");
        window.setTimeout(function () {
          rotator.textContent = items[index];
          rotator.classList.remove("is-out");
        }, 340);
      }, 3600);
    }
  }

  /* ---------------------------------------------------------------------
     Revelado al hacer scroll
     --------------------------------------------------------------------- */
  var revealItems = doc.querySelectorAll(".reveal");
  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealItems.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ---------------------------------------------------------------------
     Subnavegación activa
     --------------------------------------------------------------------- */
  var subnav = doc.querySelector(".subnav");
  if (subnav && "IntersectionObserver" in window) {
    var subLinks = Array.prototype.slice.call(subnav.querySelectorAll("a[href^='#']"));
    var targets = subLinks
      .map(function (a) {
        return doc.querySelector(a.getAttribute("href"));
      })
      .filter(Boolean);

    if (targets.length) {
      var navObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = "#" + entry.target.id;
            subLinks.forEach(function (a) {
              a.classList.toggle("is-active", a.getAttribute("href") === id);
            });
          });
        },
        { rootMargin: "-160px 0px -62% 0px", threshold: 0 }
      );
      targets.forEach(function (t) {
        navObserver.observe(t);
      });
    }
  }

  /* ---------------------------------------------------------------------
     Vídeo: carga diferida de YouTube
     --------------------------------------------------------------------- */
  doc.querySelectorAll("[data-video]").forEach(function (card) {
    var trigger = card.querySelector(".video-card__play");
    if (!trigger) return;
    trigger.addEventListener("click", function () {
      var id = card.getAttribute("data-video");
      if (!id) return;
      var iframe = doc.createElement("iframe");
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        id +
        "?autoplay=1&rel=0&modestbranding=1";
      iframe.title = card.getAttribute("data-title") || "Vídeo de Oskiauto";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      card.innerHTML = "";
      card.appendChild(iframe);
    });
  });

  /* ---------------------------------------------------------------------
     Galería / lightbox
     --------------------------------------------------------------------- */
  var galleryItems = Array.prototype.slice.call(doc.querySelectorAll(".gallery-item"));
  var lightbox = doc.querySelector(".lightbox");

  if (galleryItems.length && lightbox) {
    var lbImage = lightbox.querySelector(".lightbox__image");
    var lbCount = lightbox.querySelector(".lightbox__count");
    var lbFoot = lightbox.querySelector(".lightbox__foot");
    var btnClose = lightbox.querySelector(".lightbox__close");
    var btnPrev = lightbox.querySelector(".lightbox__nav--prev");
    var btnNext = lightbox.querySelector(".lightbox__nav--next");
    var current = 0;
    var lastFocus = null;

    function pad(n) {
      return n < 10 ? "0" + n : String(n);
    }

    function show(i) {
      current = (i + galleryItems.length) % galleryItems.length;
      var link = galleryItems[current];
      var img = link.querySelector("img");
      lbImage.src = link.getAttribute("data-full") || link.getAttribute("href");
      lbImage.alt = img ? img.alt : "";
      lbCount.textContent = pad(current + 1) + " / " + pad(galleryItems.length);
      lbFoot.textContent = img ? img.alt : "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      doc.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      doc.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    galleryItems.forEach(function (link, i) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        lastFocus = link;
        show(i);
        if (btnClose) btnClose.focus();
      });
    });

    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev)
      btnPrev.addEventListener("click", function () {
        show(current - 1);
      });
    if (btnNext)
      btnNext.addEventListener("click", function () {
        show(current + 1);
      });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox__stage")) {
        close();
      }
    });

    doc.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------------------------------------------------------------------
     Formulario de contacto (mailto)
     --------------------------------------------------------------------- */
  var form = doc.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var name = form.querySelector("[name='nombre']").value.trim();
      var email = form.querySelector("[name='email']").value.trim();
      var message = form.querySelector("[name='mensaje']").value.trim();
      var status = form.querySelector(".form__status");
      var subject = "Contacto desde la web — " + name;
      var body =
        "Nombre: " +
        name +
        "\nEmail: " +
        email +
        "\n\n" +
        message;
      var href =
        "mailto:oskiauto@oskiauto.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      window.location.href = href;
      if (status) {
        status.textContent =
          "Abriendo tu aplicación de correo. Si no se abre, escríbenos a oskiauto@oskiauto.com.";
      }
    });
  }

  /* ---------------------------------------------------------------------
     Aviso de cookies
     --------------------------------------------------------------------- */
  var cookie = doc.querySelector(".cookie");
  if (cookie) {
    var KEY = "oskiauto_cookies";
    var accepted = false;
    try {
      accepted = window.localStorage.getItem(KEY) === "yes";
    } catch (err) {
      accepted = false;
    }
    if (!accepted) {
      window.setTimeout(function () {
        cookie.classList.add("is-visible");
      }, 1200);
    }
    var accept = cookie.querySelector("[data-cookie-accept]");
    if (accept) {
      accept.addEventListener("click", function () {
        try {
          window.localStorage.setItem(KEY, "yes");
        } catch (err) {
          /* sin almacenamiento: se oculta solo en esta visita */
        }
        cookie.classList.remove("is-visible");
      });
    }
  }

  /* ---------------------------------------------------------------------
     Año del footer (opcional)
     --------------------------------------------------------------------- */
  var year = doc.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
