let coordenadasCache = [0, 0];
let angulo;
/*----------------------variables cache y de ayuda---------------------------*/
let imgCache = new Image();
let canvasCach;

let tamañoCacheA = document.getElementById("tamañoImagenA").value;
let tamañoCacheL = document.getElementById("tamañoImagenL").value;
let tamañoTrazo = document.getElementById("tamañoLinea").value;
let colorTrazo = document.getElementById("colorTrazo").value;
let colorRelleno = document.getElementById("colorRelleno").value;
let puedeTrazar = document.getElementById("puedeTrazar").checked;
let puedeRellenar = document.getElementById("puedeRellenar").checked;

/*-------------------------------------------ayuda----------------------------------------*/
function dibujarLinea(){
    canvas.onmousedown = e => {
        ctx.strokeStyle = colorTrazo;
        ctx.lineWidth = tamañoTrazo;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    canvas.onmouseup = e => {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        if(puedeTrazar == true){
            console.log(puedeTrazar);
            ctx.stroke();
        }
        ctx.closePath();
        actualizarBackup();
        añadirPasado();
    }
}

function dibujarRectangulos(){
    canvas.onmousedown = e => {
        ctx.strokeStyle = colorTrazo;
        ctx.fillStyle = colorRelleno;
        ctx.lineWidth = tamañoTrazo;
        coordenadasCache = [e.clientX, e.clientY];;
    }

    canvas.onmouseup = e => {
        coorX = coordenadasCache[0] - canvas.offsetLeft;
        coorY = coordenadasCache[1] - canvas.offsetTop;

        ancho = e.clientX - coordenadasCache[0];
        largo = e.clientY - coordenadasCache[1];

        ctx.strokeRect(coorX, coorY, ancho, largo);
        if(puedeTrazar == true){
            ctx.stroke();
        }
        if(puedeRellenar == true){
            ctx.fill();
        }

        actualizarBackup();
        añadirPasado();
    }
}

function dibujarCirculo(){
    canvas.onmousedown = e => {
        ctx.strokeStyle = colorTrazo;
        ctx.fillStyle = colorRelleno;
        ctx.lineWidth = tamañoTrazo;

        ctx.beginPath();
        coordenadasCache = [e.clientX, e.clientY];
        
        canvasCach = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        canvas.onmousemove = e =>{
            console.log("dubegaendo la wea");
        
            angulo = Math.sqrt(Math.pow((coordenadasCache[0] - e.clientX), 2) + Math.pow((coordenadasCache[1] - e.clientY), 2));
            ctx.putImageData(canvasCach, 0, 0);
            ctx.arc(coordenadasCache[0] - canvas.offsetLeft, coordenadasCache[1] - canvas.offsetTop, angulo, 0, 2 * Math.PI, false);;
            ctx.closePath();
            if(puedeTrazar == true){
                ctx.stroke();
            }
            if(puedeRellenar == true){
                ctx.fill();
            }
        }
    }

    canvas.onmouseup = e => {
        canvas.onmousemove = _ => {};
        
        ctx.putImageData(canvasCach, 0, 0);
        
        angulo = Math.sqrt(Math.pow((coordenadasCache[0] - e.clientX), 2) + Math.pow((coordenadasCache[1] - e.clientY), 2));

        ctx.arc(coordenadasCache[0] - canvas.offsetLeft, coordenadasCache[1] - canvas.offsetTop, angulo, 0, 2 * Math.PI, false);;
        ctx.closePath();
        if(puedeTrazar == true){
            ctx.stroke();
        }
        if(puedeRellenar == true){
            ctx.fill();
        }

        actualizarBackup();
        añadirPasado();
    }
    

}


function borrarRectangulo(){
    canvas.onmousedown = e => {
        ctx.strokeStyle = colorTrazo;
        ctx.fillStyle = colorRelleno;
        ctx.lineWidth = tamañoTrazo;
        coordenadasCache = [e.clientX, e.clientY];;
    }

    canvas.onmouseup = e => {
        coorX = coordenadasCache[0] - canvas.offsetLeft;
        coorY = coordenadasCache[1] - canvas.offsetTop;

        ancho = e.clientX - coordenadasCache[0];
        largo = e.clientY - coordenadasCache[1];
        
        ctx.clearRect(coorX, coorY, ancho, largo);
        if(puedeTrazar == true){
            ctx.stroke();
        }
        if(puedeRellenar == true){
            ctx.fill();
        }

        actualizarBackup();
        añadirPasado();
    }
}





/*--------------------------------------dibujar estampas varias ---------------------------------------------*/

function logevent(evento){
    console.log(evento);
}

function dibujarEstampas(who){
    imgCache.src = who.src;
    canvasCach = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    canvas.onmousemove = e =>{
        let ancho = imgCache.width * tamañoCacheA;
        let alto = imgCache.height * tamañoCacheL;
        
        let coordenX = e.clientX - canvas.offsetLeft - (ancho / 2);
        let coordenY = e.clientY - canvas.offsetTop - (alto / 2);
            
        ctx.putImageData(canvasCach, 0, 0);
        ctx.drawImage(imgCache, coordenX, coordenY, ancho, alto);
    }

    canvas.onmousedown = e =>{
        let ancho = imgCache.width * tamañoCacheA;
        let alto = imgCache.height * tamañoCacheL;

        let coordenX = e.clientX - canvas.offsetLeft - (ancho / 2);
        let coordenY = e.clientY - canvas.offsetTop - (alto / 2);

        ctx.drawImage(imgCache, coordenX, coordenY, ancho, alto);
    }

    canvas.onmouseup = _ => {
        actualizarBackup();
        añadirPasado();
    }
}


/*------------------------------funciones de actualizacionde cache ---------------------------*/
function actualizarTodo(){
    tamañoCacheA = document.getElementById("tamañoImagenA").value;
    tamañoCacheL = document.getElementById("tamañoImagenL").value;
    tamañoTrazo = document.getElementById("tamañoLinea").value;
    colorTrazo = document.getElementById("colorTrazo").value;
    colorRelleno = document.getElementById("colorRelleno").value;
    puedeTrazar = document.getElementById("puedeTrazar").checked;
    puedeRellenar = document.getElementById("puedeRellenar").checked;
}

