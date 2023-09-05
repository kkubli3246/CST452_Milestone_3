import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dataSource from './dataSource'

//this class is used to create a new book and update an existing book. Both use the same view.
const NewBook = (props) =>{
        
    //Empty book object
    let book = {
        title: '',
        author:'',
        isbn: '',
        genre: ''
    }

    let newBookCreation = true;

    //If a cook is passed through the prop, then we know that it is an existing book in the Database that needs to be Updated.
    if(props.book){
        book = props.book;
        newBookCreation = false;
    }

    //Book State Variables 
    const[bookTitle, setBookTitle] = useState(book.title);
    const[bookAuthor, setBookAuthor] = useState(book.author);
    const[bookIsbn, setbBookIsbn] = useState(book.isbn);
    const[bookGenre, setBookgenre] = useState(book.genre);
    
    const navigate = useNavigate();

    //Fuctions used to update state variables
    const updateTitle = (event) =>{
        setBookTitle(event.target.value);
    }
    const updateAuthor = (event) =>{
        setBookAuthor(event.target.value);
    }
    const updateISBN = (event) =>{
        setbBookIsbn(event.target.value);
    }
    const updateGenre = (event) =>{
        setBookgenre(event.target.value);
    }


    //
    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log('Submitted');

        const editedBook = {
            bookId: book.id,
            title: bookTitle,
            author: bookAuthor,
            isbn: bookIsbn,
            genre: bookGenre
        }

        console.log(book);

        saveBook(editedBook);

    }

    //intakes a book object and send HTTP Call
    //POST to create new book object
    //
    //PUTtp Update existing book object
    const saveBook = async(book) => {
        let response;

        if(newBookCreation){
            response = await dataSource.post('/books', book); 
            console.log(response.data);
        }
        else{
            response = await dataSource.put('/books', book); 
            props.onEditBook(navigate);
        }
        props.onEditBook(navigate);
    }

    //Cancel just navigates back to home page
    const handleCancel = () =>{
        navigate('/');
    }

    return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <h1>{newBookCreation ? "Create New:" : "Edit"}</h1>
            <div className="form-group">
                <label htmlFor="bookTitle">Book title</label>
                <input type="text" className="form-control" id="bookTitle" placeholder="Enter book Title" value={bookTitle} onChange={updateTitle}/>
                <label htmlFor="bookAuthor">Author</label>
                <input type="text" className="form-control" id="bookAuthor"  placeholder="Enter Book Author" value={bookAuthor} onChange={updateAuthor}/>
                <label htmlFor="bookIsbn">Description</label>
                <input type="text" className="form-control" id="bookIsbn"  placeholder="Enter Book ISBN" value={bookIsbn} onChange={updateISBN}/>
                <label htmlFor="bookGenre">Year</label>
                <input type="text" className="form-control" id="bookGenre"  placeholder="Enter Book Genre" value={bookGenre} onChange={updateGenre}/>
            </div>
            <div>
                <button type="button" className="btn btn-light" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
            
            
    </div>      
    )
}

export default NewBook;