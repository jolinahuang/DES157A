(function() {
    "use strict";
    console.log("reading js");
    
    const foodImages = [
        "images/bunbohue.png",
        "images/hotpot.png",
        "images/mangostickyrice.png",
        "images/pizza.png",
        "images/poke.png",
        "images/ramen.png",
        "images/scallops.png",
        "images/steak.png"
    ];
    
    const button = document.getElementById("foodButton");
    const container = document.getElementById("foodContainer");
    
    function getRandomPosition() {
        const imageSize = 280;
        const padding = 20;
        const maxX = window.innerWidth - imageSize - padding;
        const maxY = window.innerHeight - imageSize - padding;
        
        return {
            x: Math.random() * (maxX - padding) + padding,
            y: Math.random() * (maxY - padding) + padding
        };
    }
    
    function addRandomFood() {
        const randomIndex = Math.floor(Math.random() * foodImages.length);
        const foodImage = foodImages[randomIndex];
        const position = getRandomPosition();
        
        const image = document.createElement("img");
        image.src = foodImage;
        image.className = "foodImage";
        image.style.left = `${position.x}px`;
        image.style.top = `${position.y}px`;
        
        container.appendChild(image);
    }
    
    if (button) {
        button.addEventListener("click", addRandomFood);
    }
})();