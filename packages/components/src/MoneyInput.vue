<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatMoney, unFormatMoney, moneyToChinese } from '@gy-ui/utils'

interface MoneyInputProps {
  /** v-model 绑定的值（纯数字字符串或数字） */
  modelValue?: string | number
  /** 最大值 */
  max?: number
  /** 是否显示中文大写 */
  showChinese?: boolean
  /** 小数点后位数 */
  precision?: number
}

const props = withDefaults(defineProps<MoneyInputProps>(), {
  modelValue: '',
  max: Number.MAX_SAFE_INTEGER,
  showChinese: true,
  precision: 2,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isFocused = ref(false)

// 内部展示值：聚焦时显示无格式数字，失焦时显示千分位
const displayValue = computed(() => {
  const raw = String(props.modelValue || '')
  if (isFocused.value) return unFormatMoney(raw)
  return raw ? formatMoney(raw) : ''
})

// 中文大写
const chineseText = computed(() => {
  if (!props.showChinese || !props.modelValue) return ''
  return moneyToChinese(props.modelValue)
})

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  let val = target.value.replace(/[^\d.]/g, '') // 只留数字和点
  // 只允许一个小数点
  const parts = val.split('.')
  if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('')
  // 小数位数限制
  if (parts.length === 2 && parts[1].length > props.precision) {
    val = parts[0] + '.' + parts[1].slice(0, props.precision)
  }
  // 最大值校验
  const num = parseFloat(val)
  if (!isNaN(num) && num > props.max!) {
    val = String(props.max)
  }
  emit('update:modelValue', val)
}

function handleFocus() {
  isFocused.value = true
}

function handleBlur() {
  isFocused.value = false
}
</script>

<template>
  <div class="gy-money-input">
    <div class="gy-money-input__wrap">
      <span class="gy-money-input__prefix">¥</span>
      <input
        class="gy-money-input__input"
        type="text"
        :value="displayValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        placeholder="请输入金额"
      />
    </div>
    <p v-if="chineseText" class="gy-money-input__chinese">
      {{ chineseText }}
    </p>
  </div>
</template>

<style scoped>
.gy-money-input__wrap {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 12px;
  height: 36px;
}
.gy-money-input__prefix {
  color: #999;
  margin-right: 4px;
}
.gy-money-input__input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
}
.gy-money-input__chinese {
  color: #666;
  font-size: 12px;
  margin-top: 4px;
}
</style>
