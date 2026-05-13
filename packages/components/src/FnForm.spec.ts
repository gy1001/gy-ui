import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import FnForm from './FnForm.vue'
import FnFormItem from './FnFormItem.vue'
import type { FormRules } from './form-types'

// 一个用于挂载表单的辅助组件
function createForm(
  rules: FormRules,
  model: Record<string, any> = { name: '', age: '' },
) {
  return mount({
    components: { FnForm, FnFormItem },
    template: `
      <FnForm ref="formRef" :model="model" :rules="rules">
        <FnFormItem prop="name" label="姓名" v-slot="{ value }">
          <input :value="value" @input="model.name = $event.target.value" />
        </FnFormItem>
        <FnFormItem prop="age" label="年龄" v-slot="{ value }">
          <input :value="value" @input="model.age = $event.target.value" />
        </FnFormItem>
      </FnForm>
    `,
    data() {
      return { model, rules }
    },
  })
}

describe('FnForm', () => {
  const rules: FormRules = {
    name: [{ required: true, message: '请输入姓名' }],
    age: [
      { required: true, message: '请输入年龄' },
      { pattern: /^\d+$/, message: '年龄必须为数字' },
    ],
  }

  // 辅助函数：获取 FnForm 实例（已加类型断言）
  function getForm(wrapper: ReturnType<typeof createForm>) {
    return wrapper.findComponent(FnForm).vm as any
  }

  // 1
  it('required validation fails for empty fields', async () => {
    const wrapper = createForm(rules)
    const form = getForm(wrapper)
    const result = form.validate()
    expect(result.valid).toBe(false)
    expect(result.errors.name).toContain('请输入姓名')
    expect(result.errors.age).toContain('请输入年龄')
  })

  // 2
  it('pattern validation fails for non-numeric age', async () => {
    const wrapper = createForm(rules, { name: '张三', age: 'abc' })
    const form = getForm(wrapper)
    const result = form.validate()
    expect(result.errors.age).toContain('年龄必须为数字')
  })

  // 3
  it('passes when all fields are valid', async () => {
    const wrapper = createForm(rules, { name: '张三', age: '25' })
    const form = getForm(wrapper)
    const result = form.validate()
    expect(result.valid).toBe(true)
    expect(result.errors.age).toHaveLength(0)
  })

  // 4
  it('clearValidate clears single field error', async () => {
    const wrapper = createForm(rules)
    const form = getForm(wrapper)
    form.validateField('name')
    form.clearValidate('name')
    expect(form.errors.name).toBeUndefined()
  })

  // 5
  it('clearValidate clears all errors when no field passed', async () => {
    const wrapper = createForm(rules)
    const form = getForm(wrapper)
    form.validate()
    form.clearValidate()
    expect(Object.keys(form.errors)).toHaveLength(0)
  })

  // 6
  it('validateField returns errors for single field', async () => {
    const wrapper = createForm(rules)
    const form = getForm(wrapper)
    const errs = form.validateField('name')
    expect(errs).toContain('请输入姓名')
  })

  // 7
  it('validateField returns empty array for valid field', async () => {
    const wrapper = createForm(rules, { name: '李四', age: '30' })
    const form = getForm(wrapper)
    const errs = form.validateField('name')
    expect(errs).toHaveLength(0)
  })

  // 8
  it('FormItem renders error message', async () => {
    const wrapper = createForm(rules)
    const form = getForm(wrapper)
    form.validate()
    await nextTick()
    const formItem = wrapper.findComponent(FnFormItem)
    expect(formItem.html()).toContain('请输入姓名')
  })
})
