var productos = ["Porotos negros", "Harina Integral", "Arroz yamani", "Miel"];
var precios = [79.0, 85.0, 25.25, 130.0];
var descripciones = [
  "Contienen una gran cantidad de proteínas. \n Muy poca grasa saturada y nada de colesterol.",
  "Harina de grano entero de trigo.\n Rica en fibra y en nutrientes. Su color es oscuro.",
  "Es un gran productor de energía.\n Rico en proteínas, minerales y vitaminas.",
  "La miel posee una variedad considerable\n de antioxidantes y regula el azucar en sangre",
];
var imagenes = [
  "img/porotos_negros.jpg",
  "img/harina_integral.jpg",
  "img/yamani_integral.jpg",
  "img/miel.jpg",
];

dbProdJSON = `[
    {"producto":"Porotos negros", "precio":79.0, "descripcion":"Contienen una gran cantidad de proteínas. Muy poca grasa saturada y nada de colesterol.", "imagen":"img/porotos_negros.jpg", "stock":90},
    {"producto":"Harina Integral", "precio":85.0, "descripcion":"Harina de grano entero de trigo. Rica en fibra y en nutrientes. Su color es oscuro.", "imagen":"img/harina_integral.jpg", "stock":50},
    {"producto":"Arroz yamani", "precio":25.25, "descripcion":"Es un gran productor de energía. Rico en proteínas, minerales y vitaminas.", "imagen":"img/yamani_integral.jpg", "stock":50},
    {"producto":"Miel", "precio":130.0, "descripcion":"La miel posee una variedad considerable de antioxidantes y regula el azucar en sangre", "imagen":"img/miel.jpg", "stock":10},
    {"producto":"Nuez Mariposa", "precio":215.50, "descripcion": "La nuez contiene las denominadas grasas buenas. No tapan las arterias, protegen el sistema inmunológico.", "imagen":"img/nuez_mariposa.jpg", "stock":90},
    {"producto":"Ciruelas Bombon", "precio":839, "descripcion":"Secada al sol sin dejar que se fermente. Conserva las mismas propiedades que la fruta original.", "imagen":"img/ciruelas_bombon.jpg", "stock":100}
]`;

// dbProdJSON = `[
//     {"producto":"Porotos negros", "precio":79.0, "descripcion":"Contienen una gran cantidad de proteínas.\nMuy poca grasa saturada y nada de colesterol.", "imagen":"img/porotos_negros.jpg", "stock":90},
//     {"producto":"Harina Integral", "precio":85.0, "descripcion":"Harina de grano entero de trigo.\nRica en fibra y en nutrientes. Su color es oscuro.", "imagen":"img/harina_integral.jpg", "stock":50},
//     {"producto":"Arroz yamani", "precio":25.25, "descripcion":"Es un gran productor de energía.\nRico en proteínas, minerales y vitaminas.", "imagen":"img/yamani_integral.jpg", "stock":50},
//     {"producto":"Miel", "precio":130.0, "descripcion":"La miel posee una variedad considerable\nde antioxidantes y regula el azucar en sangre", "imagen":"img/miel.jpg", "stock":10},
//     {"producto":"Nuez Mariposa", "precio":215.50, "descripcion": "La nuez contiene las denominadas grasas buenas\nNo tapan las arterias, protegen el sistema inmunológico.", "imagen":"img/nuez_mariposa.jpg", "stock":90},
//     {"producto":"Ciruelas Bombon", "precio":839, "descripcion":"Secada al sol sin dejar que se fermente\nConserva las mismas propiedades que la fruta original.", "imagen":"img/ciruelas_bombon.jpg", "stock":100}
// ]`;
