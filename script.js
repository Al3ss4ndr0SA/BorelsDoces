document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-content');
    const closeButton = lightbox.querySelector('.close-button');
    const prevButton = lightbox.querySelector('.prev-button');
    const nextButton = lightbox.querySelector('.next-button');

    let currentImages = []; // array com as imagens do conjunto atual
    let currentIndex = 0;   // índice da imagem atual no lightbox

    // **Correção:** Esconde o lightbox inicialmente via JavaScript ***
    lightbox.style.display = 'none';

    // Função para abrir o lightbox com um conjunto de imagens e índice inicial
    function openLightbox(images, index) {
        currentImages = images;
        currentIndex = index;
        lightboxImage.src = currentImages[currentIndex];
        lightbox.style.display = 'flex'; // ou block, dependendo do CSS
    }

    // Função para fechar o lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImage.src = '';
    }

    // Função para mostrar a imagem anterior
    function showPrev() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex];
    }

    // Função para mostrar a próxima imagem
    function showNext() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex];
    }

    // Adiciona evento de clique para todas as imagens com a classe refImg
    document.querySelectorAll('.refImg').forEach(img => {
        img.addEventListener('click', () => {
            // Pega o atributo data-full-images e transforma em array
            const images = img.getAttribute('data-full-images').split(',');
            // Abre o lightbox com o array e índice 0 (primeira imagem)
            openLightbox(images, 0);
        });
    });

    // Eventos dos botões do lightbox
    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);

    // Opcional: fechar lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Opcional: navegação com teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') showPrev();
            else if (e.key === 'ArrowRight') showNext();
            else if (e.key === 'Escape') closeLightbox();
        }
    });
});
