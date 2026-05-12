<script setup lang="ts">
import { inject, computed } from 'vue'
import { FORM_CTX_KEY } from './FnForm.vue'
import type { FormContext } from './FnForm.vue'

const props = defineProps<{
  prop: string
  label?: string
}>()
const ctx = inject<FormContext>(FORM_CTX_KEY)

if (!ctx) {
  throw new Error('FnFormItem must be used inside FnForm')
}

const value = computed(() => ctx.model[props.prop])
const errs = computed(() => ctx.errors[props.prop] || [])
</script>

<template>
  <div class="gy-form-item">
    <label v-if="label">{{ label }}</label>
    <slot :value="value" :errors="errs">
      <!-- 默认插槽传递当前值和错误，留给使用者自定义 UI -->
    </slot>
    <p v-for="(err, idx) in errs" :key="idx" class="gy-form-item__error">
      {{ err }}
    </p>
  </div>
</template>

<style scoped>
.gy-form-item {
  margin-bottom: 16px;
}
.gy-form-item__error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
