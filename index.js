window.onload = function(){
  boton = document.getElementById("boton");
  boton.addEventListener("click", function(event){
      url="https://www.omdbapi.com/?apikey=f64125b5&s="+document.getElementById("titulo").value+"&type="+document.getElementById("tipo").value;
      ajax(url, 1);
      event.preventDefault();
  });
};



function ajax(url, tipoPeticioon){
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
          }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}