import {HiOutlineShoppingCart} from 'react-icons/hi'
import './index.css'

const Header = ({cartItems}) => {
  const getCartItemsCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header>
      <div className="header-container">
        <h1 className="restaurant-name">UNI Resto Cafe</h1>
        <div className="order-info">
          <p className="my-orders-text ">My Orders</p>
          <div className="cart-info">
            <HiOutlineShoppingCart size={20} />
            <span className="cart-items">{getCartItemsCount()}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
