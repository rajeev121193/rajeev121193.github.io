//CANVAS
const width = 800;
const height = 800;
let cvs;

//SCENE
let pointLight;
let defaultColor;
let backgroundColor;
let wallColor;
let walls = [];
let xOff = 0;
let yOff = 100000;

//DOM
const menuStartWidth = width + 20;
const menuStartHeight = 20;
let captureButton;
let addWallButton;
let removeAllWallsButton;
let numWalls = 3;
let numRays = 100;
let numRaysSlider;
let showAllRays = true;
let allRaysCheckbox;
let mouseControl = true;
let mouseControlCheckbox;
let randomMovement = false;
let randomMovementCheckbox;
let showShadows = false;
let showShadowsCheckbox;
let showIlluminations = false;
let showIlluminationsCheckbox;

function setup() {
    cvs = createCanvas(width, height);
    createMenu();
    initSceneObjs();
}

//DOM related -----------------------------------------------------------------------------------------------
function createMenu() {
    const spacing = 40;
    let i = 1

    allRaysCheckbox = createCheckbox('Show all rays', showAllRays);
    allRaysCheckbox.position(menuStartWidth, menuStartHeight + spacing*i);
    allRaysCheckbox.changed(toggleAllRays);
    i++;

    mouseControlCheckbox = createCheckbox('Mouse control', mouseControl);
    mouseControlCheckbox.position(menuStartWidth, menuStartHeight + spacing*i);
    mouseControlCheckbox.changed(toggleMouseControl);
    i++;

    randomMovementCheckbox = createCheckbox('Random movement', randomMovement);
    randomMovementCheckbox.position(menuStartWidth, menuStartHeight + spacing*i);
    randomMovementCheckbox.changed(toggleRandomMovement);
    i++;

    showIlluminationsCheckbox = createCheckbox('Show illuminations', showIlluminations);
    showIlluminationsCheckbox.position(menuStartWidth, menuStartHeight + spacing*i);
    showIlluminationsCheckbox.changed(toggleShowIlluminations);
    i++;

    showShadowsCheckbox = createCheckbox('Show shadows', showShadows);
    showShadowsCheckbox.position(menuStartWidth, menuStartHeight + spacing*i);
    showShadowsCheckbox.changed(toggleShowShadows);
    i++;

    numRaysSlider = createSlider(0, 1000, numRays);
    numRaysSlider.position(menuStartWidth, menuStartHeight + spacing*i);
    i++;

    addWallButton = createButton('Add a wall  (Key W)');
    addWallButton.position(menuStartWidth, menuStartHeight + spacing*i);
    addWallButton.mousePressed(addWall);
    i++;

    removeAllWallsButton = createButton('Remove all walls (Key X)');
    removeAllWallsButton.position(menuStartWidth, menuStartHeight + spacing*i);
    removeAllWallsButton.mousePressed(removeAllWalls);
    i++;

    captureButton = createButton('Download Image (Key D)');
    captureButton.position(menuStartWidth, menuStartHeight + spacing*i);
    captureButton.mousePressed(capture);
    i++;
}

function toggleAllRays(evt) {
    if (evt.target.checked) {
        addBorders();
        showAllRays = true;
    } else {
        removeBorders();
        showAllRays = true;
    }
}

function toggleMouseControl(evt) {
    mouseControl = evt.target.checked;
}

function toggleRandomMovement(evt) {
    randomMovement = evt.target.checked;
}

function toggleShowShadows(evt) {
    pointLight.setCreateShadow(evt.target.checked);
    showShadows = evt.target.checked;    
}

function toggleShowIlluminations(evt) {
    pointLight.setCreateIllumination(evt.target.checked);
    showIlluminations = evt.target.checked;    
}

function capture() {
    saveCanvas(cvs, 'scene', 'jpg');
}

function addWall() {
    walls.push(createRandomWall());
}

function removeAllWalls() {
    if (showAllRays) {
        walls = walls.filter(wall => wall.isBorder);
    } else {
        walls = [];
    }
}

function keyTyped() {
    if (key === 'D' || key == 'd') {
        capture();
    } else if (key === 'X' || key == 'x') {
        removeAllWalls();
    } else if (key === 'W' || key == 'w') {
        addWall();
    }
}

function addBorders() {
    const offset = 10;
    walls.push(new Wall(createVector(-offset, -offset), createVector(-offset, height + offset), backgroundColor, true));
    walls.push(new Wall(createVector(-offset, -offset), createVector(width + offset, -offset), backgroundColor, true));
    walls.push(new Wall(createVector(width + offset, -offset), createVector(width + offset, height + offset), backgroundColor, true));
    walls.push(new Wall(createVector(-offset, height + offset), createVector(width + offset, height + offset), backgroundColor, true));
}

function removeBorders() {
    walls = walls.filter(wall => !wall.isBorder);
}


//SCENE Related -----------------------------------------------------------------------------------------------
function initSceneObjs() {
    backgroundColor = color(0, 0, 0);
    defaultColor = color(255, 255, 255);
    wallColor = color(150,150,150);
    pointLight = new PointLight(createVector(10, 10), numRays, 360, defaultColor, showShadows);
    for(let i = 0; i < numWalls; i++) {
        walls.push(this.createRandomWall());
    }

    if (showAllRays) {
        addBorders();
    }
}

function createRandomWall() {
    const start = createRandomVector();
    const end = createRandomVector();
    return new Wall(start, end, wallColor);
}

function createRandomVector() {
    return createVector(random(0, width), random(0, height));
}

function isMouseInsideCanvas() {
    return (mouseX > 0 && mouseX < width) && (mouseY > 0 && mouseY < height);
}

function draw() {
    const newNumRays = numRaysSlider.value();
    if (numRays != newNumRays) {
        numRays = newNumRays;
        pointLight.updateNumRays(newNumRays);
    }
    background(backgroundColor);
    walls.forEach(wall => wall.draw());

    if (mouseControl && isMouseInsideCanvas()) {
        pointLight.setPos(createVector(mouseX, mouseY));
    }

    if (randomMovement) {
        pointLight.setPos(createVector(noise(xOff) * width, noise(yOff) * height));
        xOff += 0.001;
        yOff += 0.001;
    }
    pointLight.draw(walls);
}