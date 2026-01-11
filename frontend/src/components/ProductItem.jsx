import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link className='cursor-pointer text-gray-700 dark:text-gray-200' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 h-70 transition ease-in-out object-cover' src={image} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem