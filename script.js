const calcBottom = document.querySelector('#calculate')
const clearBottom = document.querySelector('#clear')
const backBottom = document.querySelector('#back')

const inputHeight = document.querySelector('#height')
const inputWeight = document.querySelector('#weight')

const contentIMC = document.querySelector('#yourIMC .content')
const situationIMC = document.querySelector('#situation .content')
const form = document.querySelector('#form')
const containerBase = document.querySelector('#containerImc')
const containerResult = document.querySelector('#containerResult')
const tableDataResult = document.querySelector('#tableData')

inputHeight.addEventListener('input', (e) => {
    let value = e.target.value.slice(0, 4)
    if(value.length === 1) {
        return;
    }

    const newValue = []

    value.split('').forEach((char, index) => {
        if (index === 1 && char != '.') {
            newValue.push('.')
        } 

        newValue.push(char)
    })
    
    e.target.value = newValue.join('')
    
})

function clear() {
    inputHeight.value = ''
    inputWeight.value = ''
    tableDataResult.querySelector('#magreza').classList.remove('colorMark')
    tableDataResult.querySelector('#normal').classList.remove('colorMark')
    tableDataResult.querySelector('#sobrepeso').classList.remove('colorMark')
    tableDataResult.querySelector('#obesidade').classList.remove('colorMark')
    tableDataResult.querySelector('#grave').classList.remove('colorMark')
    contentIMC.classList.remove('good')
    contentIMC.classList.remove('low')
    contentIMC.classList.remove('medium')
    contentIMC.classList.remove('high')
    contentIMC.classList.remove('very-high')
    situationIMC.classList.remove('good')
    situationIMC.classList.remove('low')
    situationIMC.classList.remove('medium')
    situationIMC.classList.remove('high')
    situationIMC.classList.remove('very-high')
    return;
}

function calcIMC() {
    const height = inputHeight.value
    const weight = inputWeight.value
    
    const result = parseFloat(weight / (height * height)).toFixed(2)
    
    contentIMC.textContent = result
    const resultIMC = contentIMC.textContent
    
    if (resultIMC < 18.5) {

        contentIMC.classList.add('low')
        situationIMC.classList.add('low')
        tableDataResult.querySelector('#magreza').classList.add('colorMark')
        situationIMC.innerHTML = 'Magreza'

    } else if (resultIMC >= 18.5 && resultIMC <= 24.9) {

        contentIMC.classList.add('good')
        situationIMC.classList.add('good')
        tableDataResult.querySelector('#normal').classList.add('colorMark')
        situationIMC.innerHTML = 'Normal'

    } else if (resultIMC >= 25 && resultIMC <= 29.9) {

        contentIMC.classList.add('medium')
        situationIMC.classList.add('medium')
        tableDataResult.querySelector('#sobrepeso').classList.add('colorMark')
        situationIMC.innerHTML = 'Sobrepeso'

    } else if (resultIMC >= 30 && resultIMC <= 39.9) {

        contentIMC.classList.add('high')
        situationIMC.classList.add('high')
        tableDataResult.querySelector('#obesidade').classList.add('colorMark')
        situationIMC.innerHTML = 'Obesidade'

    } else if (result >= 40) {

        contentIMC.classList.add('very-high')
        situationIMC.classList.add('very-high')
        tableDataResult.querySelector('#grave').classList.add('colorMark')
        situationIMC.innerHTML = 'Obesidade Grave'
    } 

    containerBase.setAttribute('class', 'hide')
    containerResult.setAttribute('class', '#')
}


calcBottom.addEventListener('click', (e) => {
    e.preventDefault()
    const height = inputHeight.value
    const weight = inputWeight.value

    
    if (!height || !weight) {
        alert('Preencha com ambos valores pedidos.')
        return;
    } 
    
    if (height < 0 || weight < 0) {
        alert('Insira um valor válido acima ou igual a 0.')
        return;
    } 

    if (isNaN(height) || isNaN(weight)) {
        alert('Insira um caractere válido')
        return;
    }

    calcIMC()
    
})


clearBottom.addEventListener('click', (e) => {
    e.preventDefault()
    form.reset()
})

backBottom.addEventListener('click', (e) => {
    e.preventDefault()
    containerBase.setAttribute('class', '#')
    containerResult.setAttribute('class', 'hide')
    clear()
})

document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        
        e.preventDefault()
        const height = inputHeight.value
        const weight = inputWeight.value

        
        if (!height || !weight) {
            alert('Preencha com ambos valores pedidos.')
            return;
        } else if (height < 0 || weight < 0) {
            alert('Insira um valor válido acima ou igual a 0.')
            return;
        } else if (isNaN(weight)) {
            alert('Preencha os espaços com números.')
            return;
        }

        calcIMC()
    } else if (e.key === 'Escape') {
        e.preventDefault()
        containerBase.setAttribute('class', '#')
        containerResult.setAttribute('class', 'hide')
        clear()
    }
    
})
