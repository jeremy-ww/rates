import React, { useCallback, useState } from 'react'
import { InputNumber, Form } from 'antd'
import { SwapOutlined } from '@ant-design/icons'

export default function Conversion(props: { rate: number; symbol: string }) {
  const [form] = Form.useForm()
  const [reverse, setReverse] = useState(false)

  const onValuesChange = useCallback(
    (changedValues: Partial<{ source: number; target: number }>) => {
      if ('source' in changedValues) {
        form.setFieldsValue({
          target: props.rate * changedValues.source!
        })
      } else {
        form.setFieldsValue({
          source: changedValues.target! / props.rate
        })
      }
    },
    [form, props.rate]
  )

  const children = [
    <Form.Item key="source" name="source" label="EUR">
      <InputNumber placeholder="EUR" />
    </Form.Item>,
    <Form.Item key="icon">
      <SwapOutlined
        onClick={() => {
          setReverse(reverse => !reverse)
        }}
      />
    </Form.Item>,
    <Form.Item key="target" name="target" label={props.symbol}>
      <InputNumber placeholder={props.symbol} />
    </Form.Item>
  ]

  return (
    <section>
      <Form
        initialValues={{ source: 1, target: props.rate }}
        onValuesChange={onValuesChange}
        layout="inline"
        form={form}
      >
        {reverse ? children.reverse() : children}
      </Form>
    </section>
  )
}
