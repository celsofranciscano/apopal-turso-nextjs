import React from 'react';

function Tooltip({ children, content, position = 'top' }) {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute z-10 invisible group-hover:visible bg-zinc-200 text-black text-xs rounded-md px-2 py-1 whitespace-nowrap ${positionClasses[position]}`}
      >
        {content}
      </div>
    </div>
  );
}

export default Tooltip;
