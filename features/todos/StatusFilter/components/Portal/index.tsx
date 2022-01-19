import React from "react";

import { Container } from "./styles";

interface PortalProps {
  onClick: () => void;
}

const Portal: React.FC<PortalProps> = ({ ...others }) => {
  return <Container className="portal" {...others} />;
};

export default Portal;
