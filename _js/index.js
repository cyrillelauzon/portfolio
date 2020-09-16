/*****************************************************************************
index.js

Gestion des animations déclenchées par défilement
/******************************************************************************/





//Gestion du chargement de page et animations:
document.body.classList.add('js-Page-Loading');
window.addEventListener("load", AfficherAnimations);

function AfficherAnimations() {
    document.body.classList.remove('js-Page-Loading');


    InitToggleMenu();


    // document.getElementsByClassName('rouge test')

    var classes = document.getElementsByClassName('letters');
    for (var i = 0; i < classes.length; i++) {
        var textWrapper = classes[i];
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    }


    //var textWrapper = document.querySelector('.ml3 .letters');

    var timel = anime.timeline({

    });
    timel.add({
        targets: '.anim-prog-fade',
        opacity: [0, 1],
        //scaleY: [0, 1], // from 100 to 250
        loop: false,
        easing: 'easeInOutSine',
        duration: 150,
        delay: anime.stagger(100)
    });


 /*    timel.add({
        targets: '.anim-pulse-light',
        duration: 1000,
        keyframes: [
            { scale: [1, 1.3] },
            { scale: [1.3, 1] },
            { color: '#625e5d' },
            { color: '#706b6a' },
            { color: '#625e5d' }
        ],
        easing: 'easeInOutSine',
    }, 1600); */

    anime({
        targets: '.anim-line',
        scaleX: [0, 1], // from 100 to 250
        //translateY: [-200, 0],
        loop: false,
        easing: 'linear',
        duration: 400,
        delay: anime.stagger(100)
    });



    anime({
        targets: '.letter',
        opacity: [0, 1],
        scaleY: [0, 1], // from 100 to 250
        loop: false,
        easing: 'linear',
        duration: 100,
        delay: anime.stagger(20)
    });
    /* 
        anime({
            targets: '.ml3',
            opacity: [0, 1],
            scaleX: [0, 1], // from 100 to 250
            loop: false,
            easing: 'linear',
            duration: 200,
            delay: anime.stagger(20)
        }); 
    
    
        anime({
            targets: '#section-bio-profile',
            opacity: [0, 1],
            translateY: [-200, 0], // from 100 to 250
            loop: false,
            easing: 'linear',
            duration: 500,
            delay: anime.stagger(20)
        }); */

    //hack temp
    /*let offset = window.pageYOffset;
    let divBioPict = document.getElementById("section-bio-bg-pict");
    divBioPict.style.backgroundPositionY = offset * 0.2 + "px";*/
}

function InitToggleMenu() {
    var modalMenu = document.querySelector("#nav-modal");
    modalMenu.addEventListener("animationend", function () {

        if (modalMenu.classList.contains("anim-quick-slidein")) {
            console.log("anim-quick-slidein ended");
            modalMenu.classList.remove("anim-quick-slidein");
        }
        else if (modalMenu.classList.contains("anim-quick-slideout")) {
            console.log("anim-quick-slideout ended");
            modalMenu.classList.remove("anim-quick-slideout");
            modalMenu.style.display = "none";
        }

    }, false);

}


/**
* @description Handler Lorsque le bouton hamburger est appuyé sur menu mobile
*/
function ChangeToggleButton() {

    var toggleButton = document.querySelector("#nav-toggle-icon");
    if (toggleButton.classList.contains("toggler-icon-hamburger")) {
        ShowAppMenu();
    }
    else if (toggleButton.classList.contains("toggler-icon-close")) {
        HideAppMenu();
    }
}

function ShowAppMenu() {
    var toggleButton = document.querySelector("#nav-toggle-icon");
    var modalMenu = document.querySelector("#nav-modal");

    toggleButton.classList.remove("toggler-icon-hamburger");
    toggleButton.classList.add("toggler-icon-close");

    modalMenu.classList.add("anim-quick-slidein");
    modalMenu.style.display = "block";
}


function HideAppMenu() {
    var toggleButton = document.querySelector("#nav-toggle-icon");
    var modalMenu = document.querySelector("#nav-modal");

    toggleButton.classList.remove("toggler-icon-close");
    toggleButton.classList.add("toggler-icon-hamburger");

    modalMenu.classList.add("anim-quick-slideout");
}



//Fade in sur scroll
window.onscroll = function () {

    let curY = window.scrollY;

    //Effet de parallax pour image titre
    //TODO Compléter code effet de parallax
    //console.log("curY" + curY);
    /*let offset = window.pageYOffset;
    let divBioPict = document.getElementById("section-bio-bg-pict");
    divBioPict.style.backgroundPositionY = offset * 0.2 + "px";
    console.log(divBioPict.style.backgroundPositionY);*/



    //Animations section competence
    /*let divCompetences = document.getElementById("section-competences-contenu");
    let divMarge = document.getElementById("section-competences-textarea");
    
    if(curY > 400 && curY < divCompetences.offsetHeight + 300 ){
        divCompetences.classList.add("animerCompetences");
        divMarge.classList.add("animerMargeCompetences");
    }
    else 
    {
        divCompetences.classList.remove("animerCompetences");
        divMarge.classList.remove("animerMargeCompetences");
    }*/

    // FadeInDiv("#section-competences", 0.6);
    //FadeInDiv("section-realisations");
    //FadeInDiv("section-experiences");
};


/**
 * @description FadeInDiv permet de faire apparaitre un div progressivement sur scroll
 * @param {string} idDiv à faire apparaître progressivement
 * @param {number} [pctBase=0] Opacité plancher, en pourcentage
 * @returns ne fait rien si id est invalide
 */
function FadeInDiv(idDiv, pctBase = 0) {
    let divSelect = document.getElementById(idDiv);
    if (divSelect === undefined) return;

    let curY = window.scrollY;
    let minY = divSelect.offsetTop - (divSelect.scrollHeight - 100);
    let maxY = divSelect.offsetTop;
    if (curY > minY) {
        let pct = pctBase + (curY / maxY);
        divSelect.style.opacity = pct;
    }
}

/**
 * @description RetourHautPage retour animé vers haut de la page
 * NB nécessite JQuery
 */
function RetourHautPage() {

    event.preventDefault();
    $('html, body').animate({
        scrollTop: "0px"
    }, 800);

    var mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) {
        HideAppMenu();
    }
}

function OnScroll(scrollTo) {
    event.preventDefault();

    var offset = $(scrollTo).offset().top;

    //cacher le menu de navigation si sur mobile
    var mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) {
        $([document.documentElement, document.body]).animate({
            scrollTop: offset - 56
        }, 800);

        HideAppMenu();
    }
    else {
        $([document.documentElement, document.body]).animate({
            scrollTop: offset
        }, 800);
    }

}
