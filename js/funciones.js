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

window.onload = () => {
  let objFromJSON = JSON.parse(dbProdJSON);

  const form = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  let productos = objFromJSON.map((object) => {
    return new Item(
      object.producto,
      object.precio,
      object.descripcion,
      object.imagen,
      object.stock
    );
  });

  // let botonAddCarrito = document.querySelector(`.addCarrito`);
  // botonAddCarrito.addEventListener("click", () => {
  //   console.log("agregaste elemento");
  // });

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

  const contenedorProductos = document.getElementById("contenedorProductos");

  productos.forEach((element) => {
    contenedorProductos.appendChild(crearTarjeta(element));
  });
};

function contador(element) {
  let contador = document.getElementById("cartCounter");
  contador.innerHTML = miCarrito.items.length + 1;
}

function crearTarjeta(element) {
  let contenedor = document.createElement("tr");
  // contenedor.id = element.id;
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
  botonAdd.innerHTML = `<i class="fa fa-shopping-basket"></i>`;
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

const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
  el.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

// class ProductOnCart {
//     constructor(product) {
//         this.product = product;
//         this.cantidad = 0;
//     }
// }
