// 格式化时间为MM:SS格式
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = secs.toString().padStart(2, '0')
  return `${formattedMinutes}:${formattedSeconds}`
}

// 计算专注分钟数（不满1分钟按0，满1分钟但不满2分钟按1，以此类推）
export const calculateFocusMinutes = (seconds: number): number => {
  return Math.floor(seconds / 60)
}

// 检查日期变化
export const checkDateChange = (): boolean => {
  const today = new Date().toDateString()
  const savedData = localStorage.getItem('focusData')
  if (savedData) {
    const data = JSON.parse(savedData)
    return data.date !== today
  }
  return false
}