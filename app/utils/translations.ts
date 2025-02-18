export type Language = 'ko' | 'en' | 'ja' | 'zh';

export type TranslationKey = string;

export type TranslationDictionary = {
  [key in TranslationKey]: {
    [lang in Language]: string;
  };
};

export const translations: TranslationDictionary = {
  profile: {
    ko: '프로필',
    en: 'Profile',
    ja: 'プロフィール',
    zh: '个人资料',
  },
  values: {
    ko: '가치관',
    en: 'Values',
    ja: '価値観',
    zh: '价值观',
  },
  valuesDescription: {
    ko: '우리를 날게 하는 것은\n환경이 아니라,\n날 수 있다는 믿음이다.',
    en: 'What makes us fly\nis not the environment,\nbut the belief that we can fly.',
    ja: '私たちを飛べるのは\n環境ではなく、\n飛べるという信念だ。',
    zh: '让我们飞的不是环境\n而是相信能飞。',
  },
  history: {
    ko: '인증 및 자격',
    en: 'Certifications & Qualifications',
    ja: '認定・資格',
    zh: '认证及资格',
  },
  activities: {
    ko: '프로젝트',
    en: 'Projects',
    ja: 'プロジェクト',
    zh: '项目',
  },
  name: {
    ko: '이상현',
    en: 'Sanghyun Lee',
    ja: '李相顯',
    zh: '李相顯',
  },
  title: {
    ko: '사단법인 운영위원|AI Agent',
    en: 'The Association Committee|AI Agent',
    ja: '社団法人運営委員|AIエージェント',
    zh: '社团法人运营委员|AI代理',
  },
  birth: {
    ko: '출생',
    en: 'Birth',
    ja: '生年月日',
    zh: '出生',
  },
  birthDate: {
    ko: '1999년 8월 9일',
    en: 'August 9, 1999',
    ja: '1999年8月9日',
    zh: '1999年8月9日',
  },
  affiliation: {
    ko: '소속',
    en: 'Affiliations',
    ja: '所属',
    zh: '隶属',
  },
  affiliationDescription: {
    ko: '(사)대한청년을세계로\n이노커브',
    en: 'Korea Youth to the World\nInnoCurve',
    ja: '(社)韓国青年を世界へ\nイノカーブ',
    zh: '(社)韩国青年走向世界\nInnoCurve',
  },
  education: {
    ko: '학력',
    en: 'Education',
    ja: '学歴',
    zh: '教育',
  },
  educationDescription: {
    ko: '국립한밭대학교 산업경영공학과 학사',
    en: 'Hanbat National University\nIndustrial Management Engineering',
    ja: '国立ハンバード大学 産業経営工学科 学士',
    zh: '国立韓巴大学 产业经营工程学科 学士',
  },
  field: {
    ko: '분야',
    en: 'Fields',
    ja: '分野',
    zh: '领域',
  },
  fieldDescription: {
    ko: 'AI, 청년',
    en: 'AI, Youth',
    ja: 'AI、青年',
    zh: 'AI，青年',
  },
  mbti: {
    ko: 'MBTI',
    en: 'MBTI',
    ja: 'MBTI',
    zh: 'MBTI',
  },
  mbtiType: {
    ko: 'ENTJ',
    en: 'ENTJ',
    ja: 'ENTJ',
    zh: 'ENTJ',
  },
  contact: {
    ko: '문의',
    en: 'Contact',
    ja: 'お問い合わせ',
    zh: '联系',
  },
  smartOptions: {
    ko: '스마트 옵션',
    en: 'Smart Options',
    ja: 'スマートオプション',
    zh: '智能选项',
  },
  socialMedia: {
    ko: 'SNS',
    en: 'Social Media',
    ja: 'SNS',
    zh: '社交媒体',
  },
  viewMore: {
    ko: '자세히 보기',
    en: 'View More',
    ja: '詳細を見る',
    zh: '查看更多',
  },
  allRightsReserved: {
    ko: '모든 권리 보유.',
    en: 'All rights reserved.',
    ja: 'All rights reserved.',
    zh: '版权所有。',
  },
  date: {
    ko: '게시일',
    en: 'Date',
    ja: '投稿日',
    zh: '日期',
  },
  summary: {
    ko: '요약',
    en: 'Summary',
    ja: '要約',
    zh: '摘要',
  },
  details: {
    ko: '상세 내용',
    en: 'Details',
    ja: '詳細内容',
    zh: '详情',
  },
  gallery: {
    ko: '갤러리',
    en: 'Gallery',
    ja: 'ギャラリー',
    zh: '画廊',
  },
  backToList: {
    ko: '목록으로 돌아가기',
    en: 'Back to List',
    ja: 'リストに戻る',
    zh: '返回列表',
  },
  expandToggle: {
    ko: '펼쳐보기',
    en: 'Expand',
    ja: '展開する',
    zh: '展开',
  },
  collapseToggle: {
    ko: '숨기기',
    en: 'Collapse',
    ja: '折りたたむ',
    zh: '折叠',
  },
  aiClone: {
    ko: 'AI 클론',
    en: 'AI Clone',
    ja: 'AIクローン',
    zh: 'AI克隆',
  },
  phone: {
    ko: '전화',
    en: 'Phone',
    ja: '電話',
    zh: '电话',
  },
  greetingVideo: {
    ko: '인사 영상',
    en: 'Greeting Video',
    ja: '挨拶動画',
    zh: '问候视频',
  },
  innoCardInquiry: {
    ko: 'InnoCard\n문의',
    en: 'InnoCard\nInquiry',
    ja: 'InnoCard\nお問い合わせ',
    zh: 'InnoCard\n咨询',
  },
  contactOptions: {
    ko: '연락하기',
    en: 'Get in Touch',
    ja: 'お問い合わせ',
    zh: '联系方式',
  },
  greetingTitle: {
    ko: '기회를 기다리는 사람은 많지만,\n기회를 만드는 사람이 세상을 바꾼다.',
    en: 'While many wait for opportunities,\nthose who create them change the world.',
    ja: '機会を待つ人は多いが、\n機会を作る人が世界を変える。',
    zh: '等待机会的人很多，\n创造机会的人才能改变世界。',
  },
  greetingDescription: {
    ko: '세상은 빠르게 변하지만,\n변화를 만들어가는 것은 결국 사람입니다.\n기술은 도구일 뿐, 방향을 정하는 것은 우리의 선택입니다.\n\n저는 AI를 통해 더 많은 가능성을 열고,\n사람들이 새로운 길을 개척할 수 있도록 돕고자 합니다.\n\n흐름을 따르는 것이 아니라, 흐름을 만드는 것\n그것이 우리가 나아가야 할 길입니다.',
    en: 'The world changes rapidly,\nbut ultimately, it is people who create change.\nTechnology is just a tool, and the direction we take is our choice.\n\nThrough AI, I want to open up more possibilities\nand help people pioneer new paths.\n\nNot following the flow, but creating it\nThat is the path we must take.',
    ja: '世界は急速に変化していますが、\n変化を作り出すのは結局、人間です。\n技術は道具に過ぎず、方向を決めるのは私たちの選択です。\n\n私はAIを通じてより多くの可能性を開き、\n人々が新しい道を切り開けるよう支援したいと思います。\n\n流れに従うのではなく、流れを作ること\nそれが私たちの進むべき道です。',
    zh: '世界在快速变化，\n但创造变革的终究是人。\n技术只是工具，方向由我们选择。\n\n我想通过AI开启更多可能性，\n帮助人们开拓新的道路。\n\n不是追随潮流，而是创造潮流\n这才是我们应该前进的方向。',
  },
  chatInputPlaceholder: {
    ko: '메시지를 입력하세요...',
    en: 'Type your message...',
    ja: 'メッセージを入力してください...',
    zh: '请输入消息...',
  },
  cloneTitle: {
    ko: "'s Clone",
    en: "'s Clone",
    ja: "'s Clone",
    zh: "'s Clone"
  },
  formName: {
    ko: '이름',
    en: 'Name',
    ja: '名前',
    zh: '姓名',
  },
  formNamePlaceholder: {
    ko: '이름을 입력하세요',
    en: 'Enter your name',
    ja: '名前を入力してください',
    zh: '请输入姓名',
  },
  formBirthdate: {
    ko: '생년월일',
    en: 'Date of Birth',
    ja: '生年月日',
    zh: '出生日期',
  },
  formBirthdatePlaceholder: {
    ko: 'YYYY-MM-DD',
    en: 'YYYY-MM-DD',
    ja: 'YYYY-MM-DD',
    zh: 'YYYY-MM-DD',
  },
  formPhone: {
    ko: '전화번호',
    en: 'Phone Number',
    ja: '電話番号',
    zh: '电话号码',
  },
  formPhonePlaceholder: {
    ko: '전화번호를 입력하세요',
    en: 'Enter your phone number',
    ja: '電話番号を入力してください',
    zh: '请输入电话号码',
  },
  formInquiry: {
    ko: '문의 내용',
    en: 'Inquiry Details',
    ja: 'お問い合わせ内容',
    zh: '咨询内容',
  },
  formInquiryPlaceholder: {
    ko: '예) 제작 문의',
    en: 'e.g., Production inquiry',
    ja: '例）制作に関するお問い合わせ',
    zh: '例如：制作咨询',
  },
  formSubmit: {
    ko: '제출',
    en: 'Submit',
    ja: '送信',
    zh: '提交',
  },
  back: {
    ko: '뒤로',
    en: 'Back',
    ja: '戻る',
    zh: '返回',
  },
  initialGreeting: {
    ko: '안녕하세요! 저는 이상현입니다. 무엇을 도와드릴까요?',
    en: 'Hello! I am Sanghyun Lee. How can I help you?',
    ja: 'こんにちは！李相顯と申します。何かお手伝いできることはありますか？',
    zh: '你好！我是李相顯。我能为您做些什么？'
  },
  cloneGreeting: {
    ko: "안녕하세요! 저는 이상현's Clone입니다. 무엇을 도와드릴까요?",
    en: "Hello! I'm Sanghyun Lee's Clone. How can I help you?",
    ja: "こんにちは！李相顯のクローンです。どのようにお手伝いできますか？",
    zh: "你好！我是李相顯的克隆。我能为您做些什么？"
  },
};

export function translate(key: TranslationKey, lang: Language): string {
  try {
    const translation = translations[key]?.[lang] ?? translations[key]?.['ko'] ?? key;
    return translation || key;
  } catch (error) {
    console.error(`Translation error for key: ${key}, language: ${lang}`, error);
    return key;
  }
}

