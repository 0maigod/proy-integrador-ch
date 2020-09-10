class Item {
  constructor(producto, precio, descripcion, imagen, stock) {
    this.producto = producto;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.stock = stock;
  }
}

class Carrito {
  constructor() {
    this.items = [];
  }

  addProducto(producto) {
    this.items.push(producto);
  }

  removeProducto(producto) {}

  precioTotal() {}
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

productos.forEach((element) => {
  contenedorProductos.appendChild(crearTarjeta(element));
});

function contador(element) {
  let contador = document.getElementById("cartCounter");
  contador.innerHTML = miCarrito.items.length + 1;
}

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
    contador(element);
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
          })
        )
        .append(
          $("<a>", {
            class: "material-icons",
            text: "remove_circle_outline",
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

// Modal Carrito de compras.

const button = document.querySelector("#cartIcon");
const popup = document.querySelector(".popup-wrapper");
const close = document.querySelector(".popup-close");

button.addEventListener("click", () => {
  $(".popup-content").empty();
  $(".popup-wrapper").show();
  console.log(miCarrito.items);
  miCarrito.items.forEach((element) => {
    $(".popup-content").append(crearTarjetaCarrito(element));
  });
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

//Formulario de busqueda
form.addEventListener("submit", () => {
  event.preventDefault();

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
