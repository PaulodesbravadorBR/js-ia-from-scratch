function binaryStep(n = 0) {
    return n >= 0 ? 1 : 0;
}

function sigmoid(n = 0) {
    return 1 / (1 + Math.exp(-n));
}

function sigmoidDerivada(n = 0) {
    const s = sigmoid(n);
    return s * (1 - s);
}

function tanhFn(n = 0) {
    return Math.tanh(n);
}

function tanhDerivada(n = 0) {
    const t = Math.tanh(n);
    return 1 - t * t;
}

function relu(n = 0) {
    return Math.max(0, n);
}

function reluDerivada(n = 0) {
    return n > 0 ? 1 : 0;
}

function leakyRelu(n = 0) {
    return n >= 0 ? n : 0.01 * n;
}

function leakyReluDerivada(n = 0) {
    return n >= 0 ? 1 : 0.01;
}

function ativar(nome, soma) {
    switch (nome) {
        case 'tanh':       return tanhFn(soma);
        case 'relu':       return relu(soma);
        case 'leakyRelu':  return leakyRelu(soma);
        case 'binaryStep': return binaryStep(soma);
        default:           return sigmoid(soma);
    }
}

function derivarAtivacao(nome, soma) {
    switch (nome) {
        case 'tanh':       return tanhDerivada(soma);
        case 'relu':       return reluDerivada(soma);
        case 'leakyRelu':  return leakyReluDerivada(soma);
        case 'binaryStep': return 0;
        default:           return sigmoidDerivada(soma);
    }
}

function feedForward(
    entradas  = [],
    objetivo  = 0.5,
    epocas    = 100,
    ativacao  = 'sigmoid',
    lr        = 0.1
) {
    objetivo = Math.min(1, Math.max(0, objetivo));

    const x = [...entradas];

    let pesos = x.map(() => Math.random() - 0.5);

    for (let epoca = 1; epoca <= epocas; epoca++) {

        let soma = 0;
        for (let j = 0; j < x.length; j++) {
            soma += x[j] * pesos[j];
        }
        const saida = ativar(ativacao, soma);

        const erro = objetivo - saida;

        const gradiente = erro * derivarAtivacao(ativacao, soma);

        for (let j = 0; j < x.length; j++) {
            pesos[j] += lr * gradiente * x[j];
        }

        const erroExib  = Math.abs(erro).toFixed(4);
        const saidaExib = saida.toFixed(4);

        const pad = String(epoca).padStart(8, '0');
        console.log(`época: ${pad} | taxa de erro: ${erroExib} | saída: ${saidaExib}`);
    }

    return pesos;function binaryStep(n = 0) {
    return n >= 0 ? 1 : 0;
}

function sigmoid(n = 0) {
    return 1 / (1 + Math.exp(-n));
}

function sigmoidDerivada(n = 0) {
    const s = sigmoid(n);
    return s * (1 - s);
}

function tanhFn(n = 0) {
    return Math.tanh(n);
}

function tanhDerivada(n = 0) {
    const t = Math.tanh(n);
    return 1 - t * t;
}

function relu(n = 0) {
    return Math.max(0, n);
}

function reluDerivada(n = 0) {
    return n > 0 ? 1 : 0;
}

function leakyRelu(n = 0) {
    return n >= 0 ? n : 0.01 * n;
}

function leakyReluDerivada(n = 0) {
    return n >= 0 ? 1 : 0.01;
}

function ativar(nome, soma) {
    switch (nome) {
        case 'tanh':       return tanhFn(soma);
        case 'relu':       return relu(soma);
        case 'leakyRelu':  return leakyRelu(soma);
        case 'binaryStep': return binaryStep(soma);
        default:           return sigmoid(soma);
    }
}

function derivarAtivacao(nome, soma) {
    switch (nome) {
        case 'tanh':       return tanhDerivada(soma);
        case 'relu':       return reluDerivada(soma);
        case 'leakyRelu':  return leakyReluDerivada(soma);
        case 'binaryStep': return 0;
        default:           return sigmoidDerivada(soma);
    }
}

function feedForward(
    entradas  = [],
    objetivo  = 0.5,
    epocas    = 100,
    ativacao  = 'sigmoid',
    lr        = 0.1
) {
    objetivo = Math.min(1, Math.max(0, objetivo));

    const x = [...entradas];

    let pesos = x.map(() => Math.random() - 0.5);

    for (let epoca = 1; epoca <= epocas; epoca++) {

        let soma = 0;
        for (let j = 0; j < x.length; j++) {
            soma += x[j] * pesos[j];
        }
        const saida = ativar(ativacao, soma);

        const erro = objetivo - saida;

        const gradiente = erro * derivarAtivacao(ativacao, soma);

        for (let j = 0; j < x.length; j++) {
            pesos[j] += lr * gradiente * x[j];
        }

        const erroExib  = Math.abs(erro).toFixed(4);
        const saidaExib = saida.toFixed(4);

        const pad = String(epoca).padStart(8, '0');
        console.log(`época: ${pad} | taxa de erro: ${erroExib} | saída: ${saidaExib}`);
    }

    return pesos;
}

console.log('\n=== Sigmoid | objetivo: 0.9 ===');
const pesos1 = feedForward([0.5, 0.8, 0.3], 0.9, 50, 'sigmoid', 0.1);
console.log('Pesos finais:', pesos1);

console.log('\n=== ReLU | objetivo: 0.7 ===');
const pesos2 = feedForward([1.0, 0.4], 0.7, 50, 'relu', 0.01);
console.log('Pesos finais:', pesos2);

console.log('\n=== Tanh | objetivo: 0.5 ===');
const pesos3 = feedForward([0.2, 0.6, 0.9, 0.1], 0.5, 50, 'tanh', 0.05);
console.log('Pesos finais:', pesos3);
}

console.log('\n=== Sigmoid | objetivo: 0.9 ===');
const pesos1 = feedForward([0.5, 0.8, 0.3], 0.9, 50, 'sigmoid', 0.1);
console.log('Pesos finais:', pesos1);

console.log('\n=== ReLU | objetivo: 0.7 ===');
const pesos2 = feedForward([1.0, 0.4], 0.7, 50, 'relu', 0.01);
console.log('Pesos finais:', pesos2);

console.log('\n=== Tanh | objetivo: 0.5 ===');
const pesos3 = feedForward([0.2, 0.6, 0.9, 0.1], 0.5, 50, 'tanh', 0.05);
console.log('Pesos finais:', pesos3);
