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
console.log(id)

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
    console.log(profils)
    console.log(filterUser(profils))
    return filterUser(profils)   
}

async function dataUserMedia() {
    // je récupère dans ma variable les donnée de mon fichier json dans la fonction getPhotographers
    // qui se trouve dans le fichier index.js 
    const photographer = await getPhotographers()
    const medias = photographer.media;
    console.log(medias)
    const photographeMedia = medias.filter(media => media.photographerId == id)
    console.log(photographeMedia)
    return photographeMedia  
}

async function dataSortBy(){
     const dropdown = document.getElementById('dropdown');

     dropdown.addEventListener('change', function() {
         const value = dropdown.value;

         console.log(value);
     })
}

dataSortBy()


async function displaySortBy(categories){
    const dropdown = SortFactory.render()
    photographDropdown.appendChild(dropdown);
    console.log(dropdown)
    
}



async function displayProfil(users) {
    users.forEach((users) => {
        const photographerProfilModel = photographerFactory(users)
        const userProfilDOM = photographerProfilModel.getUserProfil()
        photographHeader.appendChild(userProfilDOM);
        console.log(photographerProfilModel)
        console.log(userProfilDOM);
    })

};

async function displayMedia(mediasUser) {
    console.log(mediasUser);
    mediasUser.forEach((media) => {
        const photographerMediaModel = photographerFactory(media)
        const userMediaDOM = photographerMediaModel.showMedia(media)
        photographMedias.innerHTML += userMediaDOM;
        console.log(photographerMediaModel)
    })

};

async function init() {
    // Récupère les datas des photographes
    const users = await dataUser();
    const medias = await dataUserMedia();
    displayProfil(users);
    displayMedia(medias);
    displaySortBy()
};

init()