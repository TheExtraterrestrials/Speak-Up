import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatPage.css';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import main from './groq'; // Import your groq transcription function

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-US';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioFilePath, setAudioFilePath] = useState(''); // Path for the recorded audio
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages are updated
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: transcript, sender: 'user' },
      ]);
    };
  }, []);

  const handleSpeechInput = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  };

  // Function to handle audio recording
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          setAudioChunks((prev) => [...prev, event.data]);
        };

        recorder.start();
        setIsListening(true);
      })
      .catch((error) => console.error('Error accessing microphone', error));
  };

  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/m4a' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioFileName = `audio_${Date.now()}.m4a`;

        let transcription = '';
        try {
          transcription = await main(audioBlob); 
        } catch (error) {
          console.error('Error during transcription:', error);
          transcription = 'Transcription failed';
        }

       
        setAudioFilePath(audioFileName);


        setAudioChunks([]);
        setIsListening(false);

        
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Audio recorded: ${audioFileName}`, sender: 'user' },
          { text: transcription, sender: 'bot' }, 
        ]);
      };
    }
  };

  const toggleRecording = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="chat-page-wrapper">
    
    <div className="chat-page">
    <div className="heading"> <p className='name'>SpeakUP</p>   <ChatIcon /></div> 
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="send-btn">
          <SendIcon />
        </button>
        <button
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleRecording}
        >
          {isListening ? <StopIcon /> : <MicIcon />}
        </button>
      </div>
      {/* {audioFilePath && <p>Recorded audio saved at: {audioFilePath}</p>} */}
    </div>
    </div>
  );
};

export default ChatPage;
