import { ColorPartial } from '@mui/material/styles/createPalette'

type RequiredColor = Omit<Required<ColorPartial>, 'A100' | 'A200' | 'A400' | 'A700'>

const primary: RequiredColor = {
  50: '#F3E6FF',
  100: '#E5CCFF',
  200: '#CB99FF',
  300: '#B166FF',
  400: '#9733FF',
  500: '#7D00FF',
  600: '#5E00BF',
  700: '#3F0080',
  800: '#1F0040',
  900: '#0D001A',
}

const secondary: RequiredColor = {
  50: '#FFF6E6',
  100: '#FFECCC',
  200: '#FFD999',
  300: '#FFC566',
  400: '#FFB233',
  500: '#FF9F00',
  600: '#BF7700',
  700: '#805000',
  800: '#402800',
  900: '#1A1000',
}

const tertiary: RequiredColor = {
  50: '#E6FAF4',
  100: '#CCF5E9',
  200: '#99EBD2',
  300: '#66E0BC',
  400: '#33D6A5',
  500: '#00CC8F',
  600: '#00996B',
  700: '#006648',
  800: '#003324',
  900: '#00140E',
}

const error: RequiredColor = {
  50: '#FAE6EF',
  100: '#F5CCDD',
  200: '#EB99BB',
  300: '#E0669A',
  400: '#D63378',
  500: '#CC0056',
  600: '#990041',
  700: '#66002B',
  800: '#330016',
  900: '#140009',
}

const info: RequiredColor = {
  50: '#E8F2FA',
  100: '#D0E3F5',
  200: '#A1C7EB',
  300: '#72ACE0',
  400: '#4390D6',
  500: '#1474CC',
  600: '#0F5799',
  700: '#0A3A66',
  800: '#051D33',
  900: '#020C14',
}

const neutral: RequiredColor = {
  50: '#FFFFFF',
  100: '#F4F5F7',
  200: '#DCDFE1',
  300: '#C8CBD0',
  400: '#A4A9AD',
  500: '#8D9399',
  600: '#6A6E73',
  700: '#474A4D',
  800: '#232526',
  900: '#0E0F0F',
}

const grey: ColorPartial = {
  100: '#F0F3F5',
  200: '#E1E3E5',
  300: '#ABAFB2',
  500: '#8D9399',
  700: '#676E73',
  900: '#40464D',
}

export { error, grey, info, neutral, primary, secondary, tertiary }
