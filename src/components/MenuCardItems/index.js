import './index.css'

const MenuCardItems = props => {
  const {tabDetails, currentTab} = props
  const {menuCategory} = tabDetails

  const onClickTab = () => {
    currentTab(menuCategory)
  }

  return (
    <li className="list-item">
      <button type="button" className="tab-button" onClick={onClickTab}>
        {menuCategory}
      </button>
    </li>
  )
}

export default MenuCardItems
