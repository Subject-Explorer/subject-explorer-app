import React from "react";

interface Props {
  onClick: () => any;
  icon: JSX.Element;
  active?: boolean;
}
export default function NavBarButton({ onClick, icon, active = false }: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg ${
        active
          ? "bg-primary-dark opacity-50"
          : "bg-primary-inactive bg-opacity-0"
      }  p-2 transition-all duration-150 ease-in-out hover:bg-opacity-20 hover:shadow-lg`}
    >
      {icon}
    </div>
  );
}