function fadeToScene(fromId, toId) {
    const fromScene = document.getElementById(fromId);
    const toScene = document.getElementById(toId);

    fromScene.classList.add('fade-out');

    setTimeout(function() {
        fromScene.style.display = 'none';
        toScene.style.display = 'flex';
        toScene.classList.add('fade-out');

        requestAnimationFrame(function() {
            toScene.classList.remove('fade-out');

            if (toId === 'scene-cake') {
                const cakeDirections = document.getElementById('cake-directions');
                cakeDirections.classList.remove('fade-in');
                cakeDirections.classList.remove('pulse');
                setTimeout(function() {
                    cakeDirections.classList.add('fade-in');
                    setTimeout(function() {
                        cakeDirections.classList.add('pulse');
                    }, 600);
                }, 6000);
            }
        });
    }, 3500);
}

let noCount = 0;
let yesCount = 0;

document.getElementById('no-btn').addEventListener('click', function() {
    console.log('No button clicked');

    if (noCount === 0) {
        document.getElementById('muffin-question').textContent = "So you don't like blueberries?"
        noCount++;
    } else if (noCount === 1){
        document.getElementById('muffin-question').textContent = "Okay then, You must not be Paul then...Redirecting you..."

        setTimeout(function() {
            document.getElementById('scene-muffin').classList.add('fade-out');
            
            setTimeout(function() {
                noCount = 0;
                yesCount = 0;
                document.getElementById('muffin-question').textContent = "Do you like blueberry muffins?"

                document.getElementById('scene-muffin').classList.remove('fade-out');
            }, 1000);
        }, 2000);
    }
});


document.getElementById('yes-btn').addEventListener('click', function() {
    yesCount++;
    console.log('Yes button clicked ');

    if (noCount === 1) {
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
            }, 1000);
        }, 2000);
    }
});