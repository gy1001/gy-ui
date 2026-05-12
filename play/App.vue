<template>
  <div style="padding: 20px; display: flex; gap: 8px; align-items: center">
    <StatusTag type="pending" dot />
    <StatusTag type="approved" />
    <StatusTag type="rejected" label="风控拒绝" />
    <StatusTag type="overdue" />
    <StatusTag type="overdue" color-scheme="danger" />
  </div>
  <FnForm ref="formRef" :model="model" :rules="rules">
    <FnFormItem prop="name" label="姓名">
      <input v-model="model.name" placeholder="请输入姓名" />
    </FnFormItem>
    <FnFormItem prop="age" label="年龄">
      <input v-model="model.age" placeholder="请输入年龄" />
    </FnFormItem>
    <button type="button" @click="handleSubmit">提交</button>
  </FnForm>
</template>

<script setup lang="ts">
import { StatusTag } from '@gy-ui/components'

import { ref } from 'vue'
import { FnForm, FnFormItem } from '@gy-ui/components'
import type { FormRules } from '@gy-ui/components'

const model = ref({
  name: '',
  age: '',
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名' }],
  age: [
    { required: true, message: '请输入年龄' },
    { pattern: /^\d+$/, message: '年龄必须为数字' },
  ],
}

const formRef = ref()
function handleSubmit() {
  const res = formRef.value.validate()
  if (res.valid) {
    alert('通过')
  } else {
    console.log(res.errors)
  }
}
</script>
