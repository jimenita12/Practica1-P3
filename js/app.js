import { CatalogoLibro } from "./catalogoLibro.js";

const catalogo = new CatalogoLibro();
const outputDiv = document.getElementById("output");

document.querySelector("button:nth-of-type(1)").addEventListener("click", mostrarCatalogo);
document.querySelector("button:nth-of-type(2)").addEventListener("click", agregarLibro);
document.querySelector("button:nth-of-type(3)").addEventListener("click", buscarLibro);
document.querySelector("button:nth-of-type(4)").addEventListener("click", eliminarLibro);

function mostrarCatalogo(){
    const catalogoCompleto = catalogo.obtenerCatalogoOrdenado();
    outputDiv.innerHTML = "<h2>Catalogo</2>";

    if (catalogoCompleto.length === 0) {
        outputDiv.innerHTML += "<p> El catálogo está vacío</p>";
    } else {
        catalogoCompleto.forEach((libro) => {
            outputDiv.innerHTML += `<p>${libro.isbn}: ${libro.titulo}</p>`;
        });
    }
}

function agregarLibro(){
    const isbn = document.getElementById("isbn").value;
    const titulo = document.getElementById("titulo").value;

    if(catalogo.buscarLibro(isbn)){
        mensaje("El libro con este IBN ya existe en el catálogo");
    }else{
        catalogo.agregarLibro(isbn, titulo);
        actualizarOutput();
    }
}

function buscarLibro(){
    const isbn = document.getElementById("isbn").value;
    const libro = catalogo.buscarLibro(isbn);

    if(libro){
        mensaje(`Libro encontrado: ${libro.titulo}`);
    }else{
        mensaje(`Libro no encontrado`);
    }
}

function eliminarLibro(){
    const isbn = document.getElementById("isbn").value;

    catalogo.eliminarLibro(isbn);
    actualizarOutput();
}

function actualizarOutput(){
    const catalogoOrdenado = catalogo.obtenerCatalogoOrdenado();
    outputDiv.innerHTML = "<h2>Catálogo</h2>";

    if(catalogoOrdenado.length === 0){
        outputDiv.innerHTML += "<p> El catálogo está vacío</p>";
    }else{
        catalogoOrdenado.forEach((libro) =>{
            outputDiv.innerHTML += `<p>${libro.isbn}: ${libro.titulo}</p>`;
        });
    }
}

function mensaje(mensaje){
    outputDiv.innerHTML = `<p>${mensaje}</p>`;
}
