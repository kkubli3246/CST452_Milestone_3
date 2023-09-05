import React from "react";
import { useNavigate} from 'react-router-dom';
import Card from "./Card";

//List to hold all read books from database
const BookList = (props) => {

    const navigator = useNavigate();

    //when book is selected is returns the book's ID and uri path
    const handleSelectionOne = (bookId, uri) => {
        console.log(`Select ID is : `, bookId);
        props.onClick(bookId, navigator, uri);
    }

    //when a card has it delete button pressed it sends handle delete to parent component via prop
    const handleDelete = (uri) =>{
        props.onDelete(navigator, uri);
    }

    const books = props.bookList.map((book) =>{
        return(
            <Card
                key = {book.id}
                bookId = {book.id}
                title = {book.title}
                author = {book.author}
                isbn = {book.isbn}
                genre = {book.genre}
                onClick ={handleSelectionOne}
                onDelete = {handleDelete}
            />
        )
    }
    )    

    return (
        <div className="container">
            {books}
        </div>
    )
}

export default BookList;