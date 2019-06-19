import galleryItems from "./gallery-items.js";
const createItemGallery = galleryItems => {
  const gallery = document.querySelector(".gallery");
  galleryItems.map(e => {
    const outerHTML = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${e.original}"
  >
  
    <img
      class="gallery__image"
      src="${e.preview}"
      data-source="${e.original}"
      alt="${e.description}"
    />

    <span class="gallery__icon">
      <i class="material-icons">zoom_out_map</i>
    </span>
  </a>
</li>`;
    gallery.insertAdjacentHTML("beforeend", outerHTML);
  });
  return gallery;
};

const handlers = galleryItems => {
  const gallery = createItemGallery(galleryItems);
  const ovelray = document.querySelector(".overlay");
  const ovelrayImg = document.querySelector(".overlay img");
  gallery.addEventListener("click", handlerGalleryClick);

  function handlerGalleryClick(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      return;
    }
    const currentImg = e.target;
    const originalSrc = currentImg.dataset.source;
    const altImg = currentImg.alt;
    ovelrayImg.setAttribute("src", originalSrc);
    ovelrayImg.setAttribute("alt", altImg);
    openModal();
  }

  function openModal() {
    ovelray.classList.add("is-visible");
    ovelray.addEventListener("click", handlerCloseOverlay);
    const closeBtn = document.querySelector(
      'button[data-action="close-modal"]'
    );
    closeBtn.addEventListener('click', handlerCloseBtn);
    window.addEventListener("keydown", handlerKeyPress);
  }

  function handlerCloseBtn(e) {
    closeModal();
  }

  function handlerCloseOverlay(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handlerKeyPress(e) {
    if (e.code !== "Escape") {
      return;
    }
    closeModal();
  }

  function closeModal() {
    ovelray.classList.remove("is-visible");
    window.removeEventListener("keydown", handlerKeyPress);
  }
};

handlers(galleryItems);
