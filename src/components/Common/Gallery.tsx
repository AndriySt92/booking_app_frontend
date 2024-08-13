import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
    {
      original: 'https://source.unsplash.com/800x600/?hotel',
      thumbnail: 'https://source.unsplash.com/150x100/?hotel'
    },
    {
      original: 'https://source.unsplash.com/800x600/?luxuryhotel',
      thumbnail: 'https://source.unsplash.com/150x100/?luxuryhotel'
    },
    {
      original: 'https://source.unsplash.com/800x600/?resorthotel',
      thumbnail: 'https://source.unsplash.com/150x100/?resorthotel'
    },
    {
      original: 'https://source.unsplash.com/800x600/?boutiquehotel',
      thumbnail: 'https://source.unsplash.com/150x100/?boutiquehotel'
    },
    {
      original: 'https://source.unsplash.com/800x600/?modernhotel',
      thumbnail: 'https://source.unsplash.com/150x100/?modernhotel'
    },
    {
      original: 'https://source.unsplash.com/800x600/?historichotel',
      thumbnail: 'https://source.unsplash.com/150x100/?historichotel'
    }
  ];

const Gallery = () => {
  return (
    <ImageGallery items={images} />
  );
};

export default Gallery