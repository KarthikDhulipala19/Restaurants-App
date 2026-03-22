import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = ({restaurantName, cartItems}) => {
  const getTotalCartCount = () => {
    let count = 0
    cartItems.forEach(item => {
      count += item.quantity
    })
    return count
  }

  return (
    <div className="header-container">
      <h1 className="restaurant-name">{restaurantName}</h1>
      <div className="order-info">
        <p className="my-orders-text">My Orders</p>
        <div className="cart-info">
          <AiOutlineShoppingCart size={30} />
          <p className="cart-items">{getTotalCartCount()}</p>
        </div>
      </div>
    </div>
  )
}

export default Header
