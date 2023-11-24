function vista(peliculas){
    resultado = document.getElementById("resultado");
    peliculas.forEach(pelicula => {
        div = document.createElement("div");
        p = document.createElement("p");
        p.innerHTML = pelicula.Title;
        img = document.createElement("img");
        img.src = pelicula.Poster;
        
        div.appendChild(img);
        div.appendChild(p);
        resultado.appendChild(div);
    });
}