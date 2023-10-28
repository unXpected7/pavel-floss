import React from 'react';
import { useFonts } from 'expo-font';
import { TextProps, Text as TextRN } from 'react-native';
import { fonts } from '@assets';

interface iText extends TextProps {
  fw: FontWeight;
  mt: number;
  mb: number;
  mr: number;
  ml: number;
  m: number;
  p: number;
  pr: number;
  pl: number;
  pb: number;
  pt: number;
  color: string;
  textAlign: TextAlign;
  mh: number;
  mv: number;
  ph: number;
  pv: number;
  fs: number;
  text: string;
}

const Text = (props: Partial<iText>) => {
  const [isFontsLoaded] = useFonts(fonts);

  const getFontFamily = (): string => {
    //@ts-expect-error: style is a type of StyleProps
    const fw: string = props?.fw ?? props?.style?.fontWeight ?? '';
    if (fw === 'normal') return 'Poppins400';

    if (fw === 'bold') return 'Poppins600';

    const fontFamily = 'Poppins' + fw;

    if (fontFamily in fonts) return fontFamily;

    return 'Poppins400';
  };

  if (!isFontsLoaded) return null;
  return (
    <TextRN
      {...props}
      style={[
        {
          fontFamily: getFontFamily(),
          ...ApplyPropStyles(props),
        },
        props?.style,
      ]}
    >
      {props?.children ?? props?.text}
    </TextRN>
  );
};

export default React.memo(Text);

export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'normal'
  | 'bold';

export type TextAlign = 'center' | 'right' | 'left' | 'justify';

const ApplyPropStyles = (props: Partial<iText>) => {
  const props_styles = {
    margin: props?.m,
    marginTop: props?.mt,
    marginBottom: props?.mb,
    marginLeft: props?.ml,
    marginRight: props?.mr,
    padding: props?.p,
    paddingTop: props?.pt,
    paddingBottom: props?.pb,
    paddingLeft: props?.pl,
    paddingRight: props?.pr,
    color: props?.color,
    textAlign: props?.textAlign,
    marginVertical: props?.mv,
    marginHorizontal: props?.mh,
    paddingVertical: props?.pv,
    paddingHorizontal: props?.ph,
    fontSize: props?.fs,
  };

  Object.keys(props_styles).forEach((key) => {
    //@ts-expect-error : it's own key
    if (props_styles[key] == null) {
      //@ts-expect-error : it's own key
      delete props_styles[key];
    }
  });
  return props_styles;
};
