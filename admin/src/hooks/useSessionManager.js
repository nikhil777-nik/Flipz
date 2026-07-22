import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

/**
 * useSessionManager
 * 
 * Manages admin session security with inactivity-based auto-logout.
 * 
 * - Starts a 30-minute countdown on mount (only when `logout` is provided)
 * - Resets the timer on any user activity: mousemove, keydown, scroll, click, touchstart
 * - Automatically calls `logout()` when timer expires
 * - Cleans up all listeners and timers on unmount
 * 
 * @param {Function|null} logout - Centralized logout callback from App.jsx.
 *                                  Pass null when admin is not logged in.
 */
const useSessionManager = (logout) => {
  const timerRef = useRef(null);
  const logoutRef = useRef(logout);

  // Keep ref in sync so the timer callback always calls the latest logout fn
  useEffect(() => {
    logoutRef.current = logout;
  }, [logout]);

  useEffect(() => {
    // Only activate when admin is logged in
    if (!logout) {
      return;
    }

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        toast.warn('⏰ Session expired due to inactivity. Please log in again.', {
          autoClose: 4000,
          toastId: 'session-expired', // Prevent duplicate toasts
        });
        // Small delay so the toast is visible before the UI resets
        setTimeout(() => {
          if (logoutRef.current) {
            logoutRef.current();
          }
        }, 600);
      }, INACTIVITY_TIMEOUT_MS);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Attach all activity listeners (passive for scroll performance)
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Start the initial countdown
    resetTimer();

    // Cleanup on unmount or when logout changes to null (logged out)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [logout]);
};

export default useSessionManager;
