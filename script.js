let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
        if(entry.isIntersecting){
            let moviePoster = entry.target;
            moviePoster.src = moviePoster.dataset.src;
            observer.unobserve(moviePoster);
        }
    });
}, {});

function addMovieToDOM(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.setAttribute("data-aos", "zoom-in"); 

 // Créer l'élément img pour l'affiche du film
 const moviePoster = document.createElement('img');
 moviePoster.src = movie.Poster;
 moviePoster.dataset.src = movie.Poster;
 moviePoster.src = '';
 observer.observe(moviePoster);
 moviePoster.alt = 'Affiche du film';
 moviePoster.classList.add('movie-poster');

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.Title;
    movieTitle.classList.add('movie-title');

    const movieYear = document.createElement('p');
    movieYear.textContent = movie.Year;
    movieYear.classList.add('movie-year');

    // Créer le bouton "Read more"
    const movieButton = document.createElement('button');
    movieButton.textContent = 'Read more';
    movieButton.classList.add('btn', 'btn-primary', 'movie-button');
    movieButton.dataset.imdbId = movie.imdbID;
    movieButton.addEventListener('click', showMovieDetails);


    // Ajouter tous les éléments à la div du film
    movieDiv.appendChild(moviePoster);
    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(movieYear);
    movieDiv.appendChild(movieButton);

    // Ajouter la div du film au conteneur de films
    document.getElementById('moviesContainer').appendChild(movieDiv);
}

async function showMovieDetails(event) {
    const button = event.currentTarget;
    const imdbId = button.dataset.imdbId;
    const apiKey = "6902e405";
  
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`);
        const data = await response.json();
    
        // Remplir le pop up avec des informations sur le film
        document.getElementById('movieModalTitle').textContent = data.Title;
        document.getElementById('movieModalPlot').textContent = data.Plot;
        document.getElementById('movieModalPoster').src = data.Poster;
    
        // Ouvrir la fenêtre modale (pop up)
        $('#movieModal').modal('show');
      } catch (error) {
        console.error('Erreur :', error);
      }
    }
  
  document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchTerm = input.value;
    const apiKey = "6902e405";

    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
      const data = await response.json();

      // Supprime tous les anciens films
      document.getElementById('moviesContainer').textContent = '';

      if (data.Search) {
        data.Search.forEach(addMovieToDOM);
      } else {
        console.log('Aucun film trouvé');
      }

    } catch (error) {
      console.error('Erreur :', error);
    }
  });
});
