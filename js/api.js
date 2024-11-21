const apiUrl = 'https://projeto-backend.fly.dev/noticias';

const fetchArticles = () => {
    fetch(apiUrl, {
        method: 'GET', // ou POST, dependendo da necessidade
        headers: {
            'Authorization': 'Bearer MjAwNDk3MjU5Cg==',
            'Content-Type': 'application/json'
        },
        // Se precisar, pode adicionar credenciais
        // credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const articles = data;

            const articlesArea = document.getElementById('news-container');
            articlesArea.innerHTML = '';

            if (articles.length > 0) {
                articles.forEach(article => {
                    const articleCard = document.createElement('article');
                    articleCard.classList.add('article-card');
                    articleCard.innerHTML = `
                        <div class="article-image">
                            <img src="${article.imagem_thumbnail || 'default.jpg'}" alt="${article.titulo}">
                        </div>
                        <div class="article-content">
                            <h3 class="article-title">${article.titulo}</h3>
                            <p class="article-summary">${article.descricao}</p>
                            <p class="article-author">${article.nome_autor || 'Autor desconhecido'}</p>
                            <p class="article-date">${new Date(article.data).toLocaleDateString()}</p>
                            <a href="./artigo.html?id=${article._id}" class="read-more">Leia mais</a>
                        </div>
                    `;
                    articlesArea.appendChild(articleCard);
                });
            } else {
                articlesArea.innerHTML = '<p>Nenhuma notícia disponível no momento.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
            const articlesArea = document.getElementById('news-container');
            articlesArea.innerHTML = '<p>Erro ao carregar notícias. Tente novamente mais tarde.</p>';
        });
};

window.onload = fetchArticles;
