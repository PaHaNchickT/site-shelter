import allPets from '../../assets/pets.js';

const html = document.querySelector('html')
const burger = document.querySelector('.burger')
const menu = document.querySelector('.menu-full')
const bg = document.querySelector('.menu-bg')
const li = document.querySelectorAll('li')
const bg2 = document.querySelector('.bg')
const btnL = document.querySelector('.btn2')
const btnR = document.querySelector('.btn3')
const btnLL = document.querySelector('.btn1')
const btnRR = document.querySelector('.btn4')
const pageCounter = document.querySelector('.page')
const sliderBox = document.querySelector('.container')
const bg3 = document.querySelector('.bg3')
const exit = document.querySelector('.exit')
const petBox = document.querySelector('.pet-box')
const buttons = sliderBox.querySelectorAll('button')
const petsMax = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [7, 6, 0, 2, 1, 5, 3, 4],
    [0, 4, 2, 1, 3, 6, 7, 5],
    [5, 0, 3, 4, 6, 7, 2, 1],
    [4, 1, 3, 6, 0, 7, 2, 5],
    [4, 1, 6, 0, 5, 7, 3, 2],
    [5, 0, 6, 1, 4, 3, 7, 2],
    [6, 7, 4, 1, 3, 0, 2, 5]
]

let isOpen = 0
let boxOpen = 0
let sliderItems = []
let counter = 0
let step
let pets48 = []
let page = 1

itemsCounter()
itmsAdder()

//burger menu

function menuOpen() {
    isOpen = 1
    bg.style.right = '10px'
    burger.style.position = 'fixed'
    burger.style.right = '40px'
    menu.style.right = '37px'
    burger.style.transform = 'rotate(90deg)'
    menu.style.transition = '0.8s'
    bg2.style.opacity = '0.6'
    bg2.style.zIndex = '7'
    html.style.overflowY = 'hidden'
}

function menuClose() {
    isOpen = 0
    bg.style.right = '-320px'
    burger.style.position = 'static'
    menu.style.right = '-330px'
    burger.style.transform = 'rotate(0deg)'
    menu.style.transition = '0.5s'
    bg2.style.opacity = '0'
    bg2.style.zIndex = '-7'
    html.style.overflowY = 'visible'
}

function menuBurger() {
    if (isOpen === 0) {
        menuOpen()
    } else {
        menuClose()
    }
}

burger.onclick = menuBurger;

li.forEach(e => {
    e.addEventListener('click', function () {
        menuClose()
    })
})

bg2.onclick = menuClose;

//pagination

function itemsCounter() {
    document.querySelectorAll('.slideritm').forEach(e => {
        if (window.getComputedStyle(e).display == 'block') {
            sliderItems.push(e)
        }
    })
    step = sliderItems.length
}

window.addEventListener('resize', function () {
    counter = 0
    page = 0
    sliderItems = []
    itemsCounter()
    // console.log(`step: ${step}`
    location.reload()
})

function itmsOrder(num) {
    let arr = []
    let i = num
    if (step === 8) {
        return petsMax[page - 1]
    } else {
        while (i < num + step) {
            if (i >= allPets.length) {
                arr.push(i - allPets.length)
            } else {
                arr.push(i)
            }
            i++
        }
        return arr
    }
}

function itmsAdder() {
    itmsOrder(counter).forEach((e, i) => {
        sliderItems[i].firstElementChild.innerHTML = allPets[e].name
        sliderItems[i].style.backgroundImage = `url(${allPets[e].img})`
        sliderItems[i].lastElementChild.className = ''
        sliderItems[i].classList.add(`${allPets[e].name}`)
    })
}

//slider buttons

function btnMinus() {
    if (counter === 0) {
        counter = allPets.length
    }
    if (counter < 0) {
        counter = allPets.length + counter
    }
    if (counter === allPets.length) {
        counter = 0
    }
}

function btnPlus() {
    if (counter === allPets.length) {
        counter = 0
    }
    if (counter > allPets.length) {
        counter = counter - allPets.length
    }
}

btnL.onclick = function () {
    page--
    if (page === 1) {
        btnL.classList.remove('activeL')
        btnLL.classList.remove('activeLL')
        btnL.classList.add('inactiveL')
        btnLL.classList.add('inactiveLL')
    }
    if (page < 1) {
        page++
    } else {
        btnR.classList.add('activeR')
        btnRR.classList.add('activeRR')
        btnR.classList.remove('inactiveR')
        btnRR.classList.remove('inactiveRR')
        btnMinus()
        counter = counter - step
        btnMinus()
        itmsAdder()
    }
    pageCounter.innerHTML = page
}

btnR.onclick = function () {
    page++
    if (page === allPets.length * 6 / step) {
        btnR.classList.remove('activeR')
        btnRR.classList.remove('activeRR')
        btnR.classList.add('inactiveR')
        btnRR.classList.add('inactiveRR')
    }
    if (page > allPets.length * 6 / step) {
        page--
    } else {
        btnL.classList.add('activeL')
        btnLL.classList.add('activeLL')
        btnL.classList.remove('inactiveL')
        btnLL.classList.remove('inactiveLL')
        btnPlus()
        counter = counter + step
        btnPlus()
        itmsAdder()
    }
    pageCounter.innerHTML = page
}

btnLL.onclick = function() {
    page = 1
    btnMinus()
    counter = 0
    btnMinus()
    itmsAdder()
    btnL.classList.remove('activeL')
    btnLL.classList.remove('activeLL')
    btnL.classList.add('inactiveL')
    btnLL.classList.add('inactiveLL')
    btnR.classList.add('activeR')
    btnRR.classList.add('activeRR')
    btnR.classList.remove('inactiveR')
    btnRR.classList.remove('inactiveRR')
    pageCounter.innerHTML = page
}

btnRR.onclick = function() {
    page = allPets.length * 6 / step
    counter = allPets.length - step
    itmsAdder()
    btnR.classList.remove('activeR')
    btnRR.classList.remove('activeRR')
    btnR.classList.add('inactiveR')
    btnRR.classList.add('inactiveRR')
    btnL.classList.add('activeL')
    btnLL.classList.add('activeLL')
    btnL.classList.remove('inactiveL')
    btnLL.classList.remove('inactiveLL')
    pageCounter.innerHTML = allPets.length * 6 / step
}

//slider box

sliderBox.onclick = function(event) {
    if (event.target.tagName === 'DIV' || event.target.tagName === 'BUTTON') {
        openPetbox()
        console.log(event.target.className)
        for (let keys in allPets) {
            if (allPets[keys].name === event.target.className.slice(19, event.target.className.length)) {
                console.log(allPets[keys])
                petBox.querySelector('.img').style.backgroundImage = `url(${allPets[keys].img})`
                petBox.querySelector('h4').innerHTML = allPets[keys].name
                petBox.querySelector('h5').innerHTML = `${allPets[keys].type} - ${allPets[keys].breed}`
                petBox.querySelector('p').innerHTML = allPets[keys].description
                petBox.querySelectorAll('li')[0].innerHTML = `<b>Age:</b> ${allPets[keys].age}`
                petBox.querySelectorAll('li')[1].innerHTML = `<b>Inoculations:</b> ${allPets[keys].inoculations}`
                petBox.querySelectorAll('li')[2].innerHTML = `<b>Diseases:</b> ${allPets[keys].diseases}`
                petBox.querySelectorAll('li')[3].innerHTML = `<b>Parasites:</b> ${allPets[keys].parasites}`
            }
        }
    }
    if (event.target.className === 'bg3' || event.target.className === 'exit') {
        closePetbox()
    }
}

function openPetbox() {
    boxOpen = 1
    petBox.style.opacity = '1'
    petBox.style.zIndex = '15'
    bg3.style.opacity = '0.6'
    bg3.style.zIndex = '7'
    buttons.forEach(e => {
        e.style.display = 'none'
    })
}

function closePetbox() {
    boxOpen = 0
    petBox.style.opacity = '0'
    petBox.style.zIndex = '-1'
    bg3.style.opacity = '0'
    bg3.style.zIndex = '-1'
    buttons.forEach(e => {
        e.style.display = 'inline-block'
    })
}

// bg3.onclick = closePetbox;
// exit.onclick = closePetbox;