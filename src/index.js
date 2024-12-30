const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result
}

async function logRollResult(CharName, block, diceResult, attribute) {
    console.log(`${CharName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);

}
async function playRaceEngine(char1, char2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + char1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + char2.VELOCIDADE;

            await logRollResult(char1.NOME, "Velocidade", diceResult1, char1.VELOCIDADE);
            await logRollResult(char2.NOME, "Velocidade", diceResult2, char2.VELOCIDADE);

        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + char1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + char2.MANOBRABILIDADE;

            await logRollResult(char1.NOME, "Manobrabilidade", diceResult1, char1.MANOBRABILIDADE);
            await logRollResult(char2.NOME, "Manobrabilidade", diceResult2, char2.MANOBRABILIDADE);
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + char1.PODER;
            let powerResult2 = diceResult2 + char2.PODER;

            console.log(`${char1.NOME} confrontou com ${char2.NOME}! 🥊`);

            await logRollResult(char1.NOME, "Poder", diceResult1, char1.PODER);
            await logRollResult(char2.NOME, "Poder", diceResult2, char2.PODER);

            if (powerResult1 > powerResult2 && char2.PONTOS > 0) {
                console.log(`${char1.NOME} venceu o confronto! ${char2.NOME} perdeu 1 ponto 🐢`)
                char2.PONTOS--;
            }
            if (powerResult2 > powerResult1 && char1.PONTOS > 0) {
                console.log(`${char2.NOME} venceu o confronto! ${char1.NOME} perdeu 1 ponto 🐢`)
                char1.PONTOS--;
            }

          

            console.log(powerResult2 === powerResult1 ? `Confronto empatado! Nenhum ponto foi perdido!` : "");
        }
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${char1.NOME} marcou um ponto!`);
            char1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${char2.NOME} marcou um ponto!`);
            char2.PONTOS++;
        }
        console.log(`\n---------------------------------\n`)
    }
}

async function declareWinner(char1, char2) {
    console.log(`Resultado final:`);
    console.log(`${char1.NOME}: ${char1.PONTOS} ponto(s)`);
    console.log(`${char2.NOME}: ${char2.PONTOS} ponto(s)`);

    if (char1.PONTOS > char2.PONTOS) {
        console.log(`\n${char1.NOME} venceu a corrida! Parabéns! 🏆`);
    } else if (char1.PONTOS < char2.PONTOS) {
        console.log(`\n${char2.NOME} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log(`\nA corrida terminou em empate!`);
    }

}


//Template de função autoinvocavel
(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );
    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})();

