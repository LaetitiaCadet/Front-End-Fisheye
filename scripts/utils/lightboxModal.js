function displayLightbox(e) {
    const lightboxModal = document.getElementById("lightbox_modal");
    lightboxModal.style.display = "block";
    lightboxPlayer()
}

function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox_modal");
    const lightboxImg = document.querySelector('.lightbox_img')
    lightboxModal.style.display = "none";
    lightboxImg.innerHTML = "";
}