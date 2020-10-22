import React, { useReducer } from 'react'
import { Table } from 'antd'
import qs from 'query-string'
import useSWR from 'swr'

import { getPast30Days } from '@/utils/date'
import request from '@/utils/request'
import { initialState, reducer } from '../../store/'
import './index.scss'

const currencies = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "GBP", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "EUR", "MYR", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "SGD", "AUD", "ILS", "KRW", "PLN"]

export default function Home() {
  const { data } = useSWR<Rates>('/history?' + qs.stringify({
    ...getPast30Days(),
    base: 'USD'
  }))

  const dateRange = Object.keys(data?.rates || {})

  const columns = [
    {
      title: 'Currency',
      dataIndex: 'currency'
    },
    ...(dateRange.map(key => ({ title: key, dataIndex: key })))
  ]

  const data2 = currencies.map((currency, k) => {
    return {
      currency,
      ...dateRange.reduce((sum, date) => {
        return Object.assign(sum, { [date]: data?.rates[date][currency] })
      }, {})
    }
  })

  console.log(data2)

  const [state] = useReducer(reducer, initialState)
  return (
    <div className="hello">
      <Table columns={columns} dataSource={data2} scroll={{ x: 1300 }} />
    </div>
  )
}


export interface Rates {
  rates: Record<string, string>;
  start_at: string;
  base: string;
  end_at: string;
}
