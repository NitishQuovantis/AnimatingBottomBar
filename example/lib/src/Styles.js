import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  emptyBoxStyle: {
    position: 'absolute',
    top: 0,
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },

  tabBarStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },

  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  tabIconStyle: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },

  tabTitleStyle: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default Styles;
