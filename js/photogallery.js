var imgElements = [
];
var currentImagePos = 0;

$("img").each(function (i) {
    var imgElement = [
        i, $(this).attr("src")
    ]
    imgElements.push(imgElement);
});
imgElements.shift();

$('img').click(function () {
    console.log("click on " + $(this).attr("src"));
    openPhotogallery(imgElements, $(this).attr("src"));
});


function openPhotogallery(imgList, currentImage) {
    console.log("photogallery opened");
    var index = 0;
    while (currentImage !== imgList[index][1]) {
        index++;
    }
    currentImagePos = index;
    $(".photogallery img").attr("src", imgList[currentImagePos][1]);
    $(".photogallery").removeClass("hide");
}

function closeGallery() {
    $(".photogallery").addClass("hide");
}

$(document).keyup(function (e) {

    console.log(e.key);
    if (e.key === "Escape") { // escape key maps to keycode `27`
        $(".photogallery").addClass("hide");
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
    if (currentImagePos > 0) {
        currentImagePos--;
    } else {
        currentImagePos = imgElements.length - 1;
    }
    $(".photogallery img").attr("src", imgElements[currentImagePos][1]);
}

function nextImg() {
    console.log(imgElements);
    if (currentImagePos < imgElements.length - 1) {
        currentImagePos++;
    } else {
        currentImagePos = 0;
    }
    $(".photogallery img").attr("src", imgElements[currentImagePos][1]);
}  