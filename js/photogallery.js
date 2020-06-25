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
    openGallery(imgElements, $(this).attr("src"));
});


function openGallery(imgList, currentImage) {
    console.log("photogallery opened");
    $("body").css("overflow","hidden");

    var index = 0;
    while (currentImage !== imgList[index][1]) {
        index++;
    }
    currentImagePos = index;
    $(".photogallery img").attr("src", imgList[currentImagePos][1]);
    $(".photogallery").removeClass("hide");
    updateLine();
}

function closeGallery() {
    $(".photogallery").addClass("hide");
    $("body").css("overflow","visible");
}

$(document).keyup(function (e) {

    console.log(e.key);
    if (e.key === "Escape") { // escape key maps to keycode `27`
        closeGallery();
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
    updateLine();
}

function nextImg() {
    console.log(imgElements);
    if (currentImagePos < imgElements.length - 1) {
        currentImagePos++;
    } else {
        currentImagePos = 0;
    }
    $(".photogallery img").attr("src", imgElements[currentImagePos][1]);
    updateLine();
}  

function updateLine() {
    $(".photogallery-line").css("width", ((window.innerWidth -  30) / (imgElements.length - 1)) * (currentImagePos));
}