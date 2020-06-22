var cardsAmount = $(".card").length;
var cardContainerWidth = $(".cards").width();
var cardWidth = $(".card").width() + 2;
var remainingSpace = ((cardContainerWidth / cardWidth) % 1) * cardWidth;
var cardsPerRow = (cardContainerWidth / cardWidth) - ((cardContainerWidth / cardWidth) % 1);
var cardMargin = remainingSpace / (cardsPerRow - 1);

if (cardMargin < 16) {
    remainingSpace += cardWidth;
    cardsPerRow--;
    cardMargin = remainingSpace / (cardsPerRow - 1);
}

console.log("cardsAmount " + cardsAmount);
console.log("cardContainerWidth " + cardContainerWidth);
console.log("cardWidth " + cardWidth);
console.log("remainingSpace " + remainingSpace);
console.log("cardsPerRow " + cardsPerRow);
console.log("cardMargin " + cardMargin);


$(".card").each(function(index) {
    if ((index + 1) % (cardsPerRow) != 0) {
        $(this).css("margin-right", cardMargin + "px");
    }
});


function updateCardsVisibility(id) {
    console.log("click on checkbox " + id);

    $("#" + id).toggleClass("checked");

    $(".card").each(function() {
        if ($(this).hasClass(id)) {
            $(this).toggleClass("hiddenCard");
        }
    });

}