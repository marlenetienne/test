// var => scope global 
// var => peut être redéfinie

// let => variable est scopée 
// let => hors du bloc de code (if, for), variable n'est pas accessible / vaiable est mutable 

// const => variable est scopée
// const => variable immutable 

// tableau de films 



// une fois la page chargée, on exécute le script 

document.addEventListener("DOMContentLoaded", function(event) {

    const section = document.createElement('section');
    header = document.getElementsByTagName('header')[0];
    header.after(section);

    // requete pour récupérer les données avec API Fetch : L'API Fetch fournit une interface pour la récupération de ressources (e.g., à travers le réseau.)
    var myRequest = new Request('/data/movies.json');

    // La méthode fetch() du mixin GlobalFetch va chercher une ressource. Elle retourne une promesse qui résoud une Response, représentant la réponse de votre requête.
    // fetch(entrée[, init]);

    // Promise : objet auquel on attache des callbacks grâce à then

    // response contient des metadonnées et des données fonctionnelles (payload) 
     
    // fetch(myRequest)
    // .then(response => {
    //   console.log(response);
    //   // json() parse l'objet response en format json 
    //   // response => est une promesse 
    //   // return d'éviter d'imbriquer des promesses 
    //   return response.json();
    // })
    // .then(data => {
    //   console.log(data);
    //   data.forEach((element) => {
    //    createArticle(element);
    //   });
    // })
    // .catch(console.error)

    // async function
    async function fetchAsync () {
      // attend la réponse du fetch  
      let response = await fetch('/data/movies.json');
      // est exécuté seulement quand la promesse est résolu 
      let data = await response.json();
      return data;
    }

    fetchAsync()
      .then(data => {
        // console.log(data);
        data.forEach((element) => {
          createArticle(element);
      })
    })
    .catch(console.error)


       function createArticle(el) {
          const article = document.createElement('article');
           section.appendChild(article);

           const figure = document.createElement('figure');
           figure.classList.add('border-image');
           article.appendChild(figure);

           const img = document.createElement('img');
           img.setAttribute('src',el.srcImg);
           figure.appendChild(img);

           const title = document.createElement('p');
           title.innerText = el.name;
           article.append(title);

           article.onclick = detailFilm.bind(null, el);
       }


      /** 
      * 
      * Affecte le detail d'un film à la modal
      * 
      * @param {*} el => un film
      */
    
      function detailFilm(el){
        // création de l'overlay
        const main = document.createElement('main');
        main.classList.add('main-detail');
        document.body.appendChild(main);
        // création de l'article
        const article = document.createElement('article');
        article.classList.add('detail-film');
        main.appendChild(article);

        const title = document.createElement('p');
        title.innerText = el.name;
        title.classList.add('text-title');
        article.appendChild(title);

        const divImgSyp = document.createElement('div');
        divImgSyp.classList.add('detail-filmSyp');
        article.appendChild(divImgSyp);

        const img = document.createElement('img');
        img.setAttribute('src',el.srcImg);
        divImgSyp.appendChild(img);

        const textSynopsis = document.createElement('p');
        textSynopsis.innerText = el.synopsis;
        textSynopsis.classList.add('text-synopsis');
        divImgSyp.appendChild(textSynopsis);

        const buttonClose = document.createElement('div');
        buttonClose.innerText = 'CLOSE';
        buttonClose.classList.add('close-overlay');
        article.appendChild(buttonClose);

        // passage de référence à fonction en paramètre 
        // la fonction n'est pas éxécuté automatiquement 
        buttonClose.addEventListener('click',removeDetailFilm);
        document.addEventListener('keydown', escapeKeyListener);

      }

      // remove event listener
      function escapeKeyListener(event) {
        if(event.key === 'Escape' || event.keyCode == 27) {
          removeDetailFilm();
        }
      };

      function removeDetailFilm() {
        document.getElementsByTagName('main')[0].remove();
        document.removeEventListener('keydown', escapeKeyListener);
      }

    });





