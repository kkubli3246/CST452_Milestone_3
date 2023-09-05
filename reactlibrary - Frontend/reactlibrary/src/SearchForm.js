import React, {useState} from "react";

const SearchForm = (props) =>{
    
    //state variable to keep track of string input to the search function
    const [inputText, setInputText] = useState(""); 
    
    //when a OnChange is triggered in search form the inputText variable is then updated
    const handleChangeInput = (event) => { 
        setInputText(event.target.value); 
        console.log(inputText); 
    }; 
    
    //When the submit for the search form is selected it sends the inputText to the parent componenet via Props to perform the search function
    const handleFormSubmit = (event) => { 
        event.preventDefault(); props.onSubmit(inputText); 
    }; 
    
    return ( 
        <div> 
            <form onSubmit={handleFormSubmit}> 
                <div className='form-group'> 
                    <label htmlFor='search-term'>Search for</label> 
                    <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Enter search term here' 
                        onChange={handleChangeInput} 
                    /> 
                </div> 
            </form> 
        </div> 
    ); 
}

export default SearchForm;