import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface UseBarcodeScannerProps {
    onResult: (decodedText: string) => void;
    fps?: number;
    qrbox?: number;
}

export function useBarcodeScanner({ onResult, fps = 10, qrbox = 250 }: UseBarcodeScannerProps) {
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(console.error);
            }
        };
    }, []);

    const startScanning = (elementId: string) => {
        if (scannerRef.current) return;

        const scanner = new Html5QrcodeScanner(
            elementId,
            { fps, qrbox },
      /* verbose= */ false
        );

        // Assign to ref BEFORE render to ensure we have a handle
        // Actually, Html5QrcodeScanner constructor returns the instance.
        scannerRef.current = scanner;

        scanner.render(
            (decodedText) => {
                onResult(decodedText);
            },
            (errorMessage) => {
                // parse error, ignore it.
                console.log(errorMessage);
            }
        );
        setIsScanning(true);
    };

    const stopScanning = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.clear();
                scannerRef.current = null;
                setIsScanning(false);
            } catch (error) {
                console.error("Failed to clear html5-qrcode scanner. ", error);
            }
        }
    };

    return {
        isScanning,
        startScanning,
        stopScanning,
    };
}
