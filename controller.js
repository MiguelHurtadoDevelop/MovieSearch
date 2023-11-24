window.onload = function(){
  listapeliculas = new peliculas;
    input = document.getElementById("titulo");
    
    input.addEventListener("keyup", function(event){
    
      event.preventDefault();
      
      if (event.target.length > 2) {
        url="https://www.omdbapi.com/?apikey=f64125b5&s="+document.getElementById("titulo").value+"&type="+document.getElementById("tipo").value;
        peticion(url);
      }
    });
    
  };
  
  
  
  function peticion(url){
      listapeliculas.ajax(url);
      vista(listapeliculas.listaPeliculas);
      
  }