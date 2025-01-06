import React, { useState, useEffect, useCallback,useRef } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './styles/index.scss'
import WaveChart from './component/wave-chart';
import WordCloud from './component/floating-words';
const words = [
  { text: "平静", top: "50%", left: "50%", fontSize: "28px", color: "#4dabf7" },
  { text: "骄傲", top: "30%", left: "60%", fontSize: "18px", color: "#6a4c93" },
  { text: "开心", top: "20%", left: "40%", fontSize: "22px", color: "#f6a81c" },
  { text: "勇敢", top: "70%", left: "30%", fontSize: "20px", color: "#2f9e44" },
  { text: "恐惧", top: "80%", left: "60%", fontSize: "16px", color: "#ff6b6b" },
  { text: "内疚", top: "60%", left: "80%", fontSize: "18px", color: "#4dabf7" },
  { text: "生气", top: "40%", left: "20%", fontSize: "24px", color: "#6a4c93" },
];
const App = () => {
  const inputRef = useRef(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastSectionId, setLastSectionId] = useState('');
  const [inputValue, setInputValue] = useState('');




  const handleMicrophonePermission = async () => {
    console.log('navigator',navigator);
    if (navigator?.mediaDevices && navigator?.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        setHasPermission(false);
        console.error('Error accessing microphone:', error);
      }
    } else {
      setHasPermission(false);
      console.error('getUserMedia is not supported');
    }
  };

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => setTranscript(result),
  });

 // 使用 useCallback 包裹 listen 和 stop
 const memoizedListen = useCallback(listen, []);
 const memoizedStop = useCallback(stop, []);

 useEffect(() => {
   if (isButtonPressed && hasPermission) {
     memoizedListen();
   } else {
     memoizedStop();
   }

   return () => {
     memoizedStop();
   };
 }, [isButtonPressed, hasPermission, memoizedListen, memoizedStop]);

  const handleButtonPress = () => {
    if(lastSectionId.length === 0){
      fetch('https://api.coze.cn/v1/conversation/create', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer pat_jNLXvspUJbObByD7SrFP4RR1Z8r7MjFLepeoVnvqgYGHVqfu298oZJf7U0MdmfrA',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json()) // 将响应解析为JSON
      .then(data => {
       
        // if (data.last_section_id) {
        //   // 将last_section_id存储在sessionStorage中
        //   sessionStorage.setItem('last_section_id', data.last_section_id);
        //   setLastSectionId(data.last_section_id||'')
        //   console.log('last_section_id stored in sessionStorage:', data.last_section_id);
        // } else {
        //   console.error('last_section_id not found in response');
        // }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
   
    setIsButtonPressed(true);
    handleMicrophonePermission();
  };

  const handleButtonRelease = () => {
    setIsButtonPressed(false);
  };

  const styles={
   fontSize: '20px'
  }


 const handleBlur = (e) => {
    console.log('Input field blurred');
    console.log(e.target.value);
    // 将输入框的值更新到 transcript 状态
    setTranscript(e.target.value);
 }


 const handleClearInput = () => {
  setInputValue('');
};

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

const buttonStyle = {
  margin:"10px",
  fontSize: '18px'
}

  return (
    <div className="content">
      <h1 style={styles}>远行</h1>
      <p style={buttonStyle}>
        太阳(数量)
        <span>+</span>
      </p>
      <p style={buttonStyle}>
        暴风雨(数量)
        <span>+</span>
      </p>
      <p style={buttonStyle}>
        阳光(数量)
        <span>+</span>
      </p>
      <p style={buttonStyle}>
      果实(数量)
        <span>+</span>
      </p>
      <p style={buttonStyle}>
      枝干(数量)
        <span>+</span>
      </p>
      <p style={buttonStyle}>
      树叶(数量)
        <span>+</span>
      </p>
      <p style={buttonStyle}>
      树干(数量)
        <span>+</span>
      </p>
      <p style={buttonStyle}>
      土壤(数量)
        <span>+</span>
      </p>
      <p style={buttonStyle}>
      根茎(数量)
        <span>+</span>
      </p>
      
      {/* <button
        style={styles}
        className={`button ${isButtonPressed ? 'pressed' : ''}`}
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
        onTouchStart={handleButtonPress}
        onTouchEnd={handleButtonRelease}
      >
        麦
      </button> */}
      <div>
        <input className='talk' style={{width: '200px', height: '30px', fontSize: '20px'}}   value={inputValue}   onChange={handleInputChange} onBlur={handleBlur} type="text" ></input>
        <button onClick={handleClearInput}>确定</button>
      </div>
     
      {/* {hasPermission ? <p>已获取麦克风权限</p> : <p>未获取麦克风权限</p>} */}
      <p style={styles}>{transcript}</p>
      <WaveChart />
      <WordCloud words={words} />
    </div>
  );
};

export default App;