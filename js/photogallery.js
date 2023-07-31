var imgElements = [
];
var currentImagePos = 0;
var galleryIsOpen = false;

onResize();

var progress = 0;
var play = false;
var speed = 7500;
var progressBarUpdateSpeed = 100;

function photogalleryPlay() {
    if (play) {
        if (progress >= 1) {
            nextImg();
            progress = 0;   
        }
        setTimeout(function () { updateProgress(); }, progressBarUpdateSpeed);
    }
}

function photogalleryPlayPause() {

    play = !play;
    photogalleryPlay();
}

function updateProgress() {
    if (play) {
        progress += 1 / (speed / progressBarUpdateSpeed);
        photogalleryPlay();
        updateLine();
    }

}

$("img").each(function (i) {
    var imgElement = [
        i, $(this).attr("src")
    ]
    imgElements.push(imgElement);
});
imgElements.shift();

$('img').click(function () {
    console.log("click on " + $(this).attr("src"));
    openGallery(imgElements, $(this).attr("src"));
});


function openGallery(imgList, currentImage) {
    if (!galleryIsOpen) {
        galleryIsOpen = true;
        console.log("photogallery opened");
        play = true;
        photogalleryPlay();
        $("body").css("overflow", "hidden");
        $("html").css("overflow", "hidden");

        var index = 0;
        while (currentImage !== imgList[index][1]) {
            index++;
        }
        currentImagePos = index;
        $(".photogallery img").attr("src", imgList[currentImagePos][1]);
        $(".photogallery").removeClass("hide");
        updateLine();
    }
}

function closeGallery() {
    play = false;
    galleryIsOpen = false;
    progress = 0;
    $(".photogallery").addClass("hide");
    $("body").css("overflow", "visible");
    $("html").css("overflow", "visible");
}

$(document).keyup(function (e) {

    console.log(e.key);
    if (e.key === "Escape") { // escape key maps to keycode `27`
        closeGallery();
    }

    if (e.key === " ") {
        photogalleryPlayPause();
    }

    if (!$(".photogallery").hasClass("hide")) {
        if ((e.key === "ArrowLeft") || (e.key === "ArrowUp")) {
            prevImg();
        } else {
            if ((e.key === "ArrowRight") || (e.key === "ArrowDown")) {
                nextImg();
            }
        }
    }

});

// $(".photogallery-img").swiperight(function() {
//     nextImg();
// });

// $(".photogallery-img").swipeleft(function() {
//     prevImg();
// });


function prevImg() {

    progress = 0;

    if (currentImagePos > 0) {
        currentImagePos--;
    } else {
        currentImagePos = imgElements.length - 1;
    }
    $(".photogallery img").attr("src", imgElements[currentImagePos][1]);
    updateLine();
}

function nextImg() {
    console.log(imgElements);

    progress = 0;

    if (currentImagePos < imgElements.length - 1) {
        currentImagePos++;
    } else {
        currentImagePos = 0;
    }
    $(".photogallery img").attr("src", imgElements[currentImagePos][1]);
    updateLine();
}

function updateLine() {
    var w = ((window.innerWidth - 30) / (imgElements.length - 1));
    var wAutoPlay = ((window.innerWidth - 30) / (imgElements.length));
    if (play) {
        $(".photogallery-line").css("width", wAutoPlay * (currentImagePos) + (wAutoPlay * progress));
    } else {
        $(".photogallery-line").css("width", w * (currentImagePos));
    }
}

function onResize() {
    var w = window.innerWidth;

    var x = 1200;
    if (w > 480) {
        x = w - (w * .2) - 34;
    } else {
        x = w - 32;
    }



    if (x > 1200) {
        x = 1200;
    }

    var y = x * (9 / 16);

    $("iframe").each(function (i) {
        $(this).css("height", y + "px");

        if ($(this).hasClass("4_3")) {
            $(this).css("width", y * (4 / 3) + "px");
        } else {
            $(this).css("width", x + "px");
        }
    });
}

window.addEventListener('resize', onResize);