import React, { useState } from "react";
import { useOutlet } from "react-router-dom";

const AnimatedOutlet: React.FC = () => {
  const outlet = useOutlet();
  const [statefulOutlet] = useState(outlet);

  return <>{statefulOutlet}</>;
};

export default AnimatedOutlet;
