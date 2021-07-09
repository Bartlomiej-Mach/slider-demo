const smallSlide2 = document.querySelector('small-slide-2');
const bigSlide2 =document.querySelector('slide-2');
const nextBtn = document.querySelector('.next-slide');
const prevBtn = document.querySelector('.prev-slide');

var smallSlideArray = ['.small-slide-1', '.small-slide-2', '.small-slide-3', '.small-slide-4', '.small-slide-5', '.small-slide-6', '.small-slide-7', '.small-slide-8', '.small-slide-9', '.small-slide-10'];

var slideIndex = 1;
showSlides(slideIndex);

//glowna funkcja wyswietlajaca slaidy
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("big-slide");

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    
    // petla ktora nadaje odpowiednia klase dla aktwynego miniaturowego slaidu

    for (let j = 0; j < smallSlideArray.length; j++) {
        document.querySelector(smallSlideArray[j]).classList.remove('small--active');
    }
    document.querySelector(smallSlideArray[slideIndex-1]).classList.toggle('small--active');

    // instrukcja warunkowa wylaczajca lub wlaczajca przyciski odpowiednio na pierwzszym
    // oraz ostanitm dodatkowo inicjacja funkcji ktora przesowa miniatruowe slaidy
    if(slideIndex === 1) {
        disableBtn(prevBtn);
        
    } else {
        ableBtn(prevBtn);
        prevBtn.addEventListener('click', showLessSlides);
    }
    
    if(slideIndex === 10) {
        disableBtn(nextBtn);
    } else {
        ableBtn(nextBtn);
        nextBtn.addEventListener('click', showMoreSlides);
    }
}

//funckja ktora jest zawarta tez w pliku HTML pozwala na wyswietlenie slaidu po 
//kliknieciu w miniaturke

function showSlide (n) {
    showSlides(slideIndex = n);
};

//funkcja zainicjowana w przyciskach 
//pozwala na przejscie z jednego na drgui slaid i na odwrot
function nextPrevSlide(n) {
    showSlides(slideIndex += n);
}


let move = 'translate';
const mediaQuery = window.matchMedia('(max-width: 600px)');
const mediaQuery2 = window.matchMedia('(max-width: 1300px)');
let transaltePercent = '(25%)';
let transaltePercentMinus = '(-25%)';
let outPut, outPutMinus;

//funkcja nasluchujca szerokosc okna przegladarki, ktora odpowiednio wybiera 
// o ile maja sie przesowac miniaturowe slaidy, zeby wszystko wygladalo resposywnie
function listenScreen (e1, e2) {

    if(e1.matches) {
        outPut = move.concat(transaltePercent);
        outPutMinus = move.concat(transaltePercentMinus);
        
    } else if(e2.matches) {
        outPut = 'translate(20%)';
        outPutMinus = 'translate(-20%)';

    } else {
        outPut = 'translate(14%)';
        outPutMinus = 'translate(-14%)';
        
    }
};

listenScreen(mediaQuery, mediaQuery2);


//funkcje ktore pozwalaja na przesuniecie lewo lub prawo miniaturowe slaidy
function showMoreSlides () {
    document.querySelector('.small-slides').style.transform += outPutMinus;
};

function showLessSlides () {
    document.querySelector('.small-slides').style.transform += outPut;
};

//funkcje ktore pozwalaja na wylaczenie lub wlaczenie przycisku
function disableBtn (element) {
    element.disabled = true;
}
function ableBtn (element) {
    element.disabled = false;
}




///Pobranie zdjec
//OPTION 1 - FETCH

/*

fetch("file.json")
    .then(response => response.json())
    .then(data => {
        console.log(data.allImgPaths[0]);
        for(var i = 0; i < data.allImgPaths.length; i++) {
            const pathTaker = '<img src="' + data.allImgPaths[i].imgPath + '" class="big-slide-img">';
            document.querySelector('.slide-' + [i + 1]).innerHTML = pathTaker;
            document.querySelector('.small-slide-' + [i + 1]).innerHTML = pathTaker;
        }
    })

*/


//OPTION 2 - AJAX

// var connectRequest = new XMLHttpRequest();
// connectRequest.open('GET', 'https://raw.githubusercontent.com/Bartlomiej-Mach/slider-demo/main/example-file.json');
// connectRequest.onload = function onLoadRequest() {
//     console.log('x');
//     const ourData = JSON.parse(connectRequest.responseXML);
//     renderHTML(ourData);
// }
// connectRequest.send();


// function renderHTML(data) {
//     for(var i = 0; i < data.allImgPath.length; i++) {
//         const pathTaker = '<img src="' + data.allImgPaths[i].imgPath + '" class="big-slide-img">';
//         document.querySelector('.slide-' + [i + 1]).innerHTML = pathTaker;
//         document.querySelector('.small-slide-' + [i + 1]).innerHTML = pathTaker;
//     }
// }

const xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/Bartlomiej-Mach/slider-demo/main/example-file.json', true);
xhr.send();

xhr.onload = function (){
    const json = JSON.parse(xhr.responseText);
    json.forEach(function(val) {
        const pathTaker = '<img src="' + val.allImgPaths[1].imgPath + '" class="big-slide-img">';
    });
    document.querySelector('.slide-1').innerHTML = pathTaker;

    // console.log(this.responseText);
    // console.log(xhr.allImgPaths[0].imgPath.responseText);
};
