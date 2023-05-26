import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-slate-700">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Shift Tracker</a>
      </div>
      <div className="flex-none border-b-2 border-white">
        <ul className="flex flex-row">
          <li>
            <Link href="/" className="m-4">Home</Link>
          </li>
          <li>
            <Link href="/login" className="m-4">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;