import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import SearchBook from './SearchBook';
import dataSource from './dataSource';
import EditBook from  './EditBook';
// import OneBook from './OneBook';
// import DeleteBook from './DeleteBook';

const App = () => {

  
  //STATE VAIABLES

  //Variable to hold BookList 
  const[bookList, setBookList] = useState([]);
  //Variable to hold search Phrase
  const [searchPhrase, setSearchPhrase] = useState('');
  //Variable to hold recently select book ID for API calls
  const [currentSelectedBookId, setCurrentSelectedBookId] = useState(0);

  //Read Books from database and populate BookList
  const loadBooks = async () => {
    const response = await dataSource.get(`/books`);
    setBookList(response.data);
  }

  let refresh = false;

  useEffect(() =>{
    loadBooks();
  }, [refresh]
  );

  //Function used to update the search results based on current search phrase
  const updateSearchResults  = async (phrase) =>{
    console.log('Phrase is = ' + phrase);
    setSearchPhrase(phrase);
  }

  //update booklist after a delete is used
  const handleDelete = (navigate )=> {
      loadBooks();
      navigate('/');
}

  const updateSingleBook = (id, navigate, uri) =>{
 
    var indexNumber = 0;
    
    for(let i = 0; i < bookList.length; ++i){
        if(Object.values(bookList[i])[0] === id) {
          
            indexNumber = i;
        }

    }

    
    setCurrentSelectedBookId(indexNumber);
    let path = uri + indexNumber;
    console.log("path" + path);
    navigate(path);
}

 //Reander List of Books to the screen, based on Search Phrase(All Books if Search is empty)
 const renderedList = bookList.filter((book) =>{
       
    if(
        book.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        searchPhrase === ''
    ){
        return true;
    }
    return false;
  });

  //After a book is edited, The book list is reloaded
  const onEditBook = (navigate) =>{
    loadBooks();
    navigate('/');
}

  
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route
            exact
            path ='/'
            element={
              <SearchBook
                updateSearchResults={updateSearchResults}
                bookList ={renderedList}
                updateSingleBook={updateSingleBook}
                handleDelete = {handleDelete}
              />
            }
        />
        <Route exact path='/new' element={<EditBook onEditBook={onEditBook}/>} />
        <Route exact path='/edit/:bookId' element={<EditBook onEditBook={onEditBook} book={bookList[currentSelectedBookId]}/>} />
        <Route exact path='/delete:bookId' />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
