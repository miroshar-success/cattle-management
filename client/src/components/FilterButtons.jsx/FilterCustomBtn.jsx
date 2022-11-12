import React from "react";
export function FilterCustomBtn({ value, name, onClick, className, tag }) {
  let classNameToApply = className;
  if (!classNameToApply && tag !== "Limpiar") {
    classNameToApply =
      " border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500";
  }

  if (tag === "Limpiar") {
    classNameToApply =
      " bg-white border border-solid border-green px-3 py-1 rounded-sm text-green hover:bg-green hover:text-white hover:border-green transition-all ease-in-out duration-500";
  }
  return (
    <button
      className={classNameToApply}
      name={name}
      value={value}
      onClick={onClick}
    >
      {tag}
    </button>
  );
}
