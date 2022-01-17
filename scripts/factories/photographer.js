function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id} = data;
    
    const picture = `assets/photographers/${portrait}`;
    const cityCountry = `${city}, `+ `${country}`;
    const photographerLink = `../../photographer.html?id=${id}`;


    function getUserCardDOM() {
        //création de la carte photographe 
        const article = document.createElement( 'article' );

        const a = document.createElement('a');
        a.setAttribute("alt", name);
        a.setAttribute('href', photographerLink);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const h4 = document.createElement('h4');
        h4.textContent = cityCountry;

        const p  = document.createElement('p'); 
        p.textContent = tagline;

        const span = document.createElement('span'); 
        span.textContent = `${price}€/jour`;

        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(h4);
        a.appendChild(p);
        
        a.appendChild(span);

        return (article);
    }


    function getUserProfil(){
        const photographHeader = document.querySelector(".photograph-header"); 
        const infoProfil = document.createElement('article');
        const photoProfil = document.createElement('img');
        photoProfil.setAttribute('src', picture);
        photoProfil.classList.add("profil-photo")


        const h1 = document.createElement( 'h1' );
        h1.textContent = name;

        const h3 = document.createElement('h3');
        h3.textContent = cityCountry;

        const p = document.createElement('p'); 
        p.textContent = tagline;
        
        photographHeader.appendChild(infoProfil)
        infoProfil.appendChild(h1);
        infoProfil.appendChild(h3);
        infoProfil.appendChild(p);
        infoProfil.appendChild(photoProfil);
        
        return (infoProfil);

    }

    function showMedia(media){
        if (media.video != undefined){
            //injecter la video 
        } else {
            // injecter la photo 
        }
    }
    return { name, picture, city, country, tagline, price,id, getUserCardDOM, getUserProfil}
}