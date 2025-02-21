import { Server } from 'socket.io'
import { NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const ioHandler = (req: Request, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
    })

    io.on('connection', (socket) => {
      console.log('Client connected')

      socket.on('startRecording', () => {
        socket.emit('recordingStarted')
      })

      socket.on('audioData', async (audioData: Blob) => {
        try {
          const arrayBuffer = await audioData.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)

          const transcription = await openai.audio.transcriptions.create({
            file: new File([buffer], 'audio.webm', { type: 'audio/webm' }),
            model: 'whisper-1',
            language: 'ko',
            response_format: 'text',
            temperature: 0.3,
            prompt: '이것은 AI 챗봇과의 대화입니다. 한국어로 명확하게 변환해주세요.'
          })

          socket.emit('transcription', transcription)
        } catch (error) {
          console.error('Audio processing error:', error)
          socket.emit('error', { message: '음성 처리 중 오류가 발생했습니다.' })
        }
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })

    res.socket.server.io = io
  }

  res.end()
}

export const GET = ioHandler
export const POST = ioHandler 