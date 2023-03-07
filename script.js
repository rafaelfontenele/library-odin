bookGrid = document.querySelector('.main');

class Book {
    constructor(title, author, wasRead) {
        this.title = title;
        this.author = author;
        this.wasRead = wasRead;
    }


}

class Library {
    constructor(bookList = [], bookGrid) {
        this.bookList = bookList;
        this.bookGrid = bookGrid;
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
        this.updateBookGrid(bookGrid);
    }
    
    removeBook(title) {
        if (!this.contains(title)) {
            return;
        }
        for (let i=0;i<this.bookList.length;i++) {
            let current = this.bookList[i];
            if (current.title == title) {
                this.bookList.slice(i, 1);
                updateBookGrid(bookGrid);
                return
            }
        }
    }

    createDivFromBook(book) {
        bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        if (book.wasRead == true) {
            bookCard.classList.add('read');
        }
        let title = document.createElement('div')
        title.classList.add('title');
        title.textContent = book.title;

        let author = document.createElement('div');
        author.classList.add('author');
        author.textContent = book.author;

        let cardButtons = document.createElement('div');
        cardButtons.classList.add('card-buttons');

        let toggleReadBtn = document.createElement('button');
        toggleReadBtn.classList.add('toggle-read-btn');

        let wasReadDisplay=  document.createElement('span');
        wasReadDisplay.classList.add('wasRead-display')
        wasReadDisplay.textContent = 'read';

        let deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add('delete-book-btn');

        let deleteIcon = document.createElement('span');
        deleteIcon.classList.add('materials-symbols-outlined');
        deleteIcon.textContent = 'delete';

        toggleReadBtn.appendChild(wasReadDisplay);
        deleteBookBtn.appendChild(deleteIcon);
        cardButtons.appendChild(toggleReadBtn);
        cardButtons.appendChild(deleteBookBtn);

        bookCard.appendChild(title);
        bookCard.appendBook(author);
        bookCard.appendChild(cardButtons);
        
        return bookCard;
    }

    updateBookGrid(bookGrid) {
        while (bookGrid.firstChild) {
            bookGrid.children.slice(0,1);
        }
        this.bookList.forEach(book => {
            let bookItemDiv = createDivFromBook(book);
            bookGrid.children.push(bookItemDiv)
        })
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

function handleMinusBookClick() {
    alert(bookGrid.lastChild)
    bookGrid.removeChild(bookGrid.lastChild);
}

function handleLogInClick() {
}

function deleteBook(event) {
    alert(event.target.parent);
}