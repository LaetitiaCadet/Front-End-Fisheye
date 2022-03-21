
class ImageFactory {
    static render(media) {
       return `
       <a href="#" onclick="displayLightbox(event)" role="button" aria-pressed="false">
        <article class="media-section" ">
            <figure>
                <img class="photographer-media" src="../assets/images/media/${media.image}" id="media-image-${media.id}" alt="${media.title}">
                <figcaption>
                <section>
                    <h1 tabindex="0">${media.title}</h1>
                </section>
                <article>
                    <span class="media-like" id="media-${media.id}" tabindex="0" aria-label="nombre de personne qui ont aimé cette photo">
                        ${media.likes}
                        <i class="fas fa-heart btn-like" id="like-button-${media.id}" tabindex="0" aria-label="appuyez pour aimé cette photo"></i>
                    </span>
                </article>
                </figcaption>
            </figure>
        </article>
       </a>
       `
    }
}

class VideoFactory {
    static render(media) {
        return `
         <a href="#" onclick="displayLightbox(event)" role="button" aria-pressed="false">
            <article class="media-section">
                <figure>
                    <video controls >
                        <source class="photographer-media" src="../assets/images/media/${media.video}" type="video/mp4" alt="${media.title}">
                        <track label="French srclang="fr" src="../assets/images/media/${media.title}">
                        Sorry, your browser doesn't support embedded video.
                    </video>
                    <figcaption>
                    <section>
                        <h1 tabindex="0">${media.title}</h1> 
                    </section>
                    <article>
                        <span tabindex="0" class="media-like" id="media-${media.id}">
                            ${media.likes} 
                            <i class="fas fa-heart btn-like" id="like-button-${media.id}" tabindex="0" aria-label= "appuyez pour aimée cette photo"></i>
                        </span>
                    </article>
                    </figcaption>
                </figure>
            </article>
          </a>  
        ` 
    }
}


class MediaFactory {
    static render(media){
        if(media.video === undefined){
            return ImageFactory.render(media)

        } else {
            return VideoFactory.render(media);
        }
    }
}