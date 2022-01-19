import React from "react";
import { IconBaseProps } from "react-icons";

import {
  FiBell,
  FiCalendar,
  FiList,
  FiSearch,
  FiSettings,
} from "react-icons/fi";
import { MdAdd, MdSearch } from "react-icons/md";
import { styledIcon } from "./styles";
// import { Container } from './styles';

const iconsMap: { [key: string]: any } = {
  notifications: FiBell,
  calendar: FiCalendar,
  todos: FiList,
  settings: FiSettings,
  plus: MdAdd,
  search: MdSearch,
};

const Icon: React.FC<IconBaseProps> = ({ name, ...others }) => {
  const Element = iconsMap[name || "default"];

  if (!Element) return null;

  const StyledElement = styledIcon(Element);

  return <StyledElement {...others} />;
};

export default Icon;
