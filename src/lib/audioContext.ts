let audioContext: AudioContext | null = null;

export const getAudioContext = async (): Promise<AudioContext> => {
    // Ensure the function only runs in a browser environment
    if (typeof window === "undefined") {
        throw new Error("AudioContext is not supported in this environment");
    }

    try {
        if (!audioContext) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const AudioContextConstructor = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContextConstructor) {
                throw new Error("Web Audio API is not supported in this browser");
            }
            audioContext = new AudioContextConstructor();
        }

        // Resume the audio context if it was suspended
        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }

        return audioContext;
    } catch (e) {
        console.error("Error creating audio context", e);
        throw e;
    }
};

export const closeAudioContext = async (): Promise<void> => {
    if (audioContext && audioContext.state !== "closed") {
        await audioContext.close();
    }
    audioContext = null;
};

// Utility function to check if an audio context is available and running
export const isAudioContextAvailable = (): boolean => {
    return !!(audioContext && audioContext.state === "running");
};
