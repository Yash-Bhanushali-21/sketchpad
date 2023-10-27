import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/constants";
import { actionItemClick, menuItemClick } from "@/slice/menuSlice";
import styles from "./index.module.css";
import classNames from "classnames";

const Menu = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const dispatch = useDispatch();

  const handleMenuItemClick = (selectedIconName) => {
    dispatch(menuItemClick(selectedIconName));
  };

  const handleActionItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
  };

  const handleClickPropogationForItem = (selectedOption) => {
    if (
      selectedOption === MENU_ITEMS.PENCIL.name ||
      selectedOption === MENU_ITEMS.ERASER.name
    ) {
      handleMenuItemClick(selectedOption);
      return;
    }
    handleActionItemClick(selectedOption);
  };
  return (
    <div className={styles.menuContainer}>
      {Object.keys(MENU_ITEMS).map((MENU_ITEM_KEY) => {
        const menuItem = MENU_ITEMS[MENU_ITEM_KEY];

        const menuItemClasses = classNames(styles.iconWrapper, {
          [styles.active]: menuItem.name === activeMenuItem,
        });

        return (
          <div
            className={menuItemClasses}
            key={MENU_ITEM_KEY}
            onClick={() => handleClickPropogationForItem(menuItem.name)}
          >
            <FontAwesomeIcon
              data-itemname={menuItem.name}
              icon={menuItem.icon}
              className={styles.icon}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
