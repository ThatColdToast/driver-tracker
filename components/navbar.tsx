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
    <div className="flex flex-auto flex-row justify-center items-center bg-gray-700 text-white">
      <h1 className="float-left text-xl">Shift Tracker</h1>
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
      
      <p className="float-right">{user?.username}</p>
    </div>
  );
};
export default Navbar;