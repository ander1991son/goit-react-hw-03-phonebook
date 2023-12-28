// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const API_KEY = '41167755-70f3c314cd8390efeff4b47a8';

//   const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&per_page=12`;

//   // Leer los contactos guardados en localStorage si existen
//   const storedContacts = localStorage.getItem('setImages');
//   if (storedContacts) {
//     this.setState({ setImages: JSON.parse(storedContacts) });
//   }

//   const fetchImages = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(API_URL);
//       setImages(response.data.hits);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (searchTerm) {
//       fetchImages();
//     }
//   }, [searchTerm]);

//   const handleSearch = e => {
//     e.preventDefault();
//     fetchImages();
//   };

//   return (
//     <div
//     // style={{
//     //   height: '100vh',
//     //   display: 'flex',
//     //   justifyContent: 'center',
//     //   alignItems: 'center',
//     //   fontSize: 40,
//     //   color: '#010101',
//     // }}
//     >
//       <header className="searchbar">
//         <form className="form" onSubmit={handleSearch}>
//           <input
//             className="input"
//             type="text"
//             placeholder="Search images and photos"
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//           <button type="submit" className="button">
//             <span className="button-label">Search</span>
//           </button>
//         </form>
//       </header>

//       <ul className="gallery">
//         {images.map(image => (
//           <li key={image.id} className="gallery-item">
//             <img src={image.webformatURL} alt="" />
//           </li>
//         ))}
//       </ul>

//       {isLoading && <div className="loader">Loading...</div>}
//     </div>
//   );
// };

///////////////////////codigo de arriba es el original

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///  refactorizacion

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import axios from 'axios';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = '41167755-70f3c314cd8390efeff4b47a8';

  const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&per_page=12`;

  // Obtener datos del almacenamiento local al montar el componente
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    const storedImages = localStorage.getItem('images');

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }

    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  // Guardar datos en el almacenamiento local al actualizar ciertos estados
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('images', JSON.stringify(images));
  }, [searchTerm, images]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setImages(response.data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchImages();
    }
  }, [searchTerm]);

  const handleSearch = e => {
    e.preventDefault();
    fetchImages();
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPageResponse = await axios.get(API_URL);
      const newImages = nextPageResponse.data.hits;
      setImages(prevImages => [...prevImages, ...newImages]);
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null); // Nuevo estado para la imagen seleccionada

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl); // Actualiza el estado con la URL de la imagen seleccionada al hacer clic
  };

  const closeModal = () => {
    setSelectedImage(null); // Reinicia el estado para ocultar el Modal
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      <Loader isLoading={isLoading} />
      <Button images={images} LoadMore={handleLoadMore} />
      {selectedImage && <Modal imageUrl={images} closeModal={closeModal} />}
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////
/// ciclos de vida

// import React, { Component } from 'react';
// import SearchBar from './SearchBar/SearchBar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Loader from './Loader/Loader';
// import Button from './Button/Button';
// //import Modal from './Modal/Modal';
// import axios from 'axios';

// export class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchTerm: '',
//       images: [],
//       isLoading: false,
//       selectedImage: '',
//     };

//     this.API_KEY = '41167755-70f3c314cd8390efeff4b47a8';
//     // this.API_URL = `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.state.searchTerm}&per_page=12`;
//   }

//   componentDidMount() {
//     const storedContacts = localStorage.getItem('images');
//     if (storedContacts) {
//       this.setState({ images: JSON.parse(storedContacts) });
//     }
//   }

//   fetchImages = async () => {
//     const { searchTerm } = this.state;
//     const API_URL = `https://pixabay.com/api/?key=${this.API_KEY}&q=${searchTerm}&per_page=12`;

//     this.setState({ isLoading: true });
//     try {
//       const response = await axios.get(this.API_URL);
//       this.setState({ images: response.data.hits });
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.searchTerm !== prevState.searchTerm) {
//       this.fetchImages();
//     }
//   }

//   // handleSearch = e => {
//   //   // e.preventDefault();
//   //   this.fetchImages();
//   // };
//   handleSearch = searchTerm => {
//     this.setState({ searchTerm }, () => {
//       this.fetchImages();
//     });
//   };

//   handleImageClick = imageUrl => {
//     this.setState({ selectedImage: imageUrl });
//   };

//   // closeModal = () => {
//   //   this.setState({ selectedImage: null });
//   // };

//   render() {
//     const { searchTerm, images, isLoading } = this.state;

//     return (
//       <div>
//         <SearchBar searchTerm={searchTerm} setSearchTerm={this.handleSearch} />
//         <ImageGallery images={images} onImageClick={this.handleImageClick} />
//         <Loader isLoading={isLoading} />
//         <Button images={images} LoadMore={this.handleLoadMore} />
//         {/* {this.state.selectedImage && (
//           <Modal
//             imageUrl={this.state.selectedImage}
//             closeModal={this.closeModal}
//           />
//         )} */}
//       </div>
//     );
//   }
// }
