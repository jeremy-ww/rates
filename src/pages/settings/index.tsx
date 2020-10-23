import React, { useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Select, Button } from 'antd'

import { RootState } from '@/store'
import { CURRENCIES } from '@/constants'
import './index.scss'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const connector = connect((state: RootState) => state.settings)

export default connector(function Settings(
  props: ConnectedProps<typeof connector>
) {
  const [form] = Form.useForm()
  const history = useHistory()
  const onFinish = useCallback(
    values => {
      props.dispatch({ type: 'ALTER', state: values })
      history.push('/')
    },
    [history, props]
  )
  return (
    <Form
      onFinish={onFinish}
      className="settings"
      {...layout}
      initialValues={props}
      form={form}
    >
      <Form.Item name="source" label="Current Source">
        <Select showSearch>
          {CURRENCIES.map(currency => (
            <Select.Option key={currency} value={currency}>
              {currency}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="period" label="Period of Refresh">
        <Select showSearch>
          {[5, 10, 20, 30].map(v => (
            <Select.Option key={v} value={v}>
              {v}s
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="currencies" label="Currencies">
        <Select mode="multiple" showSearch>
          {CURRENCIES.map(v => (
            <Select.Option key={v} value={v}>
              {v}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
})
