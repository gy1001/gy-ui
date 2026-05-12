module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 自定义规则（可选）
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 代码格式（不影响逻辑）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试
        'chore', // 构建/工具变更
        'ci', // CI 配置
        'build', // 构建系统
        'revert', // 回滚
      ],
    ],
    'subject-case': [0], // 不强制标题大小写
  },
}
