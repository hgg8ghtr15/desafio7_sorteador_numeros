const form = document.querySelector("#tela-form")
const buttonSortear = document.querySelector("#buttonSortear")
const buttonSortearNovamente = document.querySelector("#buttonSortearNovamente")

const quantidade = document.querySelector("#quantidade")
const minimo = document.querySelector("#minimo")
const maximo = document.querySelector("#maximo")
const repetir = document.querySelector("#nao-repetir")

const telaresultado = document.querySelector("#tela-resultado")
const listaNumeros = document.querySelector(".result-display")




form.addEventListener("subimit", (event) => {
    event.preventDefault()
})


quantidade.addEventListener("input", (event) => {
    quantidade.value = quantidade.value.replace(/\D/g, '');
})

minimo.addEventListener("input", (event) => {
    minimo.value = minimo.value.replace(/\D/g, '');

})

maximo.addEventListener("input", (event) => {
    maximo.value = maximo.value.replace(/\D/g, '');

})


maximo.addEventListener("input", (event) => {
    maximo.value = quantidmaximoade.value.replace(/\D/g, '');
})

buttonSortear.addEventListener("click", (event) => {
    const listaNumeros = document.querySelector(".result-display")
    let valida = validarCampos()

    if (valida) {
        quantidade.classList.add("valid")
        minimo.classList.add("valid")
        maximo.classList.add("valid")



        for (let i = 0; i < quantidade.value; i++) {

            // Valida pega todoas os numeros sorteados.
            const resultadosSorteados = document.querySelectorAll(".number-ball")
            const listaArray = Array.from(resultadosSorteados)
            //Cria um array
            const numerosJaSorteados = listaArray.map(numero => {
                return Number(numero.innerHTML)
            })

            // Gera um Numero Novo
            let numeroGerado = gerarNumero(minimo.value, maximo.value)

            // Verifica se pode fazer dublicado
            if (repetir.checked === true) {

                while (numerosJaSorteados.includes(numeroGerado)) {
                    // console.log(`Duplicado: ${numeroGerado}. Gerando novo...`);
                    numeroGerado = gerarNumero(minimo.value, maximo.value);
                }

            }

            // Oculta o form e visualiza o resultad
            telaresultado.classList.remove("hidden")
            form.classList.add("hidden")

            // Cria os elemento e add ele nos HTML 
            const span = document.createElement("span")
            span.classList.add("number-ball")
            span.innerHTML = numeroGerado

            listaNumeros.append(span)
        }


    } else {
        alert(`o campos Numero não pode ser, maior que o intervalo Gerado.`)
        quantidade.classList.add("error")
        minimo.classList.add("error")
        maximo.classList.add("error")
    }

})

buttonSortearNovamente.addEventListener("click", (event) => {
    telaresultado.classList.add("hidden")
    form.classList.remove("hidden")

    const resultadosSorteados = document.querySelectorAll(".number-ball")
    const listaArray = Array.from(resultadosSorteados)
    //Cria um array
    listaArray.forEach(numero => {
        numero.remove()
    })
})

function gerarNumero(min, max) {
    // Garante que min e max sejam números
    min = Number(min);
    max = Number(max);

    const numero = Math.floor(Math.random() * (max - min + 1)) + min
    return numero
}

function validarCampos() {
    const diferenca = maximo.value - minimo.value
    if (diferenca > Number(quantidade.value)) {
        return true
    }
    return false
}