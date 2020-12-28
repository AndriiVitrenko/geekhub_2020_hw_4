let currentSlide = 1;
let slidesAmount;
let slidesArray;
const slider__track = document.querySelector('.slider__track')
const slider__items = document.querySelectorAll('.slider__item')

$(window).ready( function() {
    slidesArray = $('.slider__item')
    slidesAmount = slidesArray.length;
    let firstSlideClone = slider__items[0].cloneNode(true)
    let lastSlideClone = slider__items[slider__items.length - 1].cloneNode(true)
    
    for (let i = 1; i <= slidesAmount; i++) {
        $('.dots').append(`<button id=${i} class="dots__item" onclick="showSlide(${i})">${i}</button>`)
        slider__items[i - 1].style.backgroundImage = `url(../img/${i}.jpg)`;
        slider__items[i - 1].style.width = $('.slider').outerWidth() + 'px';
    }

    slider__track.style.width = slidesAmount * parseFloat(slider__items[0].style.width) + 'px'

    $(`.dots__item:nth-child(${currentSlide})`).addClass('active') 

    firstSlideClone.style.backgroundImage = slider__items[0].style.backgroundImage
    firstSlideClone.style.width = slider__items[0].style.width

    lastSlideClone.style.backgroundImage = slider__items[slider__items.length - 1].style.backgroundImage
    lastSlideClone.style.width = slider__items[slider__items.length - 1].style.width

    slider__track.insertAdjacentElement('beforeend', firstSlideClone)
    slider__track.insertAdjacentElement('afterbegin', lastSlideClone)

    slider__track.style.transition = '0s'
    let translate = currentSlide * parseFloat(slider__items[0].style.width)
    slider__track.style.transform = `translateX(-${translate}px)`
})

$('.next').on('click', next)

$('.previous').on('click', previous)

document.querySelector('.slider').addEventListener('dragstart', function() {
    return false
})

let start
let end
let lastPosition

slider__track.addEventListener('mousedown', function(e) {
    if(e.target.classList.contains('.slider__item')) {
        return;
    }

    start = lastPosition = e.clientX

    slider__track.addEventListener('mousemove', onMouseMove)    
})

slider__track.addEventListener('mouseup', function(e) {
    slider__track.removeEventListener('mousemove', onMouseMove)
    end = e.clientX
    checker()
})

slider__track.addEventListener('mouseout', function() {
    slider__track.removeEventListener('mousemove', onMouseMove)
    checker()
})

//-----------functions---------------

function next() {
    currentSlide++

    let translate = currentSlide * parseFloat(slider__items[0].style.width)
        
    slider__track.style.transition = ''
    slider__track.style.transform = `translateX(-${translate}px)`

    $('.dots__item').removeClass('active')

    if (currentSlide === slidesAmount + 1) {
        setTimeout(() => {
            slider__track.style.transition = '0s'
            currentSlide = 1
            translate = currentSlide * parseFloat(slider__items[0].style.width)
            slider__track.style.transform = `translateX(-${translate}px)`
            $(`.dots__item:nth-child(${1})`).addClass('active')
        }, 300)
        slider__track.style.transition = ''
    }

    $(`.dots__item:nth-child(${currentSlide})`).addClass('active')
}

function previous() {
    currentSlide--

    let translate = currentSlide * parseFloat(slider__items[0].style.width)
        
    slider__track.style.transition = ''
    slider__track.style.transform = `translateX(-${translate}px)`

    $('.dots__item').removeClass('active')

    if (currentSlide === 0) {
        setTimeout(() => {
            slider__track.style.transition = '0s'
            currentSlide = slidesAmount
            translate = currentSlide * parseFloat(slider__items[0].style.width)
            slider__track.style.transform = `translateX(-${translate}px)`
            $(`.dots__item:nth-child(${slidesAmount})`).addClass('active')
        }, 300)
        slider__track.style.transition = ''
    }

    
    $(`.dots__item:nth-child(${currentSlide})`).addClass('active')
}

function showSlide(index) {
    currentSlide = index;

    let translate = currentSlide * parseFloat(slider__items[0].style.width)
        
    slider__track.style.transition = ''
    slider__track.style.transform = `translateX(-${translate}px)`

    $('.dots__item').removeClass('active')
    $(`.dots__item:nth-child(${currentSlide})`).addClass('active')
}


function getTranslateX() {
  var style = window.getComputedStyle(slider__track);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

function onMouseMove(e) {
    end = e.clientX
    let scrolled = end - lastPosition
    let translateX = getTranslateX()
    
    slider__track.style.transition = '0s';
    slider__track.style.transform = `translateX(${translateX + scrolled}px)`

    lastPosition = e.clientX
}

function checker() {
    let scrolledPart = end - start
    
    let needSwitch = Math.abs(scrolledPart) / slider__items[0].offsetWidth > 0.3 ? true : false

    if (-scrolledPart > 0 && needSwitch) {
        currentSlide++
    }
    else if (-scrolledPart < 0 && needSwitch) {
        currentSlide--
    }

    let translate = currentSlide * parseFloat(slider__items[0].style.width)
    
    slider__track.style.transition = ''
    slider__track.style.transform = `translateX(-${translate}px)`

    $('.dots__item').removeClass('active')

    if (currentSlide === 0) {
        setTimeout(() => {
            slider__track.style.transition = '0s'
            currentSlide = slidesAmount
            translate = currentSlide * parseFloat(slider__items[0].style.width)
            slider__track.style.transform = `translateX(-${translate}px)`
            $(`.dots__item:nth-child(${currentSlide})`).addClass('active')
        }, 300)
        slider__track.style.transition = ''
    }
    else if (currentSlide === slidesAmount + 1) {
        setTimeout(() => {
            slider__track.style.transition = '0s'
            currentSlide = 1
            translate = currentSlide * parseFloat(slider__items[0].style.width)
            slider__track.style.transform = `translateX(-${translate}px)`
            $(`.dots__item:nth-child(${currentSlide})`).addClass('active')
        }, 300)
        slider__track.style.transition = ''
    }

    $(`.dots__item:nth-child(${currentSlide})`).addClass('active')

    start = end = lastPosition = undefined
}