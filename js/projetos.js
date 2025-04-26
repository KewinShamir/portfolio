// Função para carregar e exibir projetos dinamicamente
function carregarProjetos() {
    const gradeProjetos = document.querySelector('.grade-projetos');

    // Carrega os dados do arquivo JSON
    fetch('projetos.json')
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((projetos) => {
            // Itera sobre os projetos e cria os elementos HTML
            projetos.forEach((projeto) => {
                const cartaoProjeto = document.createElement('div');
                cartaoProjeto.classList.add('cartao-projeto');

                cartaoProjeto.innerHTML = `
                    <h3 class="titulo-projeto">${projeto.titulo}</h3>
                    <img src="${projeto.imagem}" alt="${projeto.titulo}" class="imagem-projeto">
                    <p class="texto-projeto"><strong>${projeto.descricao}</strong></p>
                    <a href="${projeto.link}" target="_blank" class="botao-projeto">Ver Projeto</a>
                `;

                gradeProjetos.appendChild(cartaoProjeto);
            });

            // Inicializa a navegação horizontal
            configurarNavegacaoProjetos();
        })
        .catch((error) => {
            console.error('Erro ao carregar os projetos:', error);
        });
}

// Configura a navegação horizontal dos projetos
function configurarNavegacaoProjetos() {
    const gradeProjetos = document.querySelector('.grade-projetos');
    const setaAnterior = document.getElementById('anterior');
    const setaProximo = document.getElementById('proximo');

    let scrollAmount = 0; // Controla a posição de rolagem
    const scrollStep = 300; // Quantidade de pixels para rolar a cada clique

    // Rolar para a esquerda
    setaAnterior.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) scrollAmount = 0; // Evita rolar além do início
        gradeProjetos.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Rolar para a direita
    setaProximo.addEventListener('click', () => {
        const maxScroll = gradeProjetos.scrollWidth - gradeProjetos.clientWidth;
        scrollAmount += scrollStep;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll; // Evita rolar além do fim
        gradeProjetos.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}
// Carrega os projetos dinamicamente
carregarProjetos();