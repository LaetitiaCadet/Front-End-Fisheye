function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id, image, video, title, likes} = data;
    
    const picture = `assets/images/photographers/${portrait}`;
    const mediaItems = `assets/images/media/${image}`
    const cityCountry = `${city}, `+ `${country}`;
    const photographerLink = `../../photographer.html?id=${id}`;
    console.log(video)


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
        const modal = document.querySelector('.contact_button')
        const infoProfil = document.createElement('article');
        const photoProfil = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.classList.add("profil-photo");

        const h2 = document.createElement( 'h2' );
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

        console.log(photographHeader.childNodes)
        
        return (infoProfil);

    }

    function showMedia(media){
        const mediaSection = document.createElement('div');
        mediaSection.classList.add('media-section');
        const photo = document.createElement('img');
        photo.setAttribute('src', mediaItems)
        const figure = document.createElement('figure');
        const article = document.createElement('article');
        const figcaption = document.createElement('figcaption');
        const section = document.createElement('section');
        const h4 = document.createElement('h4');
        h4.textContent = title; 
        const articleLike = document.createElement('article');
        const heart = document.createElement('span');
        const compteurLike = document.createElement('p');
        compteurLike.textContent = likes;


        article.appendChild(figure);
        figure.appendChild(photo);
        figure.appendChild(figcaption);
        figcaption.appendChild(section);
        section.appendChild(h4);
        figcaption.appendChild(articleLike);
        articleLike.appendChild(heart);
        articleLike.appendChild(compteurLike);



        console.log(media)

        if (mediaItems.video != undefined){
            //injecter  la video 
            console.log("video")
            const vid = document.createElement('video');
            vid.setAttribute('src', video);
            mediaSection.appendChild(vid)
            
        } else {
            // injecter la photo 
        }

        mediaSection.appendChild(article)


        return (mediaSection)
    }
    return { name, picture, city, country, tagline, price,id , image, mediaItems , video, likes, title,  getUserCardDOM, getUserProfil, showMedia}
}