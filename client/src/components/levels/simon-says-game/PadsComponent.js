import React from 'react';

import Pad from './PadComponent';
import { COLORS } from '../../../constants/simonSaysParams';

export const PadsByComponentName = {
  GreenPad: ({ ...props }) => (
    <Pad m={1} color={COLORS.green} className="top-left" {...props} />
  ),
  RedPad: ({ ...props }) => (
    <Pad m={1} color={COLORS.red} className="top-right" {...props} />
  ),
  YellowPad: ({ ...props }) => (
    <Pad m={1} color={COLORS.yellow} className="bottom-left" {...props} />
  ),
  BluePad: ({ ...props }) => (
    <Pad m={1} color={COLORS.blue} className="bottom-right" {...props} />
  ),
};

const Pads = ({ pad, onClick }) => {
  const { component } = pad;
  const Composed = PadsByComponentName[component];
  return (
    <Composed
      {...pad}
      onClick={onClick}
    />
  );
};

export default Pads;
