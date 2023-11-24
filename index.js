let paginaActual = 1;
let estaCargando = false;
let MostrandoDetalles = false;
window.onload = function(){

    tipo=document.getElementById("tipo");
    tipo.addEventListener("change", function(e) {
      resultado = document.getElementById("resultado");
      resultado.innerHTML = "";
      buscarPeliculas(e);
    });

    titulo = document.getElementById("titulo");
    titulo.addEventListener("keyup", function(e) {
      resultado = document.getElementById("resultado");
      resultado.innerHTML = "";
      buscarPeliculas(e);
    });

    window.addEventListener('scroll', function() {
      if (!estaCargando && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          estaCargando = true;
          paginaActual++;
          buscarPeliculas();
      }
  });
  
}


function buscarPeliculas(e){
    if(e){e.preventDefault();} 
    if (document.getElementById("titulo").value.length > 2) {
        url="https://www.omdbapi.com/?apikey=f64125b5&s="+document.getElementById("titulo").value+"&type="+document.getElementById("tipo").value +"&page="+paginaActual;
        ajax(url);
      }
}

function ajax(url){
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            estaCargando = false;
            mostrarPeliculas(JSON.parse(this.responseText));
            
          }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function buscarDetalles(url){
  var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            mostrarDetalles(JSON.parse(this.responseText));
            
          }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function mostrarDetalles(pelicula){

  document.body.style.overflow = 'hidden';
  resultado = document.getElementById("resultado");
  
  div = document.createElement("div");
  
  div.className = "detalles";
  Actors = document.createElement("p");
  Actors.innerHTML = "Actors: "+pelicula.Actors;
  Awards = document.createElement("p");
  Awards.innerHTML = "Awards: " + pelicula.Awards;
  BoxOffice = document.createElement("p");
  BoxOffice.innerHTML ="Box Office: "+ pelicula.BoxOffice;
  Country = document.createElement("p");
  Country.innerHTML = "Country: " + pelicula.Country;
  Director = document.createElement("p");
  Director.innerHTML = "Director: " +pelicula.Director;
  Genre = document.createElement("p");
  Genre.innerHTML = "Genre: "+pelicula.Genre;
  Language = document.createElement("p");
  Language.innerHTML = "Language: "+pelicula.Language;
  Plot = document.createElement("p");
  Plot.innerHTML = "Plot: "+pelicula.Plot;
  button = document.createElement("button");
  button.innerHTML = "Volver";

  button.addEventListener('click', function() {
    MostrandoDetalles = false;
    div.remove();
    document.body.style.overflow = 'auto';
  });
  

  div.appendChild(Actors);
  div.appendChild(Awards);
  div.appendChild(BoxOffice);
  div.appendChild(Country);
  div.appendChild(Director);
  div.appendChild(Genre);
  div.appendChild(Language);
  div.appendChild(Plot);
  div.appendChild(button);
  resultado.appendChild(div);
}

function mostrarPeliculas(peliculas){

  resultado = document.getElementById("resultado");
  
    peliculas.Search.forEach(pelicula => {
      
        div = document.createElement("div");
        div.className = "pelicula";
        p = document.createElement("p");
        p.innerHTML = pelicula.Title;
        img = document.createElement("img");
        img.src = pelicula.Poster;

        div.addEventListener("click", function(e) {

          e.preventDefault();
          url="https://www.omdbapi.com/?apikey=f64125b5&i="+pelicula.imdbID;
          
          if(!MostrandoDetalles){
            MostrandoDetalles = true;
            buscarDetalles(url);
          }
          
        });

        div.appendChild(img);
        div.appendChild(p);
        resultado.appendChild(div);
    });
}