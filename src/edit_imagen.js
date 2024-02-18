let canvas = document.getElementById('lienzo');
let ctx = canvas.getContext('2d');

let canvasSecundario;

let undo = 0;
let pasado = [undo];

function sobre(evento){
    evento.preventDefault();
}

function soltar(evento){
    console.log("funcion soltar");
    evento.preventDefault();

    if(evento.dataTransfer.items){
        if(evento.dataTransfer.items[0].kind === "file"){
            let archivo = evento.dataTransfer.items[0].getAsFile();
            dibujar(archivo);
        }
    }
}

function agregar_imagen_personal(evento){
    console.log(evento.target.files)
    dibujar(evento.target.files[0])

}

function dibujar(esteArchivo){
    console.log(esteArchivo.type);

    switch(esteArchivo.type){
        case "image/png":
        case "image/jpeg":
        case "image/jpg":
            let img = new Image;
            img.src = window.URL.createObjectURL(esteArchivo);

            img.onload = _ => {
                limpiarTodo();
                p = proporcion(img.width, img.height, canvas.width, canvas.height);
                coordenadas = centrar(img.width, img.height, canvas.width, canvas.height, p);

                ctx.drawImage(img, coordenadas[0], coordenadas[1], (img.width * p), (img.height * p));

                window.URL.revokeObjectURL(this.src);
                actualizarBackup();
                añadirPasado();
            }

            break;
    }
}


function proporcion(imgAncho, imgAlto, cnvAncho, cnvAlto){
    if((imgAncho > cnvAncho) || (imgAlto > cnvAlto)){
        if(imgAncho > imgAlto){
            return cnvAncho / imgAncho;
        }
        else{
            return cnvAlto / imgAlto;
        }
    }
    else{
        return 1;
    }

}

function centrar(imgAncho, imgAlto, cnvAncho, cnvAlto, propo){
    let logos = [0, 0];
    x = ((cnvAncho - (imgAncho * propo)) / 2);
    y = ((cnvAlto - (imgAlto * propo)) / 2);

    if(x > 0)
        logos[0] = x;
    if(y > 0)
        logos[1] = y;

    return logos;
}

function añadirPasado(){
    pasado[undo] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undo += 1;
}

function regresar(){
    undo -= 1;
    if(undo > 0)
        ctx.putImageData(pasado[undo - 1], 0, 0);
    else {
        undo = -1;
    }
}

function retroceder(){
    undo += 1;
    if(!(pasado.lenght > undo))
        ctx.putImageData(pasado[undo], 0, 0)
    else {
        undo -= 1;
    }
}

function actualizarBackup(){
    console.log("se ha usado el canvas secundario");
    canvasSecundario = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

//se obtuvo parte del codigo del siguiente enlace: http://www.etnassoft.com/2016/11/03/manipulacion-de-imagenes-con-javascript-parte-1/


function saturacion(barra){
    let factor = (259 * (barra.value + 255)) / (255 * (259 - barra.value));

    let pixeles = canvasSecundario;

    for(i = 0; i < pixeles.data.length; i += 4){
        pixeles.data[i] =  factor * (pixeles.data[i] - 128) + 128;
        pixeles.data[i + 1] =  factor * (pixeles.data[i + 1] - 128) + 128;
        pixeles.data[i + 2] =  factor * (pixeles.data[i + 2] - 128) + 128;;
    }

    ctx.putImageData(pixeles, 0, 0);
    añadirPasado();
}



function brillo(barra){
    let pixeles = canvasSecundario;
    let brillo = barra.value;

    for(i = 0; i < pixeles.data.length; i += 4){
        pixeles.data[i] = (brillo * pixeles.data[i]) / 5;
        pixeles.data[i + 1] = (brillo * pixeles.data[i + 1]) / 5;
        pixeles.data[i + 2] = (brillo * pixeles.data[i + 2]) / 5;
    }

    ctx.putImageData(pixeles, 0, 0);
    añadirPasado();
}


function limpiarTodo(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undo = 0;
    pasado = [undo];
}

function descargarArchivo(link){
    link.href = canvas.toDataURL();

    link.addEventListener("click", e => {
        link.download = "mi-obra-de-arte.png";
    });
}


/*----------------------decoradores con javascript--------------------------------------------------*/

function seleccionado(etiqueta){
    nonSelecionados = document.querySelectorAll(".seleccionado");
    console.log(nonSelecionados);


    for(i = 0; i < nonSelecionados.length; i += 1){
        console.log(i);
        nonSelecionados[i].classList.remove("seleccionado");
    }


    etiqueta.classList.add("seleccionado");
}

/*--------------------Agregados para la clase de Leon--------------------------------------------------*/
function cargar_imagen_default(){
    console.log("Estamosc argando la imagen. Deberia mejorar los nombes de ls archivos")

    let img = new Image;
    img.src = document.querySelector("#xenia_def").src;

    img.onload = _ => {
        limpiarTodo();
        p = proporcion(img.width, img.height, canvas.width, canvas.height);
        coordenadas = centrar(img.width, img.height, canvas.width, canvas.height, p);

        ctx.drawImage(img, coordenadas[0], coordenadas[1], (img.width * p), (img.height * p));

        window.URL.revokeObjectURL(this.src);
        actualizarBackup();
        añadirPasado();
    }

}


