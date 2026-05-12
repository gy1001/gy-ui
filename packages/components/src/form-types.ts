// 一条校验规则
export interface FormRule {
  /** 是否必填 */
  required?: boolean
  /** 错误提示 */
  message?: string
  /** 正则校验 */
  pattern?: RegExp
  /** 自定义校验函数，返回 true 通过，字符串则为错误信息 */
  validator?: (value: any, model: Record<string, any>) => boolean | string
  /** 异步校验（可选） */
  asyncValidator?: (
    value: any,
    model: Record<string, any>,
  ) => Promise<boolean | string>
}

// 一整个表单的规则集合，key 对应字段名
export type FormRules = Record<string, FormRule[]>

// 一个字段的错误信息数组
export type FormItemError = string[]

// 表单校验结果
export interface FormValidateResult {
  valid: boolean
  errors: Record<string, FormItemError>
}
