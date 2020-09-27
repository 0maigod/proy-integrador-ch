class Carrito {
  carrito = new Map();
  precioSiva = 0;
  items = 0;
  iva = 21;
  costoEnvio = 15;

  addProducto(producto) {
    if (producto.stock > 0) {
      if (this.carrito.has(producto)) {
        this.carrito.set(producto, this.carrito.get(producto) + 1);
        dibujarCarrito(this.carrito);
        this.setToLocalStorage(this.carrito);
      } else {
        this.carrito.set(producto, 1);
        dibujarCarrito(this.carrito);
        this.setToLocalStorage(this.carrito);
      }
      producto.resStock();
    } else {
      alert("no hay suficiente stock");
    }
    this.precioCompra();
    this.precioTotal();
    this.contador();
  }

  remProducto(producto) {
    if (this.carrito.get(producto) > 1) {
      this.carrito.set(producto, this.carrito.get(producto) - 1);
      dibujarCarrito(this.carrito);
      this.setToLocalStorage(this.carrito);
    } else {
      this.carrito.delete(producto);
      dibujarCarrito(this.carrito);
      this.setToLocalStorage(this.carrito);
    }
    producto.addStock();
    this.precioCompra();
    this.precioTotal();
    this.contador();
  }

  precioCompra() {
    precioSivaTag.innerText = ``;
    let sumPrecio = 0;
    for (let key of this.carrito.entries()) {
      if (key != undefined) {
        let unidad = key[0].precio;
        let cantidad = key[1];
        sumPrecio = sumPrecio + unidad * cantidad;
      }
      this.precioSiva = sumPrecio;
    }
    precioSivaTag.html(`$${this.precioSiva}`);
  }

  precioTotal() {
    let ivaFinal = this.precioSiva * (this.iva / 100);
    let final = this.precioSiva + this.costoEnvio + ivaFinal;
    $("#precio-envio").html(`$${this.costoEnvio}`);
    $("#precio-iva").html(`${this.iva}%`);
    $("#precio-final").html(`$${final.toFixed(2)}`);
  }

  setToLocalStorage(carrito) {
    // let items = new Object();
    // for (let key of carrito.entries()) {
    //   let prod = key[0].producto;
    //   let cant = key[1];
    //   items[prod] = cant;
    // }
    // localStorage.setItem("miCarrito", JSON.stringify(items));
    let items = "";
    items = JSON.stringify(Array.from(carrito.entries()));
    localStorage.setItem("miCarrito", items);
  }

  contador() {
    let contador = document.getElementById("cartCounter");
    let sumItems = 0;
    for (let value of this.carrito.values()) {
      sumItems = sumItems + value;
      this.items = sumItems;
    }
    contador.innerHTML = this.items;
  }
}

// var miCarrito = new Carrito();

var productos;
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

//----------------------------------------
//COMPRA PREVIA

var compraPrevia = localStorage.getItem("miCarrito");
if (compraPrevia === null) {
  miCarrito = new Carrito();
} else {
  miCarrito = new Carrito();
  let objFromStorage = JSON.parse(compraPrevia);
  objFromStorage.map((object) => {
    producto.find((element) => {
      element.producto === object.producto;
      console.log("encontrado");
    });
    // miCarrito.addProducto(object);
  });
}

//------------------------------------------
// MODAL CARRITO DE COMPRAS.

const butCart = document.querySelector("#cartIcon");
const popup = document.querySelector(".popup-wrapper");
const close = document.querySelector(".popup-close");
const precioSivaTag = $(".precio-siva");

butCart.addEventListener("click", () => {
  $(".popup-content").empty();
  $(".popup-wrapper").show();
  dibujarCarrito(miCarrito.carrito);
});

// $("#finCompra").on("click", miCarrito.precioTotal());
$("#compra").on("click", carroIn);

function carroIn() {
  $(".popup-wrapper").fadeTo("slow", 1);
  $(".popup").animate({
    left: "12rem",
    opacity: "1",
  });
}

$("#finCompra").on("click", checkOut);

function checkOut() {
  $("html, body").animate(
    {
      scrollTop: $("#finCompra").offset().top,
    },
    2000
  );
  $(".container-checkout").animate(
    {
      opacity: "1",
    },
    1000
  );
  miCarrito.precioTotal();
}

popup.addEventListener("click", (e) => {
  // console.log(e.target.classList);
  if (e.target.classList == "popup-wrapper") {
    $(".popup-wrapper").hide();
    $(".popup").animate({
      left: "0px",
      opacity: "0",
    });
  }
});

document.addEventListener("keyup", (e) => {
  // cerrar presionando ESC
  if (e.key == "Escape") {
    popup.style.display = "none";
    $(".popup").animate({
      left: "0px",
      opacity: "0",
    });
  }
});
