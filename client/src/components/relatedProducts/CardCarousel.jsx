import React, {useState, useRef} from 'react';
import AddToLooksCard from './AddToLooksCard.jsx';
import ProductCard from './ProductCard.jsx';
import CarouselArrow from './CarouselArrow.jsx';

var CardCarousel = (props) => {

  const [startingCardIndex, setStartingCardIndex] = useState(1);
  const carouselRef = useRef(null);
  const cardRef = useRef(null);

  var scroll = (direction) => {
    if (direction === 'back') {
      var amount = 350;
      carouselRef.current.scrollBy(amount * (startingCardIndex - props.relatedProducts.length + 2), 0);
      setStartingCardIndex(startingCardIndex - 1);
    } else if (direction === 'forward') {
      var amount = 350;
      carouselRef.current.scrollBy(amount * startingCardIndex, 0);
      setStartingCardIndex(startingCardIndex+1);
    }
  }

  var cardAction;
  if (props.removeFromLooks) {
    cardAction = props.removeFromLooks;
  } else if (props.compareProducts) {
    cardAction = props.compareProducts;
  }
  return (
    <div className='CardCarousel'>
      <div className='CardCarousel-Arrows'>
       {startingCardIndex < props.relatedProducts.length - 3 ? <CarouselArrow direction={'forward'} scroll={scroll} /> : null}
       {startingCardIndex > 1 ? <CarouselArrow direction={'back'} scroll={scroll} /> : null}
      </div>

      <div ref={carouselRef} className='CardCarousel-Scroller'>
        {props.isLooks ? <AddToLooksCard addToLooks={props.addToLooks} refer={cardRef}/> : null}
        {props.relatedProducts ?
          props.relatedProducts.map(item =>
            <ProductCard removeFromLooks={props.removeFromLooks} compareProducts={props.compareProducts} key={item.id} product={item} />)
        : null}
      </div>
    </div>
  )
}

export default CardCarousel;