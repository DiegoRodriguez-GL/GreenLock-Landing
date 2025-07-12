// src/components/ui/HackerEffect.tsx
import { useState, useEffect } from 'react';

interface HackerEffectProps {
  text: string;
  className?: string;
  duration?: number;
  onComplete?: () => void;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

export default function HackerEffect({
  text,
  className = '',
  duration = 1500,
  onComplete,
}: HackerEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Reset when text changes
    if (isMounted) {
      setDisplayText('');
      setIsComplete(false);
    }

    const finalText = text;
    const intervalDuration = Math.max(20, duration / (finalText.length * 3));
    
    let currentIndex = 0;
    let iterations = 0;
    
    const interval = setInterval(() => {
      if (!isMounted) return;
      
      if (currentIndex >= finalText.length) {
        // Text is complete
        if (iterations >= 2) {
          clearInterval(interval);
          setIsComplete(true);
          if (onComplete) onComplete();
          return;
        }
        iterations++;
      }
      
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        // Original character for completed positions
        if (i < currentIndex) {
          result += finalText[i];
        } 
        // Random character for transitioning positions
        else if (i === currentIndex) {
          // 80% chance of showing the actual character as we approach completion
          if (iterations > 0 && Math.random() < 0.8) {
            result += finalText[i];
            currentIndex++;
          } else {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        }
        // Random or space for future positions 
        else if (i > currentIndex) {
          // 70% chance to display spaces at first
          if (iterations === 0 && Math.random() < 0.7) {
            result += ' ';
          } else {
            // 30% chance to show a random character
            if (Math.random() < 0.3) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            } else {
              result += ' ';
            }
          }
        }
      }
      
      setDisplayText(result);
    }, intervalDuration);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [text, duration, onComplete]);

  return (
    <span className={`font-mono ${isComplete ? '' : 'animate-pulse'} ${className}`}>
      {displayText}
    </span>
  );
}