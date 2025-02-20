document.addEventListener("DOMContentLoaded", function () {
  const imageCount = 80; // Número total de imagens
  const galleryContainer = document.createElement("div");
  galleryContainer.id = "gallery-container";
  document.body.appendChild(galleryContainer);

  for (let i = 1; i <= imageCount; i++) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.src = `images/highres${i}.jpg`;
    img.alt = `Wallpaper ${i}`;
    img.loading = "lazy"; // Otimização de carregamento
    img.classList.add("fade-in");

    const downloadBtn = document.createElement("a");
    downloadBtn.href = `images/highres${i}.jpg`;
    downloadBtn.download = `Wallpaper ${i}`;
    downloadBtn.classList.add("download-btn");
    downloadBtn.innerHTML = `<i class="fas fa-download"></i>`; // Ícone FontAwesome

    imgContainer.appendChild(img);
    imgContainer.appendChild(downloadBtn);
    galleryContainer.appendChild(imgContainer);
  }

  // Evento para abrir imagem em nova aba
  galleryContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "IMG") {
      window.open(event.target.src);
    }
  });

  // Adicionando a classe 'loaded' quando a imagem for carregada
  const images = document.querySelectorAll(".fade-in");

  images.forEach((img) => {
    img.onload = () => img.classList.add("loaded");
    img.src = img.src; // Força o evento onload em cache
  });

  console.log("Página carregada com sucesso!");

  // Função para capturar e processar a avaliação
  const reviewForm = document.querySelector(".review-form");
  const reviewMessage = document.querySelector(".review-message");

  // Lógica para o envio de avaliação
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio do formulário padrão

    const textarea = reviewForm.querySelector("textarea");
    const stars = document.querySelectorAll(".stars input:checked");

    // Coletando os dados do formulário
    const comment = textarea.value.trim();
    const rating = stars.length; // Número de estrelas selecionadas

    // Verificar se os campos estão preenchidos
    if (comment.length > 0 && rating > 0) {
      reviewMessage.textContent = "Obrigado pela sua avaliação!";
      reviewMessage.style.color = "green";

      // Aqui você pode enviar esses dados para um backend, se necessário
      console.log("Comentário:", comment);
      console.log("Avaliação:", rating);

      // Limpar os campos após envio
      reviewForm.reset();
    } else {
      reviewMessage.textContent = "Por favor, preencha todos os campos!";
      reviewMessage.style.color = "red";
    }
  });

  // Seleção do botão e da seção sobre
  const aboutButton = document.getElementById("about-button");
  const aboutSection = document.querySelector(".about");

  // Função para alternar a exibição da seção sobre
  document
    .getElementById("about-button")
    .addEventListener("click", function () {
      aboutSection.classList.toggle("open"); // Adiciona ou remove a classe 'open' para animar a seção
    });
});

// Evento para o botão de download
document.querySelectorAll(".download-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const img = button.previousElementSibling.src;
    const link = document.createElement("a");
    link.href = img;
    link.download = "wallpaper.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// Função para carregar as imagens com fade-in
window.onload = () => {
  const images = document.querySelectorAll(".fade-in");

  images.forEach((image) => {
    image.onload = () => {
      image.classList.add("loaded"); // Quando a imagem for carregada, aplica o fade-in
    };

    // Caso a imagem já tenha sido carregada (em cache)
    if (image.complete) {
      image.classList.add("loaded");
    }
  });
};
