import { Libro } from "./libro.js";

export class CatalogoLibro {
    constructor() {
        this.raiz = null;
    }

    agregarRecursivo(nodo, nuevoLibro) {
        if (nuevoLibro.isbn < nodo.isbn) {
            if (!nodo.izquierda) {
                nodo.izquierda = nuevoLibro;
            } else {
                this.agregarRecursivo(this.izquierda, nuevoLibro);
            }
        } else {
            if (!nodo.derecha) {
                nodo.derecha = nuevoLibro;
            } else {
                this.agregarRecursivo(nodo.derecha, nuevoLibro);
            }
        }
    }

    agregarLibro(isbn, titulo) {
        const nuevoLibro = new Libro(isbn, titulo);

        if (!this.raiz) {
            this.raiz = nuevoLibro;
        } else {
            this.agregarRecursivo(this.raiz, nuevoLibro);
        }
    }

    buscarRecursivo(nodo, isbn) {
        if (!nodo) {
            return null;
        }

        if (isbn === nodo.isbn) {
            return nodo;
        } else if (isbn < nodo.isbn) {
            return this.buscarRecursivo(nodo.izquierda, isbn);
        } else {
            return this.buscarRecursivo(nodo.derecha, isbn);
        }
    }

    buscarLibro(isbn) {
        return this.buscarRecursivo(this.raiz, isbn);
    }

    encontrarSucesor(nodo) {
        while (nodo.izquierda) {
            nodo = nodo.izquierda;
        }
        return nodo;
    }

    inOrdenRecursivo(nodo, catalogoOrdenado) {
        if (nodo) {
            this.inOrdenRecursivo(nodo.izquierda, catalogoOrdenado);
            catalogoOrdenado.push({ isbn: nodo.isbn, titulo: nodo.titulo });
            this.inOrdenRecursivo(nodo.derecha, catalogoOrdenado);
        }
    }

    obtenerCatalogoOrdenado() {
        const catalogoOrdenado = [];
        this.inOrdenRecursivo(this.raiz, catalogoOrdenado);
        return catalogoOrdenado;
    }

    eliminarRecursivo(nodo, isbn) {
        if (!nodo) {
            return null;
        }

        if (isbn === nodo.isbn) {

            if (!nodo.izquierda) {
                return nodo.derecha;
            } else if (!nodo.derecha) {
                return nodo.izquierda;
            }

            const sucesor = this.encontrarSucesor(nodo.derecha);

            nodo.isbn = sucesor.isbn;
            nodo.titulo = sucesor.titulo;
            nodo.derecha = this.eliminarRecursivo(nodo.derecha, sucesor.isbn);
        }else if(isbn < nodo.isbn){
            nodo.izquierda = this.eliminarRecursivo(nodo.izquierda, isbn);
        }else{
            nodo.derecha = this.eliminarRecursivo(nodo.derecha, isbn);
        }

        return nodo;
    }

    eliminarLibro(isbn){
        this.raiz = this.eliminarRecursivo(this.raiz, isbn);
    }
}