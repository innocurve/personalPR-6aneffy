'use client'

import { useState, useEffect } from 'react'
import { Message } from './ChatInput'
import { Volume2, VolumeX, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

// 오디오 캐시를 위한 Map 객체
const audioCache = new Map<string, { blob: Blob; timestamp: number }>()

// 캐시 만료 시간 (1시간)
const CACHE_EXPIRY = 60 * 60 * 1000

interface ChatMessageProps {
  message: Message
  isDarkMode?: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDarkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  // 컴포넌트 언마운트 시 오디오 URL 정리
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      if (audio) {
        audio.pause()
        setIsPlaying(false)
      }
    }
  }, [audioUrl, audio])

  // 페이지 이동, 새로고침 시 음성 중지
  useEffect(() => {
    const stopAudio = () => {
      if (audio) {
        audio.pause()
        setIsPlaying(false)
      }
    }

    // 페이지 이동 시
    window.addEventListener('popstate', stopAudio)
    // 새로고침 또는 페이지 나가기 시
    window.addEventListener('beforeunload', stopAudio)
    // 다른 링크 클릭 시
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.closest('a')) {
        stopAudio()
      }
    }
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', stopAudio)
      window.removeEventListener('beforeunload', stopAudio)
      window.removeEventListener('click', handleClick)
    }
  }, [audio])

  const getAudioFromCache = (text: string) => {
    const cached = audioCache.get(text)
    if (!cached) return null

    // 캐시 만료 확인
    if (Date.now() - cached.timestamp > CACHE_EXPIRY) {
      audioCache.delete(text)
      return null
    }

    return cached.blob
  }

  const playTTS = async () => {
    try {
      // 재생 중이면 중지
      if (isPlaying && audio) {
        audio.pause()
        setIsPlaying(false)
        return
      }

      setIsLoading(true)
      setLoadingProgress(10)

      // 캐시 확인
      const cachedAudio = getAudioFromCache(message.content)
      let audioBlob: Blob

      if (cachedAudio) {
        audioBlob = cachedAudio
        setLoadingProgress(90)
      } else {
        // 캐시에 없으면 API 호출
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: message.content,
            voice_settings: {
              stability: 0.3,
              similarity_boost: 0.8,
            }
          }),
        })

        setLoadingProgress(50)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'TTS 요청 실패')
        }

        audioBlob = await response.blob()
        setLoadingProgress(80)

        // 캐시에 저장
        audioCache.set(message.content, {
          blob: audioBlob,
          timestamp: Date.now()
        })
      }

      // 이전 URL 정리
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }

      const newAudioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(newAudioUrl)
      
      const newAudio = new Audio(newAudioUrl)
      newAudio.playbackRate = 1.3

      setLoadingProgress(90)

      // 재생 완료 시 처리
      newAudio.onended = () => {
        setIsPlaying(false)
      }

      // 로드 완료 시 처리
      newAudio.oncanplaythrough = async () => {
        setLoadingProgress(100)
        setAudio(newAudio)
        try {
          await newAudio.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('오디오 재생 오류:', error)
          toast.error('오디오 재생에 실패했습니다')
        }
      }

    } catch (error) {
      console.error('TTS 재생 오류:', error)
      toast.error(error instanceof Error ? error.message : 'TTS 재생 중 오류가 발생했습니다')
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
      setLoadingProgress(0)
    }
  }

  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : isDarkMode
            ? 'bg-gray-700 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="flex items-start gap-2">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
          {message.role === 'assistant' && (
            <div className="relative">
              <button
                onClick={playTTS}
                disabled={isLoading}
                className={`ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors ${
                  isDarkMode ? 'hover:bg-gray-600' : ''
                } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                title={isPlaying ? '음성 중지' : isLoading ? `변환 중... ${loadingProgress}%` : '음성으로 듣기'}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              {isLoading && loadingProgress > 0 && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage

