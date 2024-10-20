import React, { FC } from 'react';

import { ProgressBar } from '@/app/components/shared/charts/ProgressBar';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

const ProgressBarPassword: FC<{
  favoriteCount: number;
  repeatedPasswords: number;
  categoryCount: Record<string, number>;
}> = ({ repeatedPasswords, favoriteCount, categoryCount }) => {
  return (
    <Card className="w-4/6">
      <CardHeader className="flex items-center justify-center">
        <h3 className="text-2xl font-medium text-gray-900">Tus Contraseñas</h3>
      </CardHeader>
      <CardBody className="gap-4 justify-center items-center mb-6">
        <ProgressBar
          variant="default"
          value={favoriteCount}
          className="w-4/5"
          showAnimation
          label={`Favoritas: ${favoriteCount}`}
        />
        <ProgressBar
          variant="neutral"
          value={repeatedPasswords}
          className="w-4/5"
          showAnimation
          label={`Repetidas: ${repeatedPasswords}`}
        />
        {Object.entries(categoryCount).map(([category, count]) => (
          <ProgressBar
            key={category}
            variant="default"
            value={count}
            className="w-4/5"
            showAnimation
            label={`${category}: ${count}`}
          />
        ))}
      </CardBody>
    </Card>
  );
};

export default ProgressBarPassword;
