import Link from "next/link";
function LinkButton({ name, href }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-md bg-blue-500  text-white"
    >
      {name}
    </Link>
  );
}

export default LinkButton;
