let mapMatrix = [
    [42, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 11, 77, 77, 77, 77, 77, 77, 11, 41],
    [11, 11, 11, 11, 77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 11, 11, 11, 77, 11, 77],
    [77, 77, 77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 77, 77, 77, 11, 77, 77, 77, 77],
    [77, 11, 77, 11, 11, 11, 77, 11, 77, 11, 77, 11, 11, 11, 77, 11, 77, 11, 11, 11],
    [77, 11, 77, 77, 77, 77, 77, 11, 77, 11, 77, 77, 77, 11, 77, 11, 77, 77, 77, 77],
    [77, 11, 11, 11, 77, 11, 11, 11, 77, 11, 11, 11, 77, 11, 77, 11, 11, 11, 11, 77],
    [77, 11, 77, 77, 77, 77, 77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 77, 11, 77],
    [77, 11, 11, 11, 11, 11, 77, 11, 11, 11, 77, 11, 11, 11, 11, 11, 11, 77, 11, 77],
    [77, 11, 77, 77, 77, 77, 77, 77, 77, 11, 77, 11, 77, 77, 77, 77, 77, 77, 11, 77],
    [77, 11, 77, 11, 77, 11, 11, 11, 77, 11, 77, 77, 77, 11, 11, 11, 77, 11, 11, 77],
    [77, 11, 77, 11, 77, 77, 77, 11, 77, 11, 77, 11, 77, 77, 77, 11, 77, 77, 77, 77],
    [77, 11, 77, 11, 11, 11, 11, 11, 77, 11, 11, 11, 11, 11, 77, 11, 77, 11, 77, 11],
    [77, 77, 77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 77, 77, 11, 77, 11, 77, 11],
    [11, 11, 77, 11, 77, 11, 77, 11, 11, 11, 77, 11, 11, 11, 77, 11, 77, 11, 77, 11],
    [77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 77],
    [77, 11, 77, 11, 77, 11, 11, 11, 77, 11, 11, 11, 11, 11, 11, 11, 77, 11, 11, 11],
    [77, 11, 77, 11, 77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 77],
    [77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 11, 77],
    [77, 11, 11, 11, 77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 77, 11, 11, 11, 77, 77],
    [11, 77, 77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 11, 77, 77, 77, 77, 77, 77],
];

let totalCells = Math.pow(22, 2);
let start = {};
let target = {};
let current = {};
let nextCell;
let path;
let timer;
let anim;
let stepCount = 0;

let robot = document.createElement('img');
let dog = document.createElement('img');
let walkablePattern = /41|42|77/;

robot.isIdle = true;
robot.id = 'robot';
robot.src = 'https://app.bsd.education/resources/rescue_robot.gif';

dog.id = 'dog';
dog.src = 'https://app.bsd.education/resources/tired_dog.gif';

window.onresize = resizeContent;

window.onload = () => {
    map.style.width = `${Math.sqrt(totalCells) * 16}px`;
    map.style.height = `${Math.sqrt(totalCells) * 16}px`;

    resizeContent();
    drawGrid();

    btnStartSearch.onclick = () => {
        let gridMatrix = mapMatrix.map(row => row.map(column => walkablePattern.test(column) ? 0 : 1));
        let grid = new PF.Grid(gridMatrix);
        let finder = new PF.AStarFinder();

        path = finder.findPath(start.x, start.y, target.x, target.y, grid);
        timer = setInterval(showNextSearch, 5);
        btnStartSearch.disabled = true;
    };
};

window.onkeydown = () => {
    if (robot.isIdle) {
        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
            if (mapMatrix[current.y][current.x - 1] === 11) return;
            if (current.x > 1) current.x--;
            anim = animateRobot('left', robot.offsetLeft, Math.max(robot.offsetLeft - 16, 14 + map.offsetLeft));
        }
        else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
            if (mapMatrix[current.y][current.x + 1] === 11) return;
            if (current.x < mapMatrix.length - 2) current.x++;
            anim = animateRobot('left', robot.offsetLeft, Math.min(robot.offsetLeft + 16, 318 + map.offsetLeft));
        }
        else if (event.code === 'KeyW' || event.code === 'ArrowUp') {
            if (mapMatrix[current.y - 1][current.x] === 11) return;
            if (current.y > 1) current.y--;
            anim = animateRobot('top', robot.offsetTop, Math.max(robot.offsetTop - 16, 4 + map.offsetTop));
        }
        else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
            if (mapMatrix[current.y + 1][current.x] === 11) return;
            if (current.y < mapMatrix.length - 2) current.y++;
            anim = animateRobot('top', robot.offsetTop, Math.min(robot.offsetTop + 16, 308 + map.offsetTop));
        }

        if (!anim) return;

        anim.onfinish = () => {
            robot.isIdle = true;
        };
    }
};

function animateRobot(prop, from, to) {
    robot.isIdle = false;
    stepCount++;

    if (mapMatrix[current.y][current.x] === 42) {
        alert('You have rescued the dog! Steps taken: ' + stepCount);
        return;
    }

    if (prop === 'left') {
        if (to < robot.offsetLeft) {
            robot.style.transform = 'rotateY(180deg)';
        }
        else if (to > robot.offsetLeft) {
            robot.style.removeProperty('transform');
        }
    }

    return robot.animate([{
        [prop]: `${from}px`
    }, {
        [prop]: `${to}PX`
    }], {
        duration: 250,
        easing: 'linear',
        fill: 'forwards'
    });
}

function goRescue() {
    path.result.pop();
    moveRobot();
}

function moveRobot() {
    if (path.result.length === 0) {
        alert('You have rescued the dog! Total steps taken: ' + stepCount);
        return;
    }

    let coord = path.result.shift();

    if (nextCell) nextCell.firstElementChild.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
    nextCell = map.children[coord[1] * Math.sqrt(totalCells) + coord[0]];

    let x = nextCell.offsetLeft - ((robot.offsetWidth - 16) / 2);
    let y = nextCell.offsetTop - (robot.offsetHeight - nextCell.offsetHeight);

    if (x < robot.offsetLeft) {
        robot.style.transform = 'rotateY(180deg)';
    }
    else if (x > robot.offsetLeft) {
        robot.style.removeProperty('transform');
    }

    anim = robot.animate([{
        left: `${robot.offsetLeft}px`,
        top: `${robot.offsetTop}px`
    }, {
        left: `${x}px`,
        top: `${y}px`
    }], {
        duration: 250,
        easing: 'linear',
        fill: 'forwards'
    });

    anim.onfinish = moveRobot;
}

function showNextSearch() {
    let node = path.history.shift();
    let cell = map.children[(node.y) * Math.sqrt(totalCells) + node.x].firstElementChild;

    cell.innerText = '0';
    cell.classList.remove('opened');
    cell.classList.remove('closed');

    if (node.opened) {
        cell.innerText = node.g;
        stepCount = node.g;
        cell.classList.add('opened');
    }
    else {
        cell.innerText = '';
        cell.classList.add('closed');
    }

    if (path.history.length === 0) {
        clearInterval(timer);
        goRescue();
    }
}

function drawGrid() {
    mapMatrix.forEach((_, rowIndex) => {
        mapMatrix[rowIndex].unshift(rowIndex === mapMatrix.length - 1 ? 28 : 21);
        mapMatrix[rowIndex].push(22);
    });

    mapMatrix.unshift([24, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 25]);
    mapMatrix.push([26, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 27]);

    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            let block = document.createElement('div');
            let overlayBlock = document.createElement('div');
            let offset = { x: 0, y: 0 };
            let overlayOffset = { x: 0, y: 85 };

            if (walkablePattern.test(cell)) {
                offset.x = 85;
                offset.y = Math.round(Math.random()) * 17;

                if (cell === 41) {
                    start.x = cellIndex;
                    start.y = rowIndex;
                    current = start;

                    app.append(robot);
                    robot.style.left = `${cellIndex * 16 - ((robot.offsetWidth - 16) / 2) + map.offsetLeft}px`;
                    robot.style.top = `${rowIndex * 16 - (robot.offsetHeight - 16) + map.offsetTop}px`;
                }
                else if (cell === 42) {
                    target.x = cellIndex;
                    target.y = rowIndex;

                    app.append(dog);
                    dog.style.left = `${cellIndex * 16 + map.offsetLeft}px`;
                    dog.style.top = `${rowIndex * 16 + map.offsetTop}px`;
                }
            }
            else if (cell === 11) {
                offset.x = 85;
                offset.y = Math.round(Math.random()) * 17;
                overlayOffset.x = [221, 238, 255, 272, 289, 306, 323, 340, 357, 391, 408][Math.floor(Math.random() * 11)];
                overlayOffset.y = 153;
            }
            else if (cell === 20) {
                offset.x = 51;
                offset.y = 34;
            }
            else if (cell === 21 || cell === 28) {
                offset.x = 68;
                offset.y = 17;

                if (cell === 28) {
                    overlayOffset.x = 901;
                    overlayOffset.y = 309;
                }
            }
            else if (cell === 22) {
                offset.x = 34;
                offset.y = 17;
            }
            else if (cell === 23) {
                offset.x = 51;
            }
            else if (cell === 24) {
                offset.y = 17;
            }
            else if (cell === 25) {
                offset.x = 17;
                offset.y = 17;
            }
            else if (cell === 26) {
                offset.y = 34;
            }
            else if (cell === 27 || cell === 28) {
                offset.x = 17;
                offset.y = 34;
            }
            else if (cell === 95) {
                offset.x = 68;
                offset.y = 34;
            }
            else if (cell === 96) {
                offset.x = 34;
                offset.y = 34;
            }
            else if (cell === 97) {
                offset.x = 68;
            }
            else if (cell === 98) {
                offset.x = 34;
            }

            block.style.backgroundPosition = `-${offset.x}px -${offset.y}px`;
            overlayBlock.style.backgroundPosition = `-${overlayOffset.x}px -${overlayOffset.y}px`;

            overlayBlock.className = 'overlay';

            block.append(overlayBlock);
            map.append(block);
        });
    });

    setTimeout(() => {
        app.style.opacity = 1;
    }, 500);
}

function resizeContent() {
    let appRatio = app.offsetWidth / app.offsetHeight;
    let windowRatio = window.innerWidth / window.innerHeight;

    app.style.left = `${(window.innerWidth - app.offsetWidth) / 2}px`;
    app.style.top = `${(window.innerHeight - app.offsetHeight) / 2}px`;
    app.style.transform = `scale(${appRatio > windowRatio ? window.innerWidth / app.offsetWidth : window.innerHeight / app.offsetHeight})`;
}