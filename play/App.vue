<template>
  <div style="padding: 20px; display: flex; gap: 8px; align-items: center">
    <StatusTag type="pending" dot />
    <StatusTag type="approved" />
    <StatusTag type="rejected" label="风控拒绝" />
    <StatusTag type="overdue" />
    <StatusTag type="overdue" color-scheme="danger" />
  </div>
</template>

<script setup lang="ts">
import { StatusTag } from '@gy-ui/components'
</script>
