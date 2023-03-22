//! MEDIA EXPLICACION DE VARIABLES
//! NO PUDE CON RAICES D:

const { derivative, simplify, parse } = require("mathjs");

function formulaNewton(funcion, simbolo, xInicial) {
  try {
    splitFuncion = funcion.split("=");
    funcion = splitFuncion[0];
    if (xInicial == "") {
      xInicial = sinValorInicial(funcion, simbolo);
    }
    iteracion = 0;
    xn = xInicial;
    f = parse(funcion);
    const simplified = simplify(f);
    fPrima = parse(derivarFuncion(funcion, simbolo));
    const simplifiedPrima = simplify(fPrima);
    bandera = true;
    console.log("X" + iteracion + " = " + xn);
    while (bandera) {
      iteracion = iteracion + 1;
      resultadoF = simplified.evaluate({ x: xn });
      resultadoFprima = simplifiedPrima.evaluate({ x: xn });
      divisionFuncion = resultadoF / resultadoFprima;
      x = xn - divisionFuncion;
      xn = x;
      console.log("X" + iteracion + " = " + x);
      if (resultadoF.toFixed() == 0 && iteracion >= 5) {
        console.log(
          "en X" + iteracion + " = " + xn + " esta aproximadamente la raiz"
        );
        bandera = false;
      }
    }
  } catch (error) {
    console.log("error ", error);
  }
}

function sinValorInicial(funcion, simbolo) {
  const f = parse(funcion);
  const simplified = simplify(f);
  valorInicial = 0;
  bandera = true;
  max = 0;
  min = 0;
  xInicialAux = 0;
  while (bandera) {
    resultadoFuncion = simplified.evaluate({ x: valorInicial });
    if (resultadoFuncion < 0) {
      min = resultadoFuncion;
    } else {
      max = resultadoFuncion;
    }
    if (min < 0 && max > 0) {
      xInicialAux = valorInicial - 1;
      xInicial = valorInicial;
      bandera = false;
    }
    valorInicial = valorInicial + 1;
  }
  if (xInicial < xInicialAux) {
    xInicial = xInicial;
  } else {
    xInicial = xInicialAux;
  }
  return xInicial;
}

function derivarFuncion(funcion, simbolo) {
  return derivative(funcion, simbolo).toString();
}

function main() {
  formulaNewton(funcion, simbolo, xInicial);
}

main();
