Single-Neuron Neural Network in JavaScript 🧠

This repository contains a didactic implementation of a single artificial neuron built from scratch using pure JavaScript (Vanilla JS). The goal of this project is to demonstrate the mathematical logic and algorithms that underpin machine learning.

🚀 What does this code do?

The script implements the basic flow of a single-neuron model, including:

* Activation Functions: Manual implementations of Sigmoid, Tanh, ReLU, Leaky ReLU, and Binary Step (with derivatives where applicable).
* Gradient Descent (Delta Rule): Weight updates use the real gradient:
  error × derivative_of_activation(sum), evaluated at the weighted sum.
* Learning Rate: A configurable `lr` parameter controls update step size, helping stabilize training.
* Epoch Processing: Iterative training to bring the output closer to the target, preserving the sign of the error.

🛠️ Technologies Used

* JavaScript (ES6+): Spread operator (...), arrow functions, Math.exp(), Math.tanh(), template literals.
* Computational Mathematics: Derivatives, signed error, and gradient-based updates.

📐 Mathematical Corrections (v2)

| # | Problem                       | Original                  | Fixed                                 |
| - | ----------------------------- | ------------------------- | ------------------------------------- |
| 1 | Wrong derivative              | error * (1 - error)       | error × derivative_of_activation(sum) |
| 2 | Loss of error sign            | Math.abs(target - output) | target - output                       |
| 3 | No learning rate              | uncontrolled updates      | lr parameter added                    |
| 4 | toFixed() inside calculations | returned string           | moved to console.log()                |
| 5 | Input mutation                | inputs modified           | copied with [...inputs]               |
| 6 | Wrong leakyReLU               | Math.max(n, 0.01)         | n >= 0 ? n : 0.01 * n                 |

📚 Key Learnings

* How weights influence inputs through the weighted sum.
* The importance of non-linearity via activation functions.
* The role of derivatives in gradient-based learning.
* How the sign of the error controls weight direction.
* The importance of learning rate for convergence.
* Why input immutability matters.

🖥️ How to run

Paste into browser console or run with Node.js:

```js
feedForward([0.5, 0.8, 0.2], 0.9, 100, 'sigmoid', 0.1);
```

Available activations:
`'sigmoid' (default) · 'tanh' · 'relu' · 'leakyRelu' · 'binaryStep'`

📝 Notes

* This is a didactic project focused on clarity, not performance.
* This implements a single neuron, not a full neural network.
* `binaryStep` has no useful derivative — weights will not update.
* For real-world usage, consider TensorFlow.js or Brain.js.

⚠️ Limitations

* No bias term
* No hidden layers
* No matrix operations
* Not suitable for production ML tasks
