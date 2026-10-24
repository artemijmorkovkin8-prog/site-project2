document.addEventListener('DOMContentLoaded', function() {
  // Текущий год в подвале
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Мобильное меню
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Фильтр услуг
  const searchInput = document.getElementById('service-search');
  if (searchInput) {
    searchInput.addEventListener('input', filterServices);
  }
});

function filterServices() {
  const searchInput = document.getElementById('service-search');
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    if (title.includes(query)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Экспортируем для render.js
window.filterServices = filterServices;
