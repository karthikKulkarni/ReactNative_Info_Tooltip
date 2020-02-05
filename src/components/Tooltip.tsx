import React, { Component } from 'react';
import {
  View,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
} from 'react-native';
import PopupView from './PopupView';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

type Props = {
  tooltip: PopupView | null;
  msg: string;
  tooltipId: string;
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
    const { children } = this.props;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <View style={styles.container} {...this.panResponder.panHandlers}>
        {children}
      </View>
    );
  }
}

export default Tooltip;
