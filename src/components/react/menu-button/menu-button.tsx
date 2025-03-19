import { useState } from "react";
import close from "../../../assets/close.svg";
import hamburgerMenu from "../../../assets/hamburger-menu.svg";

import "./menu-button.css";

const MENU_BUTTON_SIZE = 50;

export default function MenuButtonR() {
  const [expanded, setExpanded] = useState(false);

  const ariaLabel = expanded ? "Uždaryti meniu" : "Atidaryti meniu";
  const popoverTargetAction = expanded ? "show" : "hide";

  function toggleMenu() {
    setExpanded((prev) => !prev);
  }

  return (
    <button
      aria-controls="mobile-menu"
      aria-expanded={expanded}
      aria-label={ariaLabel}
      className="menu-toggle"
      id="menu-button"
      popoverTarget="mobile-menu"
      popoverTargetAction={popoverTargetAction}
      type="button"
      onClick={toggleMenu}
    >
      {expanded ? (
        <img
          alt="Menu icon"
          height={MENU_BUTTON_SIZE}
          id="close-menu-image"
          src={close.src}
          width={MENU_BUTTON_SIZE}
        />
      ) : (
        <img
          alt="Menu icon"
          height={MENU_BUTTON_SIZE}
          id="open-menu-image"
          src={hamburgerMenu.src}
          width={MENU_BUTTON_SIZE}
        />
      )}
    </button>
  );
}
