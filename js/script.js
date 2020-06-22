var cardsAmount = $(".card").length;
var cardContainerWidth = 0;
var cardWidth = 0;
var remainingSpace = 0;
var cardsPerRow = 0;
var cardMargin = 0;


updateCardMargins(cardsAmount);
$( window ).resize(function() {
    updateCardMargins(cardsAmount);
});

function updateCardsVisibility(id) {
    var cardCont = 0;
    console.log("click on checkbox " + id);

    $("#" + id).toggleClass("checked");

    $(".card").each(function () {
        if ($(this).hasClass(id)) {
            $(this).toggleClass("hiddenCard");
        }
        if (!($(this).hasClass("hiddenCard"))) {
            cardCont++;
        } 
    });

    updateCardMargins(cardCont);
}

function updateCardMargins(n) {
    cardsAmount = n;
    cardContainerWidth = $(".cards").width();
    cardWidth = 225 + 2;
    remainingSpace = ((cardContainerWidth / cardWidth) % 1) * cardWidth;
    cardsPerRow = (cardContainerWidth / cardWidth) - ((cardContainerWidth / cardWidth) % 1);
    cardMargin = remainingSpace / (cardsPerRow - 1);

    if (cardMargin < 0) {
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

    console.log("cardsAmount: \t" + cardsAmount);
    console.log("cardContainerWidth: \t" + cardContainerWidth);
    console.log("cardWidth: \t" + cardWidth);
    console.log("remainingSpace: \t" + remainingSpace);
    console.log("cardsPerRow: \t" + cardsPerRow);
    console.log("cardMargin: \t" + cardMargin);
    console.log(" *** ");
}