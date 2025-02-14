// "use client"

// import React, { useEffect , useState , useRef} from 'react'
// import { Mic,  } from 'lucide-react'
// import TranscriptionResults from '../TranscriptionResults'
// import { useHasBrowser } from '@/lib/useHasBrowser'

// const AudioUploader = () => {
//     // browser detection
//     const hasBrowser = useHasBrowser();

//     //state management
//     const [ isRecording , setIsRecording ] = useState(false);
//     const [ isLoading , setLoading ] = useState(false)
//     const [error , setError ] = useState("")
//     const [ mediaStream , setMediaStream ] = useState<MediaStream | null>(null)
//     const [ isSpeechSupport , setIsSpeechSupport ] = useState(false)
//     const [ transcript , setTranscription ] = useState("")

//     //refs
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const recognitionRef = useRef<any>(null)

//     useEffect(()=>{
//         if(hasBrowser){
//             const speechSupported = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
//             setIsSpeechSupport(speechSupported)
//         }
//      },[hasBrowser])

//      //Initialize Speech recognition
//      useEffect(()=>{
//         if(isSpeechSupport &&!recognitionRef.current){
//             if(!hasBrowser) return

//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

//             if(SpeechRecognition){
//                 const recognition = new SpeechRecognition();
//                 recognition.continuous = true
//                 recognition.interimResults = true;
//                 recognition.lang = "en-US";

//                 let finalTranscript = "";

//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 recognition.onresult = (event: any) =>{
//                     let interimTranscript = "";

//                     for(let i = event.resultIndex ; i < event.results.length ; ++i){
//                         const transcript = event.results[i][0].transcript
//                         if(event.results[i].isFinal){
//                             finalTranscript += transcript + ""; 
//                         }else{
//                             interimTranscript += transcript;
//                         }
//                     }

//                     setTranscription(finalTranscript + interimTranscript)
//                 }

//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 recognition.onerror = (event: any) => {
//                     console.error("Speech recognition error: ", event.error)
//                     setError(`Speech recognition error: ${event.error}`)
//                     setIsRecording(false);
//                 }

//                 recognitionRef.current = recognition;
//             }

//             return () =>{
//                 if(recognitionRef.current){
//                     recognitionRef.current.stop();
//                 }
//                 if(mediaStream){
//                     mediaStream.getTracks().forEach(track => track.stop());
//                 }
//             }
//         }
//      },[hasBrowser])

//      // start recording
//      const handleStartRecording = async () => {
//         if(recognitionRef.current && !isRecording){
//            try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             setMediaStream(stream);
//             recognitionRef.current.start()
//             setIsRecording(true)
//             setTranscription("")
//            } catch (error) {
//             console.error("Error accessing microphone : ", error)
//             setError(`Microphone access denied or not available`)
//            }
//         }
//      };

//      // stop recording
//      const stopRecording = () => {
//         if(recognitionRef.current && isRecording ){
//             recognitionRef.current.stop();
//             setIsRecording(false)

//             if(mediaStream){
//                 mediaStream.getTracks().forEach(track => track.stop());
//                 setMediaStream(null);
//             }
//         }
//         setIsRecording(false)
//         recognitionRef.current?.stop();
//      }

//      // handle speech recognition results
//      const handleSpeechRecognition = (event) => {
//         const transcript = Array.from(event.results, result => result[0].transcript).join("");
//         console.log("Transcript: ", transcript);
//      }

//      // handle error
//   return (
//     <div>AudioUploader</div>
//   )
// }

// export default AudioUploader