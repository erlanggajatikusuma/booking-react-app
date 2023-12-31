import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StatusBarProps,
  StatusBarPropsAndroid,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {color} from '../../theme';
import {isNonScrolling, offsets, presets} from './screen.presets';
import {ScreenProps} from './screen.props';

const isIos = Platform.OS === 'ios';

const majorVersionIOS = parseInt(String(Platform.Version), 10);

const CustomStatusBar = (props: StatusBarPropsAndroid & StatusBarProps) => {
  const insets = useSafeAreaInsets();
  const {backgroundColor, barStyle} = props;
  const customHeight = majorVersionIOS < 11 ? insets.top : 0;

  return (
    <View style={{height: customHeight, backgroundColor}}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
};

function ScreenWithoutScrolling(props: ScreenProps) {
  const {safeAreaEdges = ['bottom', 'top']} = props;
  const preset = presets().fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const statusBarStyle = props.statusBar || 'dark-content';
  const statusBarBackgroundColor = props.backgroundBar || color.white;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <CustomStatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        // translucent={props.statusBarTranslucent}
      />
      <SafeAreaView
        edges={props.unsafe ? ['left', 'right'] : safeAreaEdges}
        style={[preset.outer, backgroundStyle]}>
        <View style={[preset.inner, style]}>{props.children}</View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const {safeAreaEdges = ['bottom']} = props;
  const preset = presets().scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const statusBarStyle = props.statusBar || 'dark-content';
  const statusBarBackgroundColor = props.backgroundBar || color.white;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <CustomStatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        // translucent={props.statusBarTranslucent}
      />
      <ScrollView
        ref={props.scrollViewRef}
        contentInsetAdjustmentBehavior="automatic"
        style={[preset.outer, backgroundStyle]}
        contentContainerStyle={[preset.inner, style]}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView
          edges={props.unsafe ? ['left', 'right'] : safeAreaEdges}
          style={[preset.inner, backgroundStyle]}>
          {props.children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function Screen(props: ScreenProps) {
  const {hideOnBlurred = true} = props;
  const isFocused = useIsFocused();
  if (hideOnBlurred && !isFocused) {
    return null;
  }
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
