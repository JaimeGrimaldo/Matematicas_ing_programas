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
guardarErrorPor = [];
guardarIteracion = [];
// Aquí detallar rutas
app.get("/", (req, res) => {
  res.render("falsa");
});

app.post("/", (req, res) => {
  try {
    console.log(req.body)
    const { funcion, x1, x2 } = req.body;
    operacion[0] = funcion;
    operacion[1] = x1;
    operacion[2] = x2;
    erroPorcetual(funcion, x1, x2);
    res.redirect("/resultado");
  } catch (error) {
    console.log(error, " este es el error que pedo del try");
  }
});

app.get("/resultado", (req, res) => {
  console.log(guardarValoresX, " guardar valores debe de estar lleno alv");
  res.render("resultado", { guardarValoresX, guardarErrorPor });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function falsaPosicion(funcion, x1, x2) {
  funcionSplit = funcion.split("=");

  if (x1 == "" && x2 == "") {
    console.log(funcionSplit[0]);
    vector = intervaloVacio(funcionSplit[0]);
    xl = vector[0];
    xu = vector[1];
  }
  if (x1 > x2) {
    xu = x1;
    xl = x2;
  } else {
    xl = x1;
    xu = x2;
  }
  bandera = true;
  iteracion = 0;
  auxXr = [];
  const f = parse(funcionSplit[0]);
  const simplified = simplify(f);
  while (bandera) {
    resultadoFxu = simplified.evaluate({ x: xu });
    resultadoFxl = simplified.evaluate({ x: xl });
    multiplicacion1 = resultadoFxu * (xl - xu);
    restaFunciones = resultadoFxl - resultadoFxu;
    division = multiplicacion1 / restaFunciones;
    xr = xu - division;
    imagenXr = simplified.evaluate({ x: xr });
    comprobacion = resultadoFxl * imagenXr;

    console.log("Xr = " + xr + " en la iteracion " + iteracion);
    guardarValoresX[iteracion] = xr;
    if (comprobacion > 0) {
      auxXr[iteracion] = xr;
      xl = xr;
    }
    if (auxXr.length > 1) {
      if (auxXr[iteracion - 1].toFixed(5) == auxXr[iteracion].toFixed(5)) {
        bandera = false;
      }
    }
    iteracion = iteracion + 1;
  }
  return auxXr;
}

function intervaloVacio(funcion) {
  xl = 0;
  xu = 0;
  bandera = true;
  max = 0;
  min = 0;
  valorInicial = 0;
  const f = parse(funcion);
  const simplified = simplify(f);

  while (bandera) {
    resultadoFuncion = simplified.evaluate({ x: valorInicial });
    console.log(resultadoFuncion);
    if (resultadoFuncion < 0) {
      min = resultadoFuncion;
    } else {
      max = resultadoFuncion;
    }
    if (min < 0 && max > 0) {
      xl = valorInicial - 1;
      xu = valorInicial;
      bandera = false;
    }
    valorInicial = valorInicial + 1;
  }
  if (xl > xu) {
    xu = xl;
    xl = xu;
  }
  let vectorRetorno = [xl, xu];
  return vectorRetorno;
}

function erroPorcetual(funcion, x1, x2) {
  xrVecto = falsaPosicion(funcion, x1, x2);
  for (let i = 0; i < xrVecto.length; i++) {
    errorP = ((xrVecto[i + 1] - xrVecto[i]) / xrVecto[i + 1]) * 100;
    guardarErrorPor[i] = errorP;
    if (i + 1 > xrVecto.length) {
      break;
    }
  }
}
