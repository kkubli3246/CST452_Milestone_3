import React from "react";
import SearchForm from "./SearchForm";
import BookList from "./BookList";

const SearchBook= (props) => {
    return(
        <div className="container">
            <SearchForm onSubmit={props.updateSearchResults}/>
            <BookList bookList={props.bookList} onClick={props.updateSingleBook} onDelete={props.handleDelete}/>
        </div>
    );
};

export default SearchBook;