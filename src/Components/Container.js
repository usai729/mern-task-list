import React, { useEffect } from "react";

export default function Container({ children }) {
  return (
    <div className="w-screen h-screen" id="bg">
      {children}
    </div>
  );
}
