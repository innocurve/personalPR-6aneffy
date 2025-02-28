'use client'

import { useState, useMemo } from 'react'
import SophisticatedButton from './SophisticatedButton'
import { useLanguage } from '../hooks/useLanguage'
import { translate } from '../utils/translations'

type CertificationsByLanguage = {
  [key: string]: { title: string; subtitle: string }[]
}

export default function Career() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { language } = useLanguage()

  const certifications: CertificationsByLanguage = useMemo(() => ({
    ko: [
      {
        title: "AI-POT[AI프롬프트활용능력]",
        subtitle: "KPC 한국생산성본부"
      },
      {
        title: "AI활용전문가 1급",
        subtitle: "주무부처: 과학기술정보통신부"
      },
      {
        title: "인공지능(AI)전문가 1급",
        subtitle: "주무부처: 과학기술정보통신부"
      },
      {
        title: "챗GPT활용지도사 1급",
        subtitle: "주무부처: 과학기술정보통신부"
      },
      {
        title: "GTQ[그래픽기술자격] 1급",
        subtitle: "KPC 한국생산성본부"
      },
      {
        title: "GTQi[그래픽기술자격 일러스트] 1급",
        subtitle: "KPC 한국생산성본부"
      },
      {
        title: "GTQid[그래픽기술자격 인디자인] 1급",
        subtitle: "KPC 한국생산성본부"
      }
    ],
    en: [
      {
        title: "AI-POT[AI Prompt Optimization Test]",
        subtitle: "Korea Productivity Center (KPC)"
      },
      {
        title: "AI Utilization Expert Level 1",
        subtitle: "Ministry of Science and ICT"
      },
      {
        title: "Artificial Intelligence Expert Level 1",
        subtitle: "Ministry of Science and ICT"
      },
      {
        title: "ChatGPT Utilization Instructor Level 1",
        subtitle: "Ministry of Science and ICT"
      },
      {
        title: "GTQ[Graphics Technology Qualification] Level 1",
        subtitle: "Korea Productivity Center (KPC)"
      },
      {
        title: "GTQi[Graphics Technology Qualification Illustrator] Level 1",
        subtitle: "Korea Productivity Center (KPC)"
      },
      {
        title: "GTQid[Graphics Technology Qualification InDesign] Level 1",
        subtitle: "Korea Productivity Center (KPC)"
      }
    ],
    ja: [
      {
        title: "AI-POT[AIプロンプト活用能力]",
        subtitle: "Korea Productivity Center (KPC)"
      },
      {
        title: "AI活用専門家 1級",
        subtitle: "所管：科学技術情報通信部"
      },
      {
        title: "人工知能(AI)専門家 1級",
        subtitle: "所管：科学技術情報通信部"
      },
      {
        title: "チャットGPT活用指導者 1級",
        subtitle: "所管：科学技術情報通信部"
      },
      {
        title: "GTQ[グラフィック技術資格] 1級",
        subtitle: "KPC 韓国生産性本部"
      },
      {
        title: "GTQi[グラフィック技術資格 イラストレーター] 1級",
        subtitle: "KPC 韓国生産性本部"
      },
      {
        title: "GTQid[グラフィック技術資格 インデザイン] 1級",
        subtitle: "KPC 韓国生産性本部"
      }
    ],
    zh: [
      {
        title: "AI-POT[AI提示词应用能力]",
        subtitle: "KPC 韩国生产性本部"
      },
      {
        title: "AI应用专家 1级",
        subtitle: "主管部门：科学技术信息通信部"
      },
      {
        title: "人工智能(AI)专家 1级",
        subtitle: "主管部门：科学技术信息通信部"
      },
      {
        title: "ChatGPT应用指导师 1级",
        subtitle: "主管部门：科学技术信息通信部"
      },
      {
        title: "GTQ[图形技术资格] 1级",
        subtitle: "KPC 韩国生产性本部"
      },
      {
        title: "GTQi[图形技术资格 Illustrator] 1级",
        subtitle: "KPC 韩国生产性本部"
      },
      {
        title: "GTQid[图形技术资格 InDesign] 1级",
        subtitle: "KPC 韩国生产性本部"
      }
    ]
  }), [])

  const currentCertifications = useMemo(() => {
    return certifications[language] || certifications['ko']
  }, [language, certifications])

  const displayedCertifications = useMemo(() => {
    return isExpanded ? currentCertifications : currentCertifications.slice(0, 3)
  }, [isExpanded, currentCertifications])

  return (
    <section className="mb-4 px-4 md:px-6 lg:px-8" role="region" aria-label="자격 사항">
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          {translate('인증 및 자격', language)}
        </span>
      </h2>
      <div className="space-y-6">
        <ul className="space-y-6" role="list">
          {displayedCertifications.map((cert, index) => (
            <li 
              key={index} 
              className="border-b border-gray-100 pb-4 last:border-b-0"
              role="listitem"
            >
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#4B6BF5] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {cert.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {cert.subtitle}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-6">
        <SophisticatedButton 
          expanded={isExpanded} 
          onClick={() => setIsExpanded(!isExpanded)} 
          language={language}
          aria-expanded={isExpanded}
          aria-controls="certifications-list"
        />
      </div>
    </section>
  )
}