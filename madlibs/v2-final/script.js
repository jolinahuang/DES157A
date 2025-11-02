(function () {
    "use strict";
    console.log("reading js");
    
    const form = document.querySelector("#madlibForm");
    const overlay = document.querySelector("#storyOverlay");
    const closeButton = document.querySelector("#closeButton");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const adjective = document.querySelector("#adjective").value;
        const noun = document.querySelector("#noun").value;
        const verb = document.querySelector("#verb").value;
        const creature = document.querySelector("#creature").value;
        const bodyPart = document.querySelector("#bodyPart").value;
        const number = document.querySelector("#number").value;
        const object = document.querySelector("#object").value;
        
        document.querySelector("#storyAdjective").textContent = adjective;
        document.querySelector("#storyNoun").textContent = noun;
        document.querySelector("#storyVerb").textContent = verb;
        document.querySelector("#storyCreature").textContent = creature;
        document.querySelector("#storyBodyPart").textContent = bodyPart;
        document.querySelector("#storyNumber").textContent = number;
        document.querySelector("#storyObject").textContent = object;
        
        overlay.classList.add("show");
    });

    closeButton.addEventListener("click", function() {
        overlay.classList.remove("show");
        form.reset();
    });
})();