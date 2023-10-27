import { useDispatch, useSelector } from "react-redux";
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { MENU_ITEMS } from "@/constants";
import styles from "./index.module.css";

const Menu = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const dispatch = useDispatch();

  const handleMenuItemClick = (selectedIconName) => {
    dispatch(menuItemClick(selectedIconName));
  };
  const handleActionItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
  };
  const handleItemPropagationFromType = (item) => {
    if (item === MENU_ITEMS.PENCIL.name || item === MENU_ITEMS.ERASER.name) {
      handleMenuItemClick(item);
      return;
    }
    handleActionItemClick(item);
  };

  return (
    <div className={styles.menuContainer}>
      {Object.keys(MENU_ITEMS).map((MENU_ITEM_KEY) => {
        const menuItem = MENU_ITEMS[MENU_ITEM_KEY];

        const menuItemClasses = classNames(styles.iconWrapper, {
          [styles.active]: activeMenuItem === menuItem,
        });

        return (
          <div
            className={menuItemClasses}
            key={MENU_ITEM_KEY}
            onClick={() => handleItemPropagationFromType(menuItem.name)}
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
