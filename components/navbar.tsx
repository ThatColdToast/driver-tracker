import Link from "next/link";

import type { Database } from '@/types/supabase'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Navbar = () => {
  const supabase = createClientComponentClient<Database>()

  return (
    <div className="navbar bg-gray-700 text-white">
      <div className="flex-1">
        <h1 className="btn btn-ghost normal-case text-xl">Shift Tracker</h1>
      </div>
      <div className="flex-none border-b-2">
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