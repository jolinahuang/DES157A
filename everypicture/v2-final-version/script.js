(function() {
    "use strict";
    console.log("reading js");
    
    // array of food images
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
    
    // calculates random positioning within viewport bounds
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
    
    // creates and appends food images at random positions
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
    
    // multiplies dishes by 1.5x after each user click and makes them appear with staggered timing
    function addMultipleFoods() {
        clickCount++;
        
        if (clickCount === 1) {
            currentDishes = 1;
        } else {
            currentDishes = Math.round(currentDishes * 1.5);
        }
        
        // staggers the food dishes with 50ms delay between each dish
        for (let i = 0; i < currentDishes; i++) {
            setTimeout(function() {
                addRandomFood();
            }, i * 50);
        }
        
        console.log(`Click ${clickCount}: Adding ${currentDishes} food items`);
    }
    
    // attaches click handler to button once DOM is ready
    document.addEventListener("DOMContentLoaded", function() {
        const button = document.querySelector("#foodButton");
        
        if (button) {
            button.addEventListener("click", addMultipleFoods);
        }
    });
})();