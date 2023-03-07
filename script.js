bookGrid = document.querySelector('.main');


function openGithub() {
    alert('lala')
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