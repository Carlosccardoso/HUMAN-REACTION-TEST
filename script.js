let segundos = 0;
let milissegundos = 0;
let intervalId;
let timeout = null;
let media = [];
let id = 1;

const escondeS = document.querySelector("#segundos");
const escondeMS = document.querySelector("#milissegundos");
escondeS.classList.add("none");
escondeMS.classList.add("none");

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
    const corDaBox = document.querySelector(".box");
    const span = document.getElementById("p");
    span.innerHTML = "Clique e aguarde o verde";
    corDaBox.style.backgroundColor = "rgba(0,0,0,0.8)";

    corDaBox.onclick = function () {
        span.innerHTML = "Aguarde";
        corDaBox.onclick = function(){
            pararTudo();
            span.innerHTML = "APRESSADINHO";
        };

        iniciarContagem();
    };

    segundos = 0;
    milissegundos = 0;
    document.getElementById('segundos').innerHTML = segundos;
    document.getElementById('milissegundos').innerHTML = milissegundos;
    document.getElementById("media").innerHTML = ""
}

function iniciarContagem() {
    const corDaBox = document.querySelector(".box");
    const span = document.getElementById("p");
    const aleatorio = Math.floor(Math.random() * 10) + 1;
    const numero = Math.random();
    console.log(numero);

    if (timeout != null) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
        if (numero < 0.5) {
            corDaBox.style.backgroundColor = "green";
            span.innerHTML = "VERDE";
            intervalId = setInterval(incrementarTempo, 10);
            corDaBox.onclick = function () {
                pararContagem();
                id++;
                if (id === 6) {
                    const mediaValor = mediaTempo(media);
                    document.getElementById("media").innerHTML = `Média dos tempos: ${mediaValor}ms`;
                    console.log(`Média dos tempos: ${mediaValor}ms`);
                }
            };
        } else {
            corDaBox.style.backgroundColor = "red";
            span.innerHTML = "VERMELHO";
            corDaBox.onclick = function () {
                let respostas = ["Pré Fire amigão?", "Calma pai, ta muito apressado", "Perde tudo para deixar de ser feio", "Tenho uma notícia triste para você"];
                let umdoistres = Math.floor(Math.random() * 3) + 1;
                span.innerHTML = respostas[umdoistres];
                corDaBox.onclick = null;
                media = [];
                id = 1;
                return clearTimeout(reload);
            };
            const reload = setTimeout(() => {
                resetarBox();
                iniciarContagem();
            }, 2000);
        }
    }, aleatorio * 1000);
}

function mediaTempo(arr) {
    let soma = 0;
    let contador = 0;

    for (let i = 0; i < arr.length && contador < 5; i++) {
        soma += arr[i];
        contador++;
    }

    if (contador === 0) {
        return 0;
    }

    return soma / contador;
}

function pararContagem() {
    const corDaBox = document.querySelector(".box");
    const span = document.getElementById("p");

    clearInterval(intervalId);

    const tempoMs = segundos * 1000 + milissegundos;
    span.innerHTML = "Tempo: " + tempoMs + "ms";
    corDaBox.onclick = null;
    console.log(tempoMs + " ID", id);
    media.push(tempoMs);
}

function resetarBox() {
    const corDaBox = document.querySelector(".box");
    const span = document.getElementById("p");

    corDaBox.style.backgroundColor = "rgba(0,0,0,0.8)";
    span.innerHTML = "Aguarde";
}

function pararTudo() {
    clearInterval(intervalId);
    clearTimeout(timeout);
    segundos = 0;
    milissegundos = 0;
    media = [];
    id = 1;
    const corDaBox = document.querySelector(".box");
    const span = document.getElementById("p");
    corDaBox.style.backgroundColor = "rgba(0,0,0,0.8)";
    span.innerHTML = "Clique e aguarde o verde";
    document.getElementById('segundos').innerHTML = segundos;
    document.getElementById('milissegundos').innerHTML = milissegundos;
    document.getElementById("media").innerHTML = "";
}

comecarTest();
