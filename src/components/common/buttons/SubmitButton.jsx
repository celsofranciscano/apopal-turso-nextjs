function SubmitButton({ isLoading, name }) {
  return (
    <button
      type="submit"
      className={`py-2 px-4 w-full md:w-fit  bg-blue-500 rounded-md text-white font-medium flex items-center justify-center ${
        isLoading ? " bg-blue-400  text-zinc-200  cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="animate-spin  border-2 border-zinc-200 border-t-transparent  rounded-full w-4 h-4 mr-2"></span>
      ) : null}
      {name}
    </button>
  );
}

export default SubmitButton;
