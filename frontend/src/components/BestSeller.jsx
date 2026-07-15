import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItems from './ProductItems';
const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const bestSeller = React.useMemo(() => {
    return products.filter((item) => item.bestseller).slice(0, 5);
  }, [products]);
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8 animate-fade-in'>
        <Title text1={'BEST'} text2={'SELLER'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-slate-600 tracking-wide'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestSeller.map((item, index) => (
            <ProductItems key={index} id={item._id} image={item.image} name={item.name}
              price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller
