const { derivative, simplify, parse } = require("mathjs");

// Configuración inicial
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const morgan = require("morgan");

// Motor de plantilla
const hbs = require("hbs");
hbs.registerPartials(__dirname + "\\views\\partials", function (err) {});
app.set("view engine", "hbs");
app.set("views", __dirname + "\\views");

app.use(express.static(__dirname + "\\public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

operacion = [];
guardarValoresX = [];
guardarIteracion = [];
// Aquí wdetallar rutas
app.get("/", (req, res) => {
  res.render("newton");
});

app.post("/", (req, res) => {
  try {
    const { funcion, xInicial } = req.body;
    operacion[0] = funcion;
    operacion[1] = xInicial;
    formulaNewton();
    res.redirect("/resultado");
  } catch (error) {
    console.log(error, " este es el error que pedo del try");
  }
});

app.get("/resultado", (req, res) => {
  console.log(guardarValoresX, " guardar valores debe de estar lleno alv");
  res.render("resultado", { guardarValoresX, guardarIteracion });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
//guardar cosas
function formulaNewton() {
  try {
    splitfuncion = operacion[0].split("=");
    funcion = splitfuncion[0];
    xInicial = operacion[1];
    console.log(funcion, " xInicial ", xInicial, " xInicial"); //!aqu
    splitFuncion = funcion.split("=");
    funcion = splitFuncion[0];
    if (xInicial == "") {
      xInicial = sinValorInicial(funcion);
    }
    iteracion = 0;
    xn = xInicial;
    f = parse(funcion);
    const simplified = simplify(f);
    fPrima = parse(derivarFuncion(funcion));
    const simplifiedPrima = simplify(fPrima);
    bandera = true;
    while (bandera) {
      iteracion = iteracion + 1;
      resultadoF = simplified.evaluate({ x: xn });
      resultadoFprima = simplifiedPrima.evaluate({ x: xn });
      divisionFuncion = resultadoF / resultadoFprima;
      x = xn - divisionFuncion;
      xn = x;
      guardarValoresX[iteracion] = xn;
      guardarIteracion[iteracion] = iteracion;
      if (resultadoF.toFixed() == 0 && iteracion >= 5) {
        guardarValoresX[iteracion] = xn;
        guardarIteracion[iteracion] = iteracion;
        bandera = false;
      }
    }
  } catch (error) {
    console.log("error ", error);
  }
}

function sinValorInicial(funcion) {
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

function derivarFuncion(funcion) {
  return derivative(funcion, "x").toString();
}

// newtonForm.addEventListener("submit", onSubmit);
