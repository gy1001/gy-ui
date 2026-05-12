<script setup lang="ts">
import { computed } from 'vue'

// 金融系统常见状态
type StatusType = 'pending' | 'approved' | 'rejected' | 'overdue'

// 状态颜色方案
type ColorScheme = 'warning' | 'success' | 'danger' | 'info'

interface StatusTagProps {
  /** 状态类型，决定颜色和默认文案 */
  type: StatusType
  /** 自定义显示文字，不传则使用 type 的默认中文 */
  label?: string
  /** 自定义颜色方案，会覆盖 type 的默认色 */
  colorScheme?: ColorScheme
  /** 是否显示小圆点动画（用于“待处理”等提醒状态） */
  dot?: boolean
}
const colorMap: Record<StatusType, ColorScheme> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  overdue: 'info',
}

const props = withDefaults(defineProps<StatusTagProps>(), {
  label: '',
  colorScheme: undefined,
  dot: false,
})

// 根据 type 自动推导默认文字，除非外部传了 label
const defaultLabels: Record<StatusType, string> = {
  pending: '待审核',
  approved: '已审核',
  rejected: '已驳回',
  overdue: '已逾期',
}

const displayLabel = computed(() => props.label || defaultLabels[props.type])
</script>

<template>
  <span
    class="gy-status-tag"
    :class="[
      `gy-status-tag--${colorScheme || colorMap[type] || 'info'}`,
      { 'gy-status-tag--dot': dot },
    ]"
  >
    <span v-if="dot" class="gy-status-tag__dot"></span>
    <slot>{{ displayLabel }}</slot>
  </span>
</template>

<style scoped>
.gy-status-tag {
  display: inline-block;
  padding: 2px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
.gy-status-tag--warning {
  background: #fff3e0;
  color: #e65100;
}
.gy-status-tag--success {
  background: #e8f5e9;
  color: #2e7d32;
}
.gy-status-tag--danger {
  background: #ffebee;
  color: #c62828;
}
.gy-status-tag--info {
  background: #f3e5f5;
  color: #6a1b9a;
}

/* dot 动画相关 */
.gy-status-tag--dot {
  position: relative;
  padding-left: 18px;
}
.gy-status-tag__dot {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
