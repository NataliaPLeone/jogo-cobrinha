
let tabuleiroCobrinha = document.querySelector(".tabuleiro");
let elementoPontuacao = document.querySelector(".pontosJS");
let elementoPontuacaoMax = document.querySelector(".pontosJSMax");


let comidaX, comidaY;
let cobrinhaX=15, cobrinhaY=15;
let velocidadeX = 0, velocidadeY=0;
let fimDeJogo = false;
let cobrinha = []; // a cobrinha vai receber uma lista vazia, essa lista vai ser a pilha
let setIntervalId;
let pontuacao =0;

let pontuacaoMaxima = localStorage.getItem("pontosJSMax") || 0;



const mudarPosicaoComida = () => {
    comidaX = Math.floor(Math.random()* 30)+1;
    comidaY= Math.floor(Math.random()* 30)+1;
}

const realizeFimDeJogo = () => {
    clearInterval(setIntervalId);
    alert("Fim de jogo!");
    location.reload();
}

const movimentoCobra = (a) => {
    if(a.key ==="ArrowUp"){
        velocidadeX =0;
        velocidadeY=-1;
    } else if(a.key ==="ArrowDown"){
        velocidadeX =0;
        velocidadeY=1;
    } else if(a.key ==="ArrowLeft"){
        velocidadeX = -1;
        velocidadeY=0;
    } else if(a.key ==="ArrowRight"){
        velocidadeX = 1;
        velocidadeY = 0;
    }
    

}

const iniciarJogo = () => {
    if(fimDeJogo){
        return realizeFimDeJogo();
    }
    let htmlMarkup = `<div class="comida" style="grid-area: ${comidaY}/ ${comidaX}"></div>`;


    if(cobrinhaX === comidaX && cobrinhaY === comidaY){
        mudarPosicaoComida();
        cobrinha.push([comidaX, comidaY]);
        pontuacao+=1;
        

        pontuacaoMaxima = pontuacao >= pontuacaoMaxima ? pontuacao : pontuacaoMaxima;
        localStorage.setItem("pontuacaoMax", pontuacaoMaxima);

        elementoPontuacao.innerHTML = `${pontuacao}`;
        elementoPontuacaoMax.innerHTML = `${pontuacaoMaxima}`;
    }

    for(let i = cobrinha.length -1; i > 0; i--){
        cobrinha[i] = cobrinha[i-1];
    }

    cobrinha[0] = [cobrinhaX,cobrinhaY];


    cobrinhaX += velocidadeX;
    cobrinhaY += velocidadeY;


    if(cobrinhaX <=0){
        cobrinhaX = 30;
    } else if(cobrinhaX >30){
        cobrinhaX = 1;
    } else if(cobrinhaY <=0){
        cobrinhaY = 30;
    } else if(cobrinhaY >30){
        cobrinhaY = 1;
    }

    for(let i = 0; i < cobrinha.length; i++){
        htmlMarkup += `<div class="cabecaCobrinha" style="grid-area: ${cobrinha[i][1]}/ ${cobrinha[i][0]}"></div>`;
        if(i !== 0 && cobrinha[0][1] === cobrinha[i][1] && cobrinha[0][0] === cobrinha[i][0]){
            fimDeJogo = true;
        }

    }
    tabuleiroCobrinha.innerHTML = htmlMarkup;

}

mudarPosicaoComida();
setIntervalId = setInterval(iniciarJogo,125);
document.addEventListener("keydown", movimentoCobra);