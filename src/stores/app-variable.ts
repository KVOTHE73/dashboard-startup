import { defineStore } from "pinia";

export function generateVariables() {
	return {
		font: {
			bodyFontFamily: (getComputedStyle(document.body).getPropertyValue('--bs-body-font-family')).trim(),
			bodyFontSize: (getComputedStyle(document.body).getPropertyValue('--bs-body-font-size')).trim(),
			bodyFontWeight: (getComputedStyle(document.body).getPropertyValue('--bs-body-font-weight')).trim()
		},
		color: {
			componentColor: (getComputedStyle(document.body).getPropertyValue('--bs-component-color')).trim(),
			componentBg: (getComputedStyle(document.body).getPropertyValue('--bs-component-bg')).trim(),
			theme: (getComputedStyle(document.body).getPropertyValue('--bs-app-theme')).trim(),
			blue: (getComputedStyle(document.body).getPropertyValue('--bs-blue')).trim(),
			teal: (getComputedStyle(document.body).getPropertyValue('--bs-teal')).trim(),
			green: (getComputedStyle(document.body).getPropertyValue('--bs-green')).trim(),
			lime: (getComputedStyle(document.body).getPropertyValue('--bs-lime')).trim(),
			orange: (getComputedStyle(document.body).getPropertyValue('--bs-orange')).trim(),
			red: (getComputedStyle(document.body).getPropertyValue('--bs-red')).trim(),
			cyan: (getComputedStyle(document.body).getPropertyValue('--bs-cyan')).trim(),
			purple: (getComputedStyle(document.body).getPropertyValue('--bs-purple')).trim(),
			yellow: (getComputedStyle(document.body).getPropertyValue('--bs-yellow')).trim(),
			indigo: (getComputedStyle(document.body).getPropertyValue('--bs-indigo')).trim(),
			pink: (getComputedStyle(document.body).getPropertyValue('--bs-pink')).trim(),
			black: (getComputedStyle(document.body).getPropertyValue('--bs-black')).trim(),
			white: (getComputedStyle(document.body).getPropertyValue('--bs-white')).trim(),
			gray: (getComputedStyle(document.body).getPropertyValue('--bs-gray')).trim(),
			dark: (getComputedStyle(document.body).getPropertyValue('--bs-dark')).trim(),
			gray100: (getComputedStyle(document.body).getPropertyValue('--bs-gray-100')).trim(),
			gray200: (getComputedStyle(document.body).getPropertyValue('--bs-gray-200')).trim(),
			gray300: (getComputedStyle(document.body).getPropertyValue('--bs-gray-300')).trim(),
			gray400: (getComputedStyle(document.body).getPropertyValue('--bs-gray-400')).trim(),
			gray500: (getComputedStyle(document.body).getPropertyValue('--bs-gray-500')).trim(),
			gray600: (getComputedStyle(document.body).getPropertyValue('--bs-gray-600')).trim(),
			gray700: (getComputedStyle(document.body).getPropertyValue('--bs-gray-700')).trim(),
			gray800: (getComputedStyle(document.body).getPropertyValue('--bs-gray-800')).trim(),
			gray900: (getComputedStyle(document.body).getPropertyValue('--bs-gray-900')).trim(),
			bodyBg: (getComputedStyle(document.body).getPropertyValue('--bs-body-bg')).trim(),
			bodyBgRgb: (getComputedStyle(document.body).getPropertyValue('--bs-body-bg-rgb')).trim(),
			borderColor: (getComputedStyle(document.body).getPropertyValue('--bs-border-color')).trim(),
			borderColorTranslucent: (getComputedStyle(document.body).getPropertyValue('--bs-border-color-translucent')).trim(),
		
			bodyColor: (getComputedStyle(document.body).getPropertyValue('--bs-body-color')).trim(),
			bodyColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-body-color-rgb')).trim(),
			componentColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-component-color-rgb')).trim(),
			componentBgRgb: (getComputedStyle(document.body).getPropertyValue('--bs-component-bg-rgb')).trim(),
			themeRgb: (getComputedStyle(document.body).getPropertyValue('--bs-app-theme-rgb')).trim(),
			blueRgb: (getComputedStyle(document.body).getPropertyValue('--bs-blue-rgb')).trim(),
			greenRgb: (getComputedStyle(document.body).getPropertyValue('--bs-green-rgb')).trim(),
			tealRbg: (getComputedStyle(document.body).getPropertyValue('--bs-teal-rgb')).trim(),
			limeRgb: (getComputedStyle(document.body).getPropertyValue('--bs-lime-rgb')).trim(),
			orangeRgb: (getComputedStyle(document.body).getPropertyValue('--bs-orange-rgb')).trim(),
			redRgb: (getComputedStyle(document.body).getPropertyValue('--bs-red-rgb')).trim(),
			cyanRgb: (getComputedStyle(document.body).getPropertyValue('--bs-cyan-rgb')).trim(),
			purpleRgb: (getComputedStyle(document.body).getPropertyValue('--bs-purple-rgb')).trim(),
			yellowRgb: (getComputedStyle(document.body).getPropertyValue('--bs-yellow-rgb')).trim(),
			indigoRgb: (getComputedStyle(document.body).getPropertyValue('--bs-indigo-rgb')).trim(),
			pinkRgb: (getComputedStyle(document.body).getPropertyValue('--bs-pink-rgb')).trim(),
			blackRgb: (getComputedStyle(document.body).getPropertyValue('--bs-black-rgb')).trim(),
			whiteRgb: (getComputedStyle(document.body).getPropertyValue('--bs-white-rgb')).trim(),
			grayRgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-rgb')).trim(),
			darkRgb: (getComputedStyle(document.body).getPropertyValue('--bs-dark-rgb')).trim(),
			gray100Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-100-rgb')).trim(),
			gray200Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-200-rgb')).trim(),
			gray300Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-300-rgb')).trim(),
			gray400Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-400-rgb')).trim(),
			gray500Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-500-rgb')).trim(),
			gray600Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-600-rgb')).trim(),
			gray700Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-700-rgb')).trim(),
			gray800Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-800-rgb')).trim(),
			gray900Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-900-rgb')).trim()
		}
	}
};

export const useAppVariableStore = defineStore("appVariable", () => {
  return generateVariables();
});