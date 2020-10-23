import React, { useMemo } from 'react'
import { Form, Select, Button } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const currencies = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "GBP", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "EUR", "MYR", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "SGD", "AUD", "ILS", "KRW", "PLN"]

export default function Settings () {
  const [form] = Form.useForm()
  return (
    <Form {...layout} initialValues={{ source: 'EUR' }} form={form} onValuesChange={(changedValues, allValues) => {
      console.log(allValues)
    }}>
      <Form.Item name="source" label="Current Source">
        <Select showSearch>
          {currencies.map(currency => <Select.Option key={currency} value={currency}>{currency}</Select.Option>)}
        </Select>
      </Form.Item>

      <Form.Item name="period" label="Period of Refresh">
        <Select showSearch>
          {[10, 20, 30].map(v => <Select.Option key={v} value={v}>{v}s</Select.Option>)}
        </Select>
      </Form.Item>

      <Form.Item name="currencies" label="Currencies">
        <Select mode="multiple" showSearch>
          {currencies.map(v => <Select.Option key={v} value={v}>{v}</Select.Option>)}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}
