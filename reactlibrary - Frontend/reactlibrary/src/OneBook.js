import React from "react";

const OneBook = (props) => {
    return(
        <div className="container">
            <h2>Book Details for {props.book.title}</h2>
            <div className="row">
                <div className="col col-sm-3">
                    <div className="card">
                        <img
                            src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fillustrations%2Fbook-reading-clipart-blue-cartoon-7672463%2F&psig=AOvVaw29K_eHm1Oux4hrLLM2p2G1&ust=1691968797173000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJDdvIuh2IADFQAAAAAdAAAAABAE'}
                            className='card-img-top'
                            alt={props.book.title}
                        />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{props.book.title}</h5>
                        <p className="card-text">{props.book.isbn}</p>
                        <a href="/#" className="btn btn-primary">
                            Edit
                        </a>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default OneBook;