/*O jogador usará as setas do teclado para movimentar a cobra pelo campo, com objetivo que ela chegue nos locais onde a maçã está, comendo-a
e aumentando de tamanho. Se a cabeça da cobra colidir com a borda do campo ou com o próprio corpo o jogo finalizará com um alerta para jogar
novamente.*/

function desenhaCabeca(){ //Função que desenha a cabeça da cobra. 
    pincel.fillStyle = "white";
    pincel.beginPath();
    pincel.arc(x, y,10, 0, 2 * Math.PI);
    pincel.fill();
}
function desenhaCorpo(x, y) { //Função que desenha o corpo da cobra. 

    pincel.fillStyle = "white";
    pincel.beginPath();
    pincel.arc(x, y,10, 0, 2 * Math.PI);
    pincel.fill();
}
function desenhaMaca(xm,ym){ //Função que desenha a maçã. 
    pincel.fillStyle = "black";
    pincel.beginPath();
    pincel.arc(xm, ym, 10, 0, 2 * Math.PI);
    pincel.fill();
}
function campo() {  //Função para desenhar o campo onde a cobra irá andar.
    var pular = 25;
    var trocar = false; //Variável para fazer a lógica de desenhar o campo em xadrez.
    var descer = 0; 
    while(descer <=500){ //Repetição para desenhar todas as linhas no sentindo vertical.
        for(var linha= 0; linha<=500;linha=linha+25){ //Repetição que desenha as linhas da primeira cor.
            pincel.fillStyle = "#4F4F4F";    
            pincel.beginPath();
            pincel.rect(linha, descer, 25, 25);
            pincel.closePath();
            pincel.fill();
        }
        for(var linha2= pular; linha2<=500;linha2=linha2+50){ //Repetição que desenha as linhas da segunda cor.
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
function vitoria(){ //Função que determina quando o usuário ganha o jogo.
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
   clearInterval(intervalo);//Função do js para limpar as informações do setInterval.
   intervalo = setInterval(atualizaTela, 120);//Função do js para chamar uma variável em uma quantidade determinada de tempo.

   Swal.fire({ //Bloco de código onde foi usado a biblioteca sweet alert 2, para deixar os alertas mais agradáveis. 
      title: 'Objetivo de 800 pontos completo!',
      confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Jogar Novamente',
      width: 300,
      color: '#C0C0C0',
      background: 'url(fundo_VITORIA.png)',
    })
}
function derrota(){ //Função que determina quando o usuário perde o jogo.
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

    Swal.fire({ //Bloco de código onde foi usado a biblioteca sweet alert 2, para deixar os alertas mais agradáveis. 
      title: 'Fim de Jogo!',
      confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Jogar Novamente',
      width: 300,
      color: '#C0C0C0',
      background: 'url(fundo_derrota.png)',
      backdrop: `
      rgba(0, 0, 0, 0.6)
      url("gif_derrota.gif")
      bottom
      no-repeat
      `
    })
}
function atualizaTela() { //Função que irá atualizar na quantidade de milissegundos em que colocarmos no "setInterval".
    campo();

    if(esquerda && sentidoH) { //Condições que determinarão o movimento da cobra juntamente com a colisão na parede.
        if(x == 12.5){ //Colisão com a parede.
            derrota()
        } else {
            direcao = "esquerda";     
            x= x-25; //Movimento da cobra.
        }
    }
    if (direita && sentidoH) {
        if(x == 487.5){
            derrota();
        } else {
            direcao = "direita";
            x= x+25;
        }
    }
    if(baixo && !sentidoH) {
        if(y == 487.5){
            derrota();
        } else {
            direcao = "baixo";
            y = y+25; 
        }
    }
    if (cima && !sentidoH) {
        if(y == 12.5){
            derrota();
        } else {
            direcao = "cima";
            y= y-25;
        }
    } 
    
    desenhaCabeca();
    //Estrutura de repetição para desenhar apenas a quantidade de objetos que está no array "rastro".
    for (var i = 0; i < rastro.length; i++) { 
        desenhaCorpo(rastro[i].px,rastro[i].py);
        if (rabo >2 && rastro[i].px == x && rastro[i].py == y){//Colisão com o corpo da cobra.
            derrota();
        }
    }
    rastro.push({ px:x, py:y }) //Põe um elemento no fim do array "rastro". 
    while (rastro.length > rabo) {
        rastro.shift(); //Tira o primeiro elemento do array "rastro" enqaunto o tamanho dele for maior que a variável "rabo".
    }

    if(x == xm && y == ym){//Colisão com a maçã e pontuação do jogo.
         rabo++;//Aumentando o rabo cada vez que a cobra encontra com a maçã.
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

        if(pontos == 800){
           vitoria();
        }
        
        while(true){ //Estrutura para aleatorizar a maçã fora do corpo da cobra.
            var igual = false;
            xm = Math.floor(Math.random()*20)*25+12.5;
            ym = Math.floor(Math.random()*20)*25+12.5; 
            for (var i2 = 0; i2 < rastro.length; i2++) {//Estrutura que verifica se a maçã nascerá dentro da cobra.
                if (xm == rastro[i2].px && ym == rastro[i2].py){
                    igual = true;
                }
            }  
            if(!igual){
                break;    
            }    

        }
    }
    mostrarPontos.textContent = ("Pontos: "+pontos);//Atualizando os pontos na tela.
    desenhaMaca(xm,ym);
}
function leDoTeclado(evento) { //Função que lê as teclas, direcionando a cobra na tela.
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

var tela = document.querySelector("canvas"); //Busca o elemento canvas para usar no js.
var pincel = tela.getContext("2d"); //Usa a variável "tela" para desenhar no canvas.
var mostrarPontos = document.getElementById("pontos"); //Busca um elemento do HTML para atualizarmos na tela usando js.
var pontos = 0; //Pontos do jogo.
var rastro = []; //Corpo da cobra.
var rabo = 2; //Determina o tamanho do rabo da cobra.
var xm = 112.5; //Posição X da maçã.
var ym = 112.5; //Posição Y da maçã.
var x = 237.5; //Posição X da cabeça da cobra.
var y = 287.5;  //Posição Y da cabeça da cobra.
var sentidoH; //Determinará se a cobra estiver se movimentando no sentido horizontal.
var direcao; //Deternubará a direção da cobra no campo, cima, baixo, esquerda e direita. 

//Variáveis para auxiliar na movimentação correta da cobra.
var esquerda = false;
var cima = false;
var direita = false;
var baixo = false;

var intervalo = setInterval(atualizaTela, 120); //Variável para usar o setInterval de forma possamos alterar os milisegundos.
document.onkeydown = leDoTeclado; //Usado para ler quando o usuário apertar uma tecla, assim chamando a função e lendo qual tecla foi apertada.