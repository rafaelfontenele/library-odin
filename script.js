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
        this.updateBookGrid();
    }

    contains(bookTitle) {
        this.bookList.forEach(book => {
            if (book.title == bookTitle) {
                return true;
            }
        })
        return false
    }

    appendBook(bookItem) {
        this.bookList.push(bookItem);
        this.updateBookGrid(bookGrid);
        alert('lala');
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

    removeBookByIndex(index) {
        if (index - 1 > this.bookList.length) {
            return
        }

        this.bookList.slice(index, 1);
        this.updateBookGrid();
    }

    createDivFromBook(book) {
        let bookCard = document.createElement('div');
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
        toggleReadBtn.onClick = "toggleRead(event.target)";
        toggleReadBtn.addEventListener('click', function (e) {e.stopPropagation(); toggleRead(e.target)}, true);

        let wasReadDisplay=  document.createElement('span');
        wasReadDisplay.classList.add('wasRead-display')
        wasReadDisplay.textContent = 'read';

        let deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add('delete-book-btn');
        deleteBookBtn.addEventListener('click', function (e) {e.stopPropagation(); deleteBook(e.target)}, true);

        let deleteIcon = document.createElement('span');
        deleteIcon.classList.add('material-symbols-outlined');
        deleteIcon.textContent = 'delete';

        toggleReadBtn.appendChild(wasReadDisplay);
        deleteBookBtn.appendChild(deleteIcon);
        cardButtons.appendChild(toggleReadBtn);
        cardButtons.appendChild(deleteBookBtn);

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(cardButtons);
        
        return bookCard;
    }

    updateBookGrid() {
        while (this.bookGrid.firstChild) { //removing all items from html grid
            this.bookGrid.removeChild(this.bookGrid.firstChild);
        }
        this.bookList.forEach(book => { //inserting everything else again, including changes made
            let bookItemDiv = this.createDivFromBook(book);
            this.bookGrid.appendChild(bookItemDiv)
        })
    }

    alertHi() {
        alert('hi');
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

function handlePlusBookClick(library) {
    let newBook = new Book(title='Titulo', author = 'Autor', wasRead = false);
    library.appendBook(newBook);
}

function handleMinusBookClick(lib) {
    library.removeBookByIndex(Library.bookList.length - 1);    
}

function handleLogInClick() {
}

function deleteBook(event) {
    alert(event);
}

let newBook = new Book(title='Titulo', author = 'Autor', wasRead = false);
let lib = new Library([newBook, newBook, newBook], bookGrid);

