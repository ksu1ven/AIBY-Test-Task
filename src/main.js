import "./styles/main.css";

const fillPageContent = async () => {
  const supportedLangs = ["en", "de", "es", "fr", "ja", "pt"];

  const constantValues = {
    pricePerYear: "$39.99",
    pricePerWeekOptionYear: "$0.48",
    pricePerWeekOptionWeek: "$6.99",
  };

  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get("lang");

  if (!lang) {
    lang = navigator.language.slice(0, 2).toLowerCase();
  }

  if (!supportedLangs.includes(lang)) {
    lang = "en";
  }

  let langStrings;
  try {
    langStrings = (await import(`./i18n/${lang}.json`)).default;
  } catch (e) {
    langStrings = (await import(`./i18n/en.json`)).default;
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (langStrings[key]) {
      let text = langStrings[key] || "";

      if (text.includes("{{")) {
        text = text.replace(/{{\s*([\w-]+)\s*}}/g, (_, attrName) => {
          const key = el.getAttribute(`data-${attrName}`) || "";
          return constantValues[key];
        });
      }

      el.innerHTML = text;
    }
  });
};

fillPageContent();
