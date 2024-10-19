/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon, IconProps } from '@tabler/icons-react';
import React, { FC } from 'react';

interface Props {
  isIndeterminate?: boolean;
  isSelected?: boolean;
  disableAnimation?: boolean;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

const IconWrapper: FC<Props> = ({
  disableAnimation,
  isIndeterminate,
  isSelected,
  icon: Icon,
  ...rest
}) => {
  return <Icon {...rest} />;
};

export default IconWrapper;
