window.onscroll = function() {

    let position = window.scrollX || document.documentElement.scrollTop;

    let element1 = document.getElementById('icon_heart');
    let element2 = document.getElementById('icon_fire');

    element1.style.bottom =position * 0.5 + "px";
    element2.style.bottom =position * -0.4 + "px";
}