import {useState, useEffect} from 'react'
import {ThreeDot} from 'react-loading-indicators'
import Header from '../Header'
import DishItem from '../DishItem'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [responseData, setResponseData] = useState([])
  const [activeCategoryItem, setActiveCategory] = useState('')
  const [cartItems, setCartItems] = useState([])

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishImage: eachDish.dish_image,
        dishDescription: eachDish.dish_description,
        dishPrice: eachDish.dish_price,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestuarentData = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    const updatedData = getUpdatedData(data[0].table_menu_list)
    setResponseData(updatedData)
    setActiveCategory(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }

  const addItemToCart = dish => {
    const isAlreadyExists = cartItems.find(each => each.dishId === dish.dishId)

    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeItemFromCart = dish => {
    const isAlreadyExists = cartItems.find(each => each.dishId === dish.dishId)

    if (isAlreadyExists) {
      setCartItems(prev =>
        prev
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(each => each.quantity > 0),
      )
    }
  }

  const renderLoadingView = () => (
    <div className="loading-container">
      <ThreeDot
        variant="brick-stack"
        color="#00ea7e"
        size="medium"
        text="Loading.."
        textColor="#20d18a"
      />
    </div>
  )

  const updateCategoryId = menuCategoryId => setActiveCategory(menuCategoryId)

  const renderTabMenuList = () =>
    responseData.map(eachCategory => {
      const onClickHandler = () => {
        updateCategoryId(eachCategory.menuCategoryId)
      }

      return (
        <li
          className={`each-tab-item ${
            activeCategoryItem === eachCategory.menuCategoryId
              ? 'active-tab-item'
              : ''
          }`}
          key={eachCategory.menuCategoryId}
        >
          <button
            type="button"
            className="menu-button"
            key={eachCategory.menuCategoryId}
            onClick={onClickHandler}
          >
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = responseData.find(
      eachItem => eachItem.menuCategoryId === activeCategoryItem,
    )

    return (
      <ul className="dishes-container">
        {categoryDishes.map(eachDish => (
          <DishItem
            key={eachDish.dishId}
            cartItems={cartItems}
            dishDetails={eachDish}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  useEffect(() => {
    fetchRestuarentData()
    // eslint-disable-next-line
  }, [])

  return isLoading ? (
    renderLoadingView()
  ) : (
    <div className="home-container">
      <Header cartItems={cartItems} />
      <ul className="tab-menu-container">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}

export default Home
