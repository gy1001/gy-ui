import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusTag from './StatusTag.vue'

describe('StatusTag', () => {
  it('renders the default label for each type', () => {
    const wrapper = mount(StatusTag, { props: { type: 'pending' } })
    expect(wrapper.text()).toContain('待审核')
  })

  it('renders custom label when passed', () => {
    const wrapper = mount(StatusTag, {
      props: { type: 'approved', label: '已通过' },
    })
    expect(wrapper.text()).toContain('已通过')
  })

  it('applies correct color class based on type', () => {
    const wrapper = mount(StatusTag, { props: { type: 'rejected' } })
    expect(wrapper.classes()).toContain('gy-status-tag--danger')
  })

  it('renders dot element when dot prop is true', () => {
    const wrapper = mount(StatusTag, { props: { type: 'pending', dot: true } })
    expect(wrapper.find('.gy-status-tag__dot').exists()).toBe(true)
  })

  it('uses custom colorScheme if provided', () => {
    const wrapper = mount(StatusTag, {
      props: { type: 'approved', colorScheme: 'info' },
    })
    expect(wrapper.classes()).toContain('gy-status-tag--info')
  })
})
