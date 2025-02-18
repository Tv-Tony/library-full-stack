import {ReturnBook} from "C:/Projects/library-app/03-frontend/react-library/src/layouts/HomePage/components/ReturnBook";
import {useEffect, useState} from "react";
import BookModel from "../../../models/BookModel"
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Link} from "react-router-dom";

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    /*First we start loading snd display loading to users, and when loading is complete we can turn off and display to the users*/
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    /*Use effect is at creation, and is called each type something in this array changes*/
    /*We use the state to affect the state changes*/
    useEffect(() => {
        /*ASYNC we need to wait for a promise to come back*/
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";

            const url: string = `${baseUrl}?page=0&size=9`;

            /*Since its ASYNC we need await*/
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            /*We know have our response in JSON*/
            /*JavaScript Object Notation*/
            const responseJson = await response.json();

            /*Object of embedded  books*/
            const responseData = responseJson._embedded.books;

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push(new BookModel(
                    responseData[key].id,
                    responseData[key].title,
                    responseData[key].author || "",
                    responseData[key].description || "",
                    responseData[key].copies,
                    responseData[key].copiesAvailable,
                    responseData[key].category,
                    responseData[key].img
                ));
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        /*Since Async There can be errors this is here to catch any and stop loading*/
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{height: 550}}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3, 6).map(book => (
                                <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6, 9).map(book => (
                                <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                            data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                            data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnBook book={books[7]} key={books[7].id}/>
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to={"/search"}>View More</Link>
            </div>
        </div>
    );
}