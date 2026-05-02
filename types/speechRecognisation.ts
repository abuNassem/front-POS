interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
    isFinal?: boolean; // أحياناً يكون متاحاً في بعض المتصفحات
}

// 2. تعريف واجهة الحدث
interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

// 3. تعريف الواجهة الرئيسية التي سببت الخطأ
export interface ISpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onstart: () => void;
    onend: () => void;
    onerror: (event: any) => void;
}

interface SpeechRecognitionConstructor {
    new (): ISpeechRecognition;
}

declare global {
    interface Window {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }
}