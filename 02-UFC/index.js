const pergunta = require("prompt-sync")();

function formatarLutador(lutador){
    return `${lutador.nome} | ${lutador.vitorias}-${lutador.derrotas} | ${lutador.categoria}`        
}


function listarLutadores(arr) {
    for(let i=0; i<arr.length; i++){
        console.log(formatarLutador(arr[i]))
    }
}

function buscarLutador(arr, nome){
    for(let i=0; i<arr.length; i++){
        if(arr[i].nome.toLowerCase().trim() === nome.toLowerCase().trim()){
            return arr[i]
        }
    }

    return undefined
}

function calcTaxaVitoria (lutador) {
    const taxaVitoria = (lutador.vitorias / (lutador.vitorias + lutador.derrotas)) * 100
    return taxaVitoria
}

function melhorCartel(arr){
    let melhorLutador
    let melhorWinRate = 0

    for(let i=0; i<arr.length; i++){
        const taxaAtual = calcTaxaVitoria(arr[i])
        
        if(taxaAtual > melhorWinRate){
            melhorWinRate = taxaAtual
            melhorLutador = arr[i]
        }
    }

    console.log(`
    ${formatarLutador(melhorLutador)}
    taxa de vitória: ${melhorWinRate.toFixed(2)}%
    ` )
}

function registrarLuta(arr, lutador1, lutador2, lutaResult){
    let lutd1 = buscarLutador(arr, lutador1)
    let lutd2 = buscarLutador(arr, lutador2)
    if(lutaResult === 1){
        lutd1.vitorias += 1
        lutd2.derrotas += 1
    }
    if(lutaResult === 2){
        lutd2.vitorias += 1
        lutd1.derrotas += 1
    }
    console.log(`
    ======CARTEL ATUALIZADO====
    ${formatarLutador(lutd1)}
    ${formatarLutador(lutd2)}
    ============================
        `)
}

function listarRanking(arr){
    for(let i=0; i<arr.length; i++){
        console.log(`\n${formatarLutador(arr[i])} | ${calcTaxaVitoria(arr[i]).toFixed(2)}%`)
    }
}

function rankingLutadores(arr){
    let rankingArr = []
    for(let i=0; i<arr.length; i++){
        rankingArr.push(arr[i])
    }
    rankingArr.sort((a,b)=>
        calcTaxaVitoria(b) - calcTaxaVitoria(a)
    )

    listarRanking(rankingArr)

}

const lutadores = [
    {
        nome: "Charles Oliveira",
        vitorias: 36,
        derrotas: 11,
        categoria: "Peso-leve"
    },
    {
        nome: "Max Holloway",
        vitorias: 27,
        derrotas: 8,
        categoria: "Peso-leve"
    },
    {
        nome: "Islam Makhachev",
        vitorias: 28,
        derrotas: 1,
        categoria: "Peso-meio-médio"
    }
];

let escolha = 0
let sistema = true

while(sistema){
    console.log(`
========== UFC ==========
1. Listar lutadores
2. Buscar lutador
3. Ver melhor cartel
4. Registrar luta
5. Ver ranking
6. Sair
=========================
        `)

    escolha = Number(pergunta("Insira um numero: "))

    switch(escolha){
        case 1: 
            listarLutadores(lutadores)
            break

        case 2:
            let nomeLutador = pergunta("Nome do lutador: ")

            let lutadorEncontrado = buscarLutador(lutadores, nomeLutador)
            lutadorEncontrado 
                ? console.log(formatarLutador(lutadorEncontrado))  
                : console.log("Lutador não encontrado")
            break
    
        case 3:
            melhorCartel(lutadores)
            break

        case 4:
            let lutador1
            let lutador2
            while(true){
                lutador1 = pergunta("Lutador 1: ")
                if(buscarLutador(lutadores, lutador1)){
                    break
                }
                console.log("Lutador inválido")
            }
            
            while(true){
                lutador2 = pergunta("Lutador 2: ")
                if(!buscarLutador(lutadores, lutador2)){
                    console.log("Lutador inválido")
                    continue
                }
                
                
                if(lutador1.trim().toLowerCase() === lutador2.trim().toLowerCase()){
                    console.log("Lutador já informado")
                    continue
                }
                break
            }

           
            console.log(`
    QUEM VENCEU?
    1. ${lutador1}
    2. ${lutador2}
                `)

            let lutaResult
            while(true){
                lutaResult = Number(pergunta("Vitória: "))
                if(lutaResult != 1 && lutaResult != 2){
                    console.log("Valor inválido")
                    continue
                }
                break
            }
                registrarLuta(lutadores, lutador1, lutador2, lutaResult)
                break
        
        case 5:
            rankingLutadores(lutadores)
            break

        case 6:
            sistema = false
            break

        default:
            console.log("Informe um número válido")
    }
}
