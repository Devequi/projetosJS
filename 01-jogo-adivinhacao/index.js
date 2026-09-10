const pergunta = require("prompt-sync")();

function gerarNumero(nMax) {
    return Math.floor(Math.random() * (nMax + 1));
}

function dificuldade(escolha){
    if(escolha === 1){return 50}
    else if(escolha === 2){return 100}
    else if(escolha === 3){return 150}
    return undefined
}

function jogo(numero, numRandom) {
    if (numero === numRandom) {return "acertou";}
    if (numRandom < numero) {return "menor";}
    return "maior";
}

function mostrarResultado(resultado, tentativas){
    
    if(resultado === "acertou"){
    return `Você venceu, parabéns
    ${tentativas} tentativas`
    }
    if(resultado === "menor"){
        return "O numero pensado é MENOR"
    }
    return "O numero pensado é MAIOR"
}

let jogando = true;

while (jogando) {
    console.log(`
======JOGO=====
1. Jogar
2. Sair
=============== `);

    let escolha = Number(pergunta("Escolha uma opcao: "));
    switch (escolha) {
        case 1:
            console.log(`
${"=".repeat(50)}
1. Facil (0-50)
2. Médio (0-100)
3. Dificil (0-150)
${"=".repeat(50)}`);

            let nMax = 0
            while (true) {
                let dificuldadeEsc = Number(
                    pergunta("Escolha uma dificuldade: ")
                );
                nMax = dificuldade(dificuldadeEsc)
                if(nMax !== undefined){
                    break
                }
            }


            console.log(
                `${"=".repeat(20)} Iniciando ${"=".repeat(20)}`
            );

            let numRandom = gerarNumero(nMax);
            let tentativas = 0;
            
            while (true) {
                let numero = Number(
                    pergunta("Insira um numero: ")
                );

                if (numero >= 0 && numero <= nMax) {
                    tentativas++;
                    let resultado = jogo(numero, numRandom);
                    console.log(mostrarResultado(resultado, tentativas))
                    if(resultado === "acertou"){break}
                }
                else {
                    console.log(`Digite um numero entre 0 e ${nMax}`)
                }
            }

            break;


        case 2:
            jogando = false;
            break;


        default:
            console.log("Insira um valor válido");
    }
}