import { useState, useEffect } from "react";
import "./code.css";

const slideWidth = 30;
const items = [
  {
    movie: {
      title: "SpiderMan",

      image:
        "https://i.pinimg.com/236x/73/18/a8/7318a8b311d3e7de627837d7119b5de2.jpg",
    },
  },
  {
    movie: {
      title: "Thor",

      image:
        "https://i.pinimg.com/564x/59/80/25/5980255edfc957ea2f20e78a2cf417e5.jpg",
    },
  },
  {
    movie: {
      title: "Godzilla",

      image:
        "https://i.pinimg.com/236x/ad/53/ae/ad53ae335ac150dfc22cb61e8824fdec.jpg",
    },
  },
  {
    movie: {
      title: "Robocop",

      image:
        "https://i.pinimg.com/236x/d5/e6/b2/d5e6b24efabfbc022ccd6ddf57b30264.jpg",
    },
  },
  {
    movie: {
      title: "Noah",

      image:
        "https://i.pinimg.com/236x/11/31/d4/1131d4a083a738b79c966f20adc1469d.jpg",
    },
  },
  {
    movie: {
      title: "SHERLOCK",

      image:
        "https://i.pinimg.com/236x/f2/13/74/f21374d3c512cfe7d5b28a7ce10d58d1.jpg",
    },
  },
];

const length = items.length;
items.push(...items);

const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const createItem = (position, idx) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
    },
    movie: items[idx].movie,
  };
  return item;
};

const CarouselSlideItem = ({ pos, idx, activeIdx }) => {
  const item = createItem(pos, idx, activeIdx);

  return (
    <div className="carousel__item" style={item.styles}>
      <div className="carousel__img">
        <img src={item.movie.image} alt={item.movie.title} />
      </div>
    </div>
  );
};

const keys = Array.from(Array(items.length).keys());
console.log(keys);
const Carousel = () => {
  const [items, setItems] = useState(keys);
  const [isTick, setisTick] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const maxLength = items.length;
//    const getData=()=>{
//     fetch("data.json",{headers:{
//         'Content-Type':'application/json',
//         'Accept':'application/json'
//     }
// }).then((response)=>{
//     return response.json()
// }).then(data=>{
//     console.log(data,"data");
// })
//    }
//    useEffect(()=>{
//     getData()
//    },[])
  const prev = (jump = 1) => {
    if (!isTick) {
      setisTick(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % maxLength]);
      });
    }
  };

  const next = (jump = 1) => {
    if (!isTick) {
      setisTick(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + maxLength) % maxLength]);
      });
    }
  };

  const handleDot = (idx) => {
    if (idx < activeIdx) prev(activeIdx - idx);
    if (idx > activeIdx) next(idx - activeIdx);
  };

  useEffect(() => {
    if (isTick) sleep(300).then(() => setisTick(false));
  }, [isTick]);

  useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length);
  }, [items]);

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button className="prev" onClick={() => prev()}>
          &lt;
        </button>
        <div className="carousel__container">
          <ul className="carousel__list">
            {items.map((pos, i) => (
              <CarouselSlideItem
                key={i}
                idx={i}
                pos={pos}
                activeIdx={activeIdx}
              />
            ))}
          </ul>
        </div>
        <button className="next" onClick={() => next()}>
          &gt;
        </button>
        <div className="carousel__dots">
          {items.slice(0, length).map((pos, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className={i === activeIdx ? "dot active" : "dot"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
