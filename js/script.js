var categories = [
    "3d",
    "animation",
    "rendering",
    "interaction_design",
    "corporate_communication",
    "photography",
    "video",
    "games_videogames",
    "user_interface"
];

// [0] EN; [1] IT;
var translations = [
    ["3D", "3D"],
    ["Animation", "Animazione"],
    ["Rendering", "Rendering"],
    ["Interaction Design", "Interaction Design"],
    ["Corporate Communication", "Comunicazione Aziendale"],
    ["Photography", "Fotografia"],
    ["Video", "Video"],
    ["Games & Videogames", "Giochi & Videogiochi"],
    ["User Interface", "User Interface"]
];

generateCardFilter(categories);

function updateCardsVisibility(id) {
    console.log("click on checkbox " + id);

    $("#" + categories[id]).toggleClass("checked");
}

function generateCardFilter(categories) {
    for (var i = 0; i < categories.length; i++) {
        var mainNode = document.createElement("div");
        var checkboxNode = document.createElement("div");
        var checkmarkNode = document.createElement("div");
        var checkboxLabel = document.createElement("div");
        var pNode = document.createElement("p");
        var textNode = document.createTextNode(translations[i][0]);

        mainNode.setAttribute("class", "checkbox " + categories[i] + " checked");
        mainNode.setAttribute("id", categories[i]);
        mainNode.setAttribute("onClick", "updateCardsVisibility(" + i + ")");
        checkboxNode.setAttribute("class", "checkbox-circle");
        checkmarkNode.setAttribute("class", "checkmark");
        checkboxLabel.setAttribute("class", "checkbox-label");

        checkboxNode.appendChild(checkmarkNode);
        pNode.appendChild(textNode);
        checkboxLabel.appendChild(pNode);

        mainNode.appendChild(checkboxNode);
        mainNode.appendChild(checkboxLabel);

        document.getElementById("card-filter").appendChild(mainNode);
    }
}