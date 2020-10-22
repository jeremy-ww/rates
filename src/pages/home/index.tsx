import React, { useMemo } from 'react'
import { Table, Select, Form } from 'antd'
import { TableProps } from 'antd/lib/table'
import qs from 'query-string'
import useSWR from 'swr'

import { getPast30Days } from '@/utils/date'
import './index.scss'

const currencies = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "GBP", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "EUR", "MYR", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "SGD", "AUD", "ILS", "KRW", "PLN"]

export default function Home() {
  const [defaultCurrency, setDefaultCurrency] =  React.useState('USD')
  const [form] = Form.useForm()

  const { data } = useSWR<Rates>('/history?' + qs.stringify({
    ...getPast30Days(),
    base: defaultCurrency
  }))

  const dateRange = Object.keys(data?.rates || {})

  const columns: TableProps<any>['columns'] = useMemo(() => {
    return [
      {
        key: 'currency',
        title: 'Currency',
        dataIndex: 'currency',
        fixed: 'left'
      },
      ...(dateRange.map(key => ({ key, title: key, dataIndex: key })))
    ]
  }, [data, dateRange])

  const data2 = useMemo(() => {
    return currencies.map(currency => {
      return {
        key: currency,
        currency,
        ...dateRange.reduce((sum, date) => {
          return Object.assign(sum, { [date]: data?.rates[date][currency] })
        }, {})
      }
    })
  }, [data?.rates])
  return (
    <div className="home">
      <Form initialValues={{ source: defaultCurrency }} form={form} onValuesChange={(changedValues, allValues) => {
        setDefaultCurrency(allValues.source)
      }}>
        <Form.Item name="source" label="Sources">
          <Select showSearch style={{ width: 100 }}>
            {currencies.map(currency => <Select.Option key={currency} value={currency}>{currency}</Select.Option>)}
          </Select>
        </Form.Item>
      </Form>

      <Table onRow={(record: Record<string, string> & { currency: string }) => {
        return {
          onClick: event => {
            
          }
        }
      }} columns={columns} dataSource={data2} pagination={false} />
    </div>
  )
}


export interface Rates {
  rates: Record<string, string>;
  start_at: string;
  base: string;
  end_at: string;
}
