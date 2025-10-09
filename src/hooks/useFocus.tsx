import { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { 
  formatTime, 
  calculateFocusMinutes,  
  checkDateChange 
} from '@/utils/tool'
import { saveFocusData, loadFocusData } from '@/localStorage/index'

export const useFocus = () => {
  const [timer, setTimer] = useState<number>(0)           // 今日总专注时间（分钟）
  const [count, setCount] = useState<number>(0)           // 今日完成专注次数
  const [focusTime, setFocusTime] = useState<number>(25)  // 单次专注时长（分钟）
  const [displayTime, setDisplayTime] = useState<string>('25:00') // 显示的时间格式（MM:SS）
  const [isRunning, setIsRunning] = useState<boolean>(false)      // 计时器是否运行中
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60)       // 剩余时间（秒）
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0) // 已过去的时间（秒）
  const [progress, setProgress] = useState<number>(0)     // 进度百分比 (0-100)
  const intervalRef = useRef<number | null>(null)         // 定时器引用，用于清理

  // 从 Redux store 获取专注设置
  const focusSettingsValues = useSelector((state: RootState) => state.focus.defaultValues)

  // 从localStorage加载数据 
  useEffect(() => {
    const data = loadFocusData()
    setTimer(data.timer)
    setCount(data.count)
  }, [])

  // 每日重置检查 - 检查是否需要重置今日数据
  useEffect(() => {
    const handleDateChange = () => {
      if (checkDateChange()) {
        // 日期变化，重置今日数据
        setTimer(0)
        setCount(0)
        saveFocusData(0, 0)
      }
    }

    // 每分钟检查一次日期变化（应对跨天情况）
    const dateCheckInterval = setInterval(handleDateChange, 60000)
    handleDateChange() // 初始检查

    // 清理函数：组件卸载时清除定时器
    return () => {
      clearInterval(dateCheckInterval)
    }
  }, [])

  // 当focusTime改变时更新显示时间和剩余时间
  useEffect(() => {
    setFocusTime(focusSettingsValues.focusTime)
    const newTimeLeft = focusSettingsValues.focusTime * 60 // 转换为秒
    setTimeLeft(newTimeLeft)
    setDisplayTime(formatTime(newTimeLeft))
    setProgress(0) // 重置进度
  }, [focusSettingsValues.focusTime])

  // 更新显示时间和进度 - 当剩余时间变化时更新显示
  useEffect(() => {
    setDisplayTime(formatTime(timeLeft))
    
    // 计算进度百分比
    const totalTime = focusTime * 60
    const elapsed = totalTime - timeLeft
    const newProgress = totalTime > 0 ? (elapsed / totalTime) * 100 : 0
    setProgress(newProgress)
  }, [timeLeft, focusTime])

  /**
   * 重置到初始时间
   * 将计时器重置为初始的专注时间
   */
  const resetToInitialTime = useCallback(() => {
    const initialTime = focusTime * 60 // 转换为秒
    setTimeLeft(initialTime)
    setElapsedSeconds(0)
    setProgress(0)
    setDisplayTime(formatTime(initialTime))
  }, [focusTime])

  /**
   * 开始计时
   * 启动倒计时，每秒更新剩余时间
   * 计时自然结束时自动记录完成次数
   */
  const handleStart = useCallback(() => {
    if (isRunning) return // 防止重复启动

    setIsRunning(true)
    setElapsedSeconds(0) // 重置已过去时间

    // 设置定时器，每秒执行一次
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // 计时自然结束（倒计时到0）
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setIsRunning(false)

          // 计算本次专注的分钟数（完整的一次专注）
          const totalElapsedSeconds = focusTime * 60
          const focusMinutes = calculateFocusMinutes(totalElapsedSeconds)

          // 更新统计 - 只有自然结束时完成次数才+1
          const newTimer = timer + focusMinutes
          const newCount = count + 1
          setTimer(newTimer)
          setCount(newCount)
          saveFocusData(newTimer, newCount)

          // 计时结束后重置到初始时间，准备下一次专注
          resetToInitialTime()
          return 0
        }

        // 更新已过去秒数（用于手动重置时计算部分专注时间）
        setElapsedSeconds(prev => prev + 1)
        return prevTime - 1 // 减少剩余时间
      })
    }, 1000)
  }, [isRunning, focusTime, timer, count, resetToInitialTime])

  /**
   * 重置计时
   * 手动停止当前计时，记录已完成的专注时间但不增加完成次数
   */
  const handleReset = useCallback(() => {
    // 清理定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)

    // 如果已经计时了一段时间，只记录专注时间，不增加完成次数
    if (elapsedSeconds > 0) {
      const focusMinutes = calculateFocusMinutes(elapsedSeconds)
      if (focusMinutes > 0) {
        // 只更新专注时间，不更新完成次数（部分专注）
        const newTimer = timer + focusMinutes
        setTimer(newTimer)
        saveFocusData(newTimer, count) // 保持原来的完成次数
      }
    }

    // 重置到初始时间
    resetToInitialTime()
  }, [elapsedSeconds, timer, count, resetToInitialTime])

  // 组件卸载时清除定时器 - 防止内存泄漏
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // 数据变化时保存到localStorage - 当timer或count变化时自动保存
  useEffect(() => {
    saveFocusData(timer, count)
  }, [timer, count])

  // 返回给组件使用的状态和方法
  return {
    timer,           // 今日总专注时间（分钟）
    count,           // 今日完成专注次数
    displayTime,     // 显示的时间字符串（MM:SS格式）
    isRunning,       // 是否正在计时中
    elapsedSeconds,  // 当前已过去的时间（秒）
    progress,        // 进度百分比
    handleStart,     // 开始计时函数
    handleReset,     // 重置计时函数
  }
}