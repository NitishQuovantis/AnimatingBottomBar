import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    height: 0,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tabContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  labelStyle: {
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default styles;
