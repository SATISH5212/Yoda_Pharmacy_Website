import { useState } from "react";

export default function SwitchWithLabel({
  activeStatus,
  onChangeActiveState,
  disabled = false,
}: {
  activeStatus: "ACTIVE" | "INACTIVE";
  onChangeActiveState: (state: "ACTIVE" | "INACTIVE") => void;
  disabled?: boolean;
}) {
  const isActive = activeStatus === "ACTIVE";

  return (
    <div
      onClick={() => {
        if (!disabled) {
          onChangeActiveState(isActive ? "INACTIVE" : "ACTIVE");
        }
      }}
      className={`flex items-center w-20 h-8 rounded-full border-2 transition-all duration-500 ease-in-out bg-white
        ${
          isActive
            ? "border-[#22c55e] text-[#22c55e]"
            : "border-red-500 text-red-500"
        }
        ${disabled ? "border-opacity-50" : "cursor-pointer"}`}
    >
      {/* Left Text - Active/Inactive */}
      {isActive && (
        <div className="ml-2 mr-1">
          <span className={`text-xs font-light select-none ${disabled ? "text-opacity-50":""}`}>Active</span>
        </div>
      )}

      {/* Toggle Circle */}
      <div
        className={`flex-shrink-0 w-5 h-5 rounded-full transition-all duration-300 ease-in-out shadow-md
          ${isActive ? "bg-[#22c55e] ml-2 " : "bg-red-500 ml-1"} ${disabled ? "bg-opacity-50":""}
        `}
      />

      {/* Right Text - Active/Inactive */}
      {!isActive && (
        <div className="ml-1 flex-grow flex justify-center">
          <span className="text-xs font-light select-none">Inactive</span>
        </div>
      )}
    </div>
  );
}
