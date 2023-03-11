function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id, image, video, title, likes, date } = data;

    const picture = `./assets/images/photographers/${portrait}`;
    const mediaItems = `./assets/images/media/${image}`
    const cityCountry = `${city}, ` + `${country}`;
    const photographerLink = `./photographer.html?id=${id}`;
    

    function getUserCardDOM() {
        //création de la carte photographe
        const article = document.createElement('article');

        const a = document.createElement('a');
        a.setAttribute("alt", name);
        a.setAttribute('href', photographerLink);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name + ' photo profil');

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const infoPhotographer = document.createElement('div');
        infoPhotographer.classList.add('info-photographer');


        const h4 = document.createElement('h4');
        h4.textContent = cityCountry;

        const p = document.createElement('p');
        p.textContent = tagline;

        const span = document.createElement('span');
        span.textContent = `${price}€/jour`;

        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(infoPhotographer);
        infoPhotographer.appendChild(h4);
        infoPhotographer.appendChild(p);
        infoPhotographer.appendChild(span);

        return (article);
    }


    function getUserProfil() {
        //création du prototype du header de la page photographer.html
        //nom info Image profile du photographe
        const photographHeader = document.querySelector(".photograph-header");
        const modal = document.querySelector('.contact_button')
        const infoProfil = document.createElement('article');
        const photoProfil = document.createElement('article');
        const nameModal = document.getElementById('photographer-name')
        nameModal.textContent = name

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.classList.add("profil-photo");
        img.setAttribute('alt', name + ' photo profil')

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const h1 = document.createElement('h1');
        h1.textContent = cityCountry;

        const p = document.createElement('p');
        p.textContent = tagline;

        photographHeader.appendChild(photoProfil)
        photographHeader.appendChild(infoProfil)
        photographHeader.insertBefore(modal, photographHeader.children[2])
        infoProfil.appendChild(h2);
        infoProfil.appendChild(h1);
        infoProfil.appendChild(p);
        photoProfil.appendChild(img);

        return (infoProfil);

    }

    function showMedia(medium) {
        // la fonction show media affiche la liste des médias des photographe en rendant le mediaFactory dans la variable mediaTag
        document.addEventListener('click', function (e) {
            let numLike = likes;
            if (e.target.id == `like-button-${medium.id}`) {
                e.target.parentElement.innerHTML = `
                  ${numLike += 1} <i class="fas fa-heart 2x" id="like-button-${medium.id}" tabindex="0" aria-label="appuyez pour aimé cette photo"></i>
                `
            }
        })
        document.addEventListener('keypress', function (e) {
            let numLike = likes;
            if (e.target.id == `like-button-${medium.id}`) {
                e.target.parentElement.innerHTML = `
                  ${numLike += 1} <i class="fas fa-heart 2x" id="like-button-${medium.id}" tabindex="0" aria-label="appuyez pour aimé cette photo"></i>
                `
            }
        })
        const mediaTag = MediaFactory.render(medium);
        return mediaTag;
    }

    return { 
             name,
             picture, 
             city, 
             country, 
             tagline, 
             price, 
             id, 
             image, 
             mediaItems,
             video, 
             likes, 
             title,
             date, 
             getUserCardDOM, 
             getUserProfil, 
             showMedia,
             displayLightbox
            }
}