import {StyleSheet} from 'react-native';
import Styles from '../AnimatingSvgBottomBar/Styles';

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
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    flex: 1,
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

  emptyBoxStyle: {
    ...StyleSheet.absoluteFillObject,
  },

  centralTabStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'red',
  },

  centerTabIconContainerStyle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
