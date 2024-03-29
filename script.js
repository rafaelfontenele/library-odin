bookGrid = document.querySelector('.main');

class Book {
    constructor(title, author, wasRead) {
        this.title = title;
        this.author = author;
        this.wasRead = wasRead;
    }

    toggleRead()                                    {
        this.wasRead = !this.wasRead;
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
    }
    
    removeBook(title) {
        if (!this.bookList.contains(title)) {
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
        this.bookList.splice(index, 1);
        this.updateBookGrid();
    }

    createDivFromBook(book, id) {
        let bookCard = document.createElement('div');
        bookCard.id = id;
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
        toggleReadBtn.addEventListener('click', function (e) {e.stopPropagation(); toggleRead(e)}, true);

        let wasReadDisplay=  document.createElement('span');
        wasReadDisplay.classList.add('wasRead-display')
        wasReadDisplay.textContent = 'read';

        let deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add('delete-book-btn');
        deleteBookBtn.addEventListener('click', function (e) {e.stopPropagation(); deleteBook(e)}, true);

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
    toggleArrow() {
        const arrow = document.querySelector('#arrow');
        if (arrow.classList.contains('hidden')) {
            this.showArrow();
        } else {
            this.hideArrow();
        }
    }

    showArrow() {
        const arrow = document.querySelector('.arrow');
        const plusButton = document.querySelector('.plus-btn');
        if (arrow.classList.contains('hidden')) {
            arrow.classList.remove('hidden');
        }
        if (!plusButton.classList.contains('animate-bg')) {
            plusButton.classList.add('animate-bg');
        }

    }

    hideArrow() {
        const arrow = document.querySelector('#arrow');
        const plusButton = document.querySelector('.plus-btn');
        if (!arrow.classList.contains('hidden')) {
            arrow.classList.add('hidden');
        }
        if (plusButton.classList.contains('animate-bg')) {
            plusButton.classList.remove('animate-bg');
        }
    }

    updateBookGrid() {
        if (this.bookList.length == 0) {
            this.showArrow();
            return
        } else {
            this.hideArrow();
        }

        while (this.bookGrid.firstChild) { //removing all items from html grid
            if (this.bookGrid.firstChild == 'arrow') {
                return
            }
            this.bookGrid.removeChild(this.bookGrid.firstChild);
        }
        
        this.bookList.forEach((book, index) => { //inserting everything else again, including changes made
            let bookItemDiv = this.createDivFromBook(book, index);
            this.bookGrid.appendChild(bookItemDiv)
        })

    }
    

}


function handleCheckboxClick() {
    const checkbox = document.querySelector('#wasRead');
    checkbox.checked = !checkbox.checked
}

function openGithub() {
    open('https://github.com/etzoider');
}

function toggleRead(e) {

    let clickedCard = e.target.parentNode.parentNode;
    
    let bookClicked = lib.bookList[clickedCard.id];
    bookClicked.toggleRead();
    
    if (clickedCard.classList.contains('read')) {
        clickedCard.classList.remove('read');
    } else {
        clickedCard.classList.add('read');
    }
}

function openForm() {
    Library.prototype.hideArrow();
    let formBackgroundDiv = document.querySelector('.form-background');
    let formDiv = document.querySelector('.form-wrapper');

    formBackgroundDiv.classList.add('active');
    formDiv.classList.add('active');

}

function resetForm(form) {
    form.title.value = '';
    form.author.value = '';
    form.wasRead.checked = false;
}

function formatText(text) {
    text = text.split(' ');
    for (let i = 0; i < text.length; i++) {
        if (i === 0 || text[i].length > 3) {
            text[i] = text[i].charAt(0).toUpperCase() + text[i].substring(1);
        }
    }
    return text.join(' ');
}
function addBook(form) {
    const title = formatText(form.title.value);
    const author = formatText(form.author.value);
    const wasRead = form.wasRead.checked;
    
    if (!title) {
        return
    }
    
    const book = new Book(title, author ? author : 'Unknown', wasRead);
    lib.appendBook(book);

    resetForm(form);
    closeForm();
}

function closeForm(event) {
    lib.updateBookGrid();
    let formBackgroundDiv = document.querySelector('.form-background');
    let formDiv = document.querySelector('.form-wrapper');
    formBackgroundDiv.classList.remove('active');
    formDiv.classList.remove('active');
}

function handleLogInClick() {
}

function deleteBook(e) {
    let clickedButton = e.target;
    let clickedCard = clickedButton.parentNode.parentNode;

    if (clickedButton.classList.contains('clicked')) {
        clickedCard.classList.add('hidden');
        setTimeout((e) => {lib.removeBookByIndex(clickedCard.id);
        }, 200)
    } else {
        clickedButton.classList.add('clicked');
        clickedButton.querySelector('span').textContent = 'close'; //changes delete-button icon from trashcan to X
        setTimeout( function () {
            clickedButton.classList.remove('clicked');
            clickedButton.querySelector('span').textContent = 'delete';
        }, 3000);
    }

}

function addFakeBook() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const wasRead = (randomNumber > 500) ? true : false;
    lib.appendBook(new Book(`${randomNumber}`, 'Author', wasRead))
}


let books = [new Book('The Tao of Lorem', 'Mr Ipsum', false),
new Book('How to tame a pirate', 'Hamber Eard', false),
new Book('Corruption, bribery, and other tales...', 'Louis Ignacius', false)]

let lib = new Library([], bookGrid);

