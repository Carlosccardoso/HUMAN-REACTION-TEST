
let segundos = 0;
let milissegundos = 0;
let intervalId;
var timeout = null;

var escondeS = document.querySelector("#segundos")
var escondeMS = document.querySelector("#milissegundos")
escondeS.classList.add("none")
escondeMS.classList.add("none")

function incrementarTempo() {
    milissegundos += 10;
    if (milissegundos === 1000) {
        segundos++;
        milissegundos = 0;
    }
    document.getElementById('segundos').innerHTML = segundos;
    document.getElementById('milissegundos').innerHTML = milissegundos;
}

function comecarTest() {
    var corDaBox = document.querySelector(".box");
    var span = document.getElementById("p");
    span.innerHTML = "Clique e aguarde o verde";
    corDaBox.style.backgroundColor = "rgba(0,0,0,0.8)"

    corDaBox.onclick = function () {
        span.innerHTML = "Aguarde";
        corDaBox.onclick = null;
        iniciarContagem();
    };

    segundos = 0;
    milissegundos = 0;
    document.getElementById('segundos').innerHTML = segundos;
    document.getElementById('milissegundos').innerHTML = milissegundos;
}

function iniciarContagem() {
    var corDaBox = document.querySelector(".box");
    var span = document.getElementById("p");

    const aleatorio = Math.floor(Math.random() * 10) + 1;
    const numero = Math.random();
    console.log("numero ", numero);

    if (timeout != null) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
        if (numero < 0.5) {
            corDaBox.style.backgroundColor = "green"
            span.innerHTML = "VERDE";
            intervalId = setInterval(incrementarTempo, 10);
            corDaBox.onclick = function () {
                pararContagem();
            };
        } else {
            corDaBox.style.backgroundColor = "red"
            span.innerHTML = "VERMELHO";
            corDaBox.onclick = function () {
                span.innerHTML = "DEU RUIM";
                corDaBox.onclick = null;
                return clearTimeout(reload)
            };
            var reload = setTimeout(() => {
                resetarBox();
                iniciarContagem();
            }, 2000);
        }
    }, aleatorio * 1000);
}

function pararContagem() {
    var corDaBox = document.querySelector(".box");
    var span = document.getElementById("p");

    clearInterval(intervalId);

    var realMs = `${segundos == 0 ? '' : segundos}${milissegundos}ms`;
    span.innerHTML = "Tempo: " + realMs;
    corDaBox.onclick = null;
}

function resetarBox() {
    var corDaBox = document.querySelector(".box");
    var span = document.getElementById("p");

    corDaBox.style.backgroundColor = "rgba(0,0,0,0.8)"
    span.innerHTML = "Aguarde";
}
