import {useState} from 'react'
import CartContext from '../../Context/CartContext'
import './index.css'

const DishItems = props => {
  const [count, setCount] = useState(0)
  const {dishDetails} = props
  const updatedDishDetails = {
    dishName: dishDetails.dish_name,
    dishType: dishDetails.dish_Type,
    dishAvailability: dishDetails.dish_Availability,
    dishCalories: dishDetails.dish_calories,
    dishCurrency: dishDetails.dish_currency,
    dishDescription: dishDetails.dish_description,
    dishImage: dishDetails.dish_image,
    dishPrice: dishDetails.dish_price,
    dishId: dishDetails.dish_id,
  }

  const {
    dishName,
    dishType,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishPrice,
  } = updatedDishDetails

  const headingColor = dishType === 1 ? 'heading' : 'heading-green'
  const innerColor = dishType === 1 ? 'inner' : 'inner-green'

  const onClickMinus = () => {
    if (count !== 0) {
      setCount(count - 1)
    }
  }

  const onClickAdd = () => {
    setCount(count + 1)
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickAddToCart = () => {
          addCartItem({...dishDetails, count})
        }

        return (
          <li className="dish-list">
            <div className="symbol-container">
              <div className={headingColor}>
                <div className={innerColor}>0</div>
              </div>
              <div>
                <h1 className="dish-heading">{dishName}</h1>
                <p className="dish-price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish desc">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="addOn-container">
                    <button
                      type="button"
                      className="add-button"
                      onClick={onClickMinus}
                    >
                      -
                    </button>
                    <p className="count-para">{count}</p>
                    <button
                      type="button"
                      className="add-button"
                      onClick={onClickAdd}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-available">Not Available</p>
                )}
                {count >= 1 && (
                  <button
                    type="button"
                    className="addToCart-button"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
            <div className="dish-image-container">
              <p className="dish-calories">{dishCalories} calories</p>
              <img src={dishImage} alt={dishName} className="dish-image" />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItems
