import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../Context/CartContext'

import './index.css'

const CartItems = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartDetails} = props
      const updatedCartDetails = {
        dishId: cartDetails.dish_id,
        dishName: cartDetails.dish_name,
        dishImage: cartDetails.dish_image,
        dishPrice: cartDetails.dish_price,
        count: cartDetails.count,
      }
      const {dishId, dishName, dishImage, dishPrice, count} = updatedCartDetails
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }
      // TODO: Update the functionality to increment and decrement quantity of the cart item
      const onClickMinus = () => {
        decrementCartItemQuantity(dishId)
      }

      const onClickPlus = () => {
        incrementCartItemQuantity(dishId)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <p className="dish-name">{dishName}</p>
          <div className="cart-item-details-container">
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                data-testid="minus"
                onClick={onClickMinus}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{count}</p>
              <button
                type="button"
                className="quantity-controller-button"
                data-testid="plus"
                onClick={onClickPlus}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {dishPrice * count}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
                data-testid="remove"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItems
