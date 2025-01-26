function SortTable() {
  return (
    <button className="hover:bg-zinc-200 rounded-md shadow-md p-2">
      <svg
        className="w-6 h-6 text-current"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
        />
      </svg>
    </button>
  );
}

export default SortTable;
