import React from "react";
import { Button } from "grommet";
import { Menu } from "grommet-icons";

const MenuButton = () =>
  <Button 
    icon={<Menu size="medium"/>} 
    alignSelf="start" 
    focusIndicator={false} 
    size="medium"
  />

  export default MenuButton;