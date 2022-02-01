class SortFactory {
    static render(){
        return `
            <form>
                <p>Trier par</p>
                <select size="1" name="categorie" id="dropdown">
                    <option value='popularity'>Popularité</option>
                    <option value='date'>Date</option>
                    <option value='title'>Titre</option>
                </select>
            </form>
        `
    }
}

class ImageFactory {
    static render(media) {
       return `
        <article class="media-section">
            <figure>
                <img src="../assets/images/media/${media.image} ">
                <figcaption>
                <section>
                    <h4>${media.title}</h4>
                </section>
                <article>
                    <span>${media.likes} <i class="fas fa-heart btn-like"></i></span>
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
        <article class="media-section">
            <figure>
                <video controls>
                    <source src="../assets/images/media/${media.video}">
                </video>
                <figcaption>
                <section>
                    <h4>${media.title}</h4>
                </section>
                <article>
                    <span>${media.likes} <i class="fas fa-heart btn-like"></i></span>
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