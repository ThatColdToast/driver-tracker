import Navbar from "@/components/navbar";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Shift = Database["public"]["Tables"]["shifts"]["Row"];

export default function ShiftAdd() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [date, setDate] = useState("");
  const [odoStart, setOdoStart] = useState("");
  const [odoEnd, setOdoEnd] = useState("");
  const [revenue, setRevenue] = useState("");

  const handleAddShiftSend = async () => {
    const user = (await supabase.auth.getSession()).data.session?.user;
    if (!user) {
      router.push("/login");
      return;
    }

    await supabase
      .from("shifts")
      .upsert({ id: randomUUID(), user_id: user.id, created_at: date, odometer_start: odoStart, odometer_end: odoEnd });
    router.refresh();
  };

  return (
    <main className={'w-screen h-screen bg-slate-500'}>
      <Head><title>Shifts</title></Head>
      <Navbar {...{tab:'home'}}/>
      <div className="m-2">
        <p>Date</p>
        <input
          name="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className="flex flex-auto w-32 text-black rounded-md"
        ></input>
      </div>
      <div className="m-2">
        <p>Odo-Start</p>
        <input
          name="odo-start"
          onChange={(e) => setOdoStart(e.target.value)}
          value={odoStart}
          className="flex flex-auto w-32 text-black rounded-md"
        ></input>
      </div>
      <div className="m-2">
        <p>Odo-End</p>
        <input
          name="odo-end"
          onChange={(e) => setOdoEnd(e.target.value)}
          value={odoEnd}
          className="flex flex-auto w-32 text-black rounded-md"
        ></input>
      </div>
      <div className="m-2">
        <p>Revenue</p>
        <input
          name="revenue"
          onChange={(e) => setRevenue(e.target.value)}
          value={revenue}
          className="flex flex-auto w-32 text-black rounded-md"
        ></input>
      </div>
    </main>
  );
}
