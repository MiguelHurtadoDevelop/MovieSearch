class peliculas{
    constructor(){
        this.listaPeliculas=[];
    }

    addFilms(respuesta){
      respuesta.Search.forEach(pelicula => {
        const nuevaPelicula = {
          Title: pelicula.Title,
          Year: pelicula.Year,
          imdbID: pelicula.imdbID,
          Type: pelicula.Type,
          Poster: pelicula.Poster
        };
        this.listaPeliculas[this.listaPeliculas.length]=nuevaPelicula;
        });
  }

    ajax(url){
        var xhttp = new XMLHttpRequest();
        var self = this;
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                //this.listaPeliculas.push(this.responseText);
                self.addFilms(JSON.parse(this.responseText));
                
              }
          };
          xhttp.open("GET", url, true);
          xhttp.send();
    }

    
}

