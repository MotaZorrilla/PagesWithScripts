function currentTime() {
    const date = new Date();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    const time = `${hh}:${mm}:${ss}`;
    document.querySelector('#watch').innerHTML = `<div class="glitch">${time}</div>`;
}

setInterval(currentTime, 1000);

const LIST = document.getElementById('eventList');

function getRandomUserName() {
    const userNames = ['mota', 'MotaZorrilla', 'm0ta', 'mot4Z', 'motaZOrrilla', 'motaZorrilla', 'z0rr1ll4', 'zorrill4', 'Zorrilla', 'Mot4', 'Zorrill4', 'm0t4Zorrilla'];
    return userNames[Math.floor(Math.random() * userNames.length)];
}

function getRandomEventType() {
    const eventTypes = ['mixer-follow', 'mixer-host', 'merch', 'donation'];
    return eventTypes[Math.floor(Math.random() * eventTypes.length)];
}

function applyGlitchToElement(element) {
    element.classList.add('glitch');
}

function applyGlitch2ToElement(element) {
    element.classList.add('glitch2');
}

function removeGlitchFromElement(element) {
    element.classList.remove('glitch', 'glitch2');
}

// Resto del JavaScript sigue igual

function applyMoveAnimationToElement(element) {
    element.style.animation = 'move 5s linear ';
}

function removeMoveAnimationFromElement(element) {
    element.style.animation = ''; // Eliminamos la animación
}

function createEventElement(userName, eventType) {
    const newEvent = document.createElement('section');
    newEvent.classList.add('animate', eventType);

    newEvent.innerHTML = `
        <div class="event-icon"></div>
        <span class="tag " data-text="${(Math.random() * 1000).toFixed(2)}">${(Math.random() * 1000).toFixed(2)}</span>
        <span class="message" data-text="${userName}">${userName}</span>
    `;

    return newEvent;
}

function addEvent() {
    const userName = getRandomUserName();
    const eventType = getRandomEventType();

    const newEvent = createEventElement(userName, eventType);
    LIST.prepend(newEvent);

    applyGlitchToElement(newEvent);

    setTimeout(() => {
        applyGlitch2ToElement(newEvent);
        // applyMoveAnimationToElement(newEvent);
    }, Math.random() * 3000);

    setTimeout(() => {
        removeGlitchFromElement(newEvent);
        removeMoveAnimationFromElement(newEvent);
    }, Math.random() * 8000);
}


document.querySelector('#glitch').addEventListener('click', addEvent);

setInterval(addEvent, Math.random()*10000);



