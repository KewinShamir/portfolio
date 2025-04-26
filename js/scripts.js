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
                        circuloExterno.style.background = `conic-gradient(var(--ciano-default-color) ${contador}%, var(--black-100) ${contador}%)`;
                        contador++;
                    } else {
                        clearInterval(intervalo);
                    }
                }, 20);

                // Animação do gráfico circular
                const circuloExterno = grafico.querySelector('.circulo-externo');
                circuloExterno.style.background = `conic-gradient(var(--ciano-default-color) ${nivel}%, var(--black-100) ${nivel}%)`;
            }
        });
    }

    // Executa a animação ao carregar a página
    animarGraficos();
});