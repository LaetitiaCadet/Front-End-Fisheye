
class ImageFactory {
    static render(media) {
       return `
        <article class="media-section">
            <figure>
                <img src="../assets/images/media/${media.image}" id="media-image-${media.id}" onclick="displayLightbox()">
                <figcaption>
                <section>
                    <h4>${media.title}</h4>
                </section>
                <article>
                    <span class="media-like" id="media-${media.id}">
                        ${media.likes}
                        <i class="fas fa-heart" id="like-button-${media.id}"></i>
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
        <article class="media-section" onclick="displayLightbox()">
            <figure>
                <video controls>
                    <source src="../assets/images/media/${media.video}">
                </video>
                <figcaption>
                <section>
                    <h4>${media.title}</h4>
                </section>
                <article>
                    <span class="media-like" id="media-${media.id}">
                        ${media.likes} 
                        <i class="fas fa-heart btn-like" id="like-button-${media.id}"></i>
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