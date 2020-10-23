import React from 'react'
import { Form, Select, Button } from 'antd'

import { CURRENCIES } from '@/constants'
import { initialSettings } from '@/store'
import './index.scss'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Settings () {
  const [form] = Form.useForm()
  return (
    <Form className="settings" {...layout} initialValues={initialSettings} form={form}>
      <Form.Item name="source" label="Current Source">
        <Select showSearch>
          {CURRENCIES.map(currency => <Select.Option key={currency} value={currency}>{currency}</Select.Option>)}
        </Select>
      </Form.Item>

      <Form.Item name="period" label="Period of Refresh">
        <Select showSearch>
          {[10, 20, 30].map(v => <Select.Option key={v} value={v}>{v}s</Select.Option>)}
        </Select>
      </Form.Item>

      <Form.Item name="currencies" label="Currencies">
        <Select mode="multiple" showSearch>
          {CURRENCIES.map(v => <Select.Option key={v} value={v}>{v}</Select.Option>)}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}
