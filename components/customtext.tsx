import { Text, TextProps } from 'react-native';

export function StyledText(props: TextProps) {
  return (
    <Text 
      {...props} 
      style={[
        { fontFamily: 'NotoSansThai-Regular' },
        props.style
      ]}
    />
  );
}