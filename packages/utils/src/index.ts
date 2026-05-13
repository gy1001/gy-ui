/**
 * 数字转千分位字符串
 */
export function formatMoney(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return ''
  const parts = num.toFixed(2).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * 千分位字符串转纯数字字符串
 */
export function unFormatMoney(value: string): string {
  return value.replace(/,/g, '')
}

/**
 * 金额转中文大写
 */
export function moneyToChinese(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return ''
  if (num === 0) return '零元整'

  const units = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿']
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']

  const str = num.toFixed(2).replace('.', '')
  let result = ''
  let zero = false

  for (let i = 0; i < str.length - 2; i++) {
    const d = parseInt(str[i], 10)
    const u = units[str.length - 3 - i]
    if (d === 0) {
      zero = true
    } else {
      if (zero) result += '零'
      result += digits[d] + u
      zero = false
    }
  }

  result += '元'

  const jiao = parseInt(str[str.length - 2], 10)
  const fen = parseInt(str[str.length - 1], 10)
  if (jiao === 0 && fen === 0) {
    result += '整'
  } else {
    if (jiao > 0) result += digits[jiao] + '角'
    if (fen > 0) result += digits[fen] + '分'
  }

  return result
}
