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

    matrix[row][col] = 2;
}
