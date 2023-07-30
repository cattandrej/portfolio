//
// Filter tags
//
// tags = [ id ] [ enabled/disabled ]

var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var is_Edge = navigator.userAgent.indexOf("Edge") > -1;
var is_chrome = !!window.chrome && !is_opera && !is_Edge;
var is_explorer = typeof document !== 'undefined' && !!document.documentMode && !is_Edge;
var is_firefox = typeof window.InstallTrigger !== 'undefined';
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Dichiariamo l'array con le informazioni sulle lingue
var languages = [
    ["en", "en_US", "English"],
    ["it", "it_IT", "Italiano"]
];

// Dichiariamo una funzione che crea i link alla lingua
function populateLanguageLinks() {
    var currentLang = document.documentElement.lang; // ottieni la lingua corrente dalla metatag del documento
    var currentPath = window.location.pathname; // ottieni il percorso corrente

    var container = document.querySelector('.cover-lang'); // seleziona il contenitore di lingua

    // Cicla su ogni lingua nell'array
    for (var i = 0; i < languages.length; i++) {
        var lang = languages[i];
        
        // Creiamo il div principale per ogni lingua
        var langDiv = document.createElement('div');
        
        // Creiamo il contenuto in base a se la lingua è attualmente selezionata o no
        if (currentLang == lang[1]) {
            // Se la lingua corrente è selezionata, creiamo un paragrafo senza link
            langDiv.className = "language-link current-language";
            var langContent = document.createElement('p');
            langContent.textContent = lang[2];
            langDiv.appendChild(langContent);
        } else {
            // Se la lingua non è la corrente, creiamo un link
            langDiv.className = "language-link";
            var langLink = document.createElement('a');
            var newPath = currentPath.replace(currentLang.split('_')[0], lang[0]); // sostituisci la lingua nel percorso corrente
            langLink.href = newPath;
            
            var langContent = document.createElement('p');
            langContent.textContent = lang[2];
            
            langLink.appendChild(langContent);
            langDiv.appendChild(langLink);
        }
        
        // Aggiungiamo il div della lingua al contenitore
        container.appendChild(langDiv);
    }
}

// Richiamiamo la funzione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    populateLanguageLinks();
});



$(".card").hover(function () {
    if (is_safari) {
        $(this).find(".card-tags p").css("z-index", "-1000");
    }
}, function () {
    if (is_safari) {
        $(this).find(".card-tags p").css("z-index", "1");
    }
});

var allChecked = true;
$(".checkbox.reset").hover(function () {
    $(this).addClass("checked");
}, function () {
    if (!allChecked) {
        $(this).removeClass("checked");
    }
});

var tags = [
];

$(".checkbox").each(function (index) {

    var temp = [
        "id_not_initialized",
        false
    ];

    //console.log($(this).attr("id"));
    temp[0] = $(this).attr("id");

    tags.push(temp);
});

//
// Card amount
//
var cardsAmount = $(".card").length;
var cardContainerWidth = 0;
var cardWidth = 0;
var remainingSpace = 0;
var cardsPerRow = 0;
var cardMargin = 0;

updateCardMargins(cardsAmount);
$(window).resize(function () {
    updateCardMargins(cardsAmount);
});


$("a").find(".p-tag").click(function (event) {
    if (!($(".filters-bar").css("display") === "none")) {
        event.preventDefault();
        var _this = $(this);

        tags.forEach((function (element) {
            if ((_this).hasClass(element[0])) {
                updateCardsVisibility("", element[0]);
            }
        }));
    }
});

function updateCardMargins(n) {
    cardsAmount = n;
    cardContainerWidth = $(".cards").width() - 16;
    cardWidth = 225;
    remainingSpace = ((cardContainerWidth / cardWidth) % 1) * cardWidth;
    cardsPerRow = (cardContainerWidth / cardWidth) - ((cardContainerWidth / cardWidth) % 1);
    cardMargin = remainingSpace / (cardsPerRow - 1);

    if (cardMargin < 16) {
        remainingSpace += cardWidth;
        cardsPerRow--;
        cardMargin = remainingSpace / (cardsPerRow - 1);
    }

    var cont = 0;
    $(".card").each(function (index) {
        $(this).css("margin-right", "0px");
        if (!($(this).hasClass("hiddenCard"))) {
            if ((cont + 1) % (cardsPerRow) != 0) {
                $(this).css("margin-right", cardMargin + "px");
            }
        } else {
            cont--;
        }
        cont++;
    });

    // console.log("cardsAmount: \t" + cardsAmount);
    // console.log("cardContainerWidth: \t" + cardContainerWidth);
    // console.log("cardWidth: \t" + cardWidth);
    // console.log("remainingSpace: \t" + remainingSpace);
    // console.log("cardsPerRow: \t" + cardsPerRow);
    // console.log("cardMargin: \t" + cardMargin);
    // console.log(" *** ");
}

//
// Card visibility
//
function updateCardsVisibility(event, id) {

    var cardCont = 0;
    //console.log("click on checkbox " + id);

    if (id === tags[0][0]) {
        for (var i = 0; i < tags.length; i++) {
            tags[i][1] = true;
        }
    } else {
        if (event.shiftKey) {

            for (var i = 0; i < tags.length; i++) {
                if (tags[i][0] === id) {
                    tags[i][1] = !tags[i][1];
                }
            }
        } else {
            for (var i = 0; i < tags.length; i++) {
                if (tags[i][0] !== id) {
                    tags[i][1] = false;
                } else {
                    tags[i][1] = true;
                }
            }
        }
    }

    allChecked = true;
    for (var i = 1; i < tags.length; i++) {
        if (!tags[i][1]) {
            allChecked = false;
        }
    }
    if (allChecked) {
        tags[0][1] = true;
        $("#" + tags[0][0]).addClass("disabled");
    } else {
        tags[0][1] = false;
        $("#" + tags[0][0]).removeClass("disabled");
    }

    for (var i = 0; i < tags.length; i++) {
        if (tags[i][1]) {
            $("#" + tags[i][0]).addClass("checked");
        } else {
            $("#" + tags[i][0]).removeClass("checked");

        }
    }

    // $(".card").each(function () {
    //     if ($(this).hasClass(id)) {
    //         $(this).toggleClass("hiddenCard");
    //     }
    //     if (!($(this).hasClass("hiddenCard"))) {
    //         cardCont++;
    //     } 
    // });

    $(".card-tags > p").each(function () {
        //console.log(id + "; " + ($(this).attr("class")));
        if ($(this).hasClass(id)) {
            $(this).toggleClass("tag-enabled");
        }
    });

    $(".card").each(function () {
        var removedClasses = 0;
        $($(this)).find(".card-tags").children().each(function () {
            for (var i = 0; i < tags.length; i++) {
                if ($(this).hasClass(tags[i][0])) {
                    if (tags[i][1]) {
                        $(this).addClass("tag-enabled");
                    } else {
                        $(this).removeClass("tag-enabled");
                        removedClasses++;
                    }
                }
            }
        });

        if (removedClasses == $($(this)).find(".card-tags").children().length) {
            $(this).addClass("hiddenCard");
            if (is_safari) {
                $(this).parent().css("display", "none");
            }
        } else {
            $(this).removeClass("hiddenCard");
            if (is_safari) {
                $(this).parent().css("display", "initial");
            }
        }

        /*
        console.log("removed classes: " + removedClasses + "\nall classes: " + $(this).children().length);
        for (var tmp = 0; tmp < $($(this)).find(".card-tags").children().length; tmp++) {
            $($(this)).find(".card-tags").children().each(function () {
                console.log(tmp + ": " + $(this).attr("class"));
            });
        }
        console.log("***");
        */
    });

    updateCardMargins(cardCont);
}