// Header Component

// Attributes
// Gradient
// Abstract lines
// Mobile Icon
// Tabs with animations

import React, { useState } from "react";
import { useRouter } from "next/router";
import HeaderStyled from "./styles";
import { Tab } from "../";
import Icon from "../../icons/Icon";

const Header = ({ tabs = [], currentMode, setCurrentMode }) => {
  const [mobileTabsVisibility, setMobileTabsVisibility] = useState(false);
  const modeToSet = currentMode ? false : true;
  const router = useRouter();

  const handleTabClick = (tabRoute) => {
    if (mobileTabsVisibility) {
      setMobileTabsVisibility(false);
    }
    router.push(tabRoute);
  };

  const handleSetVisibility = () => {
    setMobileTabsVisibility(!mobileTabsVisibility);
  };

  return (
    <HeaderStyled
      currentMode={currentMode}
      showMobileTabs={mobileTabsVisibility}
      tabLength={tabs.length}
    >
      <div className="mode-container">
        <button onClick={() => setCurrentMode(modeToSet)}>
          Go {currentMode ? "Dark" : "Bright"}
        </button>
      </div>

      <div className="logo-container">
        <div className="logo-wrap">
          <span onClick={() => router.push("/home")}>ModernMoto</span>
        </div>
        <div onClick={handleSetVisibility}>
          <Icon
            name="menu"
            color="#fff"
            size="32"
            className="menu"
            onClick={handleSetVisibility}
          />
        </div>
      </div>
      <div className="tabs">
        {tabs.map((tab) => (
          <Tab
            key={tab.route}
            title={tab.title}
            onClick={() => handleTabClick(tab.route)}
            className="tab"
          />
        ))}
      </div>
    </HeaderStyled>
  );
};

export default Header;
