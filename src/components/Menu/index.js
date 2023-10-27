import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick } from "@/slice/menuSlice";
import styles from "./index.module.css";

const Menu = () => {
  const dispatch = useDispatch();

  const handleMenuItemClick = (selectedIconName) => {
    dispatch(menuItemClick(selectedIconName));
  };

  return (
    <div className={styles.menuContainer}>
      {Object.keys(MENU_ITEMS).map((MENU_ITEM_KEY) => {
        const menuItem = MENU_ITEMS[MENU_ITEM_KEY];

        return (
          <div
            className={styles.iconWrapper}
            key={MENU_ITEM_KEY}
            onClick={() => handleMenuItemClick(menuItem.name)}
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
