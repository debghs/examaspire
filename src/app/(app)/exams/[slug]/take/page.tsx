'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button as UIButton } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import RichText from '@/components/RichTextParser'
import { ChevronLeft, ChevronRight, Send, AlertCircle, Loader2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utilities/utils'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Image from 'next/image'
import { Exam, Question } from '@/payload-types'
import { PageSubHeading } from '@/components/PageHeading'
import { ExamTimer, clearStoredExamData } from '@/components/ExamTimer'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Dummy data matching the schema
// TODO: gotta fix this and connect it to the backend
const dummyExam: Exam = {
  id: 1,
  title: 'Sample Mathematics Exam',
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ text: 'A comprehensive test covering basic mathematics concepts.' }],
          version: 1,
        },
      ],
      direction: 'ltr',
      format: 'left',
      indent: 0,
      version: 1,
    },
  },
  questions: [
    {
      id: 1,
      questionText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'What is 2 + 2?' }],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: 'left',
          indent: 0,
          version: 1,
        },
      },
      type: 'mcq',
      options: [
        { text: '3', isCorrect: false },
        { text: '4', isCorrect: true },
        { text: '5', isCorrect: false },
        { text: '6', isCorrect: false },
      ],
      marks: 1,
      difficulty: 'easy',
      hasNegativeMarking: false,
      negativeMarks: 0,
      explanation: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ text: '2 + 2 = 4 is a basic addition fact.' }],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: 'left',
          indent: 0,
          version: 1,
        },
      },
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      _status: 'published',
    },
    {
      id: 2,
      questionText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'Solve for x: 2x + 5 = 13' }],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: 'left',
          indent: 0,
          version: 1,
        },
      },
      type: 'mcq',
      options: [
        { text: 'x = 3', isCorrect: false },
        { text: 'x = 4', isCorrect: true },
        { text: 'x = 5', isCorrect: false },
        { text: 'x = 6', isCorrect: false },
      ],
      marks: 2,
      difficulty: 'medium',
      hasNegativeMarking: true,
      negativeMarks: 0.5,
      explanation: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ text: '2x + 5 = 13\n2x = 13 - 5\n2x = 8\nx = 4' }],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: 'left',
          indent: 0,
          version: 1,
        },
      },
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      _status: 'published',
    },
  ],
  duration: 60,
  totalMarks: 3,
  status: 'published',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  _status: 'published',
}

// Type guards
function isQuestion(obj: any): obj is Question {
  return obj && typeof obj === 'object' && 'questionText' in obj && 'type' in obj
}

function isMediaObject(obj: any): obj is { url: string } {
  return obj && typeof obj === 'object' && 'url' in obj
}

// Loading state component
const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
)

// Error state component
const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
    <AlertCircle className="w-12 h-12 text-destructive" />
    <h2 className="text-xl font-semibold">Error Loading Exam</h2>
    <p className="text-muted-foreground">{message}</p>
    <UIButton 
      variant="default"
      onClick={() => window.location.reload()}
    >
      Try Again
    </UIButton>
  </div>
)

export default function ExamTakePage() {
  const router = useRouter()
  const [exam, setExam] = useState<Exam | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)

  // Handle page leave warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitting) {
        e.preventDefault()
        e.returnValue = ''
        return ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isSubmitting])

  // Fetch exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/exams/${slug}`)
        // if (!response.ok) throw new Error('Failed to fetch exam')
        // const data = await response.json()
        
        // For now, using dummy data
        const data = dummyExam
        setExam(data)
        setQuestions(data.questions.filter(isQuestion))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load exam')
        toast.error('Failed to load exam')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExamData()
  }, [])

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }))
  }

  const handleSubmit = async (isTimeout: boolean = false) => {
    if (isSubmitting || !exam) return

    setIsSubmitting(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/exams/submit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     examId: exam.id,
      //     answers: selectedAnswers,
      //     isTimeout,
      //     startTime: getStoredExamData()?.startTime,
      //     endTime: Date.now()
      //   })
      // })
      // if (!response.ok) throw new Error('Failed to submit exam')
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Clear stored exam data
      clearStoredExamData()
      
      toast.success(isTimeout ? 'Time is up! Exam submitted.' : 'Exam submitted successfully!')
      router.push('/exams')
    } catch (error) {
      console.error('Error submitting exam:', error)
      toast.error('Failed to submit exam')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTimeUp = useCallback(() => {
    handleSubmit(true)
  }, [])

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message={error} />
  if (!exam || !questions.length) return <ErrorState message="No exam data available" />

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="container mx-auto px-4 py-8">
      <PageSubHeading>{exam.title}</PageSubHeading>

      {/* Header with Timer and Progress */}
      <div className="sticky top-0 bg-white z-10 pb-4 mb-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <ExamTimer
              examId={exam.id.toString()}
              duration={exam.duration}
              onTimeUp={handleTimeUp}
            />
            <UIButton
              variant="destructive"
              onClick={() => setShowSubmitDialog(true)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Submit Exam
            </UIButton>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Progress
            value={(currentQuestionIndex + 1) / questions.length * 100}
            className="h-2"
          />
          <span className="text-sm font-medium whitespace-nowrap">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Question Display */}
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Question {currentQuestionIndex + 1}</span>
            <span className="text-sm text-gray-500">({currentQuestion.marks} marks)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              'px-2 py-1 text-sm rounded-full',
              currentQuestion.difficulty === 'easy' && 'bg-green-100 text-green-800',
              currentQuestion.difficulty === 'medium' && 'bg-yellow-100 text-yellow-800',
              currentQuestion.difficulty === 'hard' && 'bg-red-100 text-red-800'
            )}>
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </span>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <RichText data={currentQuestion.questionText} />
        </div>

        {currentQuestion.media && currentQuestion.media.length > 0 && (
          <div className="mb-6">
            {currentQuestion.media.map((media, index) => (
              <div key={index} className="mb-4">
                {media.type === 'image' && media.image && (
                  <div className="relative aspect-video">
                    <Image
                      src={isMediaObject(media.image) ? media.image.url : '/placeholder.png'}
                      alt={`Question ${currentQuestionIndex + 1} media`}
                      fill
                      className="object-contain rounded-lg"
                      unoptimized
                    />
                  </div>
                )}
                {media.type === 'video' && media.video && (
                  <div className="relative aspect-video">
                    <iframe
                      src={media.video}
                      className="absolute inset-0 w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {currentQuestion.type === 'mcq' && currentQuestion.options && (
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={cn(
                  'w-full p-4 text-left rounded-lg border transition-colors',
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                )}
                disabled={isSubmitting}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  )}>
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full',
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'bg-blue-500'
                          : 'bg-transparent'
                      )}
                    />
                  </div>
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {currentQuestion.hasNegativeMarking && (
          <Alert className="mt-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This question has negative marking. {currentQuestion.negativeMarks} marks will be deducted for wrong answers.
            </AlertDescription>
          </Alert>
        )}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <UIButton
          variant="outline"
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0 || isSubmitting}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </UIButton>

        {currentQuestionIndex === questions.length - 1 ? (
          <UIButton
            variant="default"
            onClick={() => setShowSubmitDialog(true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Submit Exam
          </UIButton>
        ) : (
          <UIButton
            variant="default"
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={isSubmitting}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </UIButton>
        )}
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your exam? This action cannot be undone.
              {Object.keys(selectedAnswers).length < questions.length && (
                <div className="mt-2 text-yellow-600">
                  Warning: You have not answered all questions.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowSubmitDialog(false)
                handleSubmit()
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Submit Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Leave Confirmation Dialog */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave this page? Your progress will be saved, but the timer will continue running.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowLeaveDialog(false)
                router.push('/exams')
              }}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

