
init();


function init() {
    $("#col").hide();
    loadFont("Montserrat-Black", "mnt-b");
}

function loadFont(name, family) {
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
    @font-face {\
        font-family: " + family + ";\
        src: url(" + urlcanonical + '/fonts/' + name + '.ttf)' + ";\
    }\
    "));
    document.head.appendChild(newStyle);
}


function  initTyped() {
    var typed = new Typed('#typed-strings', {
        strings: types,
        typeSpeed: 0,
        backSpeed: 0,
        fadeOut: true,
        loop: false,
        onComplete: function (self) {
            animation();
        }
    });
}





function animation() {
    console.log("end typed");
    /**
     $("#complement").remove();
     $("#co").removeClass("col-xs-4")
     .removeClass("text-left")
     .addClass("col-xs-12")
     .addClass("text-center");
     */
    $("#co").remove();
    $("#complement").remove();
    $("#col").show();
    $("img").fadeTo(2000, 1);
}