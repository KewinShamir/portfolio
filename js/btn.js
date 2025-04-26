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