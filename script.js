const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

// Alternar o menu
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar o menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active'); // Fecha o menu
    });
});

const btnSubir = document.getElementById('btn-subir');

// Mostrar/ocultar o botão com base na posição do scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnSubir.style.display = 'block'; // Mostra o botão
    } else {
        btnSubir.style.display = 'none'; // Oculta o botão
    }
});

// Função para rolar suavemente até o topo
btnSubir.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Scroll suave
    });
});

// Configuração do Typed.js
document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed('#digitação', {
        strings: ["Kewin Shamir!"],
        typeSpeed: 100, // Velocidade de digitação (em milissegundos)
        backSpeed: 50, // Velocidade de apagamento (em milissegundos)
        loop: true, // Repete o efeito continuamente
        backDelay: 1000, // Tempo de espera antes de apagar o texto (em milissegundos)
    });
});

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

    document.addEventListener('DOMContentLoaded', () => {
        const botoesFiltro = document.querySelectorAll('.filtro');
        const cardsCursos = document.querySelectorAll('.card-curso');
        const menuFiltros = document.querySelector(".menu-filtros");
        const filtrosCategorias = document.querySelector(".filtros-categorias");
    
        // Função para alternar a visibilidade dos filtros
        menuFiltros.addEventListener("click", function () {
            filtrosCategorias.classList.toggle("active");
        });
    
        // Função para filtrar os cursos por categoria
        botoesFiltro.forEach((botao) => {
            botao.addEventListener('click', () => {
                // Remove a classe "active" de todos os botões
                botoesFiltro.forEach((btn) => btn.classList.remove('active'));
                // Adiciona a classe "active" ao botão clicado
                botao.classList.add('active');
    
                // Oculta o menu de filtros em telas menores após a seleção
                if (window.innerWidth <= 768) {
                    filtrosCategorias.classList.remove("active");
                }
    
                // Filtra os cursos com base na categoria selecionada
                const categoriaSelecionada = botao.getAttribute('data-categoria');
                cardsCursos.forEach((card) => {
                    if (categoriaSelecionada === 'todos' || card.classList.contains(categoriaSelecionada)) {
                        card.style.display = 'block'; // Mostra o card
                    } else {
                        card.style.display = 'none'; // Oculta o card
                    }
                });
            });
        });
    });

// Função para animar os gráficos circulares
document.addEventListener('DOMContentLoaded', () => {
    const graficos = document.querySelectorAll('.grafico-habilidade');

    // Função para verificar se o elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Função para animar os gráficos
    function animarGraficos() {
        graficos.forEach((grafico) => {
            if (isElementInViewport(grafico)) {
                const porcentagemElement = grafico.querySelector('.porcentagem');
                const nivel = parseInt(porcentagemElement.getAttribute('data-level'), 10);
                let contador = 0;

                // Animação da porcentagem
                const intervalo = setInterval(() => {
                    if (contador <= nivel) {
                        porcentagemElement.textContent = `${contador}%`;
                        contador++;
                    } else {
                        clearInterval(intervalo);
                    }
                }, 20);

                // Animação do gráfico circular
                const circuloExterno = grafico.querySelector('.circulo-externo');
                circuloExterno.style.background = `conic-gradient(var(--cor-terciaria) ${nivel}%, var(--cor-quaternaria) ${nivel}%)`;
            }
        });
    }

    // Verifica a visibilidade ao rolar a página
    window.addEventListener('scroll', animarGraficos);

    // Executa a animação ao carregar a página
    animarGraficos();
});