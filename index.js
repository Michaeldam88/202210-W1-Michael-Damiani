let acumulado = "0";
let numero = "",
    numero1 = "",
    numero2 = "",
    operador = "",
    ms = "";
resultado = 0;

// recibimos los numeros y los visualizamos 0123456789
const addNumber = (num) => {
    resultado = 0;

    //actualizamos el visualizador
    switch (true) {
        case acumulado === "0" && num === "0":
            acumulado = "0";
            break;

        case acumulado === "0" && num !== "0":
            acumulado = num;
            break;

        case num === "0" && numero1 !== "" && numero === "0":
            acumulado = numero1 + operador + "0";
            break;

        case num !== "0" && numero1 !== "" && numero === "0":
            acumulado = numero1 + operador + num;
            break;

        default:
            acumulado += num;
    }
    //almacenamos los numero
    if (numero === "0" && num === "0") {
        numero = "0";
    } else if (numero === "0" && num !== "0") {
        numero = num;
    } else {
        numero += num;
    }

    document.getElementById("resultado").value = acumulado;
};

// Reseteamos todo "Cancel"
const cancel = () => {
    acumulado = "0";
    numero = "";
    numero1 = "";
    numero2 = "";
    operador = "";
    resultado = 0;
    document.getElementById("resultado").value = acumulado;
};

// Guardamos el Operador selecionado
const selectOp = (op) => {
    if (operador !== "" && numero === "") {
        acumulado = acumulado.replace(operador, op);
        operador = op;
        document.getElementById("resultado").value = acumulado;
    } else if (numero1 !== "") {
        calcular();
        numero1 = resultado;
        resultado = 0;
        operador = op;
        acumulado = numero1 + op;
        document.getElementById("resultado").value = acumulado;
    } else if (resultado !== 0) {
        operador = op;
        numero1 = resultado;
        resultado = 0;
        acumulado = numero1 + op;
        document.getElementById("resultado").value = acumulado;
    } else {
        numero === "" ? (numero = 0) : numero;
        numero1 = parseFloat(numero);
        operador = op;
        numero = "";
        acumulado += op;
        document.getElementById("resultado").value = acumulado;
    }
};

// usar el %

const porcentaje = () => {
    if (numero !== "" || resultado !== 0) {
        if (operador === "x" || operador === "÷") {
            acumulado = acumulado.replace(operador + numero, operador + "");
            numero = numero / 100;
            document.getElementById("resultado").value = acumulado + numero;
        } else if (operador === "-" || operador === "+") {
            acumulado = acumulado.replace(operador + numero, operador + "");
            numero = (numero / 100) * numero1;
            document.getElementById("resultado").value = acumulado + numero;
        } else if (resultado !== 0) {
            acumulado = resultado + "%";
            document.getElementById("resultado").value = acumulado;
            numero1 = parseFloat(resultado / 100);
            operador = "x";
            numero = "";
            resultado = 0;
        } else {
            acumulado = numero + "%";
            document.getElementById("resultado").value = acumulado;
            numero1 = parseFloat(numero / 100);
            operador = "x";
            numero = "";
        }
    }
};

// usar la coma
const coma = () => {
    if (numero1 !== "" && numero.indexOf(".") === -1) {
        addNumber(".");
    } else if (numero.indexOf(".") === -1) {
        addNumber(".");
    }
};

// MS
const memorySave = () => {
    if (resultado !== 0) {
        ms = resultado;
    } else {
        ms = numero;
    }

    if (ms === "" || ms === "0") {
        document
            .querySelector("#ms-check")
            .setAttribute("style", "display: none");
        ms = "0";
    } else {
        document
            .querySelector("#ms-check")
            .setAttribute("style", "display: inline");
    }
};
// MR
const memoryRecall = () => {
    if (numero1 === "") {
        acumulado = "0";
    } else {
        acumulado = acumulado.replace(operador + numero, operador + "");
    }
    numero = "";
    addNumber(ms);
};

//calcular
const calcular = () => {
    if (numero1 !== "" && numero !== "") {
        numero2 = parseFloat(numero);
        switch (operador) {
            case "-":
                resultado = numero1 - numero2;
                acumulado = "0";
                numero = "";
                numero1 = "";
                numero2 = "";
                operador = "";
                break;

            case "+":
                resultado = numero1 + numero2;
                acumulado = "0";
                numero = "";
                numero1 = "";
                numero2 = "";
                operador = "";
                break;

            case "÷":
                resultado = numero1 / numero2;
                acumulado = "0";
                numero = "";
                numero1 = "";
                numero2 = "";
                operador = "";
                break;

            case "x":
                resultado = numero1 * numero2;
                acumulado = "0";
                numero = "";
                numero1 = "";
                numero2 = "";
                operador = "";
                break;
        }
        document.getElementById("resultado").value = resultado;
    } else if (numero1 !== "") {
        resultado = numero1;
        acumulado = "0";
        numero = "";
        numero1 = "";
        numero2 = "";
        operador = "";
        document.getElementById("resultado").value = resultado;
    } else {
        resultado = 0;
        acumulado = "0";
        numero = "";
        numero1 = "";
        numero2 = "";
        operador = "";
        document.getElementById("resultado").value = resultado;
    }
};

const logKey = (e) => {
    e = e.key;
    switch (e) {
        case ",":
        case ".":
            coma();
            break;

        case "Delete":
        case "Backspace":
            cancel();
            break;

        case "/":
            selectOp("÷");
            break;
        case "*":
            selectOp("x");
            break;
        case "-":
        case "+":
            selectOp(e);
            break;

        case "%":
            porcentaje();
            break;

        case "Enter":
            calcular();
            break;

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            addNumber(e);
            break;
    }
};
document.addEventListener("keydown", logKey);
