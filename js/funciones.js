class Item {
    constructor(producto, precio, descripcion, imagen) {
        this.producto = producto;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}


class Listados {
    constructor() {
        this.lista = [];
    }
    
    getProductos () {
        if (productos.length > 1) {
            for (var i = 0; i < productos.length; i++) {
                console.info(productos[i]);
            }
        }
    }

                       
    createListado() {
        var lista = [];
        for (let i = 0; i < productos.length; i++) {
                this.lista.push(new Item(productos[i], precios[i], descripciones[i], imagenes[i]));
        }
        return lista;
    }

}

test = new Listados();
test.createListado();

