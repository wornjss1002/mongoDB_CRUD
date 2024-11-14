import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-red-900 px-8 py-4">
      <Link className="text-white text-lg font-bold" href="/">
        MongoDB CRUD
      </Link>
      <Link
        className="bg-yellow-200 text-lg font-bold px-4 py-2 rounded-md"
        href="/addTopic"
      >
        Add Topic
      </Link>
    </nav>
  );
}
