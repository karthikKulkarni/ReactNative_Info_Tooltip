import React, { Component } from 'react';
import {
  View,
  PanResponder,
  PanResponderInstance,
  ViewStyle,
} from 'react-native';
import PopupView from './PopupView';

type Props = {
  tooltip: PopupView | null;
  msg: string;
  tooltipId: string;
  propStyle?: ViewStyle;
};

export class Tooltip extends Component<Props> {
  panResponder: PanResponderInstance;

  constructor(props: any) {
    super(props);
    // panResponder initialization
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: event => {
        const { tooltip, msg, tooltipId } = this.props;
        if (tooltip && tooltip.updatePopupState) {
          tooltip.updatePopupState(event.nativeEvent.pageY, msg, tooltipId);
        }
      },
    });
  }

  render() {
    const { children, propStyle } = this.props;
    return (
      <View style={propStyle} {...this.panResponder.panHandlers}>
        {children}
      </View>
    );
  }
}

export default Tooltip;
