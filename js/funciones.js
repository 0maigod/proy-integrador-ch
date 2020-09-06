class Item {
  constructor(producto, precio, descripcion, imagen, stock) {
    this.producto = producto;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.stock = stock;
  }
}

window.onload = () => {
  let objFromJSON = JSON.parse(dbProdJSON);
  let productos = objFromJSON.map((object) => {
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
    // contenedorProductos.innerHTML += crearTarjeta(element);
    contenedorProductos.appendChild(crearTarjeta(element));
  });
  console.log(contenedorProductos);
};

// function crearTarjeta(element) {
//   return `<tr>
//     <th scope="row">
//       <div class="p-2">
//         <img src="${element.imagen}" alt="${element.producto}" width="300"
//           class="img-fluid rounded shadow-sm">
//         <div class="ml-3 d-inline-block align-middle">
//           <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block">${element.producto}</a></h5>
//           <p class="descripcion">${element.descripcion}</p>
//         </div>
//       </div>
//     <td class="align-middle"><strong>$${element.precio}</strong></td>
//     <td class="align-middle"><strong>3</strong></td>
//     <td class="align-middle"><a onclick="" class="text-dark"><i class="fa fa-trash"></i></a>
//     </td>
// </tr>`;
// }

function crearTarjeta(element) {
  let contenedor = crearComponente("tr");
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
  let botonAdd = crearComponente("button", "text-dark");
  botonAdd.innerHTML = `<i class="fa fa-trash"></i>`;
  botonAdd.addEventListener("click", addToCart);
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

function addToCart() {
  console.log("ha presionado el boton");
}

// class ProductOnCart {
//     constructor(product) {
//         this.product = product;
//         this.cantidad = 0;
//     }
// }
// class Cart {
//     constructor() {
//         this.products = []
//     }

//     addProductToCart(product) {

//     }

//     removeProductFromCart(product) {

//     }

//     precioTotal() {

//     }
// }
