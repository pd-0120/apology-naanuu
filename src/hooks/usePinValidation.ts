import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { CORRECT_PIN, ROUTES } from '../utils/constants';

interface UsePinValidationReturn {
  validatePin: (pin: string) => boolean;
  handlePinSubmit: (pin: string) => { isValid: boolean; shouldShowPopup: boolean };
}

export const usePinValidation = (): UsePinValidationReturn => {
  const navigate = useNavigate();
  const { setPinEntered, setIsPinValid } = useAppStore();

  const validatePin = useCallback((pin: string): boolean => {
    return pin === CORRECT_PIN;
  }, []);

  const handlePinSubmit = useCallback(
    (pin: string): { isValid: boolean; shouldShowPopup: boolean } => {
      const isValid = validatePin(pin);
      setPinEntered(pin);
      setIsPinValid(isValid);

      // Navigate to gallery regardless
      navigate(ROUTES.GALLERY);

      return { isValid, shouldShowPopup: !isValid };
    },
    [validatePin, setPinEntered, setIsPinValid, navigate]
  );

  return { validatePin, handlePinSubmit };
};
