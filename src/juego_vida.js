
function juego_vida_base(){
    let pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let neo_pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height)
    // let canvas_secundario = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    console.log(neo_pixeles)

    for(x = 0; x < pixeles.height; x += 1){
        let x_superior = ((x - 1) < -1) ? pixeles.height - 1 : x - 1;
        let x_inferior = (x + 1) % pixeles.height; 
        // console.log("X: " + x)

        for(y = 0; y < pixeles.width; y += 1){
            let izquierda = (y - 1) < - 1 ? pixeles.width - 1 : y - 1;
            let derecha = (y + 1) % pixeles.width;

            // neo_pixeles.data[x * y * 4 - 4] = 256 
            // neo_pixeles.data[(x * pixeles.width + y) * 4 - 2] = 254 
            // neo_pixeles.data[(x * pixeles.width + y) * 4 - 3] = 254 
            // neo_pixeles.data[(x * pixeles.height + y) * 4 - 3] = 254 
            // neo_pixeles.data[(x * pixeles.height + y) * 4 - 2] = 254 
            // neo_pixeles.data[(x * pixeles.height + y) * 4 - 1] = 254 

            //ctx.putImageData(neo_pixeles, 0, 0);
            // console.log(((x * pixeles.width) + y) * 4)
            
            
            for(indice_color = 4; indice_color > 1; indice_color -= 1){
                let automatas = {
                    vecinos: [ 
                    //Superior
                        pixeles.data[(x_superior * pixeles.width + izquierda) * 4 - indice_color] ?? 0,
                        pixeles.data[(x_superior * pixeles.width + y) * 4 - indice_color] ?? 0,
                        pixeles.data[(x_superior * pixeles.width + derecha) * 4 - indice_color] ?? 0,
                    //Medio
                        pixeles.data[(x * pixeles.width + izquierda) * 4 - indice_color] ?? 0,
                        pixeles.data[(x * pixeles.width + derecha) * 4 - indice_color] ?? 0,
                    //Inferior
                        pixeles.data[(x_inferior * pixeles.width + izquierda) * 4 - indice_color] ?? 0,
                        pixeles.data[(x_inferior * pixeles.width + y) * 4 - indice_color] ?? 0,
                        pixeles.data[(x_inferior * pixeles.width + derecha) * 4 - indice_color] ?? 0,
                    ],
                    centro: pixeles.data[(x * pixeles.width + y) * 4 - indice_color],
                }

                neo_pixeles.data[(x * pixeles.width + y) * 4 - indice_color] = reglas_juego(automatas)

                //console.log("<== x: " + x + ", y: " + y + "==>")
                // console.log("VIVE: " + (neo_pixeles.data[(x * pixeles.width + y) * 4 - indice_color]))
            }
            // console.log("<== x: " + x + ", y: " + y + "==>")
            //console.log(automatas)
            
        }
    }

    ctx.putImageData(neo_pixeles, 0, 0);

    //añadirPasado();
}

function reglas_juego(pixeles){
    // let barra_vida = document.getElementById("umbral").value;
    let barra_vida = 175;

    let contador_celulas_vivas = 0

    for(indice = 0; indice < pixeles.vecinos.length; indice += 1){
        contador_celulas_vivas += pixeles.vecinos[indice] > barra_vida; 
    }

    //console.log(contador_celulas_vivas)

    if(contador_celulas_vivas == 3 && pixeles.centro == 1){
        console.log("Ha revivido")
        return 178
    }

    if(contador_celulas_vivas == 2 || contador_celulas_vivas == 3){
        console.log("Sigue vivo")
        return pixeles.centro
    }

    return 1


}

function ciclo(){
    setInterval(() => {
        juego_vida_base()
    }, 1500);

}

/*
 *
 *
    let largo = pixeles.width * 4
    let largo_pixeles = pixeles.width
    let ancho_pixeles = pixeles.height

    console.log(pixeles)
    console.log(pixeles.width)
    console.log(largo * pixeles.height == pixeles.data.length)
 *
    for(indice = 0; indice < pixeles.data.length; indice += 4){
        let indice_superior = (indice - largo)
        let indice_inferior = (indice + largo)

        let indice_simple_superior = ((indice_superior + 4) / 4) % largo_pixeles
        let indice_simple_inferior = ((indice_inferior + 4) / 4) % largo_pixeles

        let pixeles_alrededor = {
            superior: [
                pixeles.data[indice_superior - 4] ?? 0,
                pixeles.data[indice_superior - largo] ?? 0,
                pixeles.data[indice_superior + 4] ?? 0,
            ],
            medio: [
                pixeles.data[indice - 4] ?? 0,
                pixeles.data[indice + 4] ?? 0
            ], 
            inferior: [
                pixeles.data[indice_inferior - 4] ?? 0,
                pixeles.data[indice_inferior + largo] ?? 0,
                pixeles.data[indice_inferior + 4] ?? 0,
            ],
            centro: pixeles.data[indice],
        }

        console.log("<==" + (indice) + "==>")
        console.log("<==" + (indice / 4) + "==>")
        console.log("<==" + (indice_inferior / 4) + "==> + 1")
        console.log("<==" + (indice_superior / 4) + "==> - 1")
        console.log("seccion de chequeo")
        console.log(((indice_superior + 4) / 4) % largo_pixeles + 1)
        console.log(pixeles_alrededor)

        pixeles.data[indice] = 128;

    }

    ctx.putImageData(pixeles, 0, 0);
    //añadirPasado();
//
    for(x = 1; x < pixeles.width; x += 1){
        let indice_superior = (x + 1 > pixeles.width) ? - 1 : x;

        for(y = 1; y < pixeles.height; y += 1){

            let pixeles_alrededor = {
                superior: [
                    pixeles.data[(x - 1) * (y - 1)* 4 - 4] ?? 0,
                    pixeles.data[(x) * (y - 1)* 4 - 4] ?? 0,
                    pixeles.data[(x + 1) * (y - 1) * 4 - 4] ?? 0,
                ],
                medio: [
                    pixeles.data[] ?? 0,
                    pixeles.data[] ?? 0
                ], 
                inferior: [
                    pixeles.data[x * (y + 1) * 4] ?? 0,
                    pixeles.data[] ?? 0,
                    pixeles.data[] ?? 0,
                ],
                centro: pixeles.data[x * y * 4],
            }

        }

    for(indice = 0; indice < pixeles.data.length; indice += 4){
        let indice_superior = (indice - largo)
        let indice_inferior = (indice + largo)

        let pixeles_alrededor = {
            superior: [
                pixeles.data[(((indice_superior / 4) % largo_pixeles) - 1 >= 0) ? indice_superior - 4: -1] ?? 0,
                pixeles.data[indice_superior] ?? 0,
                pixeles.data[(((indice_superior / 4) % largo_pixeles) < largo_pixeles - 1) ? indice_superior + 4: -1] ?? 0,
            ],
            medio: [
                //pixeles.data[indice - 4] ?? 0,
                pixeles.data[(((indice / 4) % largo_pixeles) - 1 >= 0) ? indice - 4: -1] ?? 0,
                pixeles.data[((indice / 4) % largo_pixeles < largo_pixeles - 1) ? indice + 4: -1] ?? 0
            ], 
            inferior: [
                //pixeles.data[indice_inferior - 4] ?? 0,
                //pixeles.data[indice_inferior] ?? 0,
                //pixeles.data[indice_inferior + 4] ?? 0,

                pixeles.data[(((indice_inferior / 4) % ancho_pixeles) - 1 >= 0) ? indice_superior - 4: -1] ?? 0,
                pixeles.data[indice_inferior] ?? 0,
                pixeles.data[(((indice_inferior / 4) % ancho_pixeles) - 1 >= 0) ? indice_superior + 4: -1] ?? 0,
            ],
            centro: pixeles.data[indice],
        }

        //console.log("<==" + (indice / 4) + "==>")
        //console.log("<==" + (indice_inferior / 4) + "==> + 1")
        //console.log("<==" + (indice_superior / 4) + "==> - 1")
        console.log("<==" + (indice) + "==>")
        console.log("<==" + (indice / 4) + "==>")
        console.log("seccion de chequeo")
        console.log(((indice / 4) % largo_pixeles))
        console.log("seccion de chequeo")
        console.log(pixeles_alrededor)

        pixeles.data[indice] = 128;

    }
 */

