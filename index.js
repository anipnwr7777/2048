class Stack {
    constructor() {
        this.items = []
        this.count = 0
    }

    // Add element to top of stack
    push(element) {
        this.items[this.count] = element
        this.count += 1
        return this.count - 1
    }

    // Return and remove top element in stack
    // Return undefined if stack is empty
    pop() {
        if (this.count == 0) return undefined
        let deleteItem = this.items[this.count - 1]
        this.count -= 1
        return deleteItem
    }

    // Check top element in stack
    peek() {
        return this.items[this.count - 1]
    }

    // Check if stack is empty
    isEmpty() {
        return this.count == 0
    }

    // Check size of stack
    size() {
        return this.count
    }

    // Clear stack
    clear() {
        this.items = []
        this.count = 0
        return this.items
    }
}

const stack = new Stack();


let matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        const box = document.createElement("div");
        box.classList.add("box", "text");
        box.innerHTML = matrix[i][j];
        const container = document.getElementById("wrapper");
        container.appendChild(box);
    }
}

function updateMatrix() {
    const container = document.getElementById("wrapper");
    const children = container.children;
    console.log(children);
    let index = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] != children[index].innerHTML) {
                children[index].innerHTML = matrix[i][j];
            }
            index++;
        }
    }
}


function isValid(row, col) {
    if (matrix[row][col] != 0) {
        return false;
    } else {
        return true;
    }
}

function generateRandomNumber() {
    let index = Math.floor(Math.random() * 16);
    // let row = Math.floor(Math.random() * 4);
    let row = Math.floor(index / 4);
    let col = index % 4;
    console.log(row, col);

    while (!isValid(row, col)) {
        console.log("infinite");
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    }

    let choiceArr = [2, 4];
    const tempIndex = Math.floor(Math.random() * 2);
    matrix[row][col] = choiceArr[tempIndex];
    // matrix[row][col] = 2;
}

let stack1 = new Stack();
let stack2 = new Stack();

let arr = [];
let len;
let noOfZero;
let finalScore = 0;

function checkForGameEnd() {
    for (let i = 0; i < 4; i++) {
        let flag = false;
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] == 2048) {
                document.removeEventListener('keyup', func);
                alert("you win");
                flag = true;
                break;
            }
        }
        if (flag) {
            break;
        }
    }

    let count = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] != 0) {
                count++;
            }
        }
    }
    if (count == 16) {
        document.removeEventListener('keyup', func);
        alert("you lose");
    }
}

function scoreUpdate() {
    const score = document.getElementById("current-score-text");
    score.innerHTML = finalScore;
}

function someOpForDown() {
    while (!stack1.isEmpty()) {
        let onTop = stack1.peek()[0];
        if (!stack2.isEmpty() && stack2.peek()[0] == onTop && stack2.peek()[1] == false) {
            stack2.pop();
            stack2.push([2 * onTop, true]);
            finalScore += 2 * onTop;
        }
        else if (stack2.isEmpty()) {
            stack2.push([onTop, false]);
        }
        else {
            stack2.push([onTop, false]);
        }
        stack1.pop();
    }
    arr = [];
    len = stack2.size();
    noOfZero = 4 - len;
    while (noOfZero) {
        arr.push(0);
        noOfZero--;
    }
    while (!stack2.isEmpty()) {
        arr.push(stack2.peek()[0]);
        stack2.pop();
    }
}

function moveDown() {
    stack1.clear();
    stack2.clear();
    for (let i = 0; i < 4; i++) {
        if (matrix[i][0] != 0) {
            stack1.push([matrix[i][0], false]);
        }
    }
    someOpForDown();
    for (let i = 0; i < 4; i++) {
        matrix[i][0] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 0; i < 4; i++) {
        if (matrix[i][1] != 0) {
            stack1.push([matrix[i][1], false]);
        }
    }
    someOpForDown();
    for (let i = 0; i < 4; i++) {
        matrix[i][1] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 0; i < 4; i++) {
        if (matrix[i][2] != 0) {
            stack1.push([matrix[i][2], false]);
        }
    }
    someOpForDown();
    for (let i = 0; i < 4; i++) {
        matrix[i][2] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 0; i < 4; i++) {
        if (matrix[i][3] != 0) {
            stack1.push([matrix[i][3], false]);
        }
    }
    someOpForDown();
    for (let i = 0; i < 4; i++) {
        matrix[i][3] = arr[i];
    }

}



function moveRight() {
    stack1 = new Stack();
    stack2 = new Stack();
    for (let i = 0; i < 4; i++) {
        if (matrix[0][i] != 0) {
            stack1.push([matrix[0][i], false]);
        }
    }
    someOpForDown();
    for (let i = 0; i < 4; i++) {
        matrix[0][i] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 0; i < 4; i++) {
        if (matrix[1][i] != 0) {
            stack1.push([matrix[1][i], false]);
        }
    }
    someOpForDown();
    for (let i = 0; i < 4; i++) {
        matrix[1][i] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 0; i < 4; i++) {
        if (matrix[2][i] != 0) {
            stack1.push([matrix[2][i], false]);
        }
    }
    someOpForDown();
    for (let i = 0; i < 4; i++) {
        matrix[2][i] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 0; i < 4; i++) {
        if (matrix[3][i] != 0) {
            stack1.push([matrix[3][i], false]);
        }
    }
    someOpForDown();
    for (let i = 0; i < 4; i++) {
        matrix[3][i] = arr[i];
    }

}

function someOpForUpAndLeft() {
    while (!stack1.isEmpty()) {
        let onTop = stack1.peek()[0];
        if (!stack2.isEmpty() && stack2.peek()[0] == onTop && stack2.peek()[1] == false) {
            stack2.pop();
            stack2.push([2 * onTop, true]);
            finalScore += 2 * onTop;
        }
        else if (stack2.isEmpty()) {
            stack2.push([onTop, false]);
        }
        else {
            stack2.push([onTop, false]);
        }
        stack1.pop();
    }
    arr = [];
    len = stack2.size();
    noOfZero = 4 - len;
    while (!stack2.isEmpty()) {
        arr.push(stack2.peek()[0]);
        stack2.pop();
    }
    arr.reverse();
    while (noOfZero) {
        arr.push(0);
        noOfZero--;
    }
}

function moveLeft() {
    stack1 = new Stack();
    stack2 = new Stack();
    for (let i = 3; i >= 0; i--) {
        if (matrix[0][i] != 0) {
            stack1.push([matrix[0][i], false]);
        }
    }
    someOpForUpAndLeft();
    for (let i = 0; i < 4; i++) {
        matrix[0][i] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 3; i >= 0; i--) {
        if (matrix[1][i] != 0) {
            stack1.push([matrix[1][i], false]);
        }
    }
    someOpForUpAndLeft();
    for (let i = 0; i < 4; i++) {
        matrix[1][i] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 3; i >= 0; i--) {
        if (matrix[2][i] != 0) {
            stack1.push([matrix[2][i], false]);
        }
    }
    someOpForUpAndLeft();
    for (let i = 0; i < 4; i++) {
        matrix[2][i] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 3; i >= 0; i--) {
        if (matrix[3][i] != 0) {
            stack1.push([matrix[3][i], false]);
        }
    }
    someOpForUpAndLeft();
    for (let i = 0; i < 4; i++) {
        matrix[3][i] = arr[i];
    }

}


function moveUp() {
    stack1 = new Stack();
    stack2 = new Stack();
    for (let i = 3; i >= 0; i--) {
        if (matrix[i][0] != 0) {
            stack1.push([matrix[i][0], false]);
        }
    }
    someOpForUpAndLeft();
    for (let i = 0; i < 4; i++) {
        matrix[i][0] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 3; i >= 0; i--) {
        if (matrix[i][1] != 0) {
            stack1.push([matrix[i][1], false]);
        }
    }
    someOpForUpAndLeft();
    for (let i = 0; i < 4; i++) {
        matrix[i][1] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 3; i >= 0; i--) {
        if (matrix[i][2] != 0) {
            stack1.push([matrix[i][2], false]);
        }
    }
    someOpForUpAndLeft();
    for (let i = 0; i < 4; i++) {
        matrix[i][2] = arr[i];
    }

    stack1.clear();
    stack2.clear();
    for (let i = 3; i >= 0; i--) {
        if (matrix[i][3] != 0) {
            stack1.push([matrix[i][3], false]);
        }
    }
    someOpForUpAndLeft();
    for (let i = 0; i < 4; i++) {
        matrix[i][3] = arr[i];
    }

}

function func(event) {
    console.log("key pressed")
    // if up arrow
    if (event.keyCode === 38) {
        console.log("up key pressed");
        moveUp();
        generateRandomNumber();
        updateMatrix();
        scoreUpdate();
        checkForGameEnd();
    }
    // if right arrow
    else if (event.keyCode === 39) {
        console.log("right");
        moveRight();
        generateRandomNumber();
        updateMatrix();
        scoreUpdate();
        checkForGameEnd();
    }
    // if down arrow
    else if (event.keyCode === 40) {
        console.log("down")
        moveDown();
        generateRandomNumber();
        updateMatrix();
        scoreUpdate();
        checkForGameEnd();
    }
    // if left arrow
    else if (event.keyCode === 37) {
        console.log("left")
        moveLeft();
        generateRandomNumber();
        updateMatrix();
        scoreUpdate();
        checkForGameEnd();
    }
}


document.addEventListener("keyup", func);