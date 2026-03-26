// ============================================================
//  NEURÔNIO FEEDFORWARD — CÓDIGO CORRIGIDO
//  Corrigido por: análise matemática (ChatGPT + Claude)
// ============================================================

// ─── Funções de ativação ─────────────────────────────────────

function binaryStep(n = 0) {
    return n >= 0 ? 1 : 0;
    // Não possui derivada real (descontinuidade em 0).
    // Usada apenas como classificador simples (sim/não).
}

function sigmoid(n = 0) {
    return 1 / (1 + Math.exp(-n));
    // Math.exp é mais eficiente que Math.pow(Math.E, -n)
}

function sigmoidDerivada(n = 0) {
    const s = sigmoid(n);
    return s * (1 - s);
    // Derivada real da sigmoid, avaliada na SOMA (não no erro)
}

function tanhFn(n = 0) {
    return Math.tanh(n);
    // Math.tanh já existe nativamente no JS — não precisa de sinh/cosh
}

function tanhDerivada(n = 0) {
    const t = Math.tanh(n);
    return 1 - t * t;
    // Derivada real da tanh
}

function relu(n = 0) {
    return Math.max(0, n);
}

function reluDerivada(n = 0) {
    return n > 0 ? 1 : 0;
    // Derivada real da relu (subgradiente: 0 no ponto n=0)
}

function leakyRelu(n = 0) {
    return n >= 0 ? n : 0.01 * n;
    // CORRIGIDO: Math.max(n, 0.01) estava ERRADO —
    // nunca retornava valores negativos.
    // A definição correta: se n < 0, retorna 0.01 * n (valor negativo pequeno)
}

function leakyReluDerivada(n = 0) {
    return n >= 0 ? 1 : 0.01;
    // Derivada real da leaky relu
}

// ─── Auxiliares: despacho de ativação e derivada ─────────────

function ativar(nome, soma) {
    switch (nome) {
        case 'tanh':       return tanhFn(soma);
        case 'relu':       return relu(soma);
        case 'leakyRelu':  return leakyRelu(soma);
        case 'binaryStep': return binaryStep(soma);
        default:           return sigmoid(soma);   // 'sigmoid' é o padrão
    }
}

function derivarAtivacao(nome, soma) {
    switch (nome) {
        case 'tanh':       return tanhDerivada(soma);
        case 'relu':       return reluDerivada(soma);
        case 'leakyRelu':  return leakyReluDerivada(soma);
        case 'binaryStep': return 0;  // não diferenciável; gradiente zero
        default:           return sigmoidDerivada(soma);
    }
}

// ─── Neurônio feedforward com treinamento correto ────────────
//
// Parâmetros:
//   entradas  {number[]}  — camada de entrada (array de números)
//   objetivo  {number}    — valor alvo (entre 0 e 1)
//   epocas    {number}    — quantidade de iterações de treino
//   ativacao  {string}    — 'sigmoid' | 'tanh' | 'relu' | 'leakyRelu' | 'binaryStep'
//   lr        {number}    — learning rate / taxa de aprendizado (ex: 0.1)
//
// Retorna: array de pesos treinados

function feedForward(
    entradas  = [],
    objetivo  = 0.5,
    epocas    = 100,
    ativacao  = 'sigmoid',
    lr        = 0.1        // ADICIONADO: taxa de aprendizado (era ausente)
) {
    // Clamp do objetivo para o intervalo válido [0, 1]
    objetivo = Math.min(1, Math.max(0, objetivo));

    // CORRIGIDO: cópia das entradas para não corromper o array original
    const x = [...entradas];

    // Pesos inicializados aleatoriamente entre -0.5 e 0.5
    // (pequenos valores centrados facilitam a convergência)
    let pesos = x.map(() => Math.random() - 0.5);

    for (let epoca = 1; epoca <= epocas; epoca++) {

        // 1. FORWARD PASS — calcula a soma ponderada e aplica ativação
        let soma = 0;
        for (let j = 0; j < x.length; j++) {
            soma += x[j] * pesos[j];
        }
        const saida = ativar(ativacao, soma);
        // CORRIGIDO: saida é number, não string
        // toFixed() foi removido daqui — ele retorna string e quebrava os cálculos

        // 2. CÁLCULO DO ERRO — preserva o sinal
        const erro = objetivo - saida;
        // CORRIGIDO: era Math.abs(objetivo - saida), que removia o sinal.
        // Sem sinal, os pesos só subiam; nunca desciam.

        // 3. GRADIENTE REAL — regra delta
        const gradiente = erro * derivarAtivacao(ativacao, soma);
        // CORRIGIDO: era gradientDescent(error) = error * (1 - error)
        // que é a derivada da sigmoid aplicada no ERRO — sem base matemática.
        // O correto é: erro × derivada_da_ativação avaliada na SOMA.

        // 4. ATUALIZAÇÃO DOS PESOS com learning rate e direção correta
        for (let j = 0; j < x.length; j++) {
            pesos[j] += lr * gradiente * x[j];
            // CORRIGIDO: adicionado lr (learning rate)
            // CORRIGIDO: x[j] nunca é alterado (era entradas[j] = 0.1 antes)
        }

        // toFixed() APENAS aqui, só para exibição no console
        const erroExib  = Math.abs(erro).toFixed(4);
        const saidaExib = saida.toFixed(4);

        const pad = String(epoca).padStart(8, '0');
        console.log(`época: ${pad} | taxa de erro: ${erroExib} | saída: ${saidaExib}`);
    }

    return pesos;   // retorna os pesos treinados ao final
}

// ─── Exemplos de uso ─────────────────────────────────────────

// Exemplo 1: sigmoid, objetivo 0.9
console.log('\n=== Sigmoid | objetivo: 0.9 ===');
const pesos1 = feedForward([0.5, 0.8, 0.3], 0.9, 50, 'sigmoid', 0.1);
console.log('Pesos finais:', pesos1);

// Exemplo 2: relu, objetivo 0.7
console.log('\n=== ReLU | objetivo: 0.7 ===');
const pesos2 = feedForward([1.0, 0.4], 0.7, 50, 'relu', 0.01);
console.log('Pesos finais:', pesos2);

// Exemplo 3: tanh, objetivo 0.5
console.log('\n=== Tanh | objetivo: 0.5 ===');
const pesos3 = feedForward([0.2, 0.6, 0.9, 0.1], 0.5, 50, 'tanh', 0.05);
console.log('Pesos finais:', pesos3);
