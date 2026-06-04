import { useState, useRef, useEffect } from 'react';
import { Product } from '@/types/product';
import { ISpeechRecognition } from '@/types/speechRecognisation';
import { INITIAL_FORM_STATE } from './rrrr/useProductForm';

export const useProductVoice = (initialFormState: Product,setFormData: React.Dispatch<React.SetStateAction<Product>>) => {
    const [voiceText, setVoiceText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [tempProduct, setTempProduct] = useState<Product>(initialFormState);
    const recognitionRef = useRef<null |ISpeechRecognition >(null);

    const extractProductFields = (text: string) => {
        const cleaned = text.toLowerCase();

        const nameMatch = cleaned.match(/اسم\s+(.*?)(?=\s+(?:تصنيف|سعر|تكلفة|مخزون|باركود|$))/i);

const priceMatch = cleaned.match(/سعر\s*(\d+)/i);

const costMatch = cleaned.match(/تكلفة\s*(\d+)/i);

const stockMatch = cleaned.match(/مخزون\s*(\d+)/i);

const barcodeMatch = cleaned.match(/باركود\s*(\d+)/i);
const categoryMatch = cleaned.match(/تصنيف\s*([^\s]+)/i);
        setTempProduct(prev => ({
            ...prev,
            name: nameMatch ? nameMatch[1].trim() : prev.name,
            price: priceMatch ? Number(priceMatch[1]) : prev.price,
            costPrice: costMatch ? Number(costMatch[1]) : prev.costPrice,
            stock: stockMatch ? Number(stockMatch[1]) : prev.stock,
            barcode: barcodeMatch ? Number(barcodeMatch[1]) : prev.barcode,
            category:categoryMatch ?categoryMatch[1] :prev.category,
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
                extractProductFields(currentTranscript);
            };

            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const resetVoice = () => {
        recognitionRef.current?.stop();
        setVoiceText("");
        setTempProduct(initialFormState);
        setFormData(INITIAL_FORM_STATE)
        setIsListening(false);
    };

    useEffect(()=>{
        setFormData(tempProduct)
    },[tempProduct])
    return { voiceText, setVoiceText, isListening, tempProduct, toggleListening, resetVoice, extractProductFields };
};