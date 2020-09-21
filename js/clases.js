class Item {
  constructor(producto, precio, descripcion, imagen, stock) {
    this.producto = producto;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.stock = stock;
  }
  resStock() {
    this.stock -= 1;
    dibujarLista(productos, contenedorProductos);
  }

  addStock() {
    this.stock += 1;
    dibujarLista(productos, contenedorProductos);
  }
}
