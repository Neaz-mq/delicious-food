import FoodCard from '../../../components/FoodCard/FoodCard';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


const OrderTab = ({ items, sortBy }) => {
    const sortedItems = [...items];
    if (sortBy === 'highToLow') {
        sortedItems.sort((a, b) => b.price - a.price);
    } else {
        sortedItems.sort((a, b) => a.price - b.price);
    }

   
    return (
        <div >

<Swiper
                pagination={{ clickable: true, renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>` }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='grid md:grid-cols-3 gap-10'>
                        {sortedItems.map(item => <FoodCard key={item._id} item={item}></FoodCard>)}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default OrderTab;


