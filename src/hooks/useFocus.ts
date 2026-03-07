import { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { 
  formatTime, 
  calculateFocusMinutes,  
  checkDateChange 
} from '@/utils/tool'
import { saveFocusData, loadFocusData } from '@/localStorage/index'

// 定义计时阶段类型
export type TimerPhase = 'focus' | 'shortBreak' | 'longBreak'

export const useFocus = () => {
  // 从 Redux store 获取专注设置
  const focusSettingsValues = useSelector((state: RootState) => state.focus.defaultValues)

  // 使用 Redux store 中的值作为初始状态
  const [timer, setTimer] = useState<number>(0)           // 今日总专注时间（分钟）
  const [count, setCount] = useState<number>(0)           // 今日完成专注次数
  const [focusTime, setFocusTime] = useState<number>(focusSettingsValues.focusTime)  // 单次专注时长（分钟）
  const [shortBreak, setShortBreak] = useState<number>(focusSettingsValues.shortBreak) // 短休息时间（分钟）
  const [longBreak, setLongBreak] = useState<number>(focusSettingsValues.longBreak)  // 长休息时间（分钟）
  const [currentPhase, setCurrentPhase] = useState<TimerPhase>('focus') // 当前阶段
  const [displayTime, setDisplayTime] = useState<string>(formatTime(focusSettingsValues.focusTime * 60)) // 显示的时间格式（MM:SS）
  const [isRunning, setIsRunning] = useState<boolean>(false)      // 计时器是否运行中
  const [timeLeft, setTimeLeft] = useState<number>(focusSettingsValues.focusTime * 60)       // 剩余时间（秒）
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0) // 已过去的时间（秒）
  const [progress, setProgress] = useState<number>(0)     // 进度百分比 (0-100)
  const [phaseCount, setPhaseCount] = useState<number>(0) // 阶段计数（用于判断长休息）
  const intervalRef = useRef<number | null>(null)         // 定时器引用，用于清理

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
        setPhaseCount(0)
        setCurrentPhase('focus')
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
    setShortBreak(focusSettingsValues.shortBreak)
    setLongBreak(focusSettingsValues.longBreak)
    
    // 根据当前阶段设置时间
    const newTimeLeft = getPhaseTime(currentPhase) * 60
    setTimeLeft(newTimeLeft)
    setDisplayTime(formatTime(newTimeLeft))
    setProgress(0) // 重置进度
  }, [focusSettingsValues, currentPhase])

  // 获取当前阶段的时间（分钟）
  const getPhaseTime = useCallback((phase: TimerPhase): number => {
    switch (phase) {
      case 'focus':
        return focusTime
      case 'shortBreak':
        return shortBreak
      case 'longBreak':
        return longBreak
      default:
        return focusTime
    }
  }, [focusTime, shortBreak, longBreak])

  // 获取阶段标题
  const getPhaseTitle = useCallback((phase: TimerPhase): string => {
    switch (phase) {
      case 'focus':
        return '专注时间'
      case 'shortBreak':
        return '短休息时间'
      case 'longBreak':
        return '长休息时间'
      default:
        return '专注时间'
    }
  }, [])

  // 计算下一个阶段
  const calculateNextPhase = useCallback((currentPhase: TimerPhase, currentCount: number): TimerPhase => {
    if (currentPhase === 'focus') {
      // 专注结束后
      const nextCount = currentCount + 1
      // 判断是否该长休息（每3个专注周期后长休息）
      if (nextCount % 3 === 0) {
        return 'longBreak'
      } else {
        return 'shortBreak'
      }
    } else {
      // 休息结束后回到专注
      return 'focus'
    }
  }, [])

  // 切换到下一个阶段
  const switchToNextPhase = useCallback(() => {
    const nextPhase = calculateNextPhase(currentPhase, phaseCount)
    
    if (currentPhase === 'focus') {
      // 专注结束后增加计数
      setPhaseCount(prev => prev + 1)
    }

    setCurrentPhase(nextPhase)
    const newTimeLeft = getPhaseTime(nextPhase) * 60
    setTimeLeft(newTimeLeft)
    setDisplayTime(formatTime(newTimeLeft))
    setProgress(0)
    setElapsedSeconds(0)

    // 如果是休息阶段，并且设置了自动开始休息，则自动开始计时
    if ((nextPhase === 'shortBreak' || nextPhase === 'longBreak') && focusSettingsValues.autoStartBreak) {
      startBreakTimer(nextPhase)
    }
  }, [currentPhase, phaseCount, getPhaseTime, calculateNextPhase, focusSettingsValues.autoStartBreak])

  // 启动休息计时器
  const startBreakTimer = useCallback((phase: TimerPhase) => {
    setIsRunning(true)
    setElapsedSeconds(0)

    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // 休息时间结束
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setIsRunning(false)

          // 休息结束后切换到专注阶段
          setCurrentPhase('focus')
          const newTimeLeft = getPhaseTime('focus') * 60
          setTimeLeft(newTimeLeft)
          setDisplayTime(formatTime(newTimeLeft))
          setProgress(0)
          setElapsedSeconds(0)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }, [getPhaseTime])

  // 启动专注计时器
  const startFocusTimer = useCallback(() => {
    if (isRunning) return

    setIsRunning(true)
    setElapsedSeconds(0)

    // 设置定时器，每秒执行一次
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // 专注时间结束
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setIsRunning(false)

          // 记录完成次数
          const focusMinutes = calculateFocusMinutes(focusTime * 60)
          setTimer(prevTimer => {
            const newTimer = prevTimer + focusMinutes
            setCount(prevCount => {
              const newCount = prevCount + 1
              saveFocusData(newTimer, newCount)
              return newCount
            })
            return newTimer
          })

          // 切换到下一个阶段
          switchToNextPhase()
          return 0
        }

        // 更新已过去秒数
        setElapsedSeconds(prev => prev + 1)
        return prevTime - 1
      })
    }, 1000)
  }, [isRunning, focusTime, switchToNextPhase])

  // 更新显示时间和进度
  useEffect(() => {
    setDisplayTime(formatTime(timeLeft))
    
    // 计算进度百分比
    const totalTime = getPhaseTime(currentPhase) * 60
    const elapsed = totalTime - timeLeft
    const newProgress = totalTime > 0 ? (elapsed / totalTime) * 100 : 0
    setProgress(newProgress)
  }, [timeLeft, currentPhase, getPhaseTime])

  /**
   * 重置到初始时间
   */
  const resetToInitialTime = useCallback(() => {
    const initialTime = getPhaseTime(currentPhase) * 60
    setTimeLeft(initialTime)
    setElapsedSeconds(0)
    setProgress(0)
    setDisplayTime(formatTime(initialTime))
  }, [currentPhase, getPhaseTime])

  /**
   * 开始计时
   */
  const handleStart = useCallback(() => {
    if (isRunning) return

    if (currentPhase === 'focus') {
      // 专注阶段手动点击开始
      startFocusTimer()
    } else if (currentPhase === 'shortBreak' || currentPhase === 'longBreak') {
      // 休息阶段手动点击开始（当 autoStartBreak 为 false 时）
      startBreakTimer(currentPhase)
    }
  }, [isRunning, currentPhase, startFocusTimer, startBreakTimer])

  /**
   * 重置计时
   */
  const handleReset = useCallback(() => {
    // 清理定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)

    if (currentPhase === 'focus' && elapsedSeconds > 0) {
      // 专注阶段手动重置，记录已完成的专注时间
      const focusMinutes = calculateFocusMinutes(elapsedSeconds)
      if (focusMinutes > 0) {
        const newTimer = timer + focusMinutes
        setTimer(newTimer)
        saveFocusData(newTimer, count)
      }
    }

    resetToInitialTime()
  }, [currentPhase, elapsedSeconds, timer, count, resetToInitialTime])

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // 数据变化时保存
  useEffect(() => {
    saveFocusData(timer, count)
  }, [timer, count])

  return {
    timer,
    count,
    displayTime,
    isRunning,
    elapsedSeconds,
    progress,
    currentPhase,
    phaseTitle: getPhaseTitle(currentPhase),
    handleStart,
    handleReset,
  }
}