const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/hello@navig8r.org";

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function initHeader() {
  const header = qs("[data-header]");
  const toggle = qs("[data-nav-toggle]");
  const mobile = qs("[data-mobile-nav]");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
    });
    qsa("a", mobile).forEach((a) => {
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }
}

function initProductTabs() {
  const stage = qs("[data-product-stage]");
  if (!stage) return;
  const tabs = qsa("[data-product-tab]", stage);
  const panels = qsa("[data-product-panel]", stage);

  const show = (key) => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.productTab === key)));
    panels.forEach((p) => {
      const on = p.dataset.productPanel === key;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => show(tab.dataset.productTab));
  });
}

function initHowSteps() {
  const root = qs("[data-how]");
  if (!root) return;
  const steps = qsa("[data-how-step]", root);
  const panels = qsa("[data-how-panel]", root);
  let timer;

  const show = (idx) => {
    steps.forEach((s) => {
      const on = Number(s.dataset.howStep) === idx;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-selected", String(on));
    });
    panels.forEach((p) => {
      const on = Number(p.dataset.howPanel) === idx;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
  };

  const armAutoplay = () => {
    clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => {
      const current = steps.findIndex((s) => s.classList.contains("is-active"));
      show((current + 1) % steps.length);
    }, 5200);
  };

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      show(Number(step.dataset.howStep));
      armAutoplay();
    });
  });

  armAutoplay();
  root.addEventListener("mouseenter", () => clearInterval(timer));
  root.addEventListener("mouseleave", armAutoplay);
}

function initAudience() {
  const section = qs("#audience");
  if (!section) return;
  const tabs = qsa("[data-audience-tab]", section);
  const panels = qsa("[data-audience-panel]", section);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.audienceTab;
      tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      panels.forEach((p) => {
        const on = p.dataset.audiencePanel === key;
        p.classList.toggle("is-active", on);
        p.hidden = !on;
      });
    });
  });
}

function initReveal() {
  const items = qsa("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  items.forEach((el) => io.observe(el));
}

function initContactForm() {
  const form = qs("[data-contact-form]");
  if (!form) return;
  const status = qs("[data-form-status]", form);
  const submitBtn = qs("[data-submit]", form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.classList.remove("is-error");

    if (!form.reportValidity()) {
      status.textContent = "Please complete the required fields.";
      status.classList.add("is-error");
      return;
    }

    const data = new FormData(form);
    data.append("_template", "table");
    data.append("_captcha", "false");

    submitBtn.disabled = true;
    const prev = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      status.textContent = "Message sent. We’ll reply at hello@navig8r.org soon.";
    } catch (err) {
      console.error(err);
      status.textContent =
        "Couldn’t send just now. Email us directly at hello@navig8r.org.";
      status.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = prev;
    }
  });
}

function initYear() {
  const el = qs("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

initHeader();
initProductTabs();
initHowSteps();
initAudience();
initReveal();
initContactForm();
initYear();
