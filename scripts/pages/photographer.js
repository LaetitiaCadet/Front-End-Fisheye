//Mettre le code JavaScript lié à la page photographer.html
//avec URLSearchParams je cherche l'id dans mon lien 
let params = new URLSearchParams(document.location.search);
//Et je récupère l'id avec la fonction get 
let id = params.get("id"); // 

const photographHeader = document.querySelector(".photograph-header");
const photographMedias = document.createElement('div');
const photographDropdown = document.createElement('div');

const main = document.getElementById('main');
main.appendChild(photographMedias);
main.appendChild(photographDropdown);

photographMedias.classList.add('photograph-medias');
photographDropdown.classList.add('photograph-dropdown');


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


async function displayLightbox(event) {
    event.preventDefault()

    const photographer = await getPhotographers()
    const medias = photographer.media;
    const photographeMedia = medias.filter(media => media.photographerId == id)

    const lightboxModal = document.getElementById("lightbox_modal");
    const closeLightbox = document.getElementById("close_lightbox");
    const containerMedia = document.getElementById('lightbox_media_container')
    const photographerMediaTag = document.querySelectorAll('.photographer-media');
    const btnPrev = document.querySelector('.lightbox_prev');
    const btnNext = document.querySelector('.lightbox_next');
    const lightboxImg = document.createElement('img');
    const lightboxVideo = document.createElement('video');
    const sourceVideo = document.createElement('source');
    const mediaTitleArray = Array.from(photographeMedia).map(media => media.title)
    const mediaURLArray = Array.from(photographerMediaTag).map(media => media.src)
    
    let source = event.target.src == "" ? event.target.children[0].src : event.target.src;
    let mediaIdx = mediaURLArray.indexOf(source)

    //LigthBox

    document.onclick =  function(e) {
        console.log(e.target.children[0].src)
        // au click sur le dom si l'élément correspond à la class indiquer et que la source de l'enfant 
        // est de type mp4 , je lance ma lightbox et affiche l'élement video dedans 
        if (e.target.children[0].src.split('.').pop() == 'mp4') {
            const src = e.target.children[0].src
            console.log(e.target.children[0].src);
            lightboxModal.style.display = 'block'
            sourceVideo.src = src
            lightboxVideo.setAttribute('controls', 'true');
            lightboxVideo.appendChild(sourceVideo);
            containerMedia.innerHTML = ""
            containerMedia.appendChild(lightboxVideo)
        }
    }

    photographerMediaTag.forEach(media => {
        media.onclick = function (e) {
            //création de ma lightbox en récupérant la source de mes média image 
            e.preventDefault()
            let mediaType = media.src
            console.log(mediaType)
            if (mediaType.split('.').pop() == 'jpg'){
                lightboxModal.style.display = 'block'
                lightboxImg.id = "lightbox-img" 
                lightboxImg.src = e.currentTarget.src;
                containerMedia.innerHTML = ""
                containerMedia.appendChild(lightboxImg);
            }
            lightboxModal.style.display = 'block'
        }
    })


    let currentSlideIndex = mediaIdx;

    btnNext.addEventListener('click', function (e){
        e.preventDefault()
        currentSlideIndex ++;

        if(currentSlideIndex > mediaURLArray.length ){
            currentSlideIndex = 0     
        }
        let media = mediaURLArray[currentSlideIndex]
        if (media.split('.').pop() == 'mp4') {
            containerMedia.innerHTML = `
              <video controls>
                    <source src="${media}" class="photographer-media">
              </video>
              <br> 
              <h1 class="lightbox-title">`+ mediaTitleArray[currentSlideIndex] +`</h1>
            `
        } else {
            containerMedia.innerHTML = `
                <img id="lightbox-img" src="${media}"> 
                <br> 
                <h1 class="lightbox-title">`+ mediaTitleArray[currentSlideIndex] +`</h1>`
        }
    })

    btnPrev.addEventListener('click', function (e){
        e.preventDefault()
        currentSlideIndex --;

       if(currentSlideIndex <  0 ){
          currentSlideIndex = mediaURLArray.length - 1
        }
        let media = mediaURLArray[currentSlideIndex]
        if (media.split('.').pop() == 'mp4') {
            containerMedia.innerHTML = `
              <video controls>
                    <source src="${media}" class="photographer-media">
                </video>
                <h1 class="lightbox-title">`+ mediaTitleArray[currentSlideIndex] +`</h1>
            `
        } else {
            containerMedia.innerHTML = `
            <img id="lightbox-img" src="${media}"> 
                <br> 
                <h1 class="lightbox-title">`+ mediaTitleArray[currentSlideIndex] +`</h1>`
        }
    })

    closeLightbox.addEventListener('click', function () {
        lightboxModal.style.display = 'none'
        containerMedia.innerHTML = ""
    })

}



 async function displayBanner () {
    const photographer = await getPhotographers()
    const medias = photographer.media;
    const photographeMedia = medias.filter(media => media.photographerId == id);

    const users = photographer.photographers;
    const usersProfils = users.filter(user => user.id == id); 

    let arrayLikes = [];
    let arrayPrice = [];

    const bannerLike = document.querySelector('.sticky-banner');
    const btnLikes = document.querySelectorAll('.btn-like');
    const likeSum = document.createElement('p');
    likeSum.setAttribute('id', 'total-likes')
    const priceItem = document.createElement('p');

    for (items in photographeMedia){
        arrayLikes.push(photographeMedia[items].likes)
    }
    console.log(arrayLikes)

    for (items in usersProfils){
        arrayPrice.push(usersProfils[items].price)
    }

    let sum = arrayLikes.reduce(sumFunction);

    function sumFunction (total, value) {
        return total + value
    }

    likeSum.innerHTML = sum + ` <i  class="fas fa-heart"></i>`  + ''
    priceItem.innerHTML = arrayPrice + '€ /jour'

    bannerLike.appendChild(likeSum)
    bannerLike.appendChild(priceItem)

    btnLikes.forEach(like => {
        like.addEventListener('click', function () {
            sum += 1
            console.log(sum)
            likeSum.innerHTML = sum + '<i class="fas fa-heart 2x"></i>' + ''
        })
    })
    
}



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
    displayBanner()
    
};

init()