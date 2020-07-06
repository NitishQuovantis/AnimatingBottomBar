# SvgAnimatingBottomBar

![](example/gifs/bottombar.gif)


This library is designed to be fully compatible with popular react-navigation library and can be attached to ```tabBarComponent``` prop provided by BottomBarNavigation 
This library uses ```SVG``` and ```D3``` library to render beautiful animating path and support all the customization options you may require to best fit it for your use-case.

## Installation
```
npm i react-native-animating-bottom-tab-bar
```


Apart from it you also need to install ```Svg``` and ```D3``` library

```
npm i react-native-svg
npm i d3
```

**Note**: Right now I have tested this library with react-navigation@3.x and planning to release 4.x and 5.x compatible in a month or so.

## How to use it
**Step 1: Set up basic navigation bar with ```react-navigation```**

```
const TabBar = createBottomTabNavigator({
  [RouteName.Home]: Home,
  [RouteName.Chat]: Chat,
  [RouteName.Setting]: Setting,
  [RouteName.Profile]: Profile,
});

const AppContainer = createAppContainer(TabBar);

```



**Step 2: Import ```getSvgAnimatingBottomBarStack```  from ```react-native-animating-bottom-tab-bar```**

```
import {getSvgAnimatingBottomBarStack} from 'react-native-animating-bottom-tab-bar';
```

```getSvgAnimatingBottomBarStack``` function create a Tabbar which you can directly passed to ```createAppContainer()```. It accepts three parameter
- NavigationScreens
- NavigationParameter
- Object (Optional)

**Step 3: Pass result of ```getSvgAnimatingBottomBarStack``` to ```createAppContainer```**

```
const BottomBarStack = getSvgAnimatingBottomBarStack(
  NavigationScreens,
  NavigationParameter,
  {bottomBarConfig},
);

const AppContainer = createAppContainer(BottomBarStack);

```

## *getSvgAnimatingBottomBarStack* params

##### NavigationScreens
This parameter is an object in which we specify our Component(screen) correspoding to a route or simply first argument we passed in ```createBottomTabNavigator```
while setting up our basic navigation without any navigation options.

```
const NavigationScreens = {
  [RouteName.Home]: Home,
  [RouteName.Chat]: Chat,
  [RouteName.Setting]: Setting,
  [RouteName.Profile]: Profile,
};

```

##### NavigationParameter
This argument is an array to specify argument to be used by individual tab. For example, in the ```NavigationScreens```, we have 4 routes defined so we will 
also create an array of 4 object -- 1 for each tab in the same order.

```
const NavigationParameter = [
  {
    label: RouteName.Home,
    routeName: RouteName.Home,
    icons: TabBarIcons.Home,
  },

  {
    label: RouteName.Chat,
    routeName: RouteName.Chat,
    icons: TabBarIcons.Conversation,
  },

  {
    label: RouteName.Setting,
    routeName: RouteName.Setting,
    icons: TabBarIcons.HealthCard,
  },

  {
    label: RouteName.Profile,
    routeName: RouteName.Profile,
    icons: TabBarIcons.Timeline,
  },
];
```

**Various customization property are**

Property | Description | Default
| --- | --- | --- |
label             | Title of the tabbar                 | empty
icons             | Object of active and inactive icons | {selected: null, unselected: null}
route             | Route to navigate to                | null
activeTintColor   | Tint color when tab is selected     | null
inactiveTintColor | Tint color when tab is not selected | null
activeIconScale   | Image scale when tab is selected.  Image scale is 1 when not selected  | 1
yTranslation      | Image transation from its initial position when tab is selected        | 28


##### Object
This argument so of now just accepts 1 property which is ```bottomBarConfig```. ```bottomBarConfig``` is used to customize bottom bar. 
Various property available are :-

Property | Description | Default
| --- | --- | --- |
backgroundColor | Background color of the bottom bar and circular selected view in tab  | white
height          | Height of the bottom bar                                              | 100
bottom          | Bottom padding of the tabbar content. It don't change height of the bottom bar nor it create any distance between bottom of the screen and tabbar | 0
curveWidth      | Total width of the curve of the selected tab                          | 82
curveDepth      | Depth of the curve. Deeper the curve steeper the curve will be        | 43
animationDuration | Animation duration of the slide animation in milliseconds           | 400
tabCircleDiameter | Diameter of the circular shape behind selected tab. Common for all tabs | 44
extraMarginBetweenTabIconAndLabel | Margin between tab icon and tab label               | 0



