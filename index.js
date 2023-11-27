let paginaActual = 1;
let estaCargando = false;
let MostrandoDetalles = false;
let peliculasArray = []
let detallesPeliculas = [];

window.onload = function(){

    tipo=document.getElementById("tipo");
    tipo.addEventListener("change", function(e) {
      
      paginaActual = 1;
      resultado = document.getElementById("resultado");
      resultado.innerHTML = "";
      buscarPeliculas(e);
    });

    titulo = document.getElementById("titulo");
    titulo.addEventListener("keyup", function(e) {
      
      paginaActual = 1;
      peliculasArray = [];
      detallesPeliculas = [];
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

    crearInforme = document.getElementById("crearInforme");
    crearInforme.addEventListener("click",Informes );

  
}

function Informes() {
  // Ordenar las películas por imdbRating, recaudación y votos
  let detallesPeliculasCopiaRating = [...detallesPeliculas];
let detallesPeliculasCopiaRecaudacion = [...detallesPeliculas];
let detallesPeliculasCopiaVotos = [...detallesPeliculas];

// Ordenar por Rating
let peliculasPorRating = detallesPeliculasCopiaRating.sort((a, b) => {
  let ratingA = Number(a.imdbRating);
  let ratingB = Number(b.imdbRating);
  return ratingA === 'N/A' || isNaN(ratingA) ? 1 : ratingB === 'N/A' || isNaN(ratingB) ? -1 : ratingB - ratingA;
});

// Ordenar por Recaudación
let peliculasPorRecaudacion = detallesPeliculasCopiaRecaudacion.sort((a, b) => {
  const boxOfficeA = parseFloat(a.BoxOffice.replace(/[^0-9.]+/g, '')) || 0;
  const boxOfficeB = parseFloat(b.BoxOffice.replace(/[^0-9.]+/g, '')) || 0;
  return boxOfficeB - boxOfficeA;
});

// Ordenar por Votos
let peliculasPorVotos = detallesPeliculasCopiaVotos.sort((a, b) => {
  let votesA = Number(a.imdbVotes.replace(/,/g, ""));
  let votesB = Number(b.imdbVotes.replace(/,/g, ""));
  return votesA === 'N/A' || isNaN(votesA) ? 1 : votesB === 'N/A' || isNaN(votesB) ? -1 : votesB - votesA;
});


  // Obtener las 5 primeras películas de cada categoría
  let topRating = peliculasPorRating.slice(0, 5);
  let topRecaudacion = peliculasPorRecaudacion.slice(0, 5);
  let topVotos = peliculasPorVotos.slice(0, 5);
  
 
  mostrarInforme(topRating, topRecaudacion, topVotos);
}

function mostrarInforme(topRating, topRecaudacion, topVotos) {
  // Crear una función para generar una tabla a partir de un array de películas
  function crearTabla(peliculas) {
    let tabla = document.createElement('table');

    // Crear el encabezado de la tabla
    let encabezado = document.createElement('thead');
    let filaEncabezado = document.createElement('tr');
    ['Título', 'Rating', 'Recaudación', 'Votos'].forEach(texto => {
      let celda = document.createElement('th');
      celda.textContent = texto;
      filaEncabezado.appendChild(celda);
    });
    encabezado.appendChild(filaEncabezado);
    tabla.appendChild(encabezado);

    // Crear el cuerpo de la tabla
    let cuerpo = document.createElement('tbody');
    peliculas.forEach(pelicula => {
      let fila = document.createElement('tr');
      [pelicula.Title, pelicula.imdbRating, pelicula.BoxOffice, pelicula.imdbVotes].forEach(texto => {
        let celda = document.createElement('td');
        celda.textContent = texto;
        fila.appendChild(celda);
      });
      cuerpo.appendChild(fila);
    });
    tabla.appendChild(cuerpo);

    return tabla;
  }

  // Crear las tablas
  let tablaRating = crearTabla(topRating);
  let tablaRecaudacion = crearTabla(topRecaudacion);
  let tablaVotos = crearTabla(topVotos);


  document.body.innerHTML = '';
  // Agregar las tablas al documento
 
  document.body.appendChild(tablaRating);
  document.body.appendChild(tablaRecaudacion);
  document.body.appendChild(tablaVotos);
}

function buscarPeliculas(e){
    if(e){e.preventDefault();} 
    if (document.getElementById("titulo").value.length > 2) {
        url="https://www.omdbapi.com/?apikey=f64125b5&s="+document.getElementById("titulo").value+"&type="+document.getElementById("tipo").value +"&page="+paginaActual;
        ajax(url);
      }
}

function ajax(url){
  document.getElementById('loader').style.display = 'block';
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            estaCargando = false;
            
            mostrarPeliculas(JSON.parse(this.responseText));
            peliculasToArray(JSON.parse(this.responseText));
          }else{
            document.getElementById('loader').style.display = 'none';
          }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function buscarDetalles(url){
  document.getElementById('loader').style.display = 'block';
  var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            mostrarDetalles(JSON.parse(this.responseText));
            document.getElementById('loader').style.display = 'none';
            
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
  cartel = document.createElement("img");
  cartel.onload = function() {
    // Comprobar si la imagen ha cargado correctamente
    if (this.width + this.height === 0) {
        this.onerror();
    }
  };
  cartel.onerror = function() {
      // Si hay un error al cargar la imagen, establecer una imagen por defecto
      this.src = 'images/imgError.jpg';
  };
  if (pelicula.Poster && pelicula.Poster !== 'N/A') {
      cartel.src = pelicula.Poster;
  } else {
      // Si no hay una URL de imagen válida, establecer una imagen por defecto
      cartel.src = 'images/imgError.jpg';
  }
  

  button.innerHTML = "<img src='images/cerrar.svg'>";

  button.addEventListener('click', function() {
    MostrandoDetalles = false;
    div.remove();
    document.body.style.overflow = 'auto';
  });
  

  div.appendChild(cartel);
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

function peliculasToArray(peliculas){

  peliculas.Search.forEach(pelicula => {

    peliculasArray.push(pelicula);
    let url = `https://www.omdbapi.com/?apikey=f64125b5&i=${pelicula.imdbID}`;
    buscarDetallesToArray(url);
  });
}

function mostrarPeliculas(peliculas){

  resultado = document.getElementById("resultado");
  
    peliculas.Search.forEach(pelicula => {

      

      
        div = document.createElement("div");
        div.className = "pelicula";
        p = document.createElement("p");
        p.innerHTML = pelicula.Title;
        img = document.createElement("img");
        img.onload = function() {
          // Comprobar si la imagen ha cargado correctamente
          if (this.width + this.height === 0) {
              this.onerror();
          }
        };
        img.onerror = function() {
            // Si hay un error al cargar la imagen, establecer una imagen por defecto
            this.src = 'images/imgError.jpg';
        };
        if (pelicula.Poster && pelicula.Poster !== 'N/A') {
            img.src = pelicula.Poster;
        } else {
            // Si no hay una URL de imagen válida, establecer una imagen por defecto
            img.src = 'images/imgError.jpg';
        }
        

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
function buscarDetallesToArray(url){
  document.getElementById('loader').style.display = 'block';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let detallePelicula = JSON.parse(this.responseText);
        detallesPeliculas.push(detallePelicula); // Guardar los detalles de la película en el array
        document.getElementById('loader').style.display = 'none';
      }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}