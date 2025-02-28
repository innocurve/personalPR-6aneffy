'use client'

import { useState } from 'react'
import { Language, translate } from '../utils/translations'
import SophisticatedButton from './SophisticatedButton'

interface MyValuesProps {
  language: Language
}

const MyValues: React.FC<MyValuesProps> = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const content = {
    ko: [
      translate('valuesDescription', language),
      '"나무에 앉은 새는 가지가 부러질까 두려워하지 않는다. 새는 나무가 아니라 자신의 날개를 믿기 때문이다."',
      "류시화 시인의 <새는 날아가면서 뒤돌아보지 않는다>에 나오는 구절입니다.",
      "세상은 빠르게 변화하고 있습니다. 기술은 한계를 넘어 혁신을 이루고, 기존의 질서는 끊임없이 재편됩니다. 여기서 진정한 개척자는 변화 속에서도 중심을 잃지 않고, 흐름을 주도하는 사람들입니다.",
      "저는 AI를 기반으로 세상을 더 나은 방향으로 움직이고 싶습니다. 단순히 편리한 기술을 만드는 것이 아니라, 사람들의 삶을 근본적으로 바꾸고, 청년들이 무한한 가능성을 펼칠 수 있도록 돕고 싶습니다.",
      "우리는 더 이상 환경에 의존하는 존재가 아닙니다. 사회가 흔들릴지라도, 기술이 변할지라도, 우리에게는 스스로 날아오를 힘이 있습니다. 중요한 것은 외부의 변화가 아니라, 그 변화 속에서도 흔들리지 않을 자신만의 날개를 가지는 것입니다.",
      "청년들은 더 이상 사회의 수동적인 구성원이 아닙니다. 그들은 새로운 질서를 만들고, 세상의 판을 바꾸는 게임 체인저가 되어야 합니다. 저는 그들이 더 넓은 세상을 꿈꾸고, 도전하고, 주저 없이 앞으로 나아갈 수 있도록 지원할 것입니다.",
      "AI는 단순한 도구가 아닙니다. 그것은 우리의 삶을 확장시키고, 한계를 허무는 가능성의 열쇠입니다. 저는 이 열쇠를 통해 더 많은 사람들이 자신의 길을 찾고, 꿈을 현실로 만들 수 있도록 할 것입니다.",
      "기술이 사람을 위한 것이고, 혁신이 모두를 위한 것이어야 합니다. 우리는 단순히 시대를 살아가는 존재가 아니라, 시대를 만들어가는 존재입니다.",
      "감사합니다.",
    ],
    en: [
      translate('valuesDescription', language),
      '"A bird sitting on a branch is not afraid of it breaking. Because the bird trusts not in the branch, but in its own wings."',
      "This is a passage from the book 'Birds Don't Look Back as They Fly' by poet Sihwa Ryu.",
      "The world is changing rapidly. Technology breaks boundaries to achieve innovation, and existing orders are constantly being reorganized. Here, true pioneers are those who maintain their center even in change and lead the flow.",
      "I want to move the world in a better direction based on AI. Not just creating convenient technology, but fundamentally changing people's lives and helping young people unleash their infinite potential.",
      "We are no longer beings dependent on our environment. Even if society wavers, even if technology changes, we have the power to soar on our own. What matters is not external changes, but having our own wings that won't waver amid those changes.",
      "Young people are no longer passive members of society. They must become game changers who create new order and change the world's paradigm. I will support them to dream of a broader world, take on challenges, and move forward without hesitation.",
      "AI is not just a tool. It is the key to possibility that expands our lives and breaks down limitations. Through this key, I will help more people find their path and make their dreams a reality.",
      "Technology should be for people, and innovation should be for everyone. We are not just beings living in the era, but beings creating the era.",
      "Thank you.",
    ],
    ja: [
      translate('valuesDescription', language),
      '"木の枝に止まる鳥は、枝が折れることを恐れない。鳥は木ではなく、自分の翼を信じているからだ。"',
      "これは柳時和詩人の『鳥は飛びながら振り返らない』に出てくる一節です。",
      "世界は急速に変化しています。技術は限界を超えて革新を成し遂げ、既存の秩序は絶えず再編されています。ここで真の開拓者とは、変化の中でも中心を失わず、流れを主導する人々です。",
      "私はAIを基盤に世界をより良い方向へ動かしたいと考えています。単に便利な技術を作るのではなく、人々の生活を根本的に変え、若者たちが無限の可能性を広げられるよう支援したいと思います。",
      "私たちはもはや環境に依存する存在ではありません。社会が揺れ動いても、技術が変化しても、私たちには自ら飛び立つ力があります。重要なのは外部の変化ではなく、その変化の中でも揺るがない自分の翼を持つことです。",
      "若者たちはもはや社会の受動的なメンバーではありません。彼らは新しい秩序を作り、世界の仕組みを変えるゲームチェンジャーにならなければなりません。私は彼らがより広い世界を夢見て、挑戦し、躊躇なく前進できるよう支援していきます。",
      "AIは単なるツールではありません。それは私たちの生活を拡張し、限界を取り払う可能性の鍵です。この鍵を通じて、より多くの人々が自分の道を見つけ、夢を現実にできるようにしていきます。",
      "技術は人のためにあり、革新は全ての人のためにあるべきです。私たちは単に時代を生きる存在ではなく、時代を創る存在です。",
      "ありがとうございます。",
    ],
    zh: [
      translate('valuesDescription', language),
      '"栖息在树枝上的鸟儿不会担心树枝折断。因为鸟儿相信的不是树枝，而是自己的翅膀。"',
      "这是诗人柳时和《鸟儿飞翔时不会回头》中的一段话。",
      "世界正在快速变化。科技突破界限实现创新，既有秩序不断重组。在这里，真正的开拓者是那些在变革中保持本心，引领潮流的人。",
      "我想基于AI推动世界向更好的方向发展。不仅仅是创造便利的技术，而是从根本上改变人们的生活，帮助年轻人展现无限可能。",
      "我们不再是依赖环境的存在。即使社会动荡，即使技术变革，我们都有自己翱翔的力量。重要的不是外部的变化，而是在变化中拥有不会动摇的翅膀。",
      "年轻人不再是社会的被动成员。他们必须成为创造新秩序、改变世界格局的游戏规则改变者。我将支持他们梦想更广阔的世界，勇于挑战，毫不犹豫地向前迈进。",
      "AI不仅仅是一个工具。它是扩展我们生活、打破限制的可能性之钥。通过这把钥匙，我将帮助更多人找到自己的道路，将梦想变为现实。",
      "技术应该为人服务，创新应该惠及所有人。我们不仅仅是生活在时代中的存在，更是创造时代的存在。",
      "谢谢。",
    ]
  }

  const currentContent = content[language] ?? content['ko'] ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full">
        <div className="mb-6 relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 flex flex-col items-center">
          <svg className="absolute top-0 left-0 w-5 sm:w-7 md:w-12 h-5 sm:h-7 md:h-12 text-gray-300 dark:text-gray-700 transform -translate-x-1/6 -translate-y-1/6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <h2 className="text-lg sm:text-2xl md:text-3xl relative z-10 text-center mb-4 sm:mb-5 md:mb-6">
            {translate('valuesDescription', language).split('\n').map((line: string, i: number) => (
              <span key={i} className="block text-lg sm:text-xl md:text-4xl font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
          <svg className="absolute bottom-0 right-0 w-5 sm:w-7 md:w-12 h-5 sm:h-7 md:h-12 text-gray-300 dark:text-gray-700 transform translate-x-1/6 translate-y-1/6 rotate-180" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>
        <div className="space-y-4">
          {(isExpanded ? currentContent.slice(1) : currentContent.slice(1, 3)).map((paragraph, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-300">{paragraph}</p>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <SophisticatedButton 
            expanded={isExpanded} 
            onClick={() => setIsExpanded(!isExpanded)} 
            language={language}
          />
        </div>
      </div>
    </div>
  )
}

export default MyValues