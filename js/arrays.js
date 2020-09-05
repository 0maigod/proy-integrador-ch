var productos = ['Porotos negros', 'Harina Integral', 'Arroz yamani', 'Miel'];
var precios = [79.00, 85.00, 25.25, 130.00];
var descripciones = ['Contienen una gran cantidad de proteínas. \n Muy poca grasa saturada y nada de colesterol.',
    'Harina de grano entero de trigo.\n Rica en fibra y en nutrientes. Su color es oscuro.',
    'Es un gran productor de energía.\n Rico en proteínas, minerales y vitaminas.',
    'La miel posee una variedad considerable\n de antioxidantes y regula el azucar en sangre'];
var imagenes = ['img/porotos_negros.jpg', 'img/harina_integral.jpg', 'img/yamani_integral.jpg', 'img/miel.jpg'];


dbProdJSON = `[
    {"productos":"Porotos negros", "precios":79.0, "descripciones":"Contienen una gran cantidad de proteínas.\nMuy poca grasa saturada y nada de colesterol.", "imagenes":"img/porotos_negros.jpg", "stock":90},
    {"productos":"Harina Integral", "precios":85.0, "descripciones":"Harina de grano entero de trigo.\nRica en fibra y en nutrientes. Su color es oscuro.", "imagenes":"img/harina_integral.jpg", "stock":50},
    {"productos":"Arroz yamani", "precios":25.25, "descripciones":"Es un gran productor de energía.\nRico en proteínas, minerales y vitaminas.", "imagenes":"img/yamani_integral.jpg", "stock":50},
    {"productos":"Miel", "precios":130.0, "descripciones":"La miel posee una variedad considerable\nde antioxidantes y regula el azucar en sangre", "imagenes":"img/miel.jpg", "stock":10},
    {"productos":"Nuez Mariposa", "precios":215.50, "descripciones": "La nuez contiene las denominadas grasas buenas\nNo tapan las arterias, protegen el sistema inmunológico.", "imagenes":"img/nuez_mariposa.jpg", "stock":90},
    {"productos":"Ciruelas Bombon", "precios":839, "descripciones":"Secada al sol sin dejar que se fermente\nConserva las mismas propiedades que la fruta original.", "imagenes":"img/ciruelas_bombon.jpg", "stock":100}
]`;