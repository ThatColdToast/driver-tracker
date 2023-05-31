import { Database } from '@/types/supabase';
import React from 'react'

type Shift = Database["public"]["Tables"]["shifts"]["Row"];

export default function ShiftItem(shift: Shift) {
  return (
    <div className='flex flex-row m-2 bg-white rounded-xl'>
        <div className='m-2'>
            <p>Date</p>
            <p>{new Intl.DateTimeFormat('en-US').format(Date.parse(shift.created_at ?? ''))}</p>
        </div>
        <div className='m-2'>
            <p>Miles</p>
            <p>{shift.odometer_end - shift.odometer_start}</p>
        </div>
        <div className='m-2'>
            <p>Revenue</p>
            <p>{shift.revenue}</p>
        </div>
    </div>
  )
}
