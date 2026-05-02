import { useState, useRef } from 'react';
import { Product } from '@/types/product';
import { ISpeechRecognition } from '@/types/speechRecognisation';

export const useProductVoice = (initialFormState: Product) => {
    const [voiceText, setVoiceText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [tempProduct, setTempProduct] = useState<Product>(initialFormState);
    const recognitionRef = useRef<null |ISpeechRecognition >(null);


    
    const parseText = (text: string) => {
        const cleaned = text.toLowerCase();
        
        const nameMatch = cleaned.match(/(?:الاسم|منتج)\s+(.*?)(?=\s+(?:سعر|بيع|تكلفة|تكلفه|شراء|عدد|كمية|كميه|مخزون|باركود|رمز|دينار|دولار|$))/i);
        const priceMatch = cleaned.match(/(?:سعر|بيع)\s*(\d+)/);
        const costMatch = cleaned.match(/(?:تكلفة|تكلفه|شراء)\s*(\d+)/);
        const stockMatch = cleaned.match(/(?:عدد|كمية|كميه|مخزون)\s*(\d+)/);
        const barcodeMatch = cleaned.match(/(?:باركود|رمز)\s*(\d+)/);

        setTempProduct(prev => ({
            ...prev,
            name: nameMatch ? nameMatch[1].trim() : prev.name,
            price: priceMatch ? Number(priceMatch[1]) : prev.price,
            costPrice: costMatch ? Number(costMatch[1]) : prev.costPrice,
            stock: stockMatch ? Number(stockMatch[1]) : prev.stock,
            barcode: barcodeMatch ? Number(barcodeMatch[1]) : prev.barcode,
        }));
    };



    const toggleListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            recognitionRef.current = new SpeechRecognition();
            if(! recognitionRef.current)return;
            recognitionRef.current.lang = 'ar-SA';
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event: any) => {
                let currentTranscript = "";
                for (let i = 0; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setVoiceText(currentTranscript);
                parseText(currentTranscript);
            };

            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const resetVoice = () => {
        recognitionRef.current?.stop();
        setVoiceText("");
        setTempProduct(initialFormState);
        setIsListening(false);
    };

    return { voiceText, setVoiceText, isListening, tempProduct, toggleListening, resetVoice, parseText };
};