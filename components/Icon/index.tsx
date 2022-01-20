import React from "react";
import { IconBaseProps } from "react-icons";

import { FiBell, FiCalendar, FiList, FiSettings } from "react-icons/fi";
import {
  MdAdd,
  MdFilterList,
  MdSearch,
  MdClose,
  MdEdit,
  MdDelete,
  MdMoreHoriz,
  MdMoreVert,
} from "react-icons/md";
import { styledIcon } from "./styles";

const iconsMap: { [key: string]: any } = {
  notifications: FiBell,
  calendar: FiCalendar,
  todos: FiList,
  settings: FiSettings,
  plus: MdAdd,
  search: MdSearch,
  filter: MdFilterList,
  close: MdClose,
  edit: MdEdit,
  delete: MdDelete,
  moreH: MdMoreHoriz,
  moreV: MdMoreVert,
};

const Icon: React.FC<IconBaseProps> = ({ name, ...others }) => {
  const Element = iconsMap[name || "default"];

  if (!Element) return null;

  const StyledElement = styledIcon(Element);

  return <StyledElement {...others} />;
};

export default Icon;
