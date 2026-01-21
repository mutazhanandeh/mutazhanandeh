// assets/js/i18n.js
(function () {
  const supported = ["en", "ar", "de"];
  const STORAGE_KEY = "site_lang";

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.includes(saved)) return saved;
    return "en";
  }
  function setLang(lang) { localStorage.setItem(STORAGE_KEY, lang); }

  function applyLang(lang) {
    const dict = window.TRANSLATIONS?.[lang];
    if (!dict) return;

    const isArabic = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key]) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });

    const sel = document.getElementById("langSelect");
    if (sel) sel.value = lang;
  }

  window.SiteLang = {
    init() {
      const lang = getLang();
      applyLang(lang);

      const sel = document.getElementById("langSelect");
      if (sel) {
        sel.addEventListener("change", (e) => {
          const newLang = e.target.value;
          setLang(newLang);
          applyLang(newLang);
        });
      }
    }
  };
})();
