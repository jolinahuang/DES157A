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
    
    let clickCount = 0;
    let currentDishes = 1;
    
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
        const container = document.querySelector("#foodContainer");
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
    
    function addMultipleFoods() {
        clickCount++;
        
        if (clickCount === 1) {
            currentDishes = 1;
        } else {
            currentDishes = Math.round(currentDishes * 1.5);
        }
        
        for (let i = 0; i < currentDishes; i++) {
            setTimeout(function() {
                addRandomFood();
            }, i * 50);
        }
        
        console.log(`Click ${clickCount}: Adding ${currentDishes} food items`);
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        const button = document.querySelector("#foodButton");
        
        if (button) {
            button.addEventListener("click", addMultipleFoods);
        }
    });
})();