function funcaoSoma(arr = []) {
    return arr.reduce((a, b) => a + b);
} 

function gradientDescent(n = 0) { 
    return n * (1 - n);
}

function binaryStepFunction(n = 0) {
    return n >= 0 ? 1 : 0;
}

function sigmoidFunction(n = 0) {
    return 1 / (1 + Math.pow(Math.E, -n));
}

function tanhFunction(n = 0) {
    return Math.sinh(n) / Math.cosh(n);
}

function relu(n = 0) {
    return Math.max(0, n);
}

function leakyRelu(n = 0) {
    return n >= 0 ? n : 0.01 * n; 
}

function feedForward(entradas = [], objetivo = 0, epocas = 1, ativacao = 'sigmoid') {
    if (objetivo <= 0) objetivo = 0.1;
    else if (objetivo > 1) objetivo = 1;

    let pesos = [];
    for (let i = 0; i < entradas.length; i++) {
        pesos.push(Math.random());
    }

    for (let i = 1; i <= epocas; i++) {
        let multiplicacao = [];
        for (let j = 0; j < entradas.length; j++) {
            if (entradas[j] <= 0) entradas[j] = 0.1;
            multiplicacao.push(entradas[j] * pesos[j]);
        }

        let sum = funcaoSoma(multiplicacao);
        let saidas = 0;
        switch (ativacao) {
            case 'tanh':       saidas = parseFloat(tanhFunction(sum)).toFixed(4);       break; // ← nome corrigido
            case 'sigmoid':    saidas = parseFloat(sigmoidFunction(sum)).toFixed(4);    break; // ← nome corrigido
            case 'relu':       saidas = parseFloat(relu(sum)).toFixed(4);               break;
            case 'leakyRelu':  saidas = parseFloat(leakyRelu(sum)).toFixed(4);          break;
            case 'binaryStep': saidas = parseFloat(binaryStepFunction(sum)).toFixed(4); break; // ← nome corrigido
            default:           saidas = parseFloat(sigmoidFunction(sum)).toFixed(4);
        }

        let error = parseFloat(Math.abs(objetivo - saidas)).toFixed(4);
        for (let j = 0; j < entradas.length; j++) {
            if (entradas[j] <= 0) entradas[j] = 0.1;
            pesos[j] += entradas[j] * gradientDescent(error);
        }
        let imprime = i.toString().padStart(8, '0');
        console.log(`época: ${imprime} - taxa de erro: ${error} - saída: ${saidas}`);
    }
}
