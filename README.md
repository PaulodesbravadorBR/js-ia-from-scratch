Feedforward Neural Networks in JavaScript 🧠
This repository contains a didactic implementation of a Feedforward neural network built from scratch using pure JavaScript (Vanilla JS). The goal of this project is to demonstrate the mathematical logic and algorithms that underpin machine learning.

🚀 What does this code do?
The script implements the basic flow of a single-neuron neural network, including:

Activation Functions: Manual implementations of Sigmoid, Tanh, ReLU, Leaky ReLU, and Binary Step — each with its own correct mathematical derivative.
Backpropagation (Delta Rule): The weight update uses the real gradient: error × derivative_of_activation(sum), evaluated at the weighted sum — not at the error value.
Learning Rate: A configurable lr parameter controls the step size of each weight update, preventing unstable or divergent training.
Epoch Processing: Iterative training to bring the network's output closer to the desired target, with the sign of the error preserved so weights can both increase and decrease.


🛠️ Technologies Used

JavaScript (ES6+): Use of modern methods such as spread operator (...), arrow functions, Math.exp(), Math.tanh(), and template literals.
Computational Mathematics: Correct application of derivatives for each activation function, signed error calculation, and gradient-based weight adjustment.


📐 Mathematical Corrections (v2)
The original version contained several mathematical inaccuracies. Here is what was fixed:
#ProblemOriginalFixed1Wrong derivativeerror * (1 - error) applied to the errorerror × derivative_of_activation(sum) applied to the weighted sum2Loss of error signMath.abs(objetivo - saidas)objetivo - saida (signed — allows weights to go up or down)3No learning rateweights updated without step controllr parameter added (pesos[j] += lr * gradient * x[j])4toFixed() inside calculationsreturned a string, breaking arithmeticmoved to console.log() only — all internal values stay as number5Input data mutatedentradas[j] = 0.1 inside the loopinputs copied with [...entradas] before training; originals untouched6Wrong leakyReluMath.max(n, 0.01) — never returns negative valuesn >= 0 ? n : 0.01 * n — correct definition

📚 Key Learnings
During the development and correction of this code, the following concepts were explored:

How weights influence input data through the weighted sum.
The importance of non-linearity through activation functions — enabling the network to model complex patterns.
The role of derivatives in backpropagation: each activation function has its own derivative, which must be evaluated at the weighted sum, not at the error.
How the sign of the error determines whether weights should increase or decrease.
The role of learning rate in controlling convergence — too high causes instability, too low slows learning.
Why immutability of input data matters: modifying training data mid-epoch corrupts the learning process.


🖥️ How to run
Paste the code into your browser's console or run it via Node.js and call the main function:
js// feedForward(inputs, target, epochs, activation, learningRate)
feedForward([0.5, 0.8, 0.2], 0.9, 100, 'sigmoid', 0.1);
Available activation functions: 'sigmoid' (default) · 'tanh' · 'relu' · 'leakyRelu' · 'binaryStep'
Expected output:
época: 00000001 | taxa de erro: 0.3241 | saída: 0.5759
época: 00000002 | taxa de erro: 0.2987 | saída: 0.6013
...
época: 00000100 | taxa de erro: 0.0412 | saída: 0.8588
Pesos finais: [0.312, 0.587, 0.201]

📝 Notes

This is a didactic project — the focus is on readability and mathematical correctness, not performance.
This implements a single neuron (perceptron), not a full multi-layer network. Multi-layer backpropagation would require propagating gradients through each layer.
binaryStep has no real derivative (it is discontinuous at 0), so its gradient is treated as zero — weights will not update when this activation is selected.
For production use, consider libraries such as TensorFlow.js or Brain.js.
