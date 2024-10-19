import { Checkbox, Divider, Slider } from '@nextui-org/react';
import React, { FC } from 'react';

import { PasswordGeneratorProps } from '../../../interfaces/PasswordGenerator';

const PasswordGenerator: FC<PasswordGeneratorProps> = ({
  isMayus,
  isMinus,
  isNumbers,
  isSpecialCharacters,
  value,
  setIsMayus,
  setIsMinus,
  setIsNumbers,
  setIsSpecialCharacters,
  setValue,
}) => {
  return (
    <div>
      <Slider
        className="max-w-md my-4"
        color="primary"
        defaultValue={8}
        label="Longitud"
        maxValue={50}
        minValue={8}
        onChange={setValue}
        showSteps={true}
        showTooltip
        size="md"
        step={1}
        value={value}
      />

      <Divider />
      <div className="flex-col gap-4 justify-center my-4">
        <h3 className="mb-4">¿Qué quieres incluir?</h3>

        <div className="flex gap-4">
          <Checkbox
            name="isMayus"
            checked={isMayus}
            onChange={(e) => setIsMayus(e.target.checked)}
          >
            Mayúsculas
          </Checkbox>
          <Checkbox
            name="isMinus"
            checked={isMinus}
            onChange={(e) => setIsMinus(e.target.checked)}
          >
            Minúsculas
          </Checkbox>
          <Checkbox
            name="isNumbers"
            checked={isNumbers}
            onChange={(e) => setIsNumbers(e.target.checked)}
          >
            Números
          </Checkbox>
          <Checkbox
            name="isSpecialCharacters"
            checked={isSpecialCharacters}
            onChange={(e) => setIsSpecialCharacters(e.target.checked)}
          >
            Caracteres
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
