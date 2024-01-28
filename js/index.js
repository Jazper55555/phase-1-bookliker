// Grab books from json server
// Grab titles for each (forEach) book
// Create list (li) for each book title 
// Append the li to div #list

// Add event listener to each title
// When user clicks title, information should be displayed in div #show-panel
// Display thumbnail, description, & users who liked book

// Add a like button to each book info display
// Add event listener to button
// 'click' event should send PATCH request to server w/ array of users who like it
// Once PATCH request is fulfilled, new user should display on the user li

document.addEventListener("DOMContentLoaded", function() {
    fetchData()
});

const titleContainer = document.getElementById('list')
const infoContainer = document.getElementById('show-panel')
const ul = document.createElement('ul')
ul.id = 'user-list'

function fetchData() {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(data => {
        const booksData = data

        booksData.forEach(books => {
            const li = document.createElement('li')
            const titles = books.title
            li.textContent = titles
            titleContainer.appendChild(li)
        })

        const titleList = document.querySelectorAll('li')

        titleList.forEach(title => {
            title.addEventListener('click', () => {
                if (infoContainer.hasChildNodes()) {
                    while (infoContainer.firstChild) {
                        infoContainer.removeChild(infoContainer.firstChild)
                    }
                }
                const titleText = title.textContent
                const clickedBook = booksData.find((book) => book.title === titleText)

                const bookImage = clickedBook.img_url
                const bookTitle = clickedBook.title
                const bookAuthor = clickedBook.author
                const bookThumbnail = clickedBook.subtitle
                const bookDescription = clickedBook.description

                const imageBox = document.createElement('img')
                imageBox.src = bookImage
                const titleBox = document.createElement('h1')
                titleBox.textContent = bookTitle
                const authorBox = document.createElement('h3')
                authorBox.textContent = bookAuthor
                const thumbnailBox = document.createElement('h4')
                thumbnailBox.textContent = bookThumbnail
                const descriptionBox = document.createElement('p')
                descriptionBox.textContent = bookDescription
                const likeButton = document.createElement('button')
                likeButton.textContent = 'Like'

                infoContainer.appendChild(imageBox)
                infoContainer.appendChild(titleBox)
                infoContainer.appendChild(authorBox)
                infoContainer.appendChild(thumbnailBox)
                infoContainer.appendChild(descriptionBox)

                const bookUsers = clickedBook.users

                bookUsers.forEach(user => {
                    const bookUsername = user.username

                    const userBox = document.createElement('li')
                    userBox.textContent = bookUsername

                    ul.appendChild(userBox)
                    infoContainer.appendChild(ul)
                })

                infoContainer.appendChild(likeButton) 
                
                const newUserList = document.createElement('li')

                likeButton.addEventListener('click', () => {
                    const currentUser = { id: 1, username: 'pouros'}
                    const updatedUsers = [...bookUsers, currentUser]

                    const patchUsers = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            users: updatedUsers
                        })
                    }

                    fetch(`http://localhost:3000/books/${clickedBook.id}`, patchUsers)

                    const newUsername = currentUser.username
                    newUserList.textContent = newUsername

                    ul.appendChild(newUserList)

                    // let userExists = false

                    // ul.querySelectorAll('li').forEach((li) => {
                    //     if (li.textContent === newUsername) {
                    //         userExists = true;
                    //         return
                    //     }
                    // })

                    // if (!userExists) {
                    // }   else {
                    //     console.log('User already exists')
                    // }
                })
           }) 
        })
    })
}