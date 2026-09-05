const presets = {
  alpha: {
    name: "Alpha",
    beat: 10,
    carrier: 440,
    mode: "binaural",
    description: "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。",
  },
  beta: {
    name: "Beta",
    beat: 18,
    carrier: 520,
    mode: "binaural",
    description: "閱讀、寫作與短時段工作",
  },
  gamma: {
    name: "Gamma",
    beat: 40,
    carrier: 600,
    mode: "binaural",
    description: "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。",
  },
  theta: {
    name: "Theta",
    beat: 6,
    carrier: 360,
    mode: "binaural",
    description: "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。",
  },
  delta: {
    name: "Delta",
    beat: 2.5,
    carrier: 280,
    mode: "pulse",
    description: "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。",
  },
  focus: {
    name: "Pure Tone",
    beat: 600,
    carrier: 600,
    mode: "tone",
    description: "單純音色及耳機／左右聲道測試",
  },
};

const nodes = {
  playButton: document.querySelector("#playButton"),
  stopButton: document.querySelector("#stopButton"),
  statusPill: document.querySelector("#statusPill"),
  bandName: document.querySelector("#bandName"),
  beatValue: document.querySelector("#beatValue"),
  bandDescription: document.querySelector("#bandDescription"),
  beatFrequency: document.querySelector("#beatFrequency"),
  beatOutput: document.querySelector("#beatOutput"),
  carrierFrequency: document.querySelector("#carrierFrequency"),
  carrierOutput: document.querySelector("#carrierOutput"),
  leftFrequency: document.querySelector("#leftFrequency"),
  leftOutput: document.querySelector("#leftOutput"),
  rightFrequency: document.querySelector("#rightFrequency"),
  rightOutput: document.querySelector("#rightOutput"),
  hemisphericControls: document.querySelector("#hemisphericControls"),
  hemisphericNote: document.querySelector("#hemisphericNote"),
  volume: document.querySelector("#volume"),
  volumeOutput: document.querySelector("#volumeOutput"),
  timerDuration: document.querySelector("#timerDuration"),
  timerOutput: document.querySelector("#timerOutput"),
  waveform: document.querySelector("#waveform"),
  visualizer: document.querySelector(".visualizer"),
  presets: Array.from(document.querySelectorAll("[data-preset]")),
  presetCards: [],
  modes: Array.from(document.querySelectorAll("[data-mode]")),
  languageSelect: document.querySelector("#languageSelect"),
  appTitle: document.querySelector("#appTitle"),
};

const languages = {
  "zh-Hant": { title: "高頻音實驗室", play: "播放", stop: "停止", stopped: "已停止", playing: "播放中" },
  en: { title: "高頻音實驗室", play: "Play", stop: "Stop", stopped: "Stopped", playing: "Playing" },
  hi: { title: "高頻音實驗室", play: "चलाएँ", stop: "रोकें", stopped: "रुका हुआ", playing: "चल रहा है" },
  es: { title: "高頻音實驗室", play: "Reproducir", stop: "Detener", stopped: "Detenido", playing: "Reproduciendo" },
  fr: { title: "高頻音實驗室", play: "Lire", stop: "Arrêter", stopped: "Arrêté", playing: "Lecture" },
  ar: { title: "高頻音實驗室", play: "تشغيل", stop: "إيقاف", stopped: "متوقف", playing: "قيد التشغيل" },
  "zh-CN": { title: "高頻音實驗室", play: "播放", stop: "停止", stopped: "已停止", playing: "播放中" },
  ja: { title: "高頻音實驗室", play: "再生", stop: "停止", stopped: "停止中", playing: "再生中" },
  ko: { title: "高頻音實驗室", play: "재생", stop: "정지", stopped: "정지됨", playing: "재생 중" },
};

const sortLabels = {
  "zh-Hant": { sort: "拖曳排序卡片", handle: "長按並拖曳以重新排序" },
  "zh-CN": { sort: "拖拽排序卡片", handle: "长按并拖拽以重新排序" },
  en: { sort: "Drag to reorder cards", handle: "Press and hold to drag and reorder" },
  hi: { sort: "कार्ड खींचकर क्रम बदलें", handle: "क्रम बदलने के लिए दबाकर खींचें" },
  es: { sort: "Arrastre para reordenar tarjetas", handle: "Mantenga pulsado y arrastre para reordenar" },
  fr: { sort: "Faites glisser pour réorganiser les cartes", handle: "Maintenez et faites glisser pour réorganiser" },
  ar: { sort: "اسحب لإعادة ترتيب البطاقات", handle: "اضغط مطولاً واسحب لإعادة الترتيب" },
  ja: { sort: "ドラッグしてカードを並べ替え", handle: "長押ししてドラッグすると並べ替えできます" },
  ko: { sort: "드래그하여 카드 순서 변경", handle: "길게 눌러 드래그하면 순서를 변경합니다" },
};

const englishText = {
  "語言": "Language", "高頻聲音與腦波節拍": "Frequency Sounds & Binaural Beats", "已停止": "Stopped", "播放": "Play", "停止": "Stop",
  "平穩專注的雙耳節拍預設": "A steady binaural-beat preset for focus", "聲音參數": "Sound parameters", "節拍頻率": "Beat frequency", "載波音高": "Carrier pitch", "音量": "Volume", "波形": "Waveform",
  "模式": "Mode", "雙耳節拍": "Binaural beats", "脈衝調制": "Pulse modulation", "純高頻": "Pure tone", "練習計時": "Practice timer", "不計時": "No timer", "10 分鐘": "10 minutes", "20 分鐘": "20 minutes", "30 分鐘": "30 minutes", "柔和環境底音": "Soft ambient bed", "環境聲音量": "Ambient volume",
  "建議使用耳機並保持低音量；若感到不適請立即停止。情境文字僅供安排練習，不保證改善專注、記憶、睡眠或任何健康狀況。": "Use headphones at a low volume and stop if uncomfortable. Scenario text is for planning practice only; it does not guarantee improvements to focus, memory, sleep, or health.",
  "研究閱讀與證據界限": "Research reading & evidence limits", "以下為雙耳節拍與聽覺刺激的系統性回顧；研究結果受頻率、聆聽時間與研究設計影響，不能視為醫療或效果保證。": "These are systematic reviews of binaural beats and auditory stimulation. Findings depend on frequency, exposure time, and study design; they are not medical or outcome guarantees.",
  "統合認知、焦慮與疼痛研究，指出效果與使用條件相關。": "A meta-analysis of cognition, anxiety, and pain studies; outcomes were associated with listening conditions.", "記憶與注意力的系統性回顧；結論仍有混合結果，需更嚴謹研究。": "A systematic review of memory and attention; results remain mixed and need stronger studies.", "整理焦慮、睡眠與認知研究，適合作為後續閱讀起點。": "A review of anxiety, sleep, and cognition research; a useful starting point for further reading.",
  "Alpha・安住": "Alpha · Settling", "靜坐前、閱讀與平穩專注": "Before meditation, reading, and steady focus", "Beta・明覺": "Beta · Alertness", "短時工作、創作與提振精神": "Short work sessions, creation, and alertness", "Gamma・清明": "Gamma · Clarity", "高投入任務前的短時聆聽": "Short listening before demanding tasks", "Theta・觀息": "Theta · Breathing", "呼吸練習、打坐與沉靜時刻": "Breathing practice, meditation, and quiet moments", "Delta・深息": "Delta · Deep rest", "夜間放鬆與安靜休息前": "Night-time relaxation and before quiet rest", "Pure Tone・鐘音": "Pure Tone · Bell", "單一音色練習；請維持低音量": "Single-tone practice; keep volume low"
};


Object.assign(englishText, {
  "繁體中文": "Traditional Chinese", "简体中文": "Simplified Chinese", "日本語": "Japanese", "한국어": "Korean",
  "柔和環境底音": "Soft ambient bed", "統合認知、焦慮與疼痛研究，指出效果與使用條件相關。": "A meta-analysis of cognition, anxiety, and pain studies; outcomes were associated with listening conditions.",
  "記憶與注意力的系統性回顧；結論仍有混合結果，需更嚴謹研究。": "A systematic review of memory and attention; results remain mixed and need stronger studies.",
  "整理焦慮、睡眠與認知研究，適合作為後續閱讀起點。": "A review of anxiety, sleep, and cognition research; a useful starting point for further reading."
  ,"：統合認知、焦慮與疼痛研究，指出效果與使用條件相關。": ": A meta-analysis of cognition, anxiety, and pain studies; outcomes were associated with listening conditions."
  ,"：記憶與注意力的系統性回顧；結論仍有混合結果，需更嚴謹研究。": ": A systematic review of memory and attention; results remain mixed and need stronger studies."
  ,"：整理焦慮、睡眠與認知研究，適合作為後續閱讀起點。": ": A review of anxiety, sleep, and cognition research; a useful starting point for further reading."
  ,"清醒工作節奏的雙耳節拍預設": "A binaural-beat preset for alert work", "高速節奏感的雙耳節拍預設": "A fast-paced binaural-beat preset", "慢速放鬆節奏的雙耳節拍預設": "A slow binaural-beat preset for relaxation", "低速脈衝調制預設": "A low-speed pulse-modulation preset", "單一高頻純音預設": "A single high-frequency pure-tone preset", "自訂頻率組合": "Custom frequency combination", "播放中": "Playing", "Sine": "Sine", "Triangle": "Triangle", "Square": "Square", "Sawtooth": "Sawtooth", "English": "English", "हिन्दी": "Hindi", "Español": "Spanish", "Français": "French", "العربية": "Arabic"
});
const textKeys = [
  "語言", "高頻聲音與腦波節拍", "已停止", "播放", "停止", "播放中", "平穩專注的雙耳節拍預設", "清醒工作節奏的雙耳節拍預設", "高速節奏感的雙耳節拍預設", "慢速放鬆節奏的雙耳節拍預設", "低速脈衝調制預設", "單一高頻純音預設", "自訂頻率組合",
  "聲音參數", "節拍頻率", "載波音高", "音量", "波形", "模式", "雙耳節拍", "脈衝調制", "純高頻", "練習計時", "不計時", "10 分鐘", "20 分鐘", "30 分鐘", "柔和環境底音", "環境聲音量",
  "建議使用耳機並保持低音量；若感到不適請立即停止。情境文字僅供安排練習，不保證改善專注、記憶、睡眠或任何健康狀況。", "研究閱讀與證據界限", "以下為雙耳節拍與聽覺刺激的系統性回顧；研究結果受頻率、聆聽時間與研究設計影響，不能視為醫療或效果保證。", "統合認知、焦慮與疼痛研究，指出效果與使用條件相關。", "記憶與注意力的系統性回顧；結論仍有混合結果，需更嚴謹研究。", "整理焦慮、睡眠與認知研究，適合作為後續閱讀起點。",
  "Alpha・安住", "靜坐前、閱讀與平穩專注", "Beta・明覺", "短時工作、創作與提振精神", "Gamma・清明", "高投入任務前的短時聆聽", "Theta・觀息", "呼吸練習、打坐與沉靜時刻", "Delta・深息", "夜間放鬆與安靜休息前", "Pure Tone・鐘音", "單一音色練習；請維持低音量", "Sine", "Triangle", "Square", "Sawtooth",
  "繁體中文", "简体中文", "English", "हिन्दी", "Español", "Français", "العربية", "日本語", "한국어"
];

function makeDictionary(values) {
  return Object.fromEntries(textKeys.map((key, index) => [key, values[index]]));
}

const localizedText = {
  en: englishText,
  "zh-CN": makeDictionary(["语言", "高频声音与脑波节拍", "已停止", "播放", "停止", "播放中", "平稳专注的双耳节拍预设", "清醒工作节奏的双耳节拍预设", "高速节奏感的双耳节拍预设", "慢速放松节奏的双耳节拍预设", "低速脉冲调制预设", "单一高频纯音预设", "自定义频率组合", "声音参数", "节拍频率", "载波音高", "音量", "波形", "模式", "双耳节拍", "脉冲调制", "纯高频", "练习计时", "不计时", "10 分钟", "20 分钟", "30 分钟", "柔和环境底音", "环境声音量", "建议使用耳机并保持低音量；若感到不适请立即停止。情境文字仅供安排练习，不保证改善专注、记忆、睡眠或任何健康状况。", "研究阅读与证据界限", "以下为双耳节拍与听觉刺激的系统性回顾；研究结果受频率、聆听时间与研究设计影响，不能视为医疗或效果保证。", "整合认知、焦虑与疼痛研究，指出效果与使用条件相关。", "记忆与注意力的系统性回顾；结论仍有混合结果，需更严谨研究。", "整理焦虑、睡眠与认知研究，适合作为后续阅读起点。", "Alpha・安住", "静坐前、阅读与平稳专注", "Beta・明觉", "短时工作、创作与提振精神", "Gamma・清明", "高投入任务前的短时聆听", "Theta・观息", "呼吸练习、打坐与沉静时刻", "Delta・深息", "夜间放松与安静休息前", "Pure Tone・钟音", "单一音色练习；请保持低音量", "正弦波", "三角波", "方波", "锯齿波", "繁体中文", "简体中文", "英语", "印地语", "西班牙语", "法语", "阿拉伯语", "日语", "韩语"]),
  ja: makeDictionary(["言語", "周波数サウンドとバイノーラルビート", "停止中", "再生", "停止", "再生中", "落ち着いた集中のためのバイノーラルビート・プリセット", "覚醒した作業リズムのためのバイノーラルビート・プリセット", "速いリズム感のためのバイノーラルビート・プリセット", "ゆったりしたリラックスのためのバイノーラルビート・プリセット", "低速パルス変調プリセット", "単一の高周波純音プリセット", "カスタム周波数の組み合わせ", "サウンド設定", "ビート周波数", "キャリア音程", "音量", "波形", "モード", "バイノーラルビート", "パルス変調", "高周波純音", "練習タイマー", "タイマーなし", "10 分", "20 分", "30 分", "やわらかな環境音", "環境音の音量", "ヘッドホンを使い、音量を低く保ってください。不快に感じたらすぐに停止してください。説明文は練習計画のためのものであり、集中、記憶、睡眠、健康状態の改善を保証するものではありません。", "研究資料とエビデンスの限界", "以下はバイノーラルビートと聴覚刺激の系統的レビューです。結果は周波数、聴取時間、研究デザインの影響を受け、医療的または効果の保証とは見なせません。", "認知、不安、痛みに関する研究を統合したメタ分析。結果は聴取条件と関連していました。", "記憶と注意に関する系統的レビュー。結論はまだ混在しており、より厳密な研究が必要です。", "不安、睡眠、認知に関する研究のレビュー。さらに読むための出発点です。", "Alpha・安らぎ", "瞑想前、読書、安定した集中に", "Beta・覚醒", "短時間の作業、創作、気分転換に", "Gamma・明晰", "集中力が必要な課題の前に短時間", "Theta・呼吸観察", "呼吸練習、坐禅、静かな時間に", "Delta・深い休息", "夜のリラックスと静かな休息の前に", "Pure Tone・ベル音", "単音での練習。音量を低く保ってください", "サイン波", "三角波", "矩形波", "のこぎり波", "繁体字中国語", "簡体字中国語", "英語", "ヒンディー語", "スペイン語", "フランス語", "アラビア語", "日本語", "韓国語"]),
  ko: makeDictionary(["언어", "주파수 사운드와 바이노럴 비트", "정지됨", "재생", "정지", "재생 중", "안정적인 집중을 위한 바이노럴 비트 프리셋", "또렷한 작업 리듬을 위한 바이노럴 비트 프리셋", "빠른 리듬감을 위한 바이노럴 비트 프리셋", "느긋한 이완을 위한 바이노럴 비트 프리셋", "저속 펄스 변조 프리셋", "단일 고주파 순음 프리셋", "사용자 지정 주파수 조합", "사운드 설정", "비트 주파수", "반송파 음높이", "볼륨", "파형", "모드", "바이노럴 비트", "펄스 변조", "순수 고주파", "연습 타이머", "타이머 없음", "10분", "20분", "30분", "부드러운 환경음", "환경음 볼륨", "헤드폰을 사용하고 낮은 볼륨을 유지하세요. 불편하면 즉시 중지하세요. 상황 문구는 연습 계획용이며 집중력, 기억력, 수면 또는 건강 상태의 개선을 보장하지 않습니다.", "연구 자료와 근거의 한계", "아래는 바이노럴 비트와 청각 자극에 관한 체계적 문헌고찰입니다. 결과는 주파수, 청취 시간 및 연구 설계의 영향을 받으며 의료적 또는 효과 보증으로 볼 수 없습니다.", "인지, 불안, 통증 연구를 종합한 메타분석으로 결과는 청취 조건과 관련이 있었습니다.", "기억과 주의력에 관한 체계적 문헌고찰입니다. 결과는 여전히 엇갈리며 더 엄격한 연구가 필요합니다.", "불안, 수면, 인지 연구를 정리한 검토로 추가 읽기의 출발점입니다.", "Alpha・안정", "명상 전, 독서와 안정적인 집중에", "Beta・각성", "짧은 작업, 창작, 활력에", "Gamma・명료", "집중이 필요한 과제 전에 짧게", "Theta・호흡 관찰", "호흡 연습, 명상, 고요한 시간에", "Delta・깊은 휴식", "밤의 이완과 조용한 휴식 전에", "Pure Tone・종소리", "단일 음색 연습; 낮은 볼륨을 유지하세요", "사인파", "삼각파", "사각파", "톱니파", "번체 중국어", "간체 중국어", "영어", "힌디어", "스페인어", "프랑스어", "아랍어", "일본어", "한국어"]),
  hi: makeDictionary(["भाषा", "आवृत्ति ध्वनि और बाइनॉरल बीट्स", "रुका हुआ", "चलाएँ", "रोकें", "चल रहा है", "स्थिर एकाग्रता के लिए बाइनॉरल बीट प्रीसेट", "सतर्क कार्य लय के लिए बाइनॉरल बीट प्रीसेट", "तेज़ लय अनुभव के लिए बाइनॉरल बीट प्रीसेट", "धीमे विश्राम के लिए बाइनॉरल बीट प्रीसेट", "कम गति पल्स मॉड्यूलेशन प्रीसेट", "एकल उच्च-आवृत्ति शुद्ध टोन प्रीसेट", "कस्टम आवृत्ति संयोजन", "ध्वनि सेटिंग", "बीट आवृत्ति", "कैरियर पिच", "वॉल्यूम", "तरंगरूप", "मोड", "बाइनॉरल बीट्स", "पल्स मॉड्यूलेशन", "शुद्ध उच्च टोन", "अभ्यास टाइमर", "टाइमर नहीं", "10 मिनट", "20 मिनट", "30 मिनट", "कोमल परिवेश ध्वनि", "परिवेश ध्वनि वॉल्यूम", "हेडफ़ोन का उपयोग करें और आवाज़ कम रखें। असुविधा हो तो तुरंत रोकें। यह विवरण केवल अभ्यास की योजना के लिए है और एकाग्रता, स्मृति, नींद या स्वास्थ्य में सुधार की गारंटी नहीं देता।", "अनुसंधान पठन और साक्ष्य की सीमाएँ", "नीचे बाइनॉरल बीट्स और श्रवण उत्तेजना की व्यवस्थित समीक्षाएँ हैं। निष्कर्ष आवृत्ति, सुनने की अवधि और शोध-डिज़ाइन पर निर्भर हैं; इन्हें चिकित्सा या परिणाम की गारंटी नहीं माना जा सकता।", "संज्ञान, चिंता और दर्द के अध्ययनों का मेटा-विश्लेषण; परिणाम सुनने की स्थितियों से जुड़े थे।", "स्मृति और ध्यान की व्यवस्थित समीक्षा; निष्कर्ष मिश्रित हैं और अधिक कठोर अध्ययन चाहिए।", "चिंता, नींद और संज्ञान अनुसंधान की समीक्षा; आगे पढ़ने का उपयोगी आरंभ।", "Alpha・स्थिरता", "ध्यान से पहले, पढ़ने और स्थिर एकाग्रता के लिए", "Beta・सजगता", "छोटे काम, रचनात्मकता और सक्रियता के लिए", "Gamma・स्पष्टता", "मांग वाले काम से पहले थोड़ी देर सुनने के लिए", "Theta・श्वास", "श्वास अभ्यास, ध्यान और शांत क्षणों के लिए", "Delta・गहरा विश्राम", "रात के विश्राम और शांत आराम से पहले", "Pure Tone・घंटी", "एकल टोन अभ्यास; आवाज़ कम रखें", "साइन", "त्रिभुज", "वर्ग", "आरी-दाँत", "पारंपरिक चीनी", "सरलीकृत चीनी", "अंग्रेज़ी", "हिन्दी", "स्पेनी", "फ़्रेंच", "अरबी", "जापानी", "कोरियाई"]),
  es: makeDictionary(["Idioma", "Sonidos de frecuencia y ritmos binaurales", "Detenido", "Reproducir", "Detener", "Reproduciendo", "Preajuste de ritmos binaurales para una concentración estable", "Preajuste de ritmos binaurales para el trabajo alerta", "Preajuste de ritmos binaurales de ritmo rápido", "Preajuste de ritmos binaurales para una relajación lenta", "Preajuste de modulación por pulsos lenta", "Preajuste de tono puro de alta frecuencia", "Combinación de frecuencias personalizada", "Parámetros de sonido", "Frecuencia de pulso", "Tono portador", "Volumen", "Forma de onda", "Modo", "Ritmos binaurales", "Modulación por pulsos", "Tono puro", "Temporizador de práctica", "Sin temporizador", "10 minutos", "20 minutos", "30 minutos", "Base ambiental suave", "Volumen ambiental", "Use auriculares y mantenga un volumen bajo; deténgase de inmediato si siente molestias. El texto de escenarios solo sirve para planificar la práctica y no garantiza mejoras en concentración, memoria, sueño ni salud.", "Lecturas de investigación y límites de la evidencia", "Estas son revisiones sistemáticas de ritmos binaurales y estimulación auditiva. Los hallazgos dependen de la frecuencia, el tiempo de escucha y el diseño del estudio; no son garantías médicas ni de resultados.", "Metaanálisis de estudios sobre cognición, ansiedad y dolor; los resultados se asociaron con las condiciones de escucha.", "Revisión sistemática sobre memoria y atención; los resultados siguen siendo mixtos y requieren estudios más rigurosos.", "Revisión de investigaciones sobre ansiedad, sueño y cognición; un buen punto de partida para seguir leyendo.", "Alpha・Calma", "Antes de meditar, leer y concentrarse con estabilidad", "Beta・Alerta", "Para trabajo breve, creación y energía", "Gamma・Claridad", "Escucha breve antes de tareas exigentes", "Theta・Respiración", "Para respiración, meditación y momentos de calma", "Delta・Descanso profundo", "Antes de relajarse por la noche y descansar", "Pure Tone・Campana", "Práctica de un solo tono; mantenga el volumen bajo", "Senoidal", "Triangular", "Cuadrada", "Diente de sierra", "Chino tradicional", "Chino simplificado", "Inglés", "Hindi", "Español", "Francés", "Árabe", "Japonés", "Coreano"]),
  fr: makeDictionary(["Langue", "Sons de fréquence et battements binauraux", "Arrêté", "Lire", "Arrêter", "Lecture", "Préréglage de battements binauraux pour une concentration stable", "Préréglage de battements binauraux pour un travail éveillé", "Préréglage de battements binauraux au rythme rapide", "Préréglage de battements binauraux pour une relaxation lente", "Préréglage de modulation d'impulsions lente", "Préréglage de son pur à haute fréquence", "Combinaison de fréquences personnalisée", "Paramètres sonores", "Fréquence de battement", "Hauteur porteuse", "Volume", "Forme d'onde", "Mode", "Battements binauraux", "Modulation d'impulsions", "Son pur", "Minuteur de pratique", "Sans minuteur", "10 minutes", "20 minutes", "30 minutes", "Fond sonore d'ambiance doux", "Volume d'ambiance", "Utilisez un casque et gardez un faible volume ; arrêtez immédiatement en cas d'inconfort. Le texte de scénario sert uniquement à planifier la pratique et ne garantit aucune amélioration de la concentration, de la mémoire, du sommeil ou de la santé.", "Lectures de recherche et limites des preuves", "Voici des revues systématiques sur les battements binauraux et la stimulation auditive. Les résultats dépendent de la fréquence, de la durée d'écoute et du protocole d'étude ; ils ne constituent pas des garanties médicales ou de résultat.", "Méta-analyse d'études sur la cognition, l'anxiété et la douleur ; les résultats étaient associés aux conditions d'écoute.", "Revue systématique sur la mémoire et l'attention ; les résultats restent mitigés et demandent des études plus rigoureuses.", "Revue des recherches sur l'anxiété, le sommeil et la cognition ; un bon point de départ pour aller plus loin.", "Alpha・Apaisement", "Avant la méditation, la lecture et une concentration stable", "Beta・Éveil", "Pour un travail court, la création et l'énergie", "Gamma・Clarté", "Brève écoute avant une tâche exigeante", "Theta・Respiration", "Pour les exercices respiratoires, la méditation et les moments calmes", "Delta・Repos profond", "Avant la détente nocturne et le repos", "Pure Tone・Cloche", "Pratique à son unique ; gardez un faible volume", "Sinusoïdale", "Triangulaire", "Carrée", "Dent de scie", "Chinois traditionnel", "Chinois simplifié", "Anglais", "Hindi", "Espagnol", "Français", "Arabe", "Japonais", "Coréen"]),
  ar: makeDictionary(["اللغة", "أصوات التردد والإيقاعات الثنائية", "متوقف", "تشغيل", "إيقاف", "قيد التشغيل", "إعداد للإيقاعات الثنائية من أجل تركيز ثابت", "إعداد للإيقاعات الثنائية لإيقاع عمل يقظ", "إعداد للإيقاعات الثنائية بإيقاع سريع", "إعداد للإيقاعات الثنائية للاسترخاء البطيء", "إعداد لتعديل النبض البطيء", "إعداد لنغمة نقية عالية التردد", "تركيبة تردد مخصصة", "إعدادات الصوت", "تردد النبض", "درجة الحامل", "مستوى الصوت", "شكل الموجة", "الوضع", "إيقاعات ثنائية", "تعديل النبض", "نغمة نقية", "مؤقت التدريب", "بلا مؤقت", "10 دقائق", "20 دقيقة", "30 دقيقة", "خلفية صوت محيطي هادئة", "مستوى صوت المحيط", "استخدم سماعات الرأس وحافظ على مستوى صوت منخفض؛ توقف فورًا إذا شعرت بعدم الارتياح. نص السيناريو مخصص لتخطيط التدريب فقط ولا يضمن تحسن التركيز أو الذاكرة أو النوم أو أي حالة صحية.", "قراءات بحثية وحدود الأدلة", "فيما يلي مراجعات منهجية للإيقاعات الثنائية والتحفيز السمعي. تعتمد النتائج على التردد ومدة الاستماع وتصميم الدراسة، ولا تمثل ضمانًا طبيًا أو ضمانًا للنتائج.", "تحليل تلوي لدراسات الإدراك والقلق والألم؛ ارتبطت النتائج بظروف الاستماع.", "مراجعة منهجية للذاكرة والانتباه؛ لا تزال النتائج مختلطة وتتطلب دراسات أكثر صرامة.", "مراجعة لأبحاث القلق والنوم والإدراك؛ نقطة بداية مفيدة لمزيد من القراءة.", "Alpha・استقرار", "قبل التأمل والقراءة والتركيز الهادئ", "Beta・يقظة", "للعمل القصير والإبداع وتنشيط الذهن", "Gamma・وضوح", "استماع قصير قبل المهام التي تتطلب تركيزًا", "Theta・تنفس", "لتمارين التنفس والتأمل واللحظات الهادئة", "Delta・راحة عميقة", "قبل الاسترخاء الليلي والراحة الهادئة", "Pure Tone・جرس", "تدريب على نغمة واحدة؛ حافظ على مستوى صوت منخفض", "جيبية", "مثلثية", "مربعة", "سن المنشار", "الصينية التقليدية", "الصينية المبسطة", "الإنجليزية", "الهندية", "الإسبانية", "الفرنسية", "العربية", "اليابانية", "الكورية"]),
};

Object.assign(localizedText.en, { "Alpha・平靜": "Alpha · Calm", "Beta・專注": "Beta · Focus", "Gamma・創造力": "Gamma · Creativity", "Theta・放鬆": "Theta · Relaxation", "Delta・待機": "Delta · Standby" });
Object.assign(localizedText["zh-CN"], { "Alpha・平靜": "Alpha・平静", "Beta・專注": "Beta・专注", "Gamma・創造力": "Gamma・创造力", "Theta・放鬆": "Theta・放松", "Delta・待機": "Delta・待机" });
Object.assign(localizedText.ja, { "Alpha・平靜": "Alpha・穏やか", "Beta・專注": "Beta・集中", "Gamma・創造力": "Gamma・創造性", "Theta・放鬆": "Theta・リラックス", "Delta・待機": "Delta・待機" });
Object.assign(localizedText.ko, { "Alpha・平靜": "Alpha・평온", "Beta・專注": "Beta・집중", "Gamma・創造力": "Gamma・창의성", "Theta・放鬆": "Theta・휴식", "Delta・待機": "Delta・대기" });
Object.assign(localizedText.hi, { "Alpha・平靜": "Alpha・शांति", "Beta・專注": "Beta・एकाग्रता", "Gamma・創造力": "Gamma・रचनात्मकता", "Theta・放鬆": "Theta・विश्राम", "Delta・待機": "Delta・स्टैंडबाय" });
Object.assign(localizedText.es, { "Alpha・平靜": "Alpha・Calma", "Beta・專注": "Beta・Enfoque", "Gamma・創造力": "Gamma・Creatividad", "Theta・放鬆": "Theta・Relajación", "Delta・待機": "Delta・En espera" });
Object.assign(localizedText.fr, { "Alpha・平靜": "Alpha・Calme", "Beta・專注": "Beta・Concentration", "Gamma・創造力": "Gamma・Créativité", "Theta・放鬆": "Theta・Détente", "Delta・待機": "Delta・Veille" });
Object.assign(localizedText.ar, { "Alpha・平靜": "Alpha・هدوء", "Beta・專注": "Beta・تركيز", "Gamma・創造力": "Gamma・إبداع", "Theta・放鬆": "Theta・استرخاء", "Delta・待機": "Delta・استعداد" });

const version110Text = {
  en: { "個人聲音實驗工具": "Personal sound experiment tool", "安靜停頓、整理思緒與個人發想": "Quiet pauses, organizing thoughts, and personal ideation", "閱讀、寫作與短時段工作": "Reading, writing, and short work sessions", "開始創作或任務前的短暫高節奏暖身": "A short, higher-tempo warm-up before creating or starting a task", "逐步放慢節奏與休息前": "Gradually slowing down before a break", "低刺激、最小維持背景": "Low-stimulation, minimal-maintenance background", "單純音色及耳機／左右聲道測試": "A simple tone and headphone left/right channel test", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "Start at a low volume; stop immediately for tinnitus, discomfort, or headache. Do not use headphones while driving, cycling, or when you need to hear your surroundings. Cards describe use situations only; they do not promise brainwave induction or improvements to ability, illness, or sleep.", "研究、安全與使用界限": "Research, safety, and use limits", "腦電圖頻段名稱與雙耳節拍差，是可聽載波音形成的節拍感；卡片是使用情境，不代表能誘發相同腦波，或改善特定能力、疾病或睡眠。": "EEG band names and binaural-beat differences describe a beat sensation formed by audible carrier tones. Cards are use situations, not promises to induce the same brainwaves or improve a particular ability, illness, or sleep.", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "Start at a low volume; stop immediately for tinnitus, discomfort, or headache. Do not use headphones while driving, cycling, or when you need to hear your surroundings.", "研究結果混合，仍需更高品質研究。": "Findings are mixed; higher-quality research is still needed.", "後續探索：": "Future exploration: ", "藍／紫噪音可作為背景遮蔽的實驗方向，不表示療效或功能承諾。": "Blue and purple noise are possible directions for background-masking experiments, not claims of therapeutic effect or function.", "Privacy Policy": "Privacy Policy", "Terms of Service": "Terms of Service", "Version 1.1.0": "Version 1.1.0" },
  "zh-CN": { "個人聲音實驗工具": "个人声音实验工具", "安靜停頓、整理思緒與個人發想": "安静停顿、整理思绪与个人构想", "閱讀、寫作與短時段工作": "阅读、写作与短时段工作", "開始創作或任務前的短暫高節奏暖身": "开始创作或任务前的短暂高节奏热身", "逐步放慢節奏與休息前": "逐步放慢节奏与休息前", "低刺激、最小維持背景": "低刺激、最小维持背景", "單純音色及耳機／左右聲道測試": "单纯音色及耳机／左右声道测试", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "从低音量开始；若有耳鸣、不适或头痛请立即停止。驾驶、骑车或需要察觉环境声时，请勿戴耳机使用。卡片仅为使用情境，不代表诱发脑波或改善能力、疾病或睡眠。", "研究、安全與使用界限": "研究、安全与使用界限", "腦電圖頻段名稱與雙耳節拍差，是可聽載波音形成的節拍感；卡片是使用情境，不代表能誘發相同腦波，或改善特定能力、疾病或睡眠。": "脑电图频段名称与双耳节拍差，是可听载波音形成的节拍感；卡片是使用情境，不代表能诱发相同脑波，或改善特定能力、疾病或睡眠。", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "从低音量开始；若有耳鸣、不适或头痛请立即停止。驾驶、骑车或需要察觉环境声时，请勿戴耳机使用。", "研究結果混合，仍需更高品質研究。": "研究结果混合，仍需更高质量研究。", "後續探索：": "后续探索：", "藍／紫噪音可作為背景遮蔽的實驗方向，不表示療效或功能承諾。": "蓝／紫噪音可作为背景遮蔽的实验方向，不表示疗效或功能承诺。", "Privacy Policy": "隐私政策", "Terms of Service": "服务条款", "Version 1.1.0": "版本 1.1.0" },
  hi: { "個人聲音實驗工具": "व्यक्तिगत ध्वनि प्रयोग उपकरण", "安靜停頓、整理思緒與個人發想": "शांत विराम, विचारों को व्यवस्थित करना और निजी कल्पना", "閱讀、寫作與短時段工作": "पढ़ना, लिखना और छोटे कार्य सत्र", "開始創作或任務前的短暫高節奏暖身": "रचना या कार्य शुरू करने से पहले छोटा तेज़-लय वार्म-अप", "逐步放慢節奏與休息前": "विराम से पहले धीरे-धीरे गति कम करना", "低刺激、最小維持背景": "कम उत्तेजना वाली, न्यूनतम पृष्ठभूमि", "單純音色及耳機／左右聲道測試": "सरल टोन और हेडफ़ोन बाएँ/दाएँ चैनल परीक्षण", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "कम आवाज़ से शुरू करें; कान में घंटी, असुविधा या सिरदर्द हो तो तुरंत रोकें। गाड़ी चलाते, साइकिल चलाते या आसपास की आवाज़ें सुनना जरूरी हो तो हेडफ़ोन न लगाएँ। कार्ड केवल उपयोग स्थितियाँ बताते हैं; वे ब्रेनवेव उत्पन्न करने या क्षमता, बीमारी या नींद सुधारने का वादा नहीं करते।", "研究、安全與使用界限": "अनुसंधान, सुरक्षा और उपयोग की सीमाएँ", "腦電圖頻段名稱與雙耳節拍差，是可聽載波音形成的節拍感；卡片是使用情境，不代表能誘發相同腦波，或改善特定能力、疾病或睡眠。": "EEG बैंड नाम और बाइनॉरल बीट का अंतर सुनाई देने वाले कैरियर टोन से बनी बीट अनुभूति का वर्णन करते हैं। कार्ड उपयोग स्थितियाँ हैं, समान ब्रेनवेव उत्पन्न करने या क्षमता, बीमारी या नींद सुधारने का वादा नहीं।", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "कम आवाज़ से शुरू करें; कान में घंटी, असुविधा या सिरदर्द हो तो तुरंत रोकें। गाड़ी चलाते, साइकिल चलाते या आसपास की आवाज़ें सुनना जरूरी हो तो हेडफ़ोन न लगाएँ।", "研究結果混合，仍需更高品質研究。": "निष्कर्ष मिश्रित हैं; बेहतर गुणवत्ता वाले शोध की अभी भी आवश्यकता है।", "後續探索：": "आगे की खोज: ", "藍／紫噪音可作為背景遮蔽的實驗方向，不表示療效或功能承諾。": "नीला और बैंगनी शोर पृष्ठभूमि-ढकाव प्रयोगों की संभावित दिशा हैं, उपचार या कार्यक्षमता के दावे नहीं।", "Privacy Policy": "गोपनीयता नीति", "Terms of Service": "सेवा की शर्तें", "Version 1.1.0": "संस्करण 1.1.0" },
  es: { "個人聲音實驗工具": "Herramienta personal de experimentación sonora", "安靜停頓、整理思緒與個人發想": "Pausas tranquilas, ordenar ideas e ideación personal", "閱讀、寫作與短時段工作": "Lectura, escritura y sesiones breves de trabajo", "開始創作或任務前的短暫高節奏暖身": "Un breve calentamiento de ritmo más alto antes de crear o iniciar una tarea", "逐步放慢節奏與休息前": "Reducir el ritmo gradualmente antes de un descanso", "低刺激、最小維持背景": "Fondo de baja estimulación y mantenimiento mínimo", "單純音色及耳機／左右聲道測試": "Un tono simple y prueba de auriculares de canal izquierdo/derecho", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "Comience con volumen bajo; deténgase de inmediato si hay tinnitus, molestias o dolor de cabeza. No use auriculares al conducir, ir en bicicleta o cuando necesite oír el entorno. Las tarjetas solo describen situaciones de uso; no prometen inducir ondas cerebrales ni mejorar capacidades, enfermedades o sueño.", "研究、安全與使用界限": "Investigación, seguridad y límites de uso", "腦電圖頻段名稱與雙耳節拍差，是可聽載波音形成的節拍感；卡片是使用情境，不代表能誘發相同腦波，或改善特定能力、疾病或睡眠。": "Los nombres de bandas de EEG y las diferencias de ritmos binaurales describen una sensación de pulso formada por tonos portadores audibles. Las tarjetas son situaciones de uso, no promesas de inducir las mismas ondas cerebrales ni de mejorar una capacidad, enfermedad o sueño.", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "Comience con volumen bajo; deténgase de inmediato si hay tinnitus, molestias o dolor de cabeza. No use auriculares al conducir, ir en bicicleta o cuando necesite oír el entorno.", "研究結果混合，仍需更高品質研究。": "Los resultados son mixtos; aún se necesita investigación de mayor calidad.", "後續探索：": "Exploración futura: ", "藍／紫噪音可作為背景遮蔽的實驗方向，不表示療效或功能承諾。": "El ruido azul y violeta son posibles direcciones para experimentos de enmascaramiento de fondo, no promesas de efecto terapéutico ni función.", "Privacy Policy": "Política de privacidad", "Terms of Service": "Términos de servicio", "Version 1.1.0": "Versión 1.1.0" },
  fr: { "個人聲音實驗工具": "Outil personnel d'expérimentation sonore", "安靜停頓、整理思緒與個人發想": "Pauses calmes, organisation des idées et réflexion personnelle", "閱讀、寫作與短時段工作": "Lecture, écriture et courtes sessions de travail", "開始創作或任務前的短暫高節奏暖身": "Un bref échauffement à rythme plus soutenu avant de créer ou de commencer une tâche", "逐步放慢節奏與休息前": "Ralentir progressivement avant une pause", "低刺激、最小維持背景": "Fond à faible stimulation et entretien minimal", "單純音色及耳機／左右聲道測試": "Un son simple et un test de casque gauche/droite", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "Commencez à faible volume ; arrêtez immédiatement en cas d'acouphènes, d'inconfort ou de maux de tête. N'utilisez pas de casque en conduisant, à vélo ou lorsque vous devez entendre votre environnement. Les cartes décrivent uniquement des situations d'usage ; elles ne promettent pas d'induire des ondes cérébrales ni d'améliorer une capacité, une maladie ou le sommeil.", "研究、安全與使用界限": "Recherche, sécurité et limites d'usage", "腦電圖頻段名稱與雙耳節拍差，是可聽載波音形成的節拍感；卡片是使用情境，不代表能誘發相同腦波，或改善特定能力、疾病或睡眠。": "Les noms de bandes EEG et les écarts de battements binauraux décrivent une sensation de battement formée par des sons porteurs audibles. Les cartes sont des situations d'usage, non des promesses d'induire les mêmes ondes cérébrales ou d'améliorer une capacité, une maladie ou le sommeil.", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "Commencez à faible volume ; arrêtez immédiatement en cas d'acouphènes, d'inconfort ou de maux de tête. N'utilisez pas de casque en conduisant, à vélo ou lorsque vous devez entendre votre environnement.", "研究結果混合，仍需更高品質研究。": "Les résultats sont mitigés ; des recherches de meilleure qualité restent nécessaires.", "後續探索：": "Exploration future : ", "藍／紫噪音可作為背景遮蔽的實驗方向，不表示療效或功能承諾。": "Les bruits bleu et violet sont des pistes possibles pour des expériences de masquage sonore en arrière-plan, pas des promesses d'effet thérapeutique ou de fonction.", "Privacy Policy": "Politique de confidentialité", "Terms of Service": "Conditions d'utilisation", "Version 1.1.0": "Version 1.1.0" },
  ar: { "個人聲音實驗工具": "أداة تجارب صوتية شخصية", "安靜停頓、整理思緒與個人發想": "فترات هادئة لترتيب الأفكار والتفكير الشخصي", "閱讀、寫作與短時段工作": "القراءة والكتابة وجلسات العمل القصيرة", "開始創作或任務前的短暫高節奏暖身": "تهيئة قصيرة بإيقاع أسرع قبل الإبداع أو بدء مهمة", "逐步放慢節奏與休息前": "إبطاء الوتيرة تدريجيًا قبل الاستراحة", "低刺激、最小維持背景": "خلفية منخفضة التحفيز وبأقل تدخل", "單純音色及耳機／左右聲道測試": "نغمة بسيطة واختبار قناتي سماعة الرأس اليمنى واليسرى", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "ابدأ بمستوى صوت منخفض؛ وتوقف فورًا عند طنين الأذن أو الانزعاج أو الصداع. لا تستخدم سماعات الرأس أثناء القيادة أو ركوب الدراجة أو عندما تحتاج إلى سماع محيطك. تصف البطاقات حالات الاستخدام فقط؛ ولا تعد بتحفيز موجات الدماغ أو تحسين القدرة أو المرض أو النوم.", "研究、安全與使用界限": "البحث والسلامة وحدود الاستخدام", "腦電圖頻段名稱與雙耳節拍差，是可聽載波音形成的節拍感；卡片是使用情境，不代表能誘發相同腦波，或改善特定能力、疾病或睡眠。": "تصف أسماء نطاقات تخطيط الدماغ وفروق الإيقاعات الثنائية إحساس نبض يتكون من نغمات حاملة مسموعة. البطاقات هي حالات استخدام، وليست وعودًا بتحفيز موجات الدماغ نفسها أو تحسين قدرة أو مرض أو نوم معين.", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "ابدأ بمستوى صوت منخفض؛ وتوقف فورًا عند طنين الأذن أو الانزعاج أو الصداع. لا تستخدم سماعات الرأس أثناء القيادة أو ركوب الدراجة أو عندما تحتاج إلى سماع محيطك.", "研究結果混合，仍需更高品質研究。": "النتائج مختلطة؛ وما زالت هناك حاجة إلى أبحاث أعلى جودة.", "後續探索：": "استكشاف لاحق: ", "藍／紫噪音可作為背景遮蔽的實驗方向，不表示療效或功能承諾。": "الضجيج الأزرق والبنفسجي اتجاهان محتملان لتجارب حجب الخلفية، وليسا ادعاءً بتأثير علاجي أو وظيفة.", "Privacy Policy": "سياسة الخصوصية", "Terms of Service": "شروط الخدمة", "Version 1.1.0": "الإصدار 1.1.0" },
  ja: { "個人聲音實驗工具": "個人用サウンド実験ツール", "安靜停頓、整理思緒與個人發想": "静かな間を取り、考えを整理し、個人で発想する", "閱讀、寫作與短時段工作": "読書、執筆、短時間の作業", "開始創作或任務前的短暫高節奏暖身": "創作や作業を始める前の短い高テンポのウォームアップ", "逐步放慢節奏與休息前": "休憩前に徐々にペースを落とす", "低刺激、最小維持背景": "低刺激で最小限の維持をする背景", "單純音色及耳機／左右聲道測試": "シンプルな音色とヘッドホン左右チャンネルのテスト", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "低い音量から始め、耳鳴り、不快感、頭痛があれば直ちに停止してください。運転中、自転車走行中、または周囲の音を聞く必要がある場面ではヘッドホンを使用しないでください。カードは利用場面を示すもので、脳波の誘発や能力、病気、睡眠の改善を約束するものではありません。", "研究、安全與使用界限": "研究・安全・利用上の限界", "腦電圖頻段名稱與雙耳節拍差，是可聽載波音形成的節拍感；卡片是使用情境，不代表能誘發相同腦波，或改善特定能力、疾病或睡眠。": "EEGの帯域名とバイノーラルビートの差は、可聴のキャリア音によって生じるうなりの感覚を表します。カードは利用場面であり、同じ脳波を誘発したり、特定の能力、病気、睡眠を改善したりする約束ではありません。", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "低い音量から始め、耳鳴り、不快感、頭痛があれば直ちに停止してください。運転中、自転車走行中、または周囲の音を聞く必要がある場面ではヘッドホンを使用しないでください。", "研究結果混合，仍需更高品質研究。": "研究結果は混在しており、より質の高い研究がなお必要です。", "後續探索：": "今後の探索：", "藍／紫噪音可作為背景遮蔽的實驗方向，不表示療效或功能承諾。": "ブルー／パープルノイズは背景マスキング実験の候補であり、治療効果や機能を約束するものではありません。", "Privacy Policy": "プライバシーポリシー", "Terms of Service": "利用規約", "Version 1.1.0": "バージョン 1.1.0" },
  ko: { "個人聲音實驗工具": "개인 사운드 실험 도구", "安靜停頓、整理思緒與個人發想": "조용히 멈추고 생각을 정리하며 개인적으로 발상하기", "閱讀、寫作與短時段工作": "읽기, 쓰기, 짧은 작업 시간", "開始創作或任務前的短暫高節奏暖身": "창작이나 작업 시작 전 짧은 고템포 워밍업", "逐步放慢節奏與休息前": "휴식 전에 점차 속도 늦추기", "低刺激、最小維持背景": "낮은 자극의 최소 유지 배경", "單純音色及耳機／左右聲道測試": "단순한 음색과 헤드폰 좌우 채널 테스트", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "낮은 볼륨에서 시작하고 이명, 불편함 또는 두통이 있으면 즉시 멈추세요. 운전, 자전거 이용 또는 주변 소리를 들어야 할 때는 헤드폰을 사용하지 마세요. 카드는 사용 상황만 나타내며 뇌파 유도나 능력, 질병 또는 수면 개선을 약속하지 않습니다.", "研究、安全與使用界限": "연구, 안전 및 사용 한계", "腦電圖頻段名稱與雙耳節拍差，是可聽載波音形成的節拍感；卡片是使用情境，不代表能誘發相同腦波，或改善特定能力、疾病或睡眠。": "EEG 대역 이름과 바이노럴 비트 차이는 들을 수 있는 반송파 음이 만드는 비트 감각을 설명합니다. 카드는 사용 상황이며, 같은 뇌파를 유도하거나 특정 능력, 질병 또는 수면을 개선한다는 약속이 아닙니다.", "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "낮은 볼륨에서 시작하고 이명, 불편함 또는 두통이 있으면 즉시 멈추세요. 운전, 자전거 이용 또는 주변 소리를 들어야 할 때는 헤드폰을 사용하지 마세요.", "研究結果混合，仍需更高品質研究。": "연구 결과는 엇갈리며 더 높은 품질의 연구가 필요합니다.", "後續探索：": "향후 탐색: ", "藍／紫噪音可作為背景遮蔽的實驗方向，不表示療效或功能承諾。": "블루/퍼플 노이즈는 배경 마스킹 실험의 가능한 방향이며 치료 효과나 기능을 약속하지 않습니다.", "Privacy Policy": "개인정보 처리방침", "Terms of Service": "서비스 약관", "Version 1.1.0": "버전 1.1.0" },
};

Object.entries(version110Text).forEach(([language, dictionary]) => Object.assign(localizedText[language], dictionary));
const usageSituationAdditions = {
  en: { "安靜停頓、整理思緒與個人發想。適合呼吸練習、短暫停頓、冥想前準備。": "Quiet pauses, organizing thoughts, and personal ideation. Suitable for breathing practice, brief pauses, and preparation before meditation.", "逐步放慢節奏與休息前。適合放鬆練習、靜坐或休息前的過渡時段。": "Gradually slowing down before a break. Suitable for relaxation practice, sitting quietly, or the transition before a rest.", "低刺激、最小維持背景。適合夜間低刺激休息，或希望維持最小背景聲的時段。": "Low-stimulation, minimal-maintenance background. Suitable for low-stimulation rest at night or times when you want to keep minimal background sound." },
  "zh-CN": { "安靜停頓、整理思緒與個人發想。適合呼吸練習、短暫停頓、冥想前準備。": "安静停顿、整理思绪与个人构想。适合呼吸练习、短暂停顿、冥想前准备。", "逐步放慢節奏與休息前。適合放鬆練習、靜坐或休息前的過渡時段。": "逐步放慢节奏与休息前。适合放松练习、静坐或休息前的过渡时段。", "低刺激、最小維持背景。適合夜間低刺激休息，或希望維持最小背景聲的時段。": "低刺激、最小维持背景。适合夜间低刺激休息，或希望维持最小背景声的时段。" },
  hi: { "安靜停頓、整理思緒與個人發想。適合呼吸練習、短暫停頓、冥想前準備。": "शांत विराम, विचारों को व्यवस्थित करना और निजी कल्पना। श्वास अभ्यास, छोटे विराम और ध्यान से पहले की तैयारी के लिए उपयुक्त।", "逐步放慢節奏與休息前。適合放鬆練習、靜坐或休息前的過渡時段。": "विश्राम से पहले धीरे-धीरे गति कम करना। विश्राम अभ्यास, शांत बैठने या आराम से पहले के संक्रमण समय के लिए उपयुक्त।", "低刺激、最小維持背景。適合夜間低刺激休息，或希望維持最小背景聲的時段。": "कम उत्तेजना वाली, न्यूनतम पृष्ठभूमि। रात में कम-उत्तेजना वाले आराम या न्यूनतम पृष्ठभूमि ध्वनि रखने के समय के लिए उपयुक्त।" },
  es: { "安靜停頓、整理思緒與個人發想。適合呼吸練習、短暫停頓、冥想前準備。": "Pausas tranquilas, ordenar ideas e ideación personal. Adecuado para prácticas de respiración, pausas breves y preparación antes de meditar.", "逐步放慢節奏與休息前。適合放鬆練習、靜坐或休息前的過渡時段。": "Reducir el ritmo gradualmente antes de un descanso. Adecuado para prácticas de relajación, sentarse en calma o el periodo de transición antes de descansar.", "低刺激、最小維持背景。適合夜間低刺激休息，或希望維持最小背景聲的時段。": "Fondo de baja estimulación y mantenimiento mínimo. Adecuado para descansar de noche con baja estimulación o cuando se desea mantener un sonido de fondo mínimo." },
  fr: { "安靜停頓、整理思緒與個人發想。適合呼吸練習、短暫停頓、冥想前準備。": "Pauses calmes, organisation des idées et réflexion personnelle. Adapté aux exercices de respiration, aux brèves pauses et à la préparation avant la méditation.", "逐步放慢節奏與休息前。適合放鬆練習、靜坐或休息前的過渡時段。": "Ralentir progressivement avant une pause. Adapté aux exercices de détente, à la position assise calme ou à la transition avant le repos.", "低刺激、最小維持背景。適合夜間低刺激休息，或希望維持最小背景聲的時段。": "Fond à faible stimulation et entretien minimal. Adapté au repos nocturne à faible stimulation ou aux moments où l'on souhaite conserver un fond sonore minimal." },
  ar: { "安靜停頓、整理思緒與個人發想。適合呼吸練習、短暫停頓、冥想前準備。": "فترات هادئة لترتيب الأفكار والتفكير الشخصي. مناسب لتمارين التنفس والتوقفات القصيرة والاستعداد قبل التأمل.", "逐步放慢節奏與休息前。適合放鬆練習、靜坐或休息前的過渡時段。": "إبطاء الوتيرة تدريجيًا قبل الاستراحة. مناسب لتمارين الاسترخاء أو الجلوس بهدوء أو الفترة الانتقالية قبل الراحة.", "低刺激、最小維持背景。適合夜間低刺激休息，或希望維持最小背景聲的時段。": "خلفية منخفضة التحفيز وبأقل تدخل. مناسب للراحة الليلية منخفضة التحفيز أو الأوقات التي تريد فيها الحفاظ على أقل قدر من الصوت الخلفي." },
  ja: { "安靜停頓、整理思緒與個人發想。適合呼吸練習、短暫停頓、冥想前準備。": "静かな間を取り、考えを整理し、個人で発想する。呼吸の練習、短い休止、瞑想前の準備に適しています。", "逐步放慢節奏與休息前。適合放鬆練習、靜坐或休息前的過渡時段。": "休憩前に徐々にペースを落とす。リラックスの練習、静かに座る時間、休む前の移行時間に適しています。", "低刺激、最小維持背景。適合夜間低刺激休息，或希望維持最小背景聲的時段。": "低刺激で最小限の維持をする背景。夜の低刺激な休息や、最小限の背景音を保ちたい時間に適しています。" },
  ko: { "安靜停頓、整理思緒與個人發想。適合呼吸練習、短暫停頓、冥想前準備。": "조용히 멈추고 생각을 정리하며 개인적으로 발상하기. 호흡 연습, 짧은 멈춤, 명상 전 준비에 적합합니다.", "逐步放慢節奏與休息前。適合放鬆練習、靜坐或休息前的過渡時段。": "휴식 전에 점차 속도 늦추기. 이완 연습, 조용히 앉아 있기 또는 쉬기 전 전환 시간에 적합합니다.", "低刺激、最小維持背景。適合夜間低刺激休息，或希望維持最小背景聲的時段。": "낮은 자극의 최소 유지 배경. 밤에 낮은 자극으로 쉬거나 최소한의 배경음을 유지하고 싶은 시간에 적합합니다." },
};

Object.entries(usageSituationAdditions).forEach(([language, dictionary]) => Object.assign(localizedText[language], dictionary));
const finalUsageSituationCopy = {
  en: { "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。": "Quiet pauses and organizing thoughts. Suitable for breathing practice and preparation before meditation.", "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。": "Suitable for mind-body relaxation practice, sitting quietly, and aimless mental downtime.", "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。": "Suitable for slowly and gently reducing outside stimulation and gradually easing awareness into rest." },
  "zh-CN": { "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。": "安静停顿、整理思绪。适合呼吸练习与冥想前准备。", "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。": "适合身心放松练习、静坐、脑袋放空且无特殊目的的情况。", "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。": "适合缓慢温和地降低外界刺激、逐步减少意识进入休息的情况。" },
  hi: { "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。": "शांत विराम और विचारों को व्यवस्थित करना। श्वास अभ्यास और ध्यान से पहले की तैयारी के लिए उपयुक्त।", "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。": "मन-शरीर विश्राम अभ्यास, शांत बैठने और बिना किसी विशेष उद्देश्य के मन को खाली रखने के लिए उपयुक्त।", "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。": "बाहरी उत्तेजना को धीरे और सहजता से कम करने तथा धीरे-धीरे विश्राम में जाने के लिए उपयुक्त।" },
  es: { "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。": "Pausas tranquilas y ordenar ideas. Adecuado para prácticas de respiración y preparación antes de meditar.", "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。": "Adecuado para prácticas de relajación mente-cuerpo, sentarse en calma y desconectar sin un propósito específico.", "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。": "Adecuado para reducir lenta y suavemente los estímulos externos y pasar gradualmente al descanso." },
  fr: { "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。": "Pauses calmes et organisation des idées. Adapté aux exercices de respiration et à la préparation avant la méditation.", "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。": "Adapté aux exercices de détente corps-esprit, à la position assise calme et au fait de laisser l'esprit vagabonder sans but particulier.", "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。": "Adapté pour réduire lentement et en douceur les stimuli extérieurs et glisser progressivement vers le repos." },
  ar: { "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。": "فترات هادئة وترتيب الأفكار. مناسب لتمارين التنفس والاستعداد قبل التأمل.", "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。": "مناسب لتمارين استرخاء الجسد والذهن، والجلوس بهدوء، وإراحة الذهن بلا غرض محدد.", "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。": "مناسب لخفض المثيرات الخارجية ببطء ولطف والانتقال تدريجيًا إلى الراحة." },
  ja: { "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。": "静かに立ち止まり、考えを整理する。呼吸の練習と瞑想前の準備に適しています。", "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。": "心身をゆるめる練習、静かに座ること、特別な目的なく頭を空にする時間に適しています。", "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。": "外からの刺激をゆっくり穏やかに減らし、徐々に休息へ向かう時間に適しています。" },
  ko: { "安靜停頓、整理思緒。適合呼吸練習與冥想前準備。": "조용히 멈추고 생각을 정리하기. 호흡 연습과 명상 전 준비에 적합합니다.", "適合身心放鬆練習、靜坐、腦袋放空無特殊目的情況。": "몸과 마음의 이완 연습, 조용히 앉아 있기, 특별한 목적 없이 머리를 비우는 시간에 적합합니다.", "適合緩慢溫和降低外界刺激、逐步減少意識進入休息的情況。": "외부 자극을 천천히 부드럽게 낮추고 점차 휴식으로 들어가는 시간에 적합합니다." },
};

Object.entries(finalUsageSituationCopy).forEach(([language, dictionary]) => Object.assign(localizedText[language], dictionary));
const gammaUsageSituationCopy = {
  en: { "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。": "A short, higher-tempo warm-up before starting a task, suitable for beginning creative work and shifting between thoughts." },
  "zh-CN": { "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。": "投入任务前的短暂高节奏热身，适合创作启动与思绪切换。" },
  hi: { "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。": "कार्य में लगने से पहले छोटा तेज़-लय वार्म-अप, रचनात्मक काम शुरू करने और विचारों के बीच बदलाव के लिए उपयुक्त।" },
  es: { "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。": "Un breve calentamiento de ritmo más alto antes de iniciar una tarea, adecuado para comenzar a crear y cambiar de ideas." },
  fr: { "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。": "Un bref échauffement à rythme plus soutenu avant de commencer une tâche, adapté au démarrage créatif et aux changements d'idées." },
  ar: { "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。": "تهيئة قصيرة بإيقاع أسرع قبل بدء مهمة، مناسبة لبدء الإبداع والانتقال بين الأفكار." },
  ja: { "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。": "作業に取りかかる前の短い高テンポのウォームアップ。創作の始動や考えの切り替えに適しています。" },
  ko: { "投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。": "작업에 들어가기 전 짧은 고템포 워밍업으로, 창작 시작과 생각 전환에 적합합니다." },
};

Object.entries(gammaUsageSituationCopy).forEach(([language, dictionary]) => Object.assign(localizedText[language], dictionary));
Object.assign(localizedText.en, { "純音": "Pure tone" });
Object.assign(localizedText["zh-CN"], { "純音": "纯音" });
Object.assign(localizedText.hi, { "純音": "शुद्ध टोन" });
Object.assign(localizedText.es, { "純音": "Tono puro" });
Object.assign(localizedText.fr, { "純音": "Son pur" });
Object.assign(localizedText.ar, { "純音": "نغمة نقية" });
Object.assign(localizedText.ja, {
  "純音": "純音",
  "Delta・待機": "Delta・スタンバイ",
  "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。卡片僅為使用情境，不代表誘發腦波或改善能力、疾病或睡眠。": "低い音量から始め、みみなり、不快感、頭の痛みがあれば直ちに停止してください。運転中、自転車走行中、または周囲の音を聞く必要がある場面ではヘッドホンを使用しないでください。カードは利用場面を示すもので、脳波の誘発や能力、病気、睡眠の改善を約束するものではありません。",
  "從低音量開始；若有耳鳴、不適或頭痛請立即停止。駕駛、騎車或需要察覺環境聲時，請勿戴耳機使用。": "低い音量から始め、みみなり、不快感、頭の痛みがあれば直ちに停止してください。運転中、自転車走行中、または周囲の音を聞く必要がある場面ではヘッドホンを使用しないでください。",
  "低い音量から始め、耳鳴り、不快感、頭痛があれば直ちに停止してください。運転中、自転車走行中、または周囲の音を聞く必要がある場面ではヘッドホンを使用しないでください。カードは利用場面を示すもので、脳波の誘発や能力、病気、睡眠の改善を約束するものではありません。": "低い音量から始め、みみなり、不快感、頭の痛みがあれば直ちに停止してください。運転中、自転車走行中、または周囲の音を聞く必要がある場面ではヘッドホンを使用しないでください。カードは利用場面を示すもので、脳波の誘発や能力、病気、睡眠の改善を約束するものではありません。",
  "低い音量から始め、耳鳴り、不快感、頭痛があれば直ちに停止してください。運転中、自転車走行中、または周囲の音を聞く必要がある場面ではヘッドホンを使用しないでください。": "低い音量から始め、みみなり、不快感、頭の痛みがあれば直ちに停止してください。運転中、自転車走行中、または周囲の音を聞く必要がある場面ではヘッドホンを使用しないでください。"
});
Object.assign(localizedText.ko, { "純音": "순음" });
const hemisphericText = {
  "zh-CN": { "左耳頻率": "左耳频率", "右耳頻率": "右耳频率", "需使用耳機；左右聲道分別播放指定頻率。": "需使用耳机；左右声道分别播放指定频率。", "耳機左右聲道的獨立頻率設定": "耳机左右声道的独立频率设置" },
  en: { "左耳頻率": "Left-ear frequency", "右耳頻率": "Right-ear frequency", "需使用耳機；左右聲道分別播放指定頻率。": "Use headphones; each channel plays its assigned frequency.", "耳機左右聲道的獨立頻率設定": "Independent left/right frequencies for headphone channels" },
  hi: { "左耳頻率": "बाएँ कान की आवृत्ति", "右耳頻率": "दाएँ कान की आवृत्ति", "需使用耳機；左右聲道分別播放指定頻率。": "हेडफ़ोन का उपयोग करें; हर चैनल अपनी निर्धारित आवृत्ति बजाता है।", "耳機左右聲道的獨立頻率設定": "हेडफ़ोन चैनलों के लिए स्वतंत्र बाएँ/दाएँ आवृत्तियाँ" },
  es: { "左耳頻率": "Frecuencia del oído izquierdo", "右耳頻率": "Frecuencia del oído derecho", "需使用耳機；左右聲道分別播放指定頻率。": "Use auriculares; cada canal reproduce su frecuencia asignada.", "耳機左右聲道的獨立頻率設定": "Frecuencias izquierda/derecha independientes para canales de auriculares" },
  fr: { "左耳頻率": "Fréquence de l'oreille gauche", "右耳頻率": "Fréquence de l'oreille droite", "需使用耳機；左右聲道分別播放指定頻率。": "Utilisez un casque ; chaque canal lit sa fréquence attribuée.", "耳機左右聲道的獨立頻率設定": "Fréquences gauche/droite indépendantes pour les canaux du casque" },
  ar: { "左耳頻率": "تردد الأذن اليسرى", "右耳頻率": "تردد الأذن اليمنى", "需使用耳機；左右聲道分別播放指定頻率。": "استخدم سماعات الرأس؛ تشغّل كل قناة ترددها المحدد.", "耳機左右聲道的獨立頻率設定": "ترددات مستقلة لليسار/اليمين لقنوات سماعات الرأس" },
  ja: { "左耳頻率": "左耳の周波数", "右耳頻率": "右耳の周波数", "需使用耳機；左右聲道分別播放指定頻率。": "ヘッドホンを使用してください。各チャンネルで指定した周波数を再生します。", "耳機左右聲道的獨立頻率設定": "ヘッドホンの左右チャンネルに独立した周波数を設定" },
  ko: { "左耳頻率": "왼쪽 귀 주파수", "右耳頻率": "오른쪽 귀 주파수", "需使用耳機；左右聲道分別播放指定頻率。": "헤드폰을 사용하세요. 각 채널이 지정한 주파수를 재생합니다.", "耳機左右聲道的獨立頻率設定": "헤드폰 좌우 채널의 독립 주파수 설정" },
};

Object.entries(hemisphericText).forEach(([language, dictionary]) => Object.assign(localizedText[language], dictionary));

const waveformGuideText = {
  "zh-CN": {
    "波形說明": "波形说明",
    "最純、最柔和；幾乎只有基頻，適合作為低刺激起點。": "最纯、最柔和；几乎只有基频，适合作为低刺激起点。",
    "比正弦波明亮一些，仍然溫和；帶有少量奇次泛音。": "比正弦波明亮一些，仍然温和；带有少量奇次泛音。",
    "明顯、尖銳，像電子提示音；奇次泛音很多，刺激感較強。": "明显、尖锐，像电子提示音；奇次泛音很多，刺激感较强。",
    "最明亮、最密集，帶有嗡鳴感；連續泛音很多，較容易刺耳。": "最明亮、最密集，带有嗡鸣感；连续泛音很多，较容易刺耳。",
    "波形會改變泛音結構與聽感，不改變頻率或左右聲道設定。使用 Square 或 Sawtooth 時，請先降低音量。": "波形会改变泛音结构与听感，不改变频率或左右声道设置。使用 Square 或 Sawtooth 时，请先降低音量。"
  },
  en: {
    "波形說明": "Waveform guide",
    "最純、最柔和；幾乎只有基頻，適合作為低刺激起點。": "Purest and softest; almost only the fundamental, suitable as a low-stimulation starting point.",
    "比正弦波明亮一些，仍然溫和；帶有少量奇次泛音。": "A little brighter than sine while still gentle; contains a small amount of odd harmonics.",
    "明顯、尖銳，像電子提示音；奇次泛音很多，刺激感較強。": "Distinct and sharp like an electronic cue; many odd harmonics make it feel more intense.",
    "最明亮、最密集，帶有嗡鳴感；連續泛音很多，較容易刺耳。": "Brightest and densest with a buzz; many continuous harmonics can sound harsh more easily.",
    "波形會改變泛音結構與聽感，不改變頻率或左右聲道設定。使用 Square 或 Sawtooth 時，請先降低音量。": "Waveform changes overtone structure and character, not frequency or left/right channel settings. Lower the volume first with Square or Sawtooth."
  },
  hi: {
    "波形說明": "तरंगरूप मार्गदर्शिका",
    "最純、最柔和；幾乎只有基頻，適合作為低刺激起點。": "सबसे शुद्ध और कोमल; लगभग केवल मूल आवृत्ति, कम-उत्तेजना वाले आरंभ के लिए उपयुक्त।",
    "比正弦波明亮一些，仍然溫和；帶有少量奇次泛音。": "साइन से थोड़ा अधिक चमकीला, फिर भी कोमल; इसमें थोड़ी विषम हार्मोनिक्स होती हैं।",
    "明顯、尖銳，像電子提示音；奇次泛音很多，刺激感較強。": "स्पष्ट और तीखा, इलेक्ट्रॉनिक संकेत जैसा; अधिक विषम हार्मोनिक्स इसे अधिक तीव्र बनाती हैं।",
    "最明亮、最密集，帶有嗡鳴感；連續泛音很多，較容易刺耳。": "सबसे चमकीला और घना, गुनगुनाहट के साथ; बहुत-सी हार्मोनिक्स इसे आसानी से कठोर बना सकती हैं।",
    "波形會改變泛音結構與聽感，不改變頻率或左右聲道設定。使用 Square 或 Sawtooth 時，請先降低音量。": "तरंगरूप हार्मोनिक संरचना और सुनने का अनुभव बदलता है, आवृत्ति या बाएँ/दाएँ चैनल सेटिंग नहीं। Square या Sawtooth में पहले आवाज़ कम करें।"
  },
  es: {
    "波形說明": "Guía de formas de onda",
    "最純、最柔和；幾乎只有基頻，適合作為低刺激起點。": "La más pura y suave; casi solo la frecuencia fundamental, adecuada como punto de partida de baja estimulación.",
    "比正弦波明亮一些，仍然溫和；帶有少量奇次泛音。": "Un poco más brillante que la senoide y aún suave; contiene pocos armónicos impares.",
    "明顯、尖銳，像電子提示音；奇次泛音很多，刺激感較強。": "Marcada y aguda, como una señal electrónica; muchos armónicos impares la hacen más intensa.",
    "最明亮、最密集，帶有嗡鳴感；連續泛音很多，較容易刺耳。": "La más brillante y densa, con un zumbido; muchos armónicos continuos pueden resultar ásperos.",
    "波形會改變泛音結構與聽感，不改變頻率或左右聲道設定。使用 Square 或 Sawtooth 時，請先降低音量。": "La forma de onda cambia los armónicos y el carácter, no la frecuencia ni los canales izquierdo/derecho. Baje primero el volumen con Square o Sawtooth."
  },
  fr: {
    "波形說明": "Guide des formes d’onde",
    "最純、最柔和；幾乎只有基頻，適合作為低刺激起點。": "La plus pure et la plus douce ; presque uniquement la fréquence fondamentale, adaptée à un départ peu stimulant.",
    "比正弦波明亮一些，仍然溫和；帶有少量奇次泛音。": "Un peu plus brillante que la sinusoïde tout en restant douce ; contient quelques harmoniques impaires.",
    "明顯、尖銳，像電子提示音；奇次泛音很多，刺激感較強。": "Nette et aiguë, comme un signal électronique ; ses nombreuses harmoniques impaires la rendent plus intense.",
    "最明亮、最密集，帶有嗡鳴感；連續泛音很多，較容易刺耳。": "La plus brillante et la plus dense, avec un bourdonnement ; ses nombreuses harmoniques peuvent plus facilement être agressives.",
    "波形會改變泛音結構與聽感，不改變頻率或左右聲道設定。使用 Square 或 Sawtooth 時，請先降低音量。": "La forme d’onde modifie les harmoniques et le caractère, pas la fréquence ni les réglages gauche/droite. Réduisez d’abord le volume avec Square ou Sawtooth."
  },
  ar: {
    "波形說明": "دليل شكل الموجة",
    "最純、最柔和；幾乎只有基頻，適合作為低刺激起點。": "الأكثر نقاءً ولطفًا؛ يكاد يقتصر على التردد الأساسي، ومناسب كبداية منخفضة التحفيز.",
    "比正弦波明亮一些，仍然溫和；帶有少量奇次泛音。": "أكثر سطوعًا قليلًا من الموجة الجيبية مع بقائه لطيفًا؛ يتضمن قدرًا صغيرًا من التوافقيات الفردية.",
    "明顯、尖銳，像電子提示音；奇次泛音很多，刺激感較強。": "واضح وحاد كتنبيه إلكتروني؛ كثرة التوافقيات الفردية تجعله أشد إحساسًا.",
    "最明亮、最密集，帶有嗡鳴感；連續泛音很多，較容易刺耳。": "الأكثر سطوعًا وكثافة مع طنين؛ كثرة التوافقيات قد تجعله حادًا على الأذن بسهولة.",
    "波形會改變泛音結構與聽感，不改變頻率或左右聲道設定。使用 Square 或 Sawtooth 時，請先降低音量。": "يغيّر شكل الموجة بنية التوافقيات وطابع الصوت، لا التردد أو إعدادات القناتين اليمنى واليسرى. اخفض مستوى الصوت أولًا مع Square أو Sawtooth."
  },
  ja: {
    "波形說明": "波形ガイド",
    "最純、最柔和；幾乎只有基頻，適合作為低刺激起點。": "最も純粋で柔らかく、ほぼ基本周波数だけです。低刺激で始めるのに適しています。",
    "比正弦波明亮一些，仍然溫和；帶有少量奇次泛音。": "サイン波より少し明るく、なお穏やかです。少量の奇数次倍音を含みます。",
    "明顯、尖銳，像電子提示音；奇次泛音很多，刺激感較強。": "電子的な通知音のように明瞭で鋭く、多くの奇数次倍音により刺激感が強めです。",
    "最明亮、最密集，帶有嗡鳴感；連續泛音很多，較容易刺耳。": "最も明るく密度が高く、うなりを伴います。多くの連続した倍音により耳に強く感じやすいです。",
    "波形會改變泛音結構與聽感，不改變頻率或左右聲道設定。使用 Square 或 Sawtooth 時，請先降低音量。": "波形は倍音構造と聴感を変えますが、周波数や左右チャンネル設定は変えません。Square または Sawtooth では、まず音量を下げてください。"
  },
  ko: {
    "波形說明": "파형 안내",
    "最純、最柔和；幾乎只有基頻，適合作為低刺激起點。": "가장 순수하고 부드러우며, 거의 기본 주파수만 포함합니다. 낮은 자극으로 시작하기에 적합합니다.",
    "比正弦波明亮一些，仍然溫和；帶有少量奇次泛音。": "사인파보다 조금 더 밝지만 여전히 부드럽고, 적은 양의 홀수 배음을 포함합니다.",
    "明顯、尖銳，像電子提示音；奇次泛音很多，刺激感較強。": "전자 알림음처럼 뚜렷하고 날카로우며, 많은 홀수 배음으로 더 강하게 느껴집니다.",
    "最明亮、最密集，帶有嗡鳴感；連續泛音很多，較容易刺耳。": "가장 밝고 밀도가 높으며 웅웅거림이 있습니다. 많은 연속 배음 때문에 쉽게 거칠게 들릴 수 있습니다.",
    "波形會改變泛音結構與聽感，不改變頻率或左右聲道設定。使用 Square 或 Sawtooth 時，請先降低音量。": "파형은 배음 구조와 청감을 바꾸지만 주파수나 좌우 채널 설정은 바꾸지 않습니다. Square 또는 Sawtooth에서는 먼저 볼륨을 낮추세요."
  },
};

Object.entries(waveformGuideText).forEach(([language, dictionary]) => Object.assign(localizedText[language], dictionary));

const hemiGuideText = {
  "zh-CN": {
    "雙腦同步": "双脑同步", "左耳頻率數值": "左耳频率数值", "右耳頻率數值": "右耳频率数值", "雙腦同步與雙耳節拍": "双脑同步与双耳节拍",
    "Hemi-Sync® 是 Monroe Institute 脈絡中的音訊技術名稱；本工具不是 Hemi-Sync® 產品、服務或授權技術。": "Hemi-Sync® 是 Monroe Institute 脉络中的音频技术名称；本工具不是 Hemi-Sync® 产品、服务或授权技术。",
    "本模式透過耳機將 100 Hz 純音送至右耳、104 Hz 純音送至左耳；4 Hz 頻差可形成雙耳節拍感。": "本模式通过耳机将 100 Hz 纯音送至右耳、104 Hz 纯音送至左耳；4 Hz 频差可形成双耳节拍感。",
    "4 Hz 落在常見 Theta 標示範圍（4–8 Hz），但雙耳節拍是否能使腦波同步或帶來放鬆、專注、學習、記憶、睡眠或健康效果，研究結果仍混合，非醫療或效果保證。": "4 Hz 落在常见 Theta 标示范围（4–8 Hz），但双耳节拍是否能使脑波同步或带来放松、专注、学习、记忆、睡眠或健康效果，研究结果仍混合，非医疗或效果保证。",
    "Monroe Institute：Hemi-Sync 與聲音技術沿革": "Monroe Institute：Hemi-Sync 与声音技术沿革", "雙耳節拍腦波同步系統性回顧": "双耳节拍脑波同步系统性回顾"
  },
  en: {
    "雙腦同步": "Hemispheric synchronization", "左耳頻率數值": "Left-ear frequency value", "右耳頻率數值": "Right-ear frequency value", "雙腦同步與雙耳節拍": "Hemispheric synchronization and binaural beats",
    "Hemi-Sync® 是 Monroe Institute 脈絡中的音訊技術名稱；本工具不是 Hemi-Sync® 產品、服務或授權技術。": "Hemi-Sync® is an audio-technology name in the Monroe Institute context; this tool is not a Hemi-Sync® product, service, or licensed technology.",
    "本模式透過耳機將 100 Hz 純音送至右耳、104 Hz 純音送至左耳；4 Hz 頻差可形成雙耳節拍感。": "With headphones, this mode sends a 100 Hz pure tone to the right ear and a 104 Hz tone to the left; the 4 Hz difference can create a binaural-beat percept.",
    "4 Hz 落在常見 Theta 標示範圍（4–8 Hz），但雙耳節拍是否能使腦波同步或帶來放鬆、專注、學習、記憶、睡眠或健康效果，研究結果仍混合，非醫療或效果保證。": "4 Hz falls in the commonly labelled theta range (4–8 Hz), but evidence that binaural beats synchronize brainwaves or improve relaxation, focus, learning, memory, sleep, or health remains mixed. This is not medical or outcome assurance.",
    "Monroe Institute：Hemi-Sync 與聲音技術沿革": "Monroe Institute: Hemi-Sync and sound-technology history", "雙耳節拍腦波同步系統性回顧": "Systematic review of binaural beats and brainwave synchronization"
  },
  hi: { "雙腦同步": "गोलार्ध समकालिकता", "左耳頻率數值": "बाएँ कान की आवृत्ति मान", "右耳頻率數值": "दाएँ कान की आवृत्ति मान", "雙腦同步與雙耳節拍": "गोलार्ध समकालिकता और बाइनॉरल बीट्स", "Hemi-Sync® 是 Monroe Institute 脈絡中的音訊技術名稱；本工具不是 Hemi-Sync® 產品、服務或授權技術。": "Hemi-Sync® Monroe Institute के संदर्भ में एक ऑडियो-प्रौद्योगिकी नाम है; यह उपकरण Hemi-Sync® उत्पाद, सेवा या लाइसेंस प्राप्त तकनीक नहीं है।", "本模式透過耳機將 100 Hz 純音送至右耳、104 Hz 純音送至左耳；4 Hz 頻差可形成雙耳節拍感。": "हेडफ़ोन के साथ यह मोड दाएँ कान में 100 Hz और बाएँ कान में 104 Hz शुद्ध टोन भेजता है; 4 Hz का अंतर बाइनॉरल बीट का आभास दे सकता है।", "4 Hz 落在常見 Theta 標示範圍（4–8 Hz），但雙耳節拍是否能使腦波同步或帶來放鬆、專注、學習、記憶、睡眠或健康效果，研究結果仍混合，非醫療或效果保證。": "4 Hz सामान्य थीटा सीमा (4–8 Hz) में है, लेकिन बाइनॉरल बीट्स से मस्तिष्क तरंगों का समकालिक होना या आराम, ध्यान, सीखने, स्मृति, नींद या स्वास्थ्य में लाभ के प्रमाण मिश्रित हैं। यह चिकित्सा या परिणाम की गारंटी नहीं है।", "Monroe Institute：Hemi-Sync 與聲音技術沿革": "Monroe Institute: Hemi-Sync और ध्वनि-तकनीक इतिहास", "雙耳節拍腦波同步系統性回顧": "बाइनॉरल बीट्स और मस्तिष्क तरंगों की व्यवस्थित समीक्षा" },
  es: { "雙腦同步": "Sincronización hemisférica", "左耳頻率數值": "Valor de frecuencia del oído izquierdo", "右耳頻率數值": "Valor de frecuencia del oído derecho", "雙腦同步與雙耳節拍": "Sincronización hemisférica y ritmos binaurales", "Hemi-Sync® 是 Monroe Institute 脈絡中的音訊技術名稱；本工具不是 Hemi-Sync® 產品、服務或授權技術。": "Hemi-Sync® es un nombre de tecnología de audio en el contexto del Monroe Institute; esta herramienta no es un producto, servicio ni tecnología autorizada de Hemi-Sync®.", "本模式透過耳機將 100 Hz 純音送至右耳、104 Hz 純音送至左耳；4 Hz 頻差可形成雙耳節拍感。": "Con auriculares, este modo envía un tono puro de 100 Hz al oído derecho y uno de 104 Hz al izquierdo; la diferencia de 4 Hz puede crear la percepción de un ritmo binaural.", "4 Hz 落在常見 Theta 標示範圍（4–8 Hz），但雙耳節拍是否能使腦波同步或帶來放鬆、專注、學習、記憶、睡眠或健康效果，研究結果仍混合，非醫療或效果保證。": "4 Hz está en el rango theta habitualmente etiquetado (4–8 Hz), pero la evidencia sobre sincronización cerebral o beneficios para relajación, concentración, aprendizaje, memoria, sueño o salud sigue siendo mixta. No es una garantía médica ni de resultados.", "Monroe Institute：Hemi-Sync 與聲音技術沿革": "Monroe Institute: historia de Hemi-Sync y tecnología de sonido", "雙耳節拍腦波同步系統性回顧": "Revisión sistemática sobre ritmos binaurales y sincronización cerebral" },
  fr: { "雙腦同步": "Synchronisation hémisphérique", "左耳頻率數值": "Valeur de fréquence de l’oreille gauche", "右耳頻率數值": "Valeur de fréquence de l’oreille droite", "雙腦同步與雙耳節拍": "Synchronisation hémisphérique et battements binauraux", "Hemi-Sync® 是 Monroe Institute 脈絡中的音訊技術名稱；本工具不是 Hemi-Sync® 產品、服務或授權技術。": "Hemi-Sync® est un nom de technologie audio dans le contexte du Monroe Institute ; cet outil n’est ni un produit, ni un service, ni une technologie autorisée Hemi-Sync®.", "本模式透過耳機將 100 Hz 純音送至右耳、104 Hz 純音送至左耳；4 Hz 頻差可形成雙耳節拍感。": "Avec un casque, ce mode envoie un son pur de 100 Hz à l’oreille droite et de 104 Hz à l’oreille gauche ; l’écart de 4 Hz peut créer la perception d’un battement binaural.", "4 Hz 落在常見 Theta 標示範圍（4–8 Hz），但雙耳節拍是否能使腦波同步或帶來放鬆、專注、學習、記憶、睡眠或健康效果，研究結果仍混合，非醫療或效果保證。": "4 Hz se situe dans la plage thêta couramment indiquée (4–8 Hz), mais les données sur la synchronisation cérébrale ou les effets sur la détente, l’attention, l’apprentissage, la mémoire, le sommeil ou la santé restent mitigées. Il ne s’agit pas d’une garantie médicale ou de résultat.", "Monroe Institute：Hemi-Sync 與聲音技術沿革": "Monroe Institute : histoire de Hemi-Sync et des technologies sonores", "雙耳節拍腦波同步系統性回顧": "Revue systématique des battements binauraux et de la synchronisation cérébrale" },
  ar: { "雙腦同步": "التزامن النصفي", "左耳頻率數值": "قيمة تردد الأذن اليسرى", "右耳頻率數值": "قيمة تردد الأذن اليمنى", "雙腦同步與雙耳節拍": "التزامن النصفي والنبضات ثنائية الأذن", "Hemi-Sync® 是 Monroe Institute 脈絡中的音訊技術名稱；本工具不是 Hemi-Sync® 產品、服務或授權技術。": "Hemi-Sync® اسم لتقنية صوتية في سياق Monroe Institute؛ هذه الأداة ليست منتج Hemi-Sync® أو خدمته أو تقنية مرخصة منه.", "本模式透過耳機將 100 Hz 純音送至右耳、104 Hz 純音送至左耳；4 Hz 頻差可形成雙耳節拍感。": "باستخدام سماعات الرأس، يرسل هذا الوضع نغمة نقية 100 هرتز إلى الأذن اليمنى و104 هرتز إلى اليسرى؛ وقد يصنع فرق 4 هرتز إدراكًا لنبضة ثنائية الأذن.", "4 Hz 落在常見 Theta 標示範圍（4–8 Hz），但雙耳節拍是否能使腦波同步或帶來放鬆、專注、學習、記憶、睡眠或健康效果，研究結果仍混合，非醫療或效果保證。": "يقع 4 هرتز ضمن نطاق ثيتا الشائع (4–8 هرتز)، لكن الأدلة على مزامنة موجات الدماغ أو تحسين الاسترخاء أو التركيز أو التعلم أو الذاكرة أو النوم أو الصحة ما تزال متباينة. هذا ليس ضمانًا طبيًا أو للنتائج.", "Monroe Institute：Hemi-Sync 與聲音技術沿革": "Monroe Institute: تاريخ Hemi-Sync وتقنية الصوت", "雙耳節拍腦波同步系統性回顧": "مراجعة منهجية للنبضات ثنائية الأذن وتزامن موجات الدماغ" },
  ja: { "雙腦同步": "両半球同期", "左耳頻率數值": "左耳周波数の数値", "右耳頻率數值": "右耳周波数の数値", "雙腦同步與雙耳節拍": "両半球同期とバイノーラルビート", "Hemi-Sync® 是 Monroe Institute 脈絡中的音訊技術名稱；本工具不是 Hemi-Sync® 產品、服務或授權技術。": "Hemi-Sync® はMonroe Instituteの文脈における音響技術名です。このツールはHemi-Sync®の製品、サービス、またはライセンス技術ではありません。", "本模式透過耳機將 100 Hz 純音送至右耳、104 Hz 純音送至左耳；4 Hz 頻差可形成雙耳節拍感。": "ヘッドホン使用時、このモードは右耳に100 Hz、左耳に104 Hzの純音を送ります。4 Hzの差によりバイノーラルビートの知覚が生じることがあります。", "4 Hz 落在常見 Theta 標示範圍（4–8 Hz），但雙耳節拍是否能使腦波同步或帶來放鬆、專注、學習、記憶、睡眠或健康效果，研究結果仍混合，非醫療或效果保證。": "4 Hzは一般的なシータ帯域（4–8 Hz）に入りますが、脳波同期やリラックス、集中、学習、記憶、睡眠、健康への効果に関する研究結果は一貫していません。医療的または結果の保証ではありません。", "Monroe Institute：Hemi-Sync 與聲音技術沿革": "Monroe Institute：Hemi-Syncと音響技術の沿革", "雙耳節拍腦波同步系統性回顧": "バイノーラルビートと脳波同期の系統的レビュー" },
  ko: { "雙腦同步": "반구 동기화", "左耳頻率數值": "왼쪽 귀 주파수 값", "右耳頻率數值": "오른쪽 귀 주파수 값", "雙腦同步與雙耳節拍": "반구 동기화와 바이노럴 비트", "Hemi-Sync® 是 Monroe Institute 脈絡中的音訊技術名稱；本工具不是 Hemi-Sync® 產品、服務或授權技術。": "Hemi-Sync®는 Monroe Institute 맥락의 오디오 기술 명칭입니다. 이 도구는 Hemi-Sync® 제품, 서비스 또는 라이선스 기술이 아닙니다.", "本模式透過耳機將 100 Hz 純音送至右耳、104 Hz 純音送至左耳；4 Hz 頻差可形成雙耳節拍感。": "헤드폰 사용 시 이 모드는 오른쪽 귀에 100 Hz 순음을, 왼쪽 귀에 104 Hz 순음을 보냅니다. 4 Hz 차이는 바이노럴 비트 지각을 만들 수 있습니다.", "4 Hz 落在常見 Theta 標示範圍（4–8 Hz），但雙耳節拍是否能使腦波同步或帶來放鬆、專注、學習、記憶、睡眠或健康效果，研究結果仍混合，非醫療或效果保證。": "4 Hz는 일반적으로 표기되는 세타 범위(4–8 Hz)에 속하지만, 뇌파 동기화나 이완, 집중, 학습, 기억, 수면, 건강 효과에 관한 연구 결과는 엇갈립니다. 의료적 또는 결과 보장이 아닙니다.", "Monroe Institute：Hemi-Sync 與聲音技術沿革": "Monroe Institute: Hemi-Sync 및 음향 기술 역사", "雙耳節拍腦波同步系統性回顧": "바이노럴 비트와 뇌파 동기화 체계적 문헌고찰" },
};

Object.entries(hemiGuideText).forEach(([language, dictionary]) => Object.assign(localizedText[language], dictionary));

const originalTextNodes = new WeakMap();

function translate(source) {
  return localizedText[nodes.languageSelect.value]?.[source] || source;
}

function translatePage(languageKey) {
  const dictionary = localizedText[languageKey] || {};
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const source = originalTextNodes.get(node) || node.nodeValue.trim();
    if (!source) continue;
    originalTextNodes.set(node, source);
    node.nodeValue = dictionary[source] || (source.startsWith("：") ? `: ${dictionary[source.slice(1)] || source.slice(1)}` : source);
  }

  document.title = languages[languageKey].title;
  document.querySelector(".sound-console").setAttribute("aria-label", translate("聲音參數"));
  document.querySelector(".player").setAttribute("aria-label", translate("模式"));
  document.querySelector(".preset-grid").setAttribute("aria-label", languages[languageKey].title);
  document.querySelector(".segments").setAttribute("aria-label", translate("模式"));
  document.querySelector(".waveform-guide").setAttribute("aria-label", translate("波形說明"));
  document.querySelector(".hemi-guide").setAttribute("aria-label", translate("雙腦同步與雙耳節拍"));
  document.querySelector(".research-panel").setAttribute("aria-label", translate("研究、安全與使用界限"));
  nodes.languageSelect.setAttribute("aria-label", translate("語言"));
  nodes.leftOutput.setAttribute("aria-label", translate("左耳頻率數值"));
  nodes.rightOutput.setAttribute("aria-label", translate("右耳頻率數值"));
}

const state = {
  audioContext: null,
  masterGain: null,
  activeNodes: [],
  mode: "binaural",
  currentPreset: "alpha",
  playing: false,
  timerId: null,
  endsAt: null,
  wakeLock: null,
  wakeLockRequest: null,
};

function formatHz(value) {
  const number = Number(value);
  return Number.isInteger(number) ? String(number) : number.toFixed(1);
}

function setActiveButton(buttons, attr, value) {
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset[attr] === value);
  });
}

function savePresetOrder() {
  localStorage.setItem("frequency-studio-preset-order", JSON.stringify(nodes.presetCards.map((card) => card.dataset.presetCard)));
}

function updateSortControls() {
  const labels = sortLabels[nodes.languageSelect.value];
  nodes.presetCards.forEach((card) => {
    card.setAttribute("aria-label", labels.sort);
    card.querySelector(".drag-handle").setAttribute("aria-label", labels.handle);
  });
}

function saveCardPosition(card, target, clientY) {
  if (!target || card === target) return;
  const after = clientY > target.getBoundingClientRect().top + target.offsetHeight / 2;
  target.parentElement.insertBefore(card, after ? target.nextElementSibling : target);
  nodes.presetCards = Array.from(document.querySelectorAll("[data-preset-card]"));
  savePresetOrder();
  updateSortControls();
}

function setupPresetSorting() {
  const grid = document.querySelector(".preset-grid");
  nodes.presets.forEach((preset) => {
    const card = document.createElement("div");
    card.className = "preset-card";
    card.dataset.presetCard = preset.dataset.preset;
    card.draggable = true;
    const handle = document.createElement("span");
    handle.className = "drag-handle";
    handle.setAttribute("role", "img");
    handle.textContent = "⠿";
    preset.parentElement.replaceChild(card, preset);
    card.append(handle, preset);
    card.addEventListener("dragstart", () => card.classList.add("dragging"));
    card.addEventListener("dragend", () => card.classList.remove("dragging"));
    card.addEventListener("dragover", (event) => {
      event.preventDefault();
      card.classList.add("drop-target");
    });
    card.addEventListener("dragleave", () => card.classList.remove("drop-target"));
    card.addEventListener("drop", (event) => {
      event.preventDefault();
      const dragging = grid.querySelector(".dragging");
      card.classList.remove("drop-target");
      saveCardPosition(dragging, card, event.clientY);
    });
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      card.classList.add("dragging");
      handle.setPointerCapture(event.pointerId);
      const move = (moveEvent) => {
        const target = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY)?.closest("[data-preset-card]");
        nodes.presetCards.forEach((item) => item.classList.toggle("drop-target", item === target && item !== card));
      };
      const finish = (upEvent) => {
        const target = document.elementFromPoint(upEvent.clientX, upEvent.clientY)?.closest("[data-preset-card]");
        nodes.presetCards.forEach((item) => item.classList.remove("drop-target"));
        card.classList.remove("dragging");
        saveCardPosition(card, target, upEvent.clientY);
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", finish);
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", finish);
    });
  });

  nodes.presetCards = Array.from(document.querySelectorAll("[data-preset-card]"));
  const savedOrder = JSON.parse(localStorage.getItem("frequency-studio-preset-order") || "[]");
  if (savedOrder.length === nodes.presetCards.length && savedOrder.every((key) => nodes.presetCards.some((card) => card.dataset.presetCard === key))) {
    savedOrder.forEach((key) => grid.append(document.querySelector(`[data-preset-card="${key}"]`)));
    nodes.presetCards = Array.from(document.querySelectorAll("[data-preset-card]"));
  }
  updateSortControls();
}

function updateOutputs() {
  const beat = Number(nodes.beatFrequency.value);
  const carrier = Number(nodes.carrierFrequency.value);
  const left = Number(nodes.leftFrequency.value);
  const right = Number(nodes.rightFrequency.value);
  const volumePercent = Math.round((Number(nodes.volume.value) / 0.4) * 100);

  nodes.beatOutput.textContent = `${formatHz(beat)} Hz`;
  nodes.carrierOutput.textContent = `${formatHz(carrier)} Hz`;
  nodes.leftOutput.value = formatHz(left);
  nodes.rightOutput.value = formatHz(right);
  nodes.volumeOutput.textContent = `${volumePercent}%`;
  nodes.beatValue.textContent = state.mode === "tone" ? formatHz(carrier) : state.mode === "hemispheric" ? `${formatHz(left)} / ${formatHz(right)}` : formatHz(beat);

  if (state.audioContext && state.masterGain) {
    state.masterGain.gain.setTargetAtTime(Number(nodes.volume.value), state.audioContext.currentTime, 0.03);
  }
}

function updateTimerLabel() {
  if (!state.endsAt) {
    nodes.timerOutput.textContent = nodes.timerDuration.value === "0" ? translate("不計時") : nodes.timerDuration.options[nodes.timerDuration.selectedIndex].text;
    return;
  }
  const seconds = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
  nodes.timerOutput.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function updatePresetLabel(presetKey) {
  const preset = presets[presetKey];
  nodes.bandName.textContent = preset.name;
  nodes.bandDescription.textContent = translate(preset.description);
  setActiveButton(nodes.presets, "preset", presetKey);
}

function updateMode(mode, fromPreset = false) {
  state.mode = mode;
  setActiveButton(nodes.modes, "mode", mode);
  nodes.beatFrequency.disabled = mode === "tone" || mode === "hemispheric";
  nodes.carrierFrequency.disabled = mode === "hemispheric";
  nodes.hemisphericControls.hidden = mode !== "hemispheric";
  nodes.hemisphericNote.hidden = mode !== "hemispheric";
  if (mode === "hemispheric" && !fromPreset) {
    state.currentPreset = "custom";
    setActiveButton(nodes.presets, "preset", "");
    nodes.bandName.textContent = translate("雙腦同步");
    nodes.bandDescription.textContent = translate("耳機左右聲道的獨立頻率設定");
  }
  updateOutputs();

  if (state.playing) {
    restartSound();
  }
}

function applyPreset(presetKey) {
  const preset = presets[presetKey];
  state.currentPreset = presetKey;
  nodes.beatFrequency.value = Math.min(preset.beat, Number(nodes.beatFrequency.max));
  nodes.carrierFrequency.value = preset.carrier;
  updatePresetLabel(presetKey);
  updateMode(preset.mode, true);

  if (state.playing) {
    restartSound();
  }
}

function ensureAudioContext() {
  if (!state.audioContext) {
    state.audioContext = new AudioContext();
    state.masterGain = state.audioContext.createGain();
    state.masterGain.gain.value = Number(nodes.volume.value);
    state.masterGain.connect(state.audioContext.destination);
  }

  return state.audioContext;
}

function trackNode(node) {
  state.activeNodes.push(node);
  return node;
}

function createOscillator(frequency, destination) {
  const context = state.audioContext;
  const oscillator = trackNode(context.createOscillator());
  oscillator.type = nodes.waveform.value;
  oscillator.frequency.value = frequency;
  oscillator.connect(destination);
  oscillator.start();
  return oscillator;
}

function playBinaural() {
  const context = state.audioContext;
  const beat = Number(nodes.beatFrequency.value);
  const carrier = Number(nodes.carrierFrequency.value);
  const merger = trackNode(context.createChannelMerger(2));
  const leftGain = trackNode(context.createGain());
  const rightGain = trackNode(context.createGain());

  leftGain.gain.value = 0.5;
  rightGain.gain.value = 0.5;
  leftGain.connect(merger, 0, 0);
  rightGain.connect(merger, 0, 1);
  merger.connect(state.masterGain);

  createOscillator(carrier, leftGain);
  createOscillator(carrier + beat, rightGain);
}

function playHemispheric() {
  const context = state.audioContext;
  const merger = trackNode(context.createChannelMerger(2));
  const leftGain = trackNode(context.createGain());
  const rightGain = trackNode(context.createGain());

  leftGain.gain.value = 0.5;
  rightGain.gain.value = 0.5;
  leftGain.connect(merger, 0, 0);
  rightGain.connect(merger, 0, 1);
  merger.connect(state.masterGain);

  createOscillator(Number(nodes.leftFrequency.value), leftGain);
  createOscillator(Number(nodes.rightFrequency.value), rightGain);
}

function playPulse() {
  const context = state.audioContext;
  const carrierGain = trackNode(context.createGain());
  const pulseGain = trackNode(context.createGain());
  const modulator = trackNode(context.createOscillator());
  const modulatorDepth = trackNode(context.createGain());

  carrierGain.gain.value = 0.72;
  pulseGain.gain.value = 0.35;
  modulator.type = "sine";
  modulator.frequency.value = Number(nodes.beatFrequency.value);
  modulatorDepth.gain.value = 0.32;
  modulator.connect(modulatorDepth);
  modulatorDepth.connect(carrierGain.gain);
  carrierGain.connect(pulseGain);
  pulseGain.connect(state.masterGain);
  modulator.start();

  createOscillator(Number(nodes.carrierFrequency.value), carrierGain);
}

function playTone() {
  const toneGain = trackNode(state.audioContext.createGain());
  toneGain.gain.value = 0.58;
  toneGain.connect(state.masterGain);
  createOscillator(Number(nodes.carrierFrequency.value), toneGain);
}

function clearTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.endsAt = null;
  updateTimerLabel();
}

function startTimer() {
  clearTimer();
  const duration = Number(nodes.timerDuration.value);
  if (!duration) return;
  state.endsAt = Date.now() + duration * 1000;
  updateTimerLabel();
  state.timerId = setInterval(() => {
    updateTimerLabel();
    if (Date.now() >= state.endsAt) {
      clearTimer();
      if (state.masterGain) state.masterGain.gain.linearRampToValueAtTime(0.0001, state.audioContext.currentTime + 2);
      window.setTimeout(stopSound, 2100);
    }
  }, 1000);
}

function updatePlaybackButtons() {
  nodes.playButton.classList.toggle("is-active", state.playing);
  nodes.stopButton.classList.toggle("is-active", !state.playing);
  nodes.playButton.setAttribute("aria-pressed", String(state.playing));
  nodes.stopButton.setAttribute("aria-pressed", String(!state.playing));
}

async function requestWakeLock() {
  if (!("wakeLock" in navigator) || document.visibilityState !== "visible" || state.wakeLock || state.wakeLockRequest) return;

  try {
    state.wakeLockRequest = navigator.wakeLock.request("screen");
    const wakeLock = await state.wakeLockRequest;
    if (!state.playing) {
      await wakeLock.release();
      return;
    }
    state.wakeLock = wakeLock;
    wakeLock.addEventListener("release", () => {
      if (state.wakeLock === wakeLock) state.wakeLock = null;
    });
  } catch {
    // The browser or operating system may deny wake locks in power-saving states.
  } finally {
    state.wakeLockRequest = null;
  }
}

async function releaseWakeLock() {
  const wakeLock = state.wakeLock;
  state.wakeLock = null;
  if (!wakeLock) return;

  try {
    await wakeLock.release();
  } catch {
    // The lock may already have been released by the system.
  }
}

function stopSound() {
  if (!state.playing && state.activeNodes.length === 0) return;

  state.activeNodes.forEach((node) => {
    try {
      if (typeof node.stop === "function") {
        node.stop();
      }
      if (typeof node.disconnect === "function") {
        node.disconnect();
      }
    } catch {
      // Nodes may already be stopped after a rapid mode switch.
    }
  });

  state.activeNodes = [];
  state.playing = false;
  releaseWakeLock();
  clearTimer();
  nodes.statusPill.textContent = languages[nodes.languageSelect.value].stopped;
  nodes.statusPill.classList.remove("playing");
  nodes.visualizer.classList.remove("playing");
  updatePlaybackButtons();
}

function startSound() {
  ensureAudioContext();
  stopSound();

  if (state.mode === "binaural") {
    playBinaural();
  } else if (state.mode === "pulse") {
    playPulse();
  } else if (state.mode === "hemispheric") {
    playHemispheric();
  } else {
    playTone();
  }

  state.playing = true;
  nodes.statusPill.textContent = languages[nodes.languageSelect.value].playing;
  nodes.statusPill.classList.add("playing");
  nodes.visualizer.classList.add("playing");
  updatePlaybackButtons();
  startTimer();
  requestWakeLock();
}

function restartSound() {
  if (!state.playing) return;
  startSound();
}

nodes.playButton.addEventListener("click", startSound);
nodes.stopButton.addEventListener("click", stopSound);

nodes.presets.forEach((button) => {
  button.addEventListener("click", () => applyPreset(button.dataset.preset));
});

nodes.modes.forEach((button) => {
  button.addEventListener("click", () => updateMode(button.dataset.mode));
});

function updateCustomSound() {
  state.currentPreset = "custom";
  setActiveButton(nodes.presets, "preset", "");
  nodes.bandName.textContent = state.mode === "hemispheric" ? translate("雙腦同步") : "Custom";
  nodes.bandDescription.textContent = translate(state.mode === "hemispheric" ? "耳機左右聲道的獨立頻率設定" : "自訂頻率組合");
  updateOutputs();
  restartSound();
}

[nodes.beatFrequency, nodes.carrierFrequency, nodes.leftFrequency, nodes.rightFrequency, nodes.volume].forEach((input) => {
  input.addEventListener("input", updateCustomSound);
});

[[nodes.leftOutput, nodes.leftFrequency], [nodes.rightOutput, nodes.rightFrequency]].forEach(([input, slider]) => {
  input.addEventListener("input", () => {
    const value = Number(input.value);
    if (!Number.isFinite(value)) return;
    slider.value = Math.min(Number(slider.max), Math.max(Number(slider.min), value));
    updateCustomSound();
  });
  input.addEventListener("change", updateOutputs);
});

nodes.waveform.addEventListener("change", restartSound);
nodes.timerDuration.addEventListener("change", () => {
  if (state.playing) startTimer();
  else updateTimerLabel();
});
nodes.languageSelect.addEventListener("change", () => {
  const language = languages[nodes.languageSelect.value];
  document.documentElement.lang = nodes.languageSelect.value;
  document.documentElement.dir = nodes.languageSelect.value === "ar" ? "rtl" : "ltr";
  translatePage(nodes.languageSelect.value);
  nodes.appTitle.textContent = language.title;
  nodes.playButton.textContent = language.play;
  nodes.stopButton.textContent = language.stop;
  nodes.statusPill.textContent = state.playing ? language.playing : language.stopped;
  if (state.mode === "hemispheric") nodes.bandName.textContent = translate("雙腦同步");
  updateSortControls();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.playing) requestWakeLock();
  else releaseWakeLock();
});

window.addEventListener("pagehide", stopSound);

updatePlaybackButtons();
setupPresetSorting();
applyPreset("alpha");
translatePage("zh-Hant");
const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
if (requestedLanguage && languages[requestedLanguage]) {
  nodes.languageSelect.value = requestedLanguage;
  nodes.languageSelect.dispatchEvent(new Event("change"));
}
