import React, { useReducer } from 'react'
import qs from 'query-string'
import useSWR from 'swr'

import { getPast30Days } from '@/utils/date'
import request from '@/utils/request'
import { initialState, reducer } from '../../store/'
import './index.scss'

export default function Home() {
  const { data } = useSWR<Rates>('/history?' + qs.stringify({
    ...getPast30Days(),
    base: 'USD'
  }))

  const [state] = useReducer(reducer, initialState)
  return (
    <div className="hello">
      Hello, {state.user} <small>- ({process.env.NODE_ENV})</small>
    </div>
  )
}


export interface Rates {
  rates: Record<string, string>;
  start_at: string;
  base: string;
  end_at: string;
}
