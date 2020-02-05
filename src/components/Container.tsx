import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tooltip } from './Tooltip';
import PopupView from './PopupView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tex1: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  icon1: { flexDirection: 'row', alignItems: 'center' },
  text2: {
    top: 400,
  },
});

export const Container = () => {
  const [tooltipPopupRef, setTooltipPopupRef] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.tex1}>
        <Text>Please read through additional info by clicking -&gt; </Text>
        {/* Tooltip can hold any child component as long as intuitive.
        @params:
        tooltip: reference to the Popup View
        msg: Message to be displayed on the popup
        tooltipId : this identifies each tooltip instance uniquely */}
        <Tooltip
          tooltip={tooltipPopupRef}
          msg="This is a short message. Click on msg to close."
          tooltipId="tooltip_1"
        >
          <View style={styles.icon1}>
            <Icon name="information-outline" size={30} color="#900" />
          </View>
        </Tooltip>
      </View>

      <View style={styles.text2}>
        <Tooltip
          tooltip={tooltipPopupRef}
          msg="This is a long test. Click here to close, or click expand btn to expand. Lorem psum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"
          tooltipId="tooltip_2"
        >
          <Icon name="alert-octagon" size={50} color="#900" />
        </Tooltip>
      </View>

      {/* This is the popup view and should be at the end of the component.
      @param:
      ref: This reference is used to control the visibility and position of the popup.  */}
      <PopupView
        ref={ref => {
          setTooltipPopupRef(ref);
        }}
      />
    </View>
  );
};

export default Container;
