import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react'
import { cn } from '@/utilities/utils'

// Timer management
const EXAM_START_KEY = 'exam_start_time'
const EXAM_DURATION_KEY = 'exam_duration'
const EXAM_ID_KEY = 'exam_id'

export function getStoredExamData() {
  if (typeof window === 'undefined') return null
  
  const startTime = localStorage.getItem(EXAM_START_KEY)
  const duration = localStorage.getItem(EXAM_DURATION_KEY)
  const examId = localStorage.getItem(EXAM_ID_KEY)
  
  if (!startTime || !duration || !examId) return null
  
  return {
    startTime: parseInt(startTime),
    duration: parseInt(duration),
    examId
  }
}

export function setStoredExamData(examId: string, duration: number) {
  if (typeof window === 'undefined') return
  
  const startTime = Date.now()
  localStorage.setItem(EXAM_START_KEY, startTime.toString())
  localStorage.setItem(EXAM_DURATION_KEY, duration.toString())
  localStorage.setItem(EXAM_ID_KEY, examId)
}

export function clearStoredExamData() {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem(EXAM_START_KEY)
  localStorage.removeItem(EXAM_DURATION_KEY)
  localStorage.removeItem(EXAM_ID_KEY)
}

interface ExamTimerProps {
  examId: string
  duration: number
  onTimeUp: () => void
  onTimeUpdate?: (timeLeft: number) => void
}

export function ExamTimer({ examId, duration, onTimeUp, onTimeUpdate }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  // Initialize timer
  useEffect(() => {
    const storedData = getStoredExamData()
    if (storedData && storedData.examId === examId) {
      // Calculate remaining time
      const elapsedSeconds = Math.floor((Date.now() - storedData.startTime) / 1000)
      const remainingSeconds = Math.max(0, storedData.duration - elapsedSeconds)
      setTimeLeft(remainingSeconds)
      
      if (remainingSeconds <= 0) {
        onTimeUp()
        return
      }
    } else {
      // Start new exam session
      setTimeLeft(duration * 60)
      setStoredExamData(examId, duration * 60)
    }
  }, [examId, duration, onTimeUp])

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        const newTime = prev - 1
        onTimeUpdate?.(newTime)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp, onTimeUpdate])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <Timer className="w-5 h-5" />
      <span className={cn(
        'font-mono',
        timeLeft <= 300 && 'text-red-600 animate-pulse'
      )}>
        {formatTime(timeLeft)}
      </span>
    </div>
  )
} 
