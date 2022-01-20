import React from "react";

import { Container } from "./styles";

interface PortalProps {
  onClick: () => void;
}

const Portal: React.FC<PortalProps> = ({ ...others }) => {
  return <Container data-testid="portal" className="portal" {...others} />;
};

export default Portal;
