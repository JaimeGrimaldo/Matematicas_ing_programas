const bisectionForm = document.getElementById("bisection-form");
const resultDiv = document.getElementById("result");

function onSubmit(event) {
	event.preventDefault();
	let f = bisectionForm.function.value;
	let a = parseFloat(bisectionForm.a.value);
	let b = parseFloat(bisectionForm.b.value);
	let tolerance = parseFloat(bisectionForm.tolerance.value);

	if (isNaN(a) || isNaN(b) || isNaN(tolerance)) {
		resultDiv.innerText = "Error: Por favor, ingrese valores numéricos válidos para a, b y tolerancia.";
		return;
	}

	if (a >= b) {
		resultDiv.innerText = "Error: El valor de a debe ser menor que el valor de b.";
		return;
	}

	let fa = evaluateFunction(f, a);
	let fb = evaluateFunction(f, b);

	if (fa * fb > 0) {
		resultDiv.innerText = "Error: La función debe cambiar de signo en el intervalo [a, b].";
		return;
	}

	let iterations = 0;
	let c;

	do {
		c = (a + b) / 2;
		let fc = evaluateFunction(f, c);

		if (fa * fc < 0) {
			b = c;
			fb = fc;
		} else {
			a = c;
			fa = fc;
		}

		iterations++;
	} while (Math.abs(b - a) > tolerance);

	resultDiv.innerText = `El valor de x que hace f(x) igual a cero es: ${c.toFixed(4)}. Se necesitaron ${iterations} iteraciones.`;
    // Generamos la tabla de cálculos
    let table = "<table><thead><tr><th>Iteración</th><th>a</th><th>b</th><th>xr</th><th>f(a)</th><th>f(b)</th><th>f(xr)</th><th>Error</th></tr></thead><tbody>";

    // Variables para mantener el registro de los valores en cada iteración
    let a_i = a;
    let b_i = b;
    let xr_i = xr;
    let fa_i = fa;
    let fb_i = fb;
    let fr_i = fr;
    let error = b - a;

    for (let i = 1; i <= iter; i++) {
        // Actualizamos los valores para la siguiente iteración
        if (fa_i * fr_i < 0) {
            b_i = xr_i;
            fb_i = fr_i;
        } else {
            a_i = xr_i;
            fa_i = fr_i;
        }

        xr_i = (a_i + b_i) / 2;
        fr_i = f(xr_i);

        error = b_i - a_i;

        // Agregamos una fila a la tabla para esta iteración
        table += `<tr><td>${i}</td><td>${a_i.toFixed(4)}</td><td>${b_i.toFixed(4)}</td><td>${xr_i.toFixed(4)}</td><td>${fa_i.toFixed(4)}</td><td>${fb_i.toFixed(4)}</td><td>${fr_i.toFixed(4)}</td><td>${error.toFixed(4)}</td></tr>`;
    }

    // Cerramos la tabla
    table += "</tbody></table>";

    // Mostramos la tabla en la página
    document.getElementById("table").innerHTML = table;

}

function evaluateFunction(f, x) {
	return eval(f.replace(/x/g, x));
}

bisectionForm.addEventListener("submit", onSubmit);
