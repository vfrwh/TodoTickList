// 保存数据到localStorage
export const saveFocusData = (timer: number, count: number): void => {
  const today = new Date().toDateString()
  const data = {
    date: today,
    timer,
    count
  }
  localStorage.setItem('focusData', JSON.stringify(data))
}

// 从localStorage加载数据
export const loadFocusData = (): { timer: number; count: number } => {
  const today = new Date().toDateString()
  const savedData = localStorage.getItem('focusData')
  if (savedData) {
    const data = JSON.parse(savedData)
    if (data.date === today) {
      return {
        timer: data.timer || 0,
        count: data.count || 0
      }
    }
  }
  return { timer: 0, count: 0 }
}