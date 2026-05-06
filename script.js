function fadeToScene(fromId, toId) {
    const fromScene = document.getElementById(fromId);
    const toScene = document.getElementById(toId);

    fromScene.style.opacity = 0;

    setTimeout(function() {
        fromScene.style.display = 'none';
        toScene.style.opacity = 1;

        toScene.style.display = (toId === 'scene-letters') ? 'block' : 'flex';
        toScene.style.opacity = 0;

        setTimeout(function() {
            toScene.style.opacity = 1;

            if (toId === 'scene-cake') {
                const cakeDirections = document.getElementById('cake-directions');
                cakeDirections.classList.remove('fade-in');
                cakeDirections.classList.remove('pulse');
                
                setTimeout(function() {
                    cakeDirections.classList.add('fade-in');
                    setTimeout(function() {
                        cakeDirections.classList.add('pulse');
                        setTimeout(function() {
                            dropCandles();
                        }, 1500);
                    }, 600);
                }, 6000);
            }

            if (toId === 'scene-slideshow') {
                const slideshowIntro = document.getElementById('slideshow-intro');
                slideshowIntro.classList.remove('fade-in');

                setTimeout(function(){
                    slideshowIntro.classList.add('fade-in');
                    setTimeout(function(){
                        startSlideshow();
                    }, 3000);
                }, 6000);
            }

            if (toId === 'scene-letters') {
                document.getElementById('scene-letters').scrollTop = 0;
            }
        }, 50);
    }, 3000);
}

let noCount = 0;
let yesCount = 0;
let nextCount = 0;
let choiceLocked = false;
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const nextBtn = document.getElementById('next-btn');


function lockChoices() {
    choiceLocked = true;
    yesBtn.disabled = true;
    noBtn.disabled = true;
    nextBtn.disabled = true;
}

function unlockChoices() {
    choiceLocked = false;
    yesBtn.disabled = false;
    noBtn.disabled = false;
    nextBtn.disabled = false;
}

document.getElementById('no-btn').addEventListener('click', function() {
    if (choiceLocked) return;
    console.log('No button clicked');

    if (noCount === 0) {
        document.getElementById('muffin-question').textContent = "So you don't like blueberries?"
        noCount++;
    } else if (noCount === 1){
        lockChoices();
        document.getElementById('muffin-question').textContent = "Okay then, You must not be Paul then...Redirecting you..."

        setTimeout(function() {
            document.getElementById('scene-muffin').classList.add('fade-out');
            
            setTimeout(function() {
                noCount = 0;
                yesCount = 0;
                document.getElementById('muffin-question').textContent = "Do you like blueberry muffins?"

                document.getElementById('scene-muffin').classList.remove('fade-out');
                unlockChoices();
            }, 1000);
        }, 2000);
    }
});


document.getElementById('yes-btn').addEventListener('click', function() {
    if (choiceLocked) return;
    yesCount++;
    console.log('Yes button clicked ');

    if (noCount === 1) {
        lockChoices();
        document.getElementById('muffin-question').textContent = "Alright Paul, redirecting you..."
        setTimeout(function() {
            fadeToScene('scene-muffin', 'scene-cake');
        }, 2000);
        return;
    }

    if (yesCount === 1) {
        console.log('Yes button was clicked 1 time!');
        document.getElementById('muffin-question').textContent = "Are you sure about that?"
    } else if (yesCount === 2) {
        console.log('Yes button was 2 times!');
        document.getElementById('muffin-question').textContent = "You sure you like blueberries?"
    } else if (yesCount === 3) {
        console.log('Yes button was 3 times!');
        document.getElementById('muffin-question').textContent = "You sure you like blueberries? Because this muffin is blueberry flavored!"
    } else if (yesCount === 4) {
        console.log('Yes button was 4 times!');
        document.getElementById('muffin-question').textContent = "Are you sure, sure?!"
    } else if (yesCount === 5) {
        console.log('Yes button was 5 times!');
        document.getElementById('muffin-question').textContent = "Is this even Paul?"
    } else if (yesCount > 5) {
        lockChoices();
        console.log('Yes button was clicked more than 5 times!');

        document.getElementById('yes-btn').style.display = 'none';
        document.getElementById('no-btn').style.display = 'none';

        document.getElementById('muffin-question').textContent = "Ummm...sure...Redirecting you..."

        setTimeout(function() {
            document.getElementById('scene-muffin').classList.add('fade-out');
            
            setTimeout(function() {
                noCount = 0;
                yesCount = 0;
                document.getElementById('muffin-question').textContent = "Do you like blueberry muffins?"

                document.getElementById('scene-muffin').classList.remove('fade-out');

                 document.getElementById('yes-btn').style.display = 'block';
                document.getElementById('no-btn').style.display = 'block';
                unlockChoices();
            }, 1000);
        }, 2000);
    }
});

document.getElementById('next-btn').addEventListener('click', function(){
    console.log('Next button clicked');

    if (nextCount === 0){
        nextCount++;
        document.getElementById('finale').textContent = "Don't worry, you can access these letters again!";
    } else if (nextCount === 1){
        lockChoices();
        document.getElementById('finale').textContent = "Don't worry, you can access these letters again!";
        
        setTimeout(function() {
            fadeToScene('scene-letters', 'scene-final');
        }, 2000);
    }
});

let candlesBlownOut = 0;
const totalCandles = 3;

function dropCandles() {
    const container = document.getElementById('candle-container');
    container.innerHTML = '';
    candlesBlownOut = 0;

    for (let i = 0; i < totalCandles; i++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('candle-wrapper');
        wrapper.style.animationDelay = (i * 0.3) + 's';

        const candle = document.createElement('img');
        candle.src = 'assets/imgs/candle.png';
        candle.classList.add('candle');

        const flame = document.createElement('img');
        flame.src = 'assets/imgs/flame.png';
        flame.classList.add('flame');

        function blowOut() {
            if (!flame.classList.contains('blown-out')) {
                flame.classList.add('blown-out');
                candlesBlownOut++;
                console.log('Candles blown out: ' + candlesBlownOut);

                if (candlesBlownOut === totalCandles) {
                    setTimeout(function() {
                        fadeToScene('scene-cake', 'scene-slideshow');
                    }, 1500);
                }
            }
        }

        candle.addEventListener('click', blowOut);
        flame.addEventListener('click', blowOut);
        wrapper.appendChild(flame);
        wrapper.appendChild(candle);
        container.appendChild(wrapper);
    }
}

function startSlideshow(){
    const images = document.querySelectorAll('.ftcimg');
    let current = 0;

    function showNext(){
        if (current >= images.length){
            setTimeout(function(){
                fadeToScene('scene-slideshow', 'scene-letters');
            }, 500);
            return;
        }

        const img = images[current];

        img.classList.add('slide-in');

        setTimeout(function(){
            img.classList.remove('slide-in');
            img.classList.add('slide-out');

            setTimeout(function(){
                current++;
                showNext();
            }, 1000);
        }, 5000);
    }
    showNext();
}