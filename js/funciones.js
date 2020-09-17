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

  class Carrito {
    constructor(){
    this.carrito = new Map();
    this.precioTotal = 0;
    this.items = 0;
    };

    addProducto(producto) {
      if(producto.stock > 0){
          if (this.carrito.has(producto)) {
            this.carrito.set(producto, this.carrito.get(producto) + 1);
            dibujarCarrito(this.carrito);
          } else {
            this.carrito.set(producto, 1);
            dibujarCarrito(this.carrito);
          }
          producto.resStock();
          console.log('desde el carrito ' + producto.stock)
        } else {
          alert('no hay suficiente stock');
        }
      this.precioCompra();
      this.contador();
    }
    
    remProducto(producto) {
      if (this.carrito.get(producto) > 1) { 
        this.carrito.set(producto, this.carrito.get(producto) - 1)
        dibujarCarrito(this.carrito)
      } else {
        this.carrito.delete(producto);
        dibujarCarrito(this.carrito)};
      producto.addStock();
      this.contador();
    }
    
    precioCompra(){
      precioTotTag.innerText = ``;
      let sumPrecio = 0;
      for (let key of this.carrito.entries()){
        if( key != undefined){
        let unidad = key[0].precio;
        let cantidad = key[1];
        sumPrecio = sumPrecio + (unidad * cantidad)};
        this.precioTotal = sumPrecio;
      }
      precioTotTag.innerHTML = `TOTAL DE LA COMPRA:</br>$${this.precioTotal}`;
    
    }

    contador() {
      let contador = document.getElementById("cartCounter");
      let sumItems = 0;
      for (let value of this.carrito.values()){
        sumItems = sumItems + value;
        this.items = sumItems
      }
      contador.innerHTML = this.items;
    }
  }

  var productos;
  var miCarrito = new Carrito();
  const form = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  
  let objFromJSON = JSON.parse(dbProdJSON);
  
  productos = objFromJSON.map((object) => {
    return new Item(
      object.producto,
      object.precio,
      object.descripcion,
      object.imagen,
      object.stock
      );
    });
    
    const contenedorProductos = document.getElementById("contenedorProductos");

    dibujarLista(productos, contenedorProductos);

    
    //-----------------------------------------
    // DIBUJAR COMPONENTES

function crearTarjeta(element) {
  let contenedor = document.createElement("tr");
  let tarjProd = crearComponente("div", "p-2");
  let img = crearComponente("img", "img-fluid rounded shadow-sm");
  img.src = element.imagen;
  img.alt = element.producto;
  img.width = 300;
  let tarjDescr = crearComponente("div", "ml-3 d-inline-block align-middle");

  let botones = crearComponente("h5", "mb-0 text-dark d-inline-block");
  botones.innerHTML = element.producto;

  let descripcion = crearComponente("p", "descripcion");
  descripcion.innerHTML = element.descripcion;

  let td01 = crearComponente("td", "align-middle");
  td01.innerHTML = `<strong>$${element.precio}</strong>`;

  let td02 = crearComponente("td", "align-middle");
  td02.innerHTML = `<strong>${element.stock}</strong>`;

  let td03 = crearComponente("td", "align-middle");
  let botonAdd = crearComponente("a");
  botonAdd.innerHTML = `<i class="large material-icons">add_circle_outline</i>`;
  botonAdd.addEventListener("click", () => {
    miCarrito.addProducto(element);
  });

  tarjProd.appendChild(img);
  tarjProd.appendChild(tarjDescr);
  tarjDescr.appendChild(botones);
  tarjDescr.appendChild(descripcion);
  td03.appendChild(botonAdd);

  contenedor.appendChild(tarjProd);
  contenedor.appendChild(td01);
  contenedor.appendChild(td02);
  contenedor.appendChild(td03);

  return contenedor;
}

function crearComponente(tag, classes) {
  let componente = document.createElement(tag);
  componente.classList = classes;
  return componente;
}

function crearTarjetaCarrito(element, cant) {
  let contenedor = $("<div>", {
    class: "row",
  })
    .append(
      $("<div>", {
        class: "col-5",
      }).append(
        $("<img>", {
          class: "rounded",
          src: element.imagen,
          alt: element.producto,
          width: "100%",
        })
      )
    )
    .append(
      $("<div>", {
        class: "col-4 my-auto",
      })
        .append(
          $("<h5>", {
            class: "mb-0 text-dark carr-prod",
            text: `${element.producto}`
          })
        )
        .append(
          $("<h5>", {
            class: "mb-0 text-dark carr-prod",
            text: `cant.: ${cant}`
          })
        )
        .append(
          $("<h5>", {
            class: "mb-0 text-dark carr-precio",
            text: "c/u $" + element.precio,
          })
        )
    )
    .append(
      $("<div>", {
        class: "col-3 my-auto",
      })
        .append(
          $("<a>", {
            class: "material-icons",
            text: "add_circle_outline",
            click() {
              miCarrito.addProducto(element);
            },
          })
        )
        .append(
          $("<a>", {
            class: "material-icons",
            text: "remove_circle_outline",
            click() {
              miCarrito.remProducto(element);
            },
          })
        )
    )
    .append(
      $("<div>", {
        class: "row border mx-auto",
        width: "100%",
        height: 15,
      })
    );
  return contenedor;
}

function dibujarCarrito (carrito) {
  $(".popup-content").empty();
  for (let element of carrito.entries()) {
    $(".popup-content").append(crearTarjetaCarrito(element[0], element[1]));
  }
  miCarrito.precioCompra();
}

function dibujarLista(prods, lugar) {
  lugar.innerHTML = '';
  prods.forEach((element) => {
    lugar.appendChild(crearTarjeta(element));
  });
}

//------------------------------------------
// MODAL CARRITO DE COMPRAS.

const button = document.querySelector("#cartIcon");
const popup = document.querySelector(".popup-wrapper");
const close = document.querySelector(".popup-close");
const precioTotTag = document.querySelector(".precio-total");

button.addEventListener("click", () => {
  $(".popup-content").empty();
  $(".popup-wrapper").show();
  dibujarCarrito(miCarrito.carrito);
});


popup.addEventListener("click", (e) => {
  // console.log(e.target.classList);
  if (e.target.classList == "popup-wrapper") {
    $(".popup-wrapper").hide();
  }
});

document.addEventListener("keyup", (e) => {
  // cerrar presionando ESC
  if (e.key == "Escape") {
    popup.style.display = "none";
  }
});

//-------------------------------------
// FORMULARIO DE BUSQUEDA
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let busqueda = searchInput.value;

  let productosBuscados = productos.filter((element) => {
    return element.producto.toLowerCase().includes(busqueda.toLowerCase());
  });

  contenedorProductos.innerHTML = "";


  dibujarLista(productosBuscados, contenedorProductos);

});
