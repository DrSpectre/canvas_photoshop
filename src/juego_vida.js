
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


