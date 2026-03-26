# Feedforward Neural Networks in JavaScript 🧠

This repository contains a didactic implementation of a **Feedforward** neural network
built from scratch using pure JavaScript (Vanilla JS). The goal of this project is to
demonstrate the mathematical logic and algorithms that underpin machine learning.

## 🚀 What does this code do?

The script implements the basic flow of a simple neural network, including:

- **Activation Functions:** Manual implementations of `Sigmoid`, `Tanh`, `ReLU`,
  `Leaky ReLU`, and `Binary Step`.
- **Gradient Descent:** An optimization algorithm for adjusting weights and
  minimizing prediction error.
- **Epoch Processing:** Iterative training to bring the network's output closer
  to the desired target.

## 🛠️ Technologies Used

- **JavaScript (ES6+):** Use of modern methods such as `.reduce()`, arrow functions,
  and template literals.
- **Computational Mathematics:** Manipulation of exponentials, powers, and
  error functions.

## 📚 Key Learnings

During the development of this code, the following concepts were explored:

1. How **Weights** influence input data.
2. The importance of **Non-Linearity** through activation functions.
3. The calculation of **Error Rate** for adjusting the network's parameters.

## 🖥️ How to run

Simply paste the code into your browser's console or run it via Node.js and call
the main function:
```javascript
feedForward([0.5, 0.8, 0.2], 1, 100, 'sigmoid');
```

## 📝 Notes

- This is a **didactic project** — the focus is on readability and understanding,
  not performance.
- The gradient descent implementation uses a simplified derivative suitable for
  educational purposes.
