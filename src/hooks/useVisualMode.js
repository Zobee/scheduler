import {useState} from 'react';

const useVisualMode = (initMode) => {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([]);

  const transition = (newMode, replace = false) => {
    setHistory(prev => {
      if(replace){
        return prev;
      }
      return [...prev, mode];
    })
    setMode(newMode);
  }

  const back = () => {
    if(history.length < 1) return;

    const newHistory = [...history];
    const prevMode = newHistory.pop();
    setMode(prevMode);
    setHistory(newHistory);
  }
  return {mode, transition, back};
}

export default useVisualMode;