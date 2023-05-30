import Link from "next/link";

import type { Database } from '@/types/supabase'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type User = Database["public"]["Tables"]["profiles"]["Row"];

const Navbar = () => {
  const supabase = createClientComponentClient<Database>()

  const [ user, setUser ] = useState<User>()

  useEffect(() => {
    const getData = async () => {
      const userId = (await supabase.auth.getUser()).data.user?.id
      const profile = (await supabase.from("profiles").select().eq('id', userId)).data?.at(0)
      setUser(profile);
    };

    getData();
  }, []);

  return (
    <div className="navbar bg-gray-700 text-white">
      <div className="flex flex-row justify-start items-center">
        <h1 className="btn btn-ghost normal-case text-xl">Shift Tracker</h1>
        <p>{user?.username}</p>
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