function mostrarInforme(topRating, topRecaudacion, topVotos, detallesPeliculas) {
  

  informe = document.getElementById("informe");
  informe.innerHTML = "";
  informe.style.display = "block";

  resultado = document.getElementById("resultado");
  resultado.style.display = "none";
    // Crear las tablas
    let tablaRating = crearTabla(topRating);
    let tablaRecaudacion = crearTabla(topRecaudacion);
    let tablaVotos = crearTabla(topVotos);

    // Agregar las tablas al documento
   
    informe.appendChild(tablaRating);
   
    informe.appendChild(document.createElement('hr'));
    
    

    informe.appendChild(tablaRecaudacion);
    
    informe.appendChild(document.createElement('hr'));
    
    

    informe.appendChild(tablaVotos);
  
    informe.appendChild(document.createElement('hr'));
    
    
    

    button = document.createElement("button");
    button.innerHTML = "volver";
    button.addEventListener('click', function() {
       resultado = document.getElementById("resultado");
       resultado.style.display = "flex";
       informe = document.getElementById("informe");
       informe.style.display = "none";

    });
    informe.appendChild(button);
    
    div1 = document.createElement("div");
    div1.id = "chart_div1";
    informe.appendChild(div1);
    div2 = document.createElement("div");
    div2id = "chart_div2";
    informe.appendChild(div2);
    div3 = document.createElement("div");
    div3.id = "chart_div3";
    informe.appendChild(div3);

    drawChart(detallesPeliculas,"imdbRating",1);
    //drawChart(detallesPeliculas,"BoxOffice",2);
    drawChart(detallesPeliculas,"imdbVotes",3);

    
    
  }


  function drawChart(detallePeliculas,atributo,div) {

var arrayDatos =[];

arrayDatos.push(["Pelicula", atributo, { role: "style" } ]);
 for (peli of detallePeliculas)
  {
    arrayDatos.push([peli.Title, parseFloat(peli.imdbRating), "gold"]);
  }

    var data = google.visualization.arrayToDataTable(arrayDatos);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Density of Precious Metals, in g/cm^3",
      width: 300,
      height: 200,
      bar: {groupWidth: "95%"},
      legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"+div));
    chart.draw(view, options);
}



  
  

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

  function mostrarPeliculas(peliculas){

    resultado = document.getElementById("resultado");
    
      peliculas.Search.forEach(pelicula => {
  
        
  
        
          div = document.createElement("div");
          div.className = "pelicula";
         p = document.createElement("p");
          p.innerHTML = pelicula.Title;
          img = document.createElement("img");
          img.onload = function() {
            
            if (this.width + this.height === 0) {
                this.onerror();
            }
          };
          img.onerror = function() {
             
              this.src = 'images/imgError.jpg';
          };
          if (pelicula.Poster && pelicula.Poster !== 'N/A') {
              img.src = pelicula.Poster;
          } else {
           
              img.src = 'images/imgError.jpg';
          }
          
  
          div.addEventListener("click", function(e) {
  
            e.preventDefault();
            url="https://www.omdbapi.com/?apikey=6a067ea7&i="+pelicula.imdbID;
            
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