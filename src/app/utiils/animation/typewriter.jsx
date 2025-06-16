import { useState, useEffect, useCallback } from 'react';

const useTypewriter = (text, speed = 50, delay = 0, cursor = true, loop = false) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!text || text.length === 0) return;

    let timeout;
    
    // Initial delay before starting
    if (!hasStarted && delay > 0) {
      timeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (!hasStarted && delay === 0) {
      setHasStarted(true);
      return;
    }

    if (!hasStarted) return;

    if (!loop) {
      // Simple typewriter effect (original functionality)
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev + text.charAt(currentIndex));
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } else if (currentIndex >= text.length && !isComplete) {
        // Mark as complete and stop cursor blinking after a brief period
        setIsComplete(true);
        if (cursor) {
          timeout = setTimeout(() => {
            setShowCursor(false);
          }, 1000); // Show cursor for 1 second after completion, then hide
        }
      }
    } else {
      // Advanced typewriter with loop functionality
      if (!isDeleting && currentIndex <= text.length) {
        if (currentIndex < text.length) {
          timeout = setTimeout(() => {
            setDisplayText(text.substring(0, currentIndex + 1));
            setCurrentIndex(prev => prev + 1);
          }, speed);
        } else {
          // Pause at the end before starting to delete
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        }
      } else if (isDeleting && currentIndex > 0) {
        timeout = setTimeout(() => {
          setCurrentIndex(prev => prev - 1);
          setDisplayText(text.substring(0, currentIndex - 1));
        }, speed / 2);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setDisplayText('');
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [text, speed, delay, currentIndex, isDeleting, loop, cursor, isComplete, hasStarted]);

  // Cursor blinking effect - only for loop mode or before completion
  useEffect(() => {
    if (cursor && (loop || !isComplete)) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [cursor, loop, isComplete]);

  return displayText + (cursor && showCursor && (loop || !isComplete) ? '|' : '');
};

// Hook for multiple typewriter texts (for rotating text effect)
const useMultiTypewriter = (texts, speed = 50, delay = 0, pauseBetween = 2000) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    let timeout;
    const currentText = texts[currentTextIndex] || '';

    // Initial delay before starting
    if (!hasStarted && delay > 0) {
      timeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (!hasStarted && delay === 0) {
      setHasStarted(true);
      return;
    }

    if (!hasStarted) return;

    if (!isDeleting && currentIndex <= currentText.length) {
      if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } else {
        // Pause at the end before starting to delete
        timeout = setTimeout(() => setIsDeleting(true), pauseBetween);
      }
    } else if (isDeleting && currentIndex > 0) {
      timeout = setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setDisplayText(currentText.substring(0, currentIndex - 1));
      }, speed / 2);
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
      setDisplayText('');
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [texts, speed, delay, currentIndex, isDeleting, currentTextIndex, pauseBetween, hasStarted]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return displayText + (showCursor ? '|' : '');
};

export default useTypewriter;
export { useMultiTypewriter };