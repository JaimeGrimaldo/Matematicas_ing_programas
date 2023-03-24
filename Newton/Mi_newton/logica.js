function calcular() {
    // Obtener los valores de entrada
    let funcion = document.getElementById("funcion").value;
    let valorInicial = parseFloat(document.getElementById("valor-inicial").value);
  
    // Definir la función y su derivada
    let f = (x) => eval(funcion);
    let fDerivada = (x) => eval(Derive(funcion).toString());
  
    // Definir los valores iniciales para la tabla
    let xn = valorInicial;
    let fxn = f(xn);
    let fDerivadaxn = fDerivada(xn);
    let xn1 = xn - (fxn / fDerivadaxn);
    let error = Math.abs((xn1 - xn) / xn1);
  
    // Crear la primera fila de la tabla
    let tabla = document.getElementById("tabla");
    let row = tabla.insertRow();
    let n = row.insertCell();
    let x_n = row.insertCell();
    let fx_n = row.insertCell();
    let fDerivada_x_n = row.insertCell();
    let x_n1 = row.insertCell();
    let errorCell = row.insertCell();
    n.innerHTML = 1;
    x_n.innerHTML = xn.toFixed(6);
    fx_n.innerHTML = fxn.toFixed(6);
    fDerivada_x_n.innerHTML = fDerivadaxn.toFixed(6);
    x_n1.innerHTML = xn1.toFixed(6);
    errorCell.innerHTML = error.toFixed(6);
  
    // Calcular los siguientes valores hasta que el error sea menor a 0.0001
    let i = 2;
    while (error > 0.0001) {
      xn = xn1;
      fxn = f(xn);
      fDerivadaxn = fDerivada(xn);
      xn1 = xn - (fxn / fDerivadaxn);
      error = Math.abs((xn1 - xn) / xn1);
  
      // Crear una nueva fila en la tabla con los valores de esta iteración
      row = tabla.insertRow();
      n = row.insertCell();
      x_n = row.insertCell();
      fx_n = row.insertCell();
      fDerivada_x_n = row.insertCell();
      x_n1 = row.insertCell();
      errorCell = row.insertCell();
      n.innerHTML = i;
      x_n.innerHTML = xn.toFixed(6);
      fx_n.innerHTML = fxn.toFixed(6);
      fDerivada_x_n.innerHTML = fDerivadaxn.toFixed(6);
      x_n1.innerHTML = xn1.toFixed(6);
      errorCell.innerHTML = error.toFixed(6);
      i++;
    }
  
    // Mostrar el resultado final
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `El resultado de la función ${funcion} es: ${xn1.toFixed(6)}`;
  }
  