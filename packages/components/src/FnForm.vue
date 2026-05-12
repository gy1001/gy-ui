<template>
  <form>
    <slot />
  </form>
</template>
<script lang="ts">
import type { InjectionKey } from 'vue'
import type { FormRules, FormItemError, FormValidateResult } from './form-types'

export interface FormContext {
  model: Record<string, any>
  rules: FormRules
  errors: Record<string, FormItemError>
}

// 提供的 key
export const FORM_CTX_KEY: InjectionKey<FormContext> = Symbol('formCtx')
</script>
<script setup lang="ts">
import { provide, reactive, computed } from 'vue'

const props = defineProps<{
  model: Record<string, any>
  rules?: FormRules
}>()

// 用 reactive 包裹 model，方便子组件修改时触发响应式
const state = reactive(props.model)

// 存放每个字段的错误信息
const errors = reactive<Record<string, FormItemError>>({})

// provide 给 FormItem
provide(FORM_CTX_KEY, {
  model: state,
  rules: props.rules || {},
  errors,
})

// 校验一个字段
function validateField(field: string): FormItemError {
  const fieldRules = (props.rules || {})[field]
  if (!fieldRules) return []
  const value = state[field]
  const errs: string[] = []
  for (const rule of fieldRules) {
    if (rule.required && !value) {
      errs.push(rule.message || `${field} 为必填项`)
      continue
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      errs.push(rule.message || `${field} 格式不正确`)
      continue
    }
    if (rule.validator) {
      const res = rule.validator(value, state)
      if (typeof res === 'string') errs.push(res)
      else if (!res) errs.push(rule.message || `${field} 校验不通过`)
    }
    // 异步校验暂不做，后续扩展
  }
  errors[field] = errs
  return errs
}

// 暴露出去的 validate 方法
function validate(): FormValidateResult {
  const allErrors: Record<string, string[]> = {}
  let valid = true
  for (const key of Object.keys(props.rules || {})) {
    const errs = validateField(key)
    if (errs.length > 0) valid = false
    allErrors[key] = errs
  }
  return { valid, errors: allErrors }
}

// 清除某个字段的错误
function clearValidate(field?: string) {
  if (field) {
    delete errors[field]
  } else {
    Object.keys(errors).forEach((k) => delete errors[k])
  }
}

defineExpose({ validate, validateField, clearValidate })
</script>

<style lang="scss" scoped></style>
