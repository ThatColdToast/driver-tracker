import Link from "next/link";

import type { Database } from '@/types/supabase'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type User = Database["public"]["Tables"]["profiles"]["Row"];

const Navbar = (props: {tab: string}) => {
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
    <div className="flex flex-grow h-8 justify-center items-center bg-gray-700 text-white">
      <h1 className="p-1 text-xl">Shift Tracker</h1>
      <ul className="flex flex-row">
        <li>
          {props.tab == "home" ? <Link href="/" className="m-4 p-1 pb-4 rounded-md border-b-2 border-white bg-red-700">Home</Link> : <Link href="/" className="m-4 p-1 rounded-md hover:bg-gray-300 transition-all">Home</Link>}
        </li>
        <li>
          {props.tab == "login" ? <Link href="/login" className="m-4 p-1 pb-4 rounded-md border-b-2 border-white bg-red-700">Login</Link> : <Link href="/login" className="m-4 p-1 rounded-md hover:bg-gray-300 transition-all">Login</Link>}
        </li>
      </ul>
      
      <p className="flex flex-grow float-right justify-end">{user?.username ? user?.username : <Link href='/login' className='p-1'>...</Link>}</p>
    </div>
  );
};
export default Navbar;