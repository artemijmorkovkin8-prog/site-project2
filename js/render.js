document.addEventListener('DOMContentLoaded', function() {
  // Загрузка услуг
  const servicesContainer = document.getElementById('services-container');
  if (servicesContainer) {
    fetch('data/services.json')
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки услуг');
        return response.json();
      })
      .then(data => renderServices(data))
      .catch(error => {
        console.error(error);
        servicesContainer.innerHTML = '<p>Не удалось загрузить услуги.</p>';
      });
  }

  // Загрузка новостей
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    fetch('data/news.json')
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки новостей');
        return response.json();
      })
      .then(data => renderNews(data))
      .catch(error => {
        console.error(error);
        newsContainer.innerHTML = '<p>Не удалось загрузить новости.</p>';
      });
  }
});

function renderServices(services) {
  const container = document.getElementById('services-container');
  if (!container) return;
  container.innerHTML = services.map(service => `
    <article class="service-card">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <p class="price">${service.price}</p>
    </article>
  `).join('');
  if (window.filterServices) window.filterServices();
}

function renderNews(news) {
  const container = document.getElementById('news-container');
  if (!container) return;
  const sorted = news.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  container.innerHTML = sorted.map(item => `
    <article class="news-card">
      <div class="date">${formatDate(item.date)}</div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
}
