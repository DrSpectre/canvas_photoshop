function blancoYNegro(){
    umbral = document.getElementById("umbral").value;

    let pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let avg;

    for(i = 0; i < pixeles.data.length; i += 4){
        avg = (pixeles.data[i] + pixeles.data[i+1] + pixeles.data[i+2]) / 3;
        if(avg > umbral){
            pixeles.data[i] = pixeles.data[i+1] = pixeles.data[i+2] = 254;
        }
        else{
            pixeles.data[i] = pixeles.data[i+1] = pixeles.data[i+2] = 0;
        }
    }

    ctx.putImageData(pixeles, 0, 0);
    actualizarBackup();
    añadirPasado();
}


function escalaGrises(){
    let pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let avg;

    for(i = 0; i < pixeles.data.length; i += 4){
        avg = (pixeles.data[i] + pixeles.data[i+1] + pixeles.data[i+2]) / 3;
        pixeles.data[i] = pixeles.data[i + 1] = pixeles.data[i + 2] = avg;
    }

    ctx.putImageData(pixeles, 0, 0);
    actualizarBackup();
    añadirPasado();
}

function escalaGrisesV2(){
    let pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let luminis;

    for(i = 0; i < pixeles.data.length; i += 4){
        luminis = .3 * pixeles.data[i] + .6 * pixeles.data[i + 1] + .1 * pixeles.data[i + 2];
        pixeles.data[i] = pixeles.data[i + 1] = pixeles.data[i + 2] = luminis;
    }

    ctx.putImageData(pixeles, 0, 0);
    actualizarBackup();
    añadirPasado();
}



function negativo(){
    let pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for(i = 0; i < pixeles.data.length; i += 4){
        pixeles.data[i] = 255 - pixeles.data[i];
        pixeles.data[i + 1] = 255 - pixeles.data[i + 1];
        pixeles.data[i + 2] = 255 - pixeles.data[i + 2];
    }

    ctx.putImageData(pixeles, 0, 0);
    actualizarBackup();
    añadirPasado();
}

function sepia(){
    //parte del codigo obtenido de http://w3.unpocodetodo.info/canvas/sepia.php
    let pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let luminis;

    for(i = 0; i < pixeles.data.length; i += 4){
        luminis = .3 * pixeles.data[i] + .6 * pixeles.data[i + 1] + .1 * pixeles.data[i + 2];

        pixeles.data[i] = Math.min(luminis + 40, 255);
        pixeles.data[i + 1] = Math.min(luminis + 15, 255);
        pixeles.data[i + 2] = luminis;
    }

    ctx.putImageData(pixeles, 0, 0);
    actualizarBackup();
    añadirPasado();
}

function invertirColores(){
    let pixeles = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixelCache = [0, 0, 0];

    for(i = 0; i < pixeles.data.length; i += 4){
        pixelCache[0] = pixeles.data[i];
        pixelCache[1] = pixeles.data[i + 1];
        pixelCache[2] = pixeles.data[i + 2];

        pixeles.data[i] = pixelCache[2];
        pixeles.data[i + 1] = pixelCache[0];
        pixeles.data[i + 2] = pixelCache[1];
    }

    ctx.putImageData(pixeles, 0, 0);
    actualizarBackup();
    añadirPasado();
}
