
import { useEffect, useState } from "react";

export function useSpeechRecognition() {
    let recognition= null;

    if ("webkitSpeechRecognition" in window) {
        recognition = new (window ).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
    }

    const useSpeechRecognitionHook = () => {
        const [text, setText] = useState("");
        const [listening, setListening] = useState(false);

        useEffect(() => {
            if (!recognition) return;

            recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setText(transcript);
            };

            recognition.onerror = (event) => {
                console.error(event.error);
                setListening(false);
            };

            recognition.onend = () => {
                setListening(false);
            };

        }, []);

        const startListening = () => {
            setText('');
            setListening(true);
            recognition?.start();
        };

        const stopListening = () => {
            setListening(false);
            recognition?.stop();
        };

        return {
            text,
            listening,
            startListening,
            stopListening,
            hasRecognitionSupport: !!recognition,
        };
    };

    return useSpeechRecognitionHook;
}
