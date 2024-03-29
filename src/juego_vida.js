let umbral_vida = 135
let actualizar_estado = false

let opciones_interfaz = {
    barra_umbral: document.querySelector("#UmbralVida"),
    actualizar_estado_boton: document.querySelector("#actualizar_estado_marcador")
}

function actualizar_juego_vida(evento){
    umbral_vida = opciones_interfaz.barra_umbral.value;

    if(evento.target.id == "actualizar_estado_marcador"){
        actualizar_estado = !actualizar_estado
        if(actualizar_estado){
            juego_vida_base()
            opciones_interfaz.actualizar_estado_boton.innerText = "Detener juego"
        }

        else{
            opciones_interfaz.actualizar_estado_boton.innerText = "Reanudar juego"
        }
    }
}


function juego_vida_base(){
    let pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let neo_pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height)

    for(x = 0; x < pixeles.height; x += 1){
        let x_superior = ((x - 1) < -1) ? pixeles.height - 1 : x - 1;
        let x_inferior = (x + 1) % pixeles.height; 

        for(y = 0; y < pixeles.width; y += 1){
            let izquierda = (y - 1) < - 1 ? pixeles.width - 1 : y - 1;
            let derecha = (y + 1) % pixeles.width;
            
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


                switch(reglas_juego(automatas)){
                    case "mantener":
                        break;

                    case "revivir": //La opcion de revivir permite resucitar celulas aledañas, procura no tener enc uetna el umbral para evitar tener problemas con celulas condenads a morir
                        if(Math.random() * 25 > 20){
                            neo_pixeles.data[(x * pixeles.width + y) * 4 - 4] = (canvasSecundario.data[(x * pixeles.width + y) * 4 - 4] > umbral_vida) ? canvasSecundario.data[(x * pixeles.width + y) * 4 - 4] : umbral_vida + 1;
                            neo_pixeles.data[(x * pixeles.width + y) * 4 - 3] = (canvasSecundario.data[(x * pixeles.width + y) * 4 - 3] > umbral_vida) ? canvasSecundario.data[(x * pixeles.width + y) * 4 - 3] : umbral_vida + 1;
                            neo_pixeles.data[(x * pixeles.width + y) * 4 - 2] = (canvasSecundario.data[(x * pixeles.width + y) * 4 - 2] > umbral_vida) ? canvasSecundario.data[(x * pixeles.width + y) * 4 - 2] : umbral_vida + 1;
                        }

                        else{
                            neo_pixeles.data[(x * pixeles.width + y) * 4 - indice_color] = (canvasSecundario.data[(x * pixeles.width + y) * 4 - indice_color] > umbral_vida) ? canvasSecundario.data[(x * pixeles.width + y) * 4 - indice_color] : umbral_vida + 1;
                        }
                        continue;

                    case "morir":
                        neo_pixeles.data[(x * pixeles.width + y) * 4 - indice_color] = 1
                        break;
                }
            }
        }
    }

    ctx.putImageData(neo_pixeles, 0, 0);

    if(actualizar_estado){
        setInterval(() => {
            if(actualizar_estado)
                juego_vida_base()
        }, 10);
    }
}

function reglas_juego(pixeles){
    let contador_celulas_vivas = 0

    for(indice = 0; indice < pixeles.vecinos.length; indice += 1){
        contador_celulas_vivas += pixeles.vecinos[indice] > umbral_vida; 
    }

    if(contador_celulas_vivas == 3 && pixeles.centro < 10){
        return "revivir"
    }

    if(contador_celulas_vivas == 2 || contador_celulas_vivas == 3){
        return "mantener"
    }


    if(Math.random() * 9000 < 3){
        return "revivir"
    }

    return "morir"
}

function ciclo(){
    setInterval(() => {
        juego_vida_base()
    }, 1500);
}




