/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconHeartFilled } from '@tabler/icons-react';
import React, { FC, ReactNode } from 'react';

interface Props {
  isIndeterminate?: boolean;
  isSelected?: boolean;
  disableAnimation?: boolean;
  icon: ReactNode;
}

const IconWrapper: FC<Props> = ({
  disableAnimation,
  isIndeterminate,
  isSelected,
  icon,
  ...rest
}) => {
  return <IconHeartFilled {...rest} />;
};

export default IconWrapper;
