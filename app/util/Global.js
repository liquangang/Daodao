import {Dimensions,Platform,StatusBar,PixelRatio} from  'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';


const {width, height} = Dimensions.get('window');
const  OS = Platform.OS;
const ios = (OS == 'ios');
const android = (OS == 'android');


global.gScreen = {
    screen_width:width,
    screen_height:height,
    statusBarHeight:getStatusBarHeight(),
    onePixelRatio:1/PixelRatio.get(),
}

global.gDevice = {
    ios:ios,
    android:android,
}

global.gColor = {
    orangeTextColor: '#FB5442',
    orangeBackColor: '#FB5442',
    grayLineColor: '#F2F2F2',
    grayTextColor: '#A9A9A9',
}

