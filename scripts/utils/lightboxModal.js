function displayLightbox() {
    const lightboxModal = document.getElementById("lightbox_modal");
    lightboxPlayer()
	lightboxModal.style.display = "block";
}

function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox_modal");
   lightboxModal.style.display = "none";
}