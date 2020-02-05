import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    width: '75%',
  },
  modelContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modelBody: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingBottom: 20,
    height: '75%',
    width: '100%',
    backgroundColor: 'white',
  },
  modelClose: { alignSelf: 'flex-end' },
  modelTextScroll: { paddingHorizontal: 16 },
  popupExpand: {
    alignSelf: 'flex-end',
  },
});

export default class PopupView extends PureComponent {
  state = {
    msg: '',
    shouldOpen: false,
    pageY: 0,
    tooltipId: '',
    modalVisible: false,
  };

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  updatePopupState = (pageY: number, msg: string, tooltipID = '') => {
    const { shouldOpen, tooltipId } = this.state;
    if (shouldOpen === false || (tooltipId !== '' && tooltipId !== tooltipID)) {
      this.setState({
        msg,
        shouldOpen: true,
        pageY,
        tooltipId: tooltipID,
      });
    } else {
      this.hidePopup();
    }
  };

  // Decide weather the popup should be at the top of below the click position
  getPopupPosition = () => {
    const { pageY } = this.state;
    if ((deviceHeight / 100) * 30 < pageY) {
      return pageY - 150;
    }
    return pageY + 50;
  };

  hidePopup() {
    this.setState({
      shouldOpen: false,
      tooltipId: '',
    });
  }

  // Render a model if the content is too long and need to see full text.
  renderModal = () => {
    const { modalVisible, msg } = this.state;
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modelContainer}>
          <View style={styles.modelBody}>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <Icon
                name="close"
                size={30}
                color="#900"
                style={styles.modelClose}
              />
            </TouchableHighlight>
            <ScrollView contentContainerStyle={styles.modelTextScroll}>
              <Text>{msg}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { shouldOpen, msg } = this.state;
    return (
      <>
        {shouldOpen && (
          <View
            style={[styles.popupContainer, { top: this.getPopupPosition() }]}
          >
            <TouchableOpacity
              onPress={() => {
                this.hidePopup();
              }}
            >
              <TouchableOpacity onPress={() => {}} style={styles.popupExpand}>
                {msg && msg.length > 70 ? (
                  <Icon
                    name="arrow-expand"
                    size={20}
                    color="#900"
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                  />
                ) : (
                  <Icon
                    name="close"
                    size={20}
                    color="#900"
                    onPress={() => {
                      this.hidePopup();
                    }}
                  />
                )}
              </TouchableOpacity>

              <Text numberOfLines={2} enum="tail">
                {msg}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.renderModal()}
      </>
    );
  }
}
