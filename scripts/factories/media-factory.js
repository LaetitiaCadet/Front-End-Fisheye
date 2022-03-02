
class ImageFactory {
    static render(media) {
       return `
        <article class="media-section" onclick="displayLightbox(event)">
            <figure>
                <img class="photographer-media" src="../assets/images/media/${media.image}" id="media-image-${media.id}" alt="${media.title}">
                <figcaption>
                <section>
                    <h1>${media.title}</h1>
                </section>
                <article>
                    <span class="media-like" id="media-${media.id}">
                        ${media.likes}
                        <i class="fas fa-heart" id="like-button-${media.id}" aria-disabled="true"></i>
                    </span>
                </article>
                </figcaption>
            </figure>
        </article>
       ` 
    }
}

class VideoFactory {
    static render(media) {
        return `
        <article class="media-section" onclick="displayLightbox(event)">
            <figure>
                <video controls >
                    <source class="photographer-media" src="../assets/images/media/${media.video}" type="video/mp4" alt="${media.title}">
                </video>
                <figcaption>
                <section>
                    <h1>${media.title}</h1> 
                </section>
                <article>
                    <span class="media-like" id="media-${media.id}">
                        ${media.likes} 
                        <i class="fas fa-heart btn-like" id="like-button-${media.id}" aria-disabled="true"></i>
                    </span>
                </article>
                </figcaption>
            </figure>
        </article>
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