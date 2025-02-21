'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { io } from 'socket.io-client'

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: number
}

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isDarkMode?: boolean
  placeholder?: string
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isDarkMode, placeholder }) => {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioLevel, setAudioLevel] = useState<number>(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const socketRef = useRef<any>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    socketRef.current = io({
      path: '/api/socket',
    })

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket')
    })

    socketRef.current.on('transcription', (text: string) => {
      if (text.trim()) {
        onSendMessage(text.trim())
      }
    })

    socketRef.current.on('error', (error: { message: string }) => {
      toast.error(error.message)
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [onSendMessage])

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop()
      }
    }
  }, [isRecording])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      mediaRecorderRef.current = mediaRecorder

      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      const updateAudioLevel = () => {
        if (!isRecording) return
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length
        setAudioLevel(average)
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
      }
      updateAudioLevel()

      mediaRecorder.ondataavailable = async (e) => {
        if (e.data.size > 0 && socketRef.current) {
          socketRef.current.emit('audioData', e.data)
        }
      }

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop())
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }

      mediaRecorder.start(1000)
      setIsRecording(true)
      socketRef.current?.emit('startRecording')
      toast.success('음성 녹음을 시작합니다. 말씀해 주세요.')
    } catch (error) {
      console.error('녹음 시작 오류:', error)
      toast.error('마이크 접근이 거부되었습니다.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      toast.success('음성 녹음이 완료되었습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isRecording ? '음성을 인식하고 있습니다...' : (placeholder || '메시지를 입력하세요...')}
          className={`w-full p-2 pr-12 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
            isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
          } ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
          title={isRecording ? '녹음 중지' : '음성으로 입력'}
        >
          {isProcessing ? (
            <div className="relative">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                변환 중...
              </span>
            </div>
          ) : isRecording ? (
            <div className="relative">
              <MicOff className="w-5 h-5 text-red-500" />
              <div 
                className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"
                style={{
                  transform: `scale(${1 + audioLevel / 100})`,
                  opacity: 0.8
                }}
              />
            </div>
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>
      </div>
      <button
        type="submit"
        disabled={!message.trim() || isRecording || isProcessing}
        className={`p-2 rounded-lg transition-colors ${
          message.trim() && !isRecording && !isProcessing
            ? isDarkMode
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            : isDarkMode
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}

export default ChatInput