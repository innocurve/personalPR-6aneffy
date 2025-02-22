'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'
import { translate } from '../utils/translations'
import { useLanguage } from '../hooks/useLanguage'
import Navigation from '../components/Navigation'
import Link from 'next/link'

export default function GreetingVideo() {
  const { language } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const videoSources = {
    ko: "/greetingvideo/greetingko.mp4",
    en: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20Video%20(10)-3TdUn7xqPnnpeeVyofZDDUKiIoig5x.mp4",
    ja: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KakaoTalk_20241215_192019850-uUa3gchO094I9intvck6PuN9mrwKti.mp4",
    zh: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20Video%20(13)-47V2mk3OlCFd5iuV7NdVvhnrVWCSuF.mp4"
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleEnded = () => setIsPlaying(false)
      video.addEventListener('ended', handleEnded)
      return () => video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation language={language} />

      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="w-full">
            <CardHeader className="flex flex-col items-center">
              <div className="self-start">
                <Link href="/" className="p-2 rounded-full hover:bg-gray-100 flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-gray-600">Back</span>
                </Link>
              </div>
              <CardTitle className="text-2xl font-bold mt-4">{translate('greetingVideo', language)}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full max-w-lg aspect-w-16 aspect-h-9 mb-6">
                <div className="relative w-full h-full">
                  <video 
                    ref={videoRef}
                    src={videoSources[language] || videoSources['en']}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    playsInline
                    onClick={togglePlay}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4 mt-8 relative max-w-2xl mx-auto px-4">
            <svg className="absolute top-0 left-0 w-10 sm:w-16 h-10 sm:h-16 text-gray-400 transform -translate-x-1/3 -translate-y-1/3 sm:-translate-x-1/4 sm:-translate-y-1/4 z-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-4 sm:mb-6 text-center mx-auto">
              {translate('greetingTitle', language).split('\n').map((line, i) => (
                <span key={i} className="block whitespace-nowrap">{line}</span>
              ))}
            </h1>
            <p className="text-lg relative z-10">
              {translate('greetingDescription', language).split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
            <svg className="absolute top-0 right-0 w-10 sm:w-16 h-10 sm:h-16 text-gray-400 transform translate-x-1/3 -translate-y-1/3 sm:translate-x-1/4 sm:-translate-y-1/4 rotate-180 z-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
        </div>
      </main>
    </div>
  )
} 