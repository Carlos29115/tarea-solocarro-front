import React, { ReactNode } from "react";
import "./card.css";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="card-container">{children}</div>;
};

export default Card;
