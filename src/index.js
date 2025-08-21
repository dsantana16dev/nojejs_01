// Lista de personagens
const characters = [
    { NOME: "Mario", VELOCIDADE: 4, MANOBRALIDADEDE: 3, PODER: 3, PONTOS: 0, IMG: "./docs/mario.gif" },
    { NOME: "Peach", VELOCIDADE: 3, MANOBRALIDADEDE: 4, PODER: 2, PONTOS: 0, IMG: "./docs/peach.gif" },
    { NOME: "Yoshi", VELOCIDADE: 2, MANOBRALIDADEDE: 4, PODER: 3, PONTOS: 0, IMG: "./docs/yoshi.gif" },
    { NOME: "Bowser", VELOCIDADE: 5, MANOBRALIDADEDE: 2, PODER: 5, PONTOS: 0, IMG: "./docs/bowser.gif" },
    { NOME: "Luigi", VELOCIDADE: 3, MANOBRALIDADEDE: 4, PODER: 4, PONTOS: 0, IMG: "./docs/luigi.gif" },
    { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRALIDADEDE: 2, PODER: 5, PONTOS: 0, IMG: "./docs/dk.gif" },
];

// Função para escolher personagens aleatórios
function chooseRandomCharacters() {
    let shuffled = [...characters].sort(() => 0.5 - Math.random()); // embaralha
    return [shuffled[0], shuffled[1]]; // retorna dois
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random()
    let result 

    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);
    
        // sortear bloco
        let block = await getRandomBlock()
        console.log(`🚨 - Bloco: ${block}`)
        
        // Play Dice
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
        
        // Hability Test
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }
        
        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRALIDADEDE;
            totalTestSkill2 = diceResult2 + character2.MANOBRALIDADEDE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRALIDADEDE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRALIDADEDE);
        }

        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            
            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊🥊🥊`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            }

            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            }
    
            console.log(powerResult2 === powerResult1 
                ? "Confronto empatado! Nenhum ponto foi perdido" 
                : "")
        
        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }else if (totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }
        console.log("_______________________________________")
    }
}

async function declereWinner(character1, character2) {
    console.log("Resultado Final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida, Parabêns! 🏆🏆🏆`);
    } else if(character1.PONTOS < character2.PONTOS){
        console.log(`\n${character2.NOME} venceu a corrida, Parabêns! 🏆🏆🏆`);
    } else {
        console.log("A corrida terminou em empate!!! 😁😁😁")
    }
}

// ✅ Só esse main
(async function main() {
    let [player1, player2] = chooseRandomCharacters();

    console.log(`🏁 🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando 🚨 🏁 ... \n`);

    await playRaceEngine(player1, player2);
    await declereWinner(player1, player2);
})();
