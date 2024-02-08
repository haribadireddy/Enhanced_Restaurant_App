import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'

import MenuCardItems from '../MenuCardItems'

import DishItems from '../DishItems'

import './index.css'

class Home extends Component {
  state = {
    menuList: [],
    presentTab: 'Salads and Soup',
    restaurantName: '',
  }

  componentDidMount() {
    this.renderApiCall()
  }

  renderApiCall = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const updatedMenuList = data[0].table_menu_list.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      categoryDishes: eachMenu.category_dishes,
      menuCategoryId: eachMenu.menu_category_id,
    }))
    this.setState({
      menuList: updatedMenuList,
      restaurantName: data[0].restaurant_name,
    })
  }

  currentTab = id => {
    this.setState({presentTab: id})
  }

  render() {
    const {menuList, presentTab, restaurantName} = this.state
    let updatedCategoryDishes
    if (menuList.length > 0) {
      updatedCategoryDishes = menuList.find(
        category => category.menuCategory === presentTab,
      ).categoryDishes

      console.log(updatedCategoryDishes)
    }
    return (
      <div className="bg-container">
        <Header restaurantName={restaurantName} />
        <ul className="list-container">
          {menuList.map(eachItem => (
            <MenuCardItems
              key={eachItem.menuCategory}
              tabDetails={eachItem}
              currentTab={this.currentTab}
            />
          ))}
        </ul>
        <hr className="line" />
        {menuList.length > 0 ? (
          <ul className="menu-item-container">
            {updatedCategoryDishes.map(eachMenu => (
              <DishItems key={eachMenu.dish_id} dishDetails={eachMenu} />
            ))}
          </ul>
        ) : (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        )}
      </div>
    )
  }
}

export default Home
