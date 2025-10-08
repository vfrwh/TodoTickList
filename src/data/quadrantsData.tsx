// src/data/quadrantsConfig.ts
// 只定义静态配置，不包含动态数据
export const QUADRANTS_CONFIG = [
  { 
    title: "紧急且重要", 
    bgColor: 'var(--error-color)',
    key: 'title1' as const
  },
  { 
    title: "紧急不重要", 
    bgColor: 'var(--warning-color)',
    key: 'title2' as const
  },
  { 
    title: "不紧急但重要", 
    bgColor: 'var(--success-color)',
    key: 'title3' as const
  },
  { 
    title: "不紧急不重要", 
    bgColor: 'var(--primary-color)',
    key: 'title4' as const
  },
]