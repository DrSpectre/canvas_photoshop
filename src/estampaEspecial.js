function sobreMiniatura(evento){
    evento.preventDefault();
}

function dibujaMiniatura(esteArchivo){
    let img = new Image;

    let canvas2 = document.createElement("canvas");
    let ctx2 = canvas2.getContext("2d");

    img.src = window.URL.createObjectURL(esteArchivo);

    console.log(img.src);

    img.onload = _ => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        window.URL.revokeObjectURL(this.src);
    };

    descargarArchivo();

}

function proporcion(largo, maximo){
    return (maximo * 100 / largo) / 100;
}

function dibujar(archivo){
    console.log(archivo.type);

   switch (archivo.type){
       case "image/png":
       case "image/jpeg":
           dibujaMiniatura(archivo);
        break;
   }

}

function soltarMiniatura(evento){
    evento.preventDefault();

    const imagen = document.getElementById("imagenSeleccionada");

    if(evento.dataTransfer.items){
        if(evento.dataTransfer.items[1].kind === "file"){
            let archivo = evento.dataTransfer.items[1].getAsFile();

            imagen.src = dibujar(archivo);
            console.log(archivo.type);
        }
    }
}
