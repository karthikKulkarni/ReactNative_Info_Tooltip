import React, { useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const getOrientation = (height: number, width: number): string => {
  if (width > height) {
    return 'landscape';
  }
  return 'portrait';
};

const OrientationHOC = (WrappedComponent: any, otherProps?: any) => {
  const { height, width } = Dimensions.get('window');
  const [orientation, setOrientation] = useState<string>(
    getOrientation(height, width),
  );

  Dimensions.addEventListener(
    'change',
    ({ window }: { window: ScaledSize }) => {
      setOrientation(getOrientation(window.height, window.width));
    },
  );
  return <WrappedComponent orientation={orientation} {...otherProps} />;
};

export default OrientationHOC;
