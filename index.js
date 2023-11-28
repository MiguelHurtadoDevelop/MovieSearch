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

    google.charts.load("current", {packages:['corechart']});
  
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
  
 
  mostrarInforme(topRating, topRecaudacion, topVotos, detallesPeliculas);
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



function peliculasToArray(peliculas){

  peliculas.Search.forEach(pelicula => {

    peliculasArray.push(pelicula);
    let url = `https://www.omdbapi.com/?apikey=f64125b5&i=${pelicula.imdbID}`;
    buscarDetallesToArray(url);
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