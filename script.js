

class Book {
    constructor(title, author, wasRead) {
        this.title = title;
        this.author = author;
        this.wasRead = wasRead;
    }


}

class Library {
    constructor(bookList = []) {
        this.bookList = bookList;
    }

    contains(bookTitle) {
        this.bookList.forEach(book => {
            if (book.title == bookTitle) {
                return true;
            }
        })
        return false
    }

    appendBook(title, author, wasRead) {
        this.bookList.push(new Book(title, author, wasRead));
    }

    removeBook(title) {
        if (!this.contains(title)) {
            return;
        }
        for (let i=0;i<this.bookList.length;i++) {
            let current = this.bookList[i];
            if (current.title == title) {
                this.bookList.slice(i, 1);
                return
            }
        }
    }

}

function openGithub() {
    open('https://github.com/etzoider');
}

function toggleRead(target) {
    clickedCard = target.parentNode.parentNode;
    doneIcon = clickedCard.querySelector('#done-icon');
    xIcon = clickedCard.querySelector('#x-icon');
    if (clickedCard.classList.contains('read')) {
        clickedCard.classList.remove('read');
        // doneIcon.classList.add('hidden');
        // xIcon.classList.remove('hidden');
    } else {
        clickedCard.classList.add('read');
        // doneIcon.classList.remove('hidden');
        // xIcon.classList.add('hidden');
    }
}

function handlePlusBookClick() {
    newBook = document.createElement('div');
    bookGrid.appendChild(newBook);
}

bookGrid = document.querySelector('.main');
function handleMinusBookClick() {
    alert(bookGrid.lastChild)
    bookGrid.removeChild(bookGrid.lastChild);
}

function handleLogInClick() {
}

function deleteBook(event) {
    alert(event.target.parent);
}