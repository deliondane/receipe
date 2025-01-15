import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/scrollbar';
import List from "../components/List";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Home = () => {
  const { data } = useContext(DataContext);
  console.log(data);
  const [swiper, setSwiper] = useState(null);

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };
  return (
    <div className="home">
      {
        <Swiper
          className="swiperMain"
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop
        >
          {data.slice(0, 10).map((item) => (
            <SwiperSlide key={item.id} className="swiperSlide">
              <Link>
                <img src={item.ATT_FILE_NO_MK} alt="{item.HASH_TAG}" />
                <div className="text">
                  <p className="title">{item.RCP_NM}</p>
                  <p className="material">{item.RCP_PARTS_DTLS}</p>
                  <p className="recipe">중량 | {item.INFO_WGT}</p>
                  <p className="recipe">열량 | {item.INFO_ENG}</p>
                  <p className="recipe">탄수화물 | {item.INFO_CAR}</p>
                  <p className="recipe">단백질 | {item.INFO_PRO}</p>
                  <p className="recipe">지방 | {item.INFO_FAT}</p>
                  <p className="recipe">나트륨 | {item.INFO_NA}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      }
      <div className="title">
        <h2> 오늘의 추천 레시피</h2>
      </div>
      <div className="homeList">
        <Swiper
          modules={[Navigation, Autoplay, Scrollbar]}
          spaceBetween={10}
          slidesPerView={5}
          grabCursor={true}
          onSwiper={(swiper) => setSwiper(swiper)}
          scrollbar={{
            hide: true,
          }}
        >
          {data.slice(11, 19).map((item) => (
            <SwiperSlide key={item.id}>
              <List data={[item]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
