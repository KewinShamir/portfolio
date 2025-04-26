document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".close");

  items.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.dataset.modal;
      document.getElementById(target).style.display = "flex";
    });
  });

  closes.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
});
