import React, { useCallback } from 'react'
import { InputNumber, Form } from 'antd'

export default function Conversion(props: { rate: number; symbol: string }) {
  const [form] = Form.useForm()

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
    [props.rate]
  )

  return (
    <section>
      <Form
        initialValues={{ source: 1, target: props.rate }}
        onValuesChange={onValuesChange}
        form={form}
      >
        <Form.Item name="source" label="EUR">
          <InputNumber placeholder="EUR" />
        </Form.Item>

        <Form.Item name="target" label={props.symbol}>
          <InputNumber placeholder={props.symbol} />
        </Form.Item>
      </Form>
    </section>
  )
}
