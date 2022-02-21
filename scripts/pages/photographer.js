//Mettre le code JavaScript lié à la page photographer.html
//avec URLSearchParams je 
let params = new URLSearchParams(document.location.search);
let id = params.get("id"); // 

const photographHeader = document.querySelector(".photograph-header");
const photographMedias = document.createElement('div');
const photographDropdown = document.createElement('div');

const main = document.getElementById('main');
main.appendChild(photographMedias);
main.appendChild(photographDropdown);

photographMedias.classList.add('photograph-medias');
photographDropdown.classList.add('photograph-dropdown');

//je stylise ma balise select et ses option en utilisant du js car ces dernières selon les user-agent ne sont pas les mêmes 
let optionCategories = document.querySelector('option');

optionCategories.style.borderBottom = "2px solid white";
optionCategories.style.padding = "50px"

function filterUser(users){
    //je récupère le profil du photographe en utilisant la fonction filter qui me permet de comparer si
    // l'id de mon URL correspond à ID du photographe cliquer auparavant sur l'index HTML
    const filterById = users.filter(user => user.id == id); 
    // console.log(filterById);
    return filterById
}


async function dataUser() {
    // je récupère dans ma variable les donnée de mon fichier json dans la fonction getPhotographers
    // qui se trouve dans le fichier index.js 
    const photographer = await getPhotographers()
    const profils = photographer.photographers;
    return filterUser(profils)  
    
}

async function dataUserMedia() {
    // je récupère dans ma variable les donnée de mon fichier json dans la fonction getPhotographers
    // qui se trouve dans le fichier index.js 
    const photographer = await getPhotographers()
    const medias = photographer.media;
    const photographeMedia = medias.filter(media => media.photographerId == id)
    return photographeMedia  
}

async function dataSortBy(){
    const photographer = await getPhotographers()
    const medias = photographer.media;
    const photographeMedia = medias.filter(media => media.photographerId == id)

    const dropdown = document.getElementById('dropdown');

    let sortedMedia = []

     dropdown.addEventListener('change', function() {
         photographMedias.innerHTML = "";
         const value = dropdown.value;


         if (value == "popularity") {
           sortedMedia = photographeMedia.sort((a,b) => b.likes - a.likes)
           console.log(sortedMedia);
           displayMedia(sortedMedia);
         }
         
         if (value == "date") {
            sortedMedia = photographeMedia.sort((a,b) => new Date(b.date) - new Date(a.date))
            console.log(sortedMedia);
            displayMedia(sortedMedia);
         }

         if (value == "title"){
            sortedMedia = photographeMedia.sort((a,b) => {
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            })
            console.log(sortedMedia);
            displayMedia(sortedMedia);
         }  
        
     })
}
dataSortBy()

async function displayLightbox() {
    const photographer = await getPhotographers()
    const medias = photographer.media;
    const photographeMedia = medias.filter(media => media.photographerId == id)
    const arrayImg = []

    const lightboxModal = document.getElementById("lightbox_modal");
    const closeLightbox = document.getElementById("close_lightbox");
    const containerImg = document.getElementById('lightbox_img_container')
    const mediaImages = document.querySelectorAll('figure img');
    const btnPrev = document.querySelector('.lightbox_prev');
    const btnNext = document.querySelector('.lightbox_next');
    const lightboxImg = document.createElement('img');
    let position = 0;


    mediaImages.forEach(image => {
        image.addEventListener('click',  function(e){ 
            lightboxModal.style.display = 'block'
            lightboxImg.id = "lightbox-img" 
            lightboxImg.src = e.currentTarget.src;
            containerImg.innerHTML = ""
            containerImg.appendChild(lightboxImg);
        })

    })

    for (let i = 0; i < mediaImages.length; i++){
        arrayImg.push(mediaImages[i])
    }

    let currentSlideIndex = -1;

    btnNext.addEventListener('click', function (){
        currentSlideIndex ++;

        if(currentSlideIndex > arrayImg.length ){
            currentSlideIndex = 0     
        }
        lightboxImg.src = arrayImg[currentSlideIndex].src ; 
    })

    btnPrev.addEventListener('click', function (){
        currentSlideIndex --;

       if(currentSlideIndex > arrayImg.length ){
          currentSlideIndex = -1    
        }
        lightboxImg.src = arrayImg[currentSlideIndex].src ; 
    })

    closeLightbox.addEventListener('click', function () {
        lightboxModal.style.display = 'none'
    })

}


// en cours de construction ..
 async function displayBanner () {
    const photographer = await getPhotographers()
    const medias = photographer.media;
    const photographeMedia = medias.filter(media => media.photographerId == id);

    const users = photographer.photographers;
    const usersProfils = users.filter(user => user.id == id); 

    let arrayLikes = [];
    let arrayPrice = [];

    const bannerLike = document.querySelector('.sticky-banner');
    const likeSum = document.createElement('p');
    likeSum.setAttribute('id', 'total-likes')
    const priceItem = document.createElement('p');

    for (items in photographeMedia){
        arrayLikes.push(photographeMedia[items].likes)
    }

    for (items in usersProfils){
        arrayPrice.push(usersProfils[items].price)
    }

    let sum = arrayLikes.reduce(sumFunction);

    function sumFunction (total, value){
        return total + value
    }
    likeSum.innerHTML = sum + ''
    priceItem.innerHTML = arrayPrice + '€ /jour'
     
    bannerLike.appendChild(likeSum)
    bannerLike.appendChild(priceItem)
   
}
displayBanner()

async function displayProfil(users) {
    users.forEach((users) => {
        const photographerProfilModel = photographerFactory(users)
        const userProfilDOM = photographerProfilModel.getUserProfil()
        photographHeader.appendChild(userProfilDOM);
    })

};

async function displayMedia(mediasUser) {
    mediasUser.forEach((media) => {
        const photographerMediaModel = photographerFactory(media)
        const userMediaDOM = photographerMediaModel.showMedia(media, mediasUser)
        photographMedias.innerHTML += userMediaDOM;
    })
};

async function init() {
    // Récupère les datas des photographes
    const users = await dataUser();
    const medias = await dataUserMedia();
    displayProfil(users);
    displayMedia(medias);
};

init()