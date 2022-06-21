function desenhaCabeca(){
    pincel.fillStyle = "#C0C0C0";
    pincel.beginPath();
    pincel.arc(x, y,10, 0, 2 * Math.PI);
    pincel.fill();
}
function desenhaCorpo(x, y) {

    pincel.fillStyle = "white";
    pincel.beginPath();
    pincel.arc(x, y,10, 0, 2 * Math.PI);
    pincel.fill();
}
function desenhaMaca(xm,ym){
    pincel.fillStyle = "black";
    pincel.beginPath();
    pincel.arc(xm, ym, 10, 0, 2 * Math.PI);
    pincel.fill();
}
function campo() {
    var pular = 25;
    var trocar = false;
    var descer = 0; 
    while(descer <=500){
        for(var linha= 0; linha<=500;linha=linha+25){
            pincel.fillStyle = "#4F4F4F";    
            pincel.beginPath();
            pincel.rect(linha, descer, 25, 25);
            pincel.closePath();
            pincel.fill();
        }
        for(var linha2= pular; linha2<=500;linha2=linha2+50){
            pincel.fillStyle = "#363636";    
            pincel.beginPath();
            pincel.rect(linha2, descer, 25, 25);
            pincel.closePath();
            pincel.fill();
        }
        descer = descer + 25; 
        trocar = !trocar;
        if (trocar){
            pular = 0;
        } else {
            pular = 25;
        }
    }  
}
function fimJogo(){
    pontos = 0;
    rabo = 2;
    xm = 112.5;
    ym = 112.5;
    x = 237.5;
    y = 287.5;
    esquerda = false;
    cima = false;
    direita = false;
    baixo = false;
    direcao = 0;
    clearInterval(intervalo);
    intervalo = setInterval(atualizaTela, 120);
    alert("Fim de Jogo!");
}
function atualizaTela() {
    campo();

    if(esquerda && sentidoH) {
        if(x == 12.5){
            fimJogo()
        } else {
            direcao = "esquerda";    
            x= x-25;
        }
    }
    if (direita && sentidoH) {
        if(x == 487.5){
            fimJogo();
        } else {
            direcao = "direita";
            x= x+25;
        }
    }
    if(baixo && !sentidoH) {
        if(y == 487.5){
            fimJogo();
        } else {
            direcao = "baixo";
            y = y+25; 
        }
    }
    if (cima && !sentidoH) {
        if(y == 12.5){
            fimJogo();
        } else {
            direcao = "cima";
            y= y-25;
        }
    } 
    
    desenhaCabeca();

    for (var i = 0; i < rastro.length; i++) {
        desenhaCorpo(rastro[i].px,rastro[i].py);
        if (rabo >2 && rastro[i].px == x && rastro[i].py == y){
            fimJogo();
        }
    }
    rastro.push({ px:x, py:y })
    while (rastro.length > rabo) {
        rastro.shift(); //tira o primeiro elemento do array
    }

    if(x == xm && y == ym){
         rabo++;
         if(pontos >=300){
            pontos+=50;
        }
        if(pontos >=100 && pontos<300){
            pontos+=20;
        }
        if(pontos <100){
            pontos+=10;
        }
        if(pontos == 100){
            clearInterval(intervalo);
            intervalo = setInterval(atualizaTela, 90);
        }
        if(pontos == 300){
            clearInterval(intervalo);
            intervalo = setInterval(atualizaTela, 60);
        }
        
        while(true){
            var igual = false;
            xm = Math.floor(Math.random()*20)*25+12.5;
            ym = Math.floor(Math.random()*20)*25+12.5; 
            for (var i2 = 0; i2 < rastro.length; i2++) {
                if (xm == rastro[i2].px && ym == rastro[i2].py){
                    igual = true;
                }
            }  
            if(!igual){
                break;    
            }    

        }
    }
    mostrarPontos.textContent = ("Pontos: "+pontos);
    desenhaMaca(xm,ym);
}
function leDoTeclado(evento) {
    if(evento.keyCode == 38 && direcao !="baixo") {
        sentidoH = false;
        cima = true;
        baixo = false;
    } else if (evento.keyCode == 40 && direcao !="cima") {
        sentidoH = false; 
        baixo = true;
        cima = false;
    } else if (evento.keyCode == 37 && direcao !="direita") {
        sentidoH = true;
        esquerda = true;
        direita = false;
    } else if (evento.keyCode == 39 && direcao !="esquerda") {
        sentidoH = true;
        direita = true;
        esquerda = false;  
    }
}

var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
var mostrarPontos = document.getElementById("pontos")
var pontos = 0;
var rastro = [];
var rabo = 2;
var parar = false;
var trocarCor = true;
var xm = 112.5;
var ym = 112.5;
var x = 237.5;
var y = 287.5;
var sentidoH;
var direcao; 
var esquerda = false;
var cima = false;
var direita = false;
var baixo = false;
var intervalo = setInterval(atualizaTela, 120);
document.onkeydown = leDoTeclado;