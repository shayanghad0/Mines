var saldo = 0;
var deposito = 0
var depDisplay = 0
var apostando = 0;
var apost = 0;
var ganho = 0;
var acertos =0;
var encontrado = []
var cliques = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
var multiplc = [0,1.13, 1.35, 1.64, 2, 2.48, 3, 3.92, 5, 6.6, 8.8, 12, 16.8, 24.27, 36.41, 57.22, 95.37, 171.67, 343.35, 801.16, 2400, 12020];
var bombas = [0, 0, 0, 0]  

document.getElementById('valor').innerHTML = 'R$ ' + saldo


function depositar() {
    if (apostando == 0) {
        if (depDisplay == 0) {
            document.getElementById('displayDep').style.display = 'block'
            depDisplay = 1
        } else {
            document.getElementById('displayDep').style.display = 'none'
            depDisplay = 0
        }
    }


}

function add(valor) {
    deposito = valor

}

function confirmDep() {
    saldo = saldo + deposito;
    document.getElementById('valor').innerHTML = 'R$ ' + saldo
    document.getElementById('displayDep').style.display = 'none'
    depDisplay = 0;
    deposito = 0;
}


function clicar(botao) {
    if (apostando == 0) {
          
    } else if (apostando == 1) {

        if (botao == bombas[0] || botao == bombas[1] || botao == bombas[2] || botao == bombas[3]) {
            mudarBotao(botao, 0)
        } else {
            mudarBotao(botao, 1)
        }
    }

    

}

function aposta() {
    
    
     if (apostando == 0) {
        reset();
        apost = document.querySelector('#inp').value
        if (apost == '' || apost == 0) {
            alert("Insira um valor!")
        } else if (saldo == 0) {
            alert("Seu saldo é de R$ " + saldo + " - Faça um depósito.")
        }
        else if (apost > saldo.toFixed(2)) {
            alert("Seu saldo é de R$ " + saldo + ' Insira um valor compatível.')
        } else {
            saldo = saldo - apost;
            document.getElementById('valor').innerHTML = 'R$ ' + saldo
            gerarBomb()
            document.getElementById('inp').value = 0;
            document.getElementById('alerta').innerText = 'Rodada Iniciada - Valor da Aposta: R$ '+apost
            blurs(1);
            apostando = 1;
            
            
        }
     } else if (apostando =1){
        alert("Rodada já iniciada!")
        document.getElementById('inp').value = 0;
    
     }

   
}

function para () {
    if (apostando == 1) {
        if (ganho <= 0) {
            alert("Permitido parar com no mínimo 1 rodada jogada!")
        } else {
            
            saldo = saldo+ganho;
            
            document.querySelector('#alerta').style.color = 'green'
            document.getElementById('alerta').innerText = 'Você ganhou - R$ '+ganho.toFixed(2)  
            document.getElementById('valor').innerHTML = 'R$ ' + saldo.toFixed(2)
            document.getElementById('btApost').innerText = 'Apostar Novamente'
            
            


            fetch('./botoes.json')
            .then(response => response.json())
            .then(dados => {
                for (let i = 1; i <26; i++) {
                    if (i == cliques[i-1]) {
                        
                        document.getElementById('btJg' + i).innerHTML = dados[1].svg
                        document.getElementById('btJg' + i).style.backgroundColor = dados[1].cor_fundo
                        document.getElementById('btJg' + i).style.boxShadow = dados[1].sombra
                        document.getElementById('btJg' + i).style.borderColor = dados[1].contorno
                    }
                    
                }

                for (let i = 0; i < encontrado.length; i++) {

                    document.getElementById('btJg' + encontrado[i]).innerHTML = dados[3].svg
                    document.getElementById('btJg' + encontrado[i]).style.backgroundColor = dados[3].cor_fundo
                    document.getElementById('btJg' + encontrado[i]).style.boxShadow = dados[3].sombra
                    document.getElementById('btJg' + encontrado[i]).style.borderColor = dados[3].contorno 
    
                }
                for (let i = 0; i <4; i++) {

                    document.getElementById('btJg' + bombas[i]).innerHTML = dados[2].svg
                    document.getElementById('btJg' + bombas[i]).style.backgroundColor = dados[2].cor_fundo
                    document.getElementById('btJg' + bombas[i]).style.boxShadow = dados[2].sombra
                    document.getElementById('btJg' + bombas[i]).style.borderColor = dados[2].contorno 
    
                }

                
                

                resetArray()

            })
            


            ganho =0;
            acertos=0;
            apostando =0;
            apost=0;
            //alert(cliques)
            

        }
    }
}


function max() {
    gerarBomb()
    apost = saldo;
    document.getElementById('inp').value = apost.toFixed(2);
    

}

function mid() {
    apost = (saldo/2)
    document.getElementById('inp').value = apost.toFixed(2);
}




function mudarBotao(valor, resp) {
    if (resp == 0) {
        fetch('./botoes.json')
        .then(response => response.json())
        .then(dados => {
            
            //PERDEU ----------------------------------------------------------------
            apostando = 0;
            document.querySelector('#alerta').style.color = 'red'
            document.getElementById('alerta').innerText = 'Você perdeu - R$ '+apost 
            document.getElementById('btApost').innerText = 'Apostar Novamente'
            
            resetArray();
            for (let i = 1; i <26; i++) {
                if (i == cliques[i-1]) {
                    
                    document.getElementById('btJg' + i).innerHTML = dados[1].svg
                    document.getElementById('btJg' + i).style.backgroundColor = dados[1].cor_fundo
                    document.getElementById('btJg' + i).style.boxShadow = dados[1].sombra
                    document.getElementById('btJg' + i).style.borderColor = dados[1].contorno
                }
                
            }
            for (let i = 0; i <4; i++) {

                document.getElementById('btJg' + bombas[i]).innerHTML = dados[2].svg
                document.getElementById('btJg' + bombas[i]).style.backgroundColor = dados[2].cor_fundo
                document.getElementById('btJg' + bombas[i]).style.boxShadow = dados[2].sombra
                document.getElementById('btJg' + bombas[i]).style.borderColor = dados[2].contorno 

            }

            document.getElementById('btJg' + valor).innerHTML = dados[4].svg
            document.getElementById('btJg' + valor).style.backgroundColor = dados[4].cor_fundo
            document.getElementById('btJg' + valor).style.boxShadow = dados[4].sombra
            document.getElementById('btJg' + valor).style.borderColor = dados[4].contorno
            console.log(valor)


            

            

        })


        //ACERTOU --------------------------------------------------------------------------------
    } else if (resp == 1) {
        fetch('./botoes.json')
        .then(response => response.json())
        .then(dados => {
            document.getElementById('btJg' + valor).innerHTML = dados[3].svg
            document.getElementById('btJg' + valor).style.backgroundColor = dados[3].cor_fundo
            document.getElementById('btJg' + valor).style.boxShadow = dados[3].sombra
            document.getElementById('btJg' + valor).style.borderColor = dados[3].contorno

        })

        for (let i =0; i<25; i++) {
            if (valor == cliques[i]) {
                acertos++;
                encontrado.push(valor)
                ganho = apost*multiplc[acertos]
                document.getElementById('lucro').innerText = 'R$ '+ganho.toFixed(2)
                document.getElementById('hits').innerText = acertos
            }
        }

        let index = cliques.indexOf(valor)
        if (index > -1) {
            cliques[index] = 0;
        }

        
    }
}


function gerarBomb() {
    let rand1 = Math.floor(Math.random() * (26 - 1) + 1);
    bombas[0] = rand1;
      for (let i = 1; i <4; i++) {
        let rand = Math.floor(Math.random() * (26 - 1) + 1);
        
        for (let j =1; j <4; j++) {
            if (rand == bombas[i-1]) {
                rand = Math.floor(Math.random() * (26 - 1) + 1);
                j--
            }
        }
        bombas[i] = rand;
        
    }
    bombas.sort(sortfunction);
    console.log(bombas)

    

}

function sortfunction(a, b){
    return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
  }


function blurs (value) {
    if (value == 1) {
        document.querySelectorAll('.tbrow').forEach(el => el.style.filter = 'none');
    } else {
        document.querySelectorAll('.tbrow').forEach(el => el.style.filter = 'blur(4px)');
    }

}

function reset() {
    document.getElementById('alerta').innerText = 'Aguardando aposta...'
    document.getElementById('alerta').style.color = 'white'
    document.getElementById('btApost').innerText = 'Apostar'
    document.getElementById('lucro').innerText = 'R$ '
    document.getElementById('hits').innerText = 0
    blur(0);

    for (let i = 1; i < 26; i++) {
        fetch('./botoes.json')
        .then(response => response.json())
        .then(dados => {
            document.getElementById('btJg' + i).innerHTML = dados[0].svg
            document.getElementById('btJg' + i).style.backgroundColor = dados[0].cor_fundo
            document.getElementById('btJg' + i).style.boxShadow = dados[0].sombra
            document.getElementById('btJg' + i).style.borderColor = dados[0].contorno
    
        })
    }

    apost =0;
    ganho=0;
    acertos=0;
}


function resetArray() {
    cliques = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    encontrado = []
}
//