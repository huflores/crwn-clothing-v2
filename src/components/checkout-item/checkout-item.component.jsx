import { useContext } from 'react';
import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } = useContext(CartContext);
    const removeProductFromCart = () => removeItemFromCart(cartItem);
    const increaseProductQuantity = () => increaseItemQuantity(cartItem);
    const decreaseProductQuantity = () => decreaseItemQuantity(cartItem);
    return (
        <div className="checkout-item-container">
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'><span className='arrow' onClick={decreaseProductQuantity}>&#10094;</span><span className='value'>{quantity}</span><span className='arrow' onClick={increaseProductQuantity}>&#10095;</span></span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={removeProductFromCart}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;