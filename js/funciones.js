class Item {
  constructor(producto, precio, descripcion, imagen, stock) {
    this.producto = producto;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.stock = stock;
    this.enCarr = 1;
  }
}

var productos;
var miCarrito = new Map();
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

productos.forEach((element) => {
  contenedorProductos.appendChild(crearTarjeta(element));
});

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
  let botonAdd = crearComponente("a", "text-dark");
  botonAdd.innerHTML = `<i class="large material-icons">add_circle_outline</i>`;
  botonAdd.addEventListener("click", () => {
    addProducto(element);
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

function crearTarjetaCarrito(element) {
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
            text: element.producto,
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
              addProducto(element);
            },
          })
        )
        .append(
          $("<a>", {
            class: "material-icons",
            text: "remove_circle_outline",
            click() {
              remProducto(element);
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

//------------------------------------------
// MODAL CARRITO DE COMPRAS.

const button = document.querySelector("#cartIcon");
const popup = document.querySelector(".popup-wrapper");
const close = document.querySelector(".popup-close");

button.addEventListener("click", () => {
  $(".popup-content").empty();
  $(".popup-wrapper").show();
  for (let element of miCarrito.keys()) {
    $(".popup-content").append(crearTarjetaCarrito(element));
  }
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

function addProducto(producto) {
  if (miCarrito.has(producto)) {
    miCarrito.set(producto, miCarrito.get(producto) + 1);
  } else {
    miCarrito.set(producto, 1);
  }
  contador();
}

function remProducto(producto) {
  (miCarrito.get(producto) > 0) ? miCarrito.set(producto, miCarrito.get(producto) - 1):null;
  contador();
}

function precioCompra(){
  let precio = 0;
  for (let key of miCarrito.keys()){
    precio = precio + key.precio
  }
  console.log(key.precio);
}

function contador() {
  let contador = document.getElementById("cartCounter");
  let items = 0;
  for (let value of miCarrito.values()){
    items = items + value;
  }
  contador.innerHTML = items;
}

//-------------------------------------
// FORMULARIO DE BUSQUEDA
form.addEventListener("submit", () => {
  e.preventDefault();

  let busqueda = searchInput.value;

  let productosBuscados = productos.filter((element) => {
    return element.producto.toLowerCase().includes(busqueda.toLowerCase());
  });

  contenedorProductos.innerHTML = "";

  productosBuscados.forEach((producto) => {
    contenedorProductos.appendChild(crearTarjeta(producto));
  });

  console.log(searchInput.value);
});
