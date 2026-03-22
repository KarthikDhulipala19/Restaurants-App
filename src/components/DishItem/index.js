import './index.css'

const DishItem = ({
  dishDetails,
  cartItems,
  addItemToCart,
  removeItemFromCart,
}) => {
  const {
    dishId,
    dishName,
    dishImage,
    dishDescription,
    dishPrice,
    dishCurrency,
    dishCalories,
    dishAvailability,
    dishType,
    addonCat,
  } = dishDetails

  const getQuantityFromCart = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const onClickIncrement = () => {
    addItemToCart(dishDetails)
  }

  const onClickDecrement = () => {
    removeItemFromCart(dishDetails)
  }

  const renderControllerButton = () => (
    <div className="controller-container">
      <button type="button" className="button" onClick={onClickDecrement}>
        -
      </button>
      <p className="quantity">{getQuantityFromCart()}</p>
      <button type="button" className="button" onClick={onClickIncrement}>
        +
      </button>
    </div>
  )

  return (
    <li className="dish-item-container">
      <div
        className={dishType === 1 ? 'veg-border' : 'non-veg-border'}
        style={{
          height: '30px',
          width: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '4px',
          padding: '10px',
        }}
      >
        <div
          className={dishType === 1 ? 'veg-round' : 'veg-round non-veg-round'}
        />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability ? (
          renderControllerButton()
        ) : (
          <p className="not-availability-text">Not available</p>
        )}
        {addonCat.length > 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
      </div>
      <p className="dish-calories">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default DishItem
