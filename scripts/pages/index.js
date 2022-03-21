    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        //je met une pose sur le code avec le mot-clé "await" et je récupère les données avec 
        //la fonction fetch() avec en argument l'url de mon fichier data 
        try {
            const response = await fetch('./../../data/photographers.json');
            const photographers = await response.json()
        // et bien retourner le tableau photographers seulement une fois
        //Je retourne le tableau d'objet en un format JSon
            return photographers 

        } catch(err) {
            alert(err)
        }
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);

        });
    };

    async function init() {
        // Récupère les datas des photographes
        const  {photographers}  = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    