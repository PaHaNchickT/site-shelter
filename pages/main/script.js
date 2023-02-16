import allPets from '../../assets/pets.js';

const html = document.querySelector('html')
const burger = document.querySelector('.burger')
const menu = document.querySelector('.menu-full')
const bg = document.querySelector('.menu-bg')
const li = document.querySelectorAll('li')
const bg2 = document.querySelector('.bg')
const btnL = document.querySelectorAll('.btn1')[0]
const btnLmob = document.querySelectorAll('.btn1')[1]
const btnR = document.querySelectorAll('.btn2')[0]
const btnRmob = document.querySelectorAll('.btn2')[1]
const sliderBox = document.querySelector('.slider')
const petBox = document.querySelector('.pet-box')
const bg3 = document.querySelector('.bg3')
const buttons = sliderBox.querySelectorAll('button')
const exit = document.querySelector('.exit')

let isOpen = 0
let boxOpen = 0
let sliderItems = []
let counter = 0
let step

itemsCounter()
itmsAdder()

//burger

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
    bg2.style.zIndex = '-1'
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
    e.addEventListener('click', function() {
        menuClose()
    })
})

bg2.onclick = menuClose;

//slider engine

window.addEventListener('resize', function() {
    counter = 0
    sliderItems = []
    itemsCounter()
    location.reload()
})

function itemsCounter() {
    document.querySelectorAll('.slideritm').forEach(e => {
        if (window.getComputedStyle(e).display == 'block') {
            sliderItems.push(e)
        }
    })
    step = sliderItems.length
}

function itmsOrder(num) {
    let arr = []
    let i = num
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

btnL.onclick = function() {
    btnMinus()
    counter = counter - step
    btnMinus()
    itmsAdder()
}

btnLmob.onclick = function() {
    btnMinus()
    counter = counter - step
    btnMinus()
    itmsAdder()
}

btnR.onclick = function() {
    btnPlus()
    counter = counter + step
    btnPlus()
    itmsAdder()
}

btnRmob.onclick = function() {
    btnPlus()
    counter = counter + step
    btnPlus()
    itmsAdder()
}

//sliderBox

sliderBox.onclick = function(event) {
    console.log(event.target.tagName)
    if (event.target.tagName === 'DIV' || event.target.tagName === 'BUTTON') {
        openPetbox()
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
}

function openPetbox() {
    boxOpen = 1
    petBox.style.opacity = '1'
    petBox.style.zIndex = '15'
    bg3.style.opacity = '0.6'
    bg3.style.zIndex = '7'
    html.style.overflowY = 'hidden'
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
    html.style.overflowY = 'visible'
    buttons.forEach(e => {
        e.style.display = 'inline-block'
    })
}

bg3.onclick = closePetbox;
exit.onclick = closePetbox;