import React, { FC } from 'react';

import { ProgressCircle } from '@/app/components/shared/charts/ProgressCircle';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

const ProgressCirclePasswords: FC<{ totalPasswordsCount: number }> = ({
  totalPasswordsCount,
}) => {
  return (
    <Card className="w-1/4">
      <CardHeader className="flex items-center justify-center">
        <h3 className="text-2xl font-medium text-gray-900 ">
          Contraseñas Totales
        </h3>
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-center mb-6">
        <ProgressCircle
          value={totalPasswordsCount}
          radius={100}
          strokeWidth={15}
        >
          <span className="text-4xl font-medium text-gray-900 ">
            {totalPasswordsCount}
          </span>
        </ProgressCircle>
      </CardBody>
    </Card>
  );
};

export default ProgressCirclePasswords;
