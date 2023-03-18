function f(x) {
    // Ingresa la función que quieres resolver aquí
    return Math.pow(x, 3) - 2 * x - 5;
}

function calcular() {
    // Definimos las variables
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let tol = parseFloat(document.getElementById("tolerance").value);

    let fa = f(a);
    let fb = f(b);
    let xr = 0;
    let fr = 0;
    let iter = 0;

    // Generamos la tabla de cálculos
    let table = "<table><thead><tr><th>Iteración</th><th>a</th><th>b</th><th>xr</th><th>f(a)</th><th>f(b)</th><th>f(xr)</th><th>Error</th></tr></thead><tbody>";

    // Bucle principal
    while ((b - a) >= tol) {
        xr = (a + b) / 2;
        fr = f(xr);

        if (fr == 0) {
            break;
        } else if (fa * fr < 0) {
            b = xr;
            fb = fr;
        } else {
            a = xr;
            fa = fr;
        }

        iter++;
        error = b - a;

        // Agregamos los valores de la iteración a la tabla
        table += "<tr><td>" + iter + "</td><td>" + a.toFixed(4) + "</td><td>" + b.toFixed(4) + "</td><td>" + xr.toFixed(4) + "</td><td>" + fa.toFixed(4) + "</td><td>" + fb.toFixed(4) + "</td><td>" + fr.toFixed(4) + "</td><td>" + error.toFixed(4) + "</td></tr>";
    }

    // Cerramos la tabla
    table += "</tbody></table>";

    // Mostramos el resultado y la tabla
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p>La raiz aproximada es: " + xr.toFixed(4) + "</p>";
    const tableDiv = document.getElementById("table");
    tableDiv.innerHTML = table;
}
