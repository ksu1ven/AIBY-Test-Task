export const selectTariff = () => {
  const tariffs = document.querySelectorAll("[data-href]");
  const link = document.querySelector("[data-link]");

  if (!tariffs.length || !link) return;

  const toggleActiveLink = (e) => {
    tariffs.forEach((t) => t.classList.remove("active"));
    const current = e.currentTarget;
    current.classList.add("active");
    link.href = current.dataset.href;
  };

  tariffs.forEach((t) => t.addEventListener("click", toggleActiveLink));
};
