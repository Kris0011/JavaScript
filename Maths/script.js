document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();
  solveFunc();
});

function solveFunc() {
  const myFunction = document.getElementById("functionInput").value;
  const x0 = parseFloat(document.getElementById("x0Input").value);
  const y0 = parseFloat(document.getElementById("y0Input").value);
  const h = parseFloat(document.getElementById("stepHeightInput").value);
  const n = parseFloat(document.getElementById("nInput").value);

  // Define the derivative function (dy/dx)
  function derivative(x, y) {
    const func = new Function("x", "y", `return (${myFunction})`);
    return func(x, y);
  }

  // Euler's method for solving the initial value problem
  function eulerMethod(h, x0, y0, xTarget) {
    let x = x0;
    let y = y0;

    let results = "";

    while (x <= xTarget) {
      const slope = derivative(x, y);
      results += `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}<br>`;
      y += h * slope;
      x += h;
      x = parseFloat(x.toFixed(100)); // Handle floating-point precision error
    }

    return results;
  }

  const xTarget = n;

  const results = eulerMethod(h, x0, y0, xTarget);
  document.getElementById("output").innerHTML = results;
}
