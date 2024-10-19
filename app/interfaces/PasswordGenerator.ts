import { SliderValue } from '@nextui-org/react';

export interface FormInitialValues {
  value: SliderValue;
  isMayus: boolean;
  isMinus: boolean;
  isNumbers: boolean;
  isSpecialCharacters: boolean;
}

export interface PasswordGeneratorProps {
  isMayus: boolean;
  isMinus: boolean;
  isNumbers: boolean;
  isSpecialCharacters: boolean;
  value: SliderValue;

  setIsMayus: (value: boolean) => void;
  setIsMinus: (value: boolean) => void;
  setIsNumbers: (value: boolean) => void;
  setIsSpecialCharacters: (value: boolean) => void;
  setValue: React.Dispatch<React.SetStateAction<SliderValue>>;
}
