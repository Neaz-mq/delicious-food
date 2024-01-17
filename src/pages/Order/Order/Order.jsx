import { useState } from 'react';
import orderCoverImg from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [sortBy, setSortBy] = useState('highToLow');
    const [menu] = useMenu();
    
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');

    const handleSortChange = () => {
        setSortBy(sortBy === 'highToLow' ? 'lowToHigh' : 'highToLow');
    };

    return (
        <div>
            <Helmet>
                <title>Delicious Food | Order Food</title>
            </Helmet>
            <Cover img={orderCoverImg} title="Order Food"></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList className="flex mb-10">
                    {categories.map((cat, index) => (
                        <Tab key={index} className={`mr-4 mt-4 p-5 cursor-pointer ${index === tabIndex ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800'} rounded-md`}>
                        <div className="flex items-center">
                            <div className="inline-block">
                                {cat}
                            </div>
                            <button
                                onClick={handleSortChange}
                                className={`ml-4 p-2 rounded-md text-xs ${sortBy === 'highToLow' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                            >
                                {sortBy === 'highToLow' ? 'High to Low Price' : 'Low to High Price'}
                            </button>
                        </div>
                    </Tab>
                    ))}
                </TabList>
                <TabPanel>
                <OrderTab items={salad} sortBy={sortBy}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} sortBy={sortBy}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} sortBy={sortBy}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts} sortBy={sortBy}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} sortBy={sortBy}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;




