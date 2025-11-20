export const fillPageContent = async () => {
  const supportedLangs = ["en", "de", "es", "fr", "ja", "pt"];

  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get("lang");

  if (!lang) {
    lang = navigator.language.slice(0, 2).toLowerCase();
  }

  if (!supportedLangs.includes(lang)) {
    lang = "en";
  }
  document.documentElement.setAttribute("lang", lang);
  document.body.classList.add(`lang-${lang}`);

  let langJson;
  try {
    langJson = (await import(`../i18n/${lang}.json`)).default;
  } catch (e) {
    langJson = (await import(`../i18n/en.json`)).default;
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (langJson[key]) {
      let text = langJson[key] || "";
      if (text.includes("{{")) {
        text = text.replace(/{{\s*([\w-]+)\s*}}/g, (_, attrName) => {
          return el.dataset[attrName] || "";
        });
      }
      el.innerHTML = text;
    }
  });
};
