const defaultOptions = {
	backgroundColor: 'rgba(171, 184, 195, 1)',
	code: '',
	dropShadow: true,
	dropShadowBlurRadius: '68px',
	dropShadowOffsetY: '20px',
	exportSize: '2x',
	fontFamily: 'Hack',
	firstLineNumber: 1,
	fontSize: '14px',
	language: 'auto',
	lineNumbers: false,
	paddingHorizontal: '56px',
	paddingVertical: '56px',
	squaredImage: false,
	theme: 'seti',
	watermark: false,
	widthAdjustment: true,
	windowControls: true,
	windowTheme: null
};

const optionToQueryParam: any = {
	backgroundColor: 'bg',
	code: 'code',
	dropShadow: 'ds',
	dropShadowBlurRadius: 'dsblur',
	dropShadowOffsetY: 'dsyoff',
	exportSize: 'es',
	fontFamily: 'fm',
	firstLineNumber: 'fl',
	fontSize: 'fs',
	language: 'l',
	lineNumbers: 'ln',
	paddingHorizontal: 'ph',
	paddingVertical: 'pv',
	squaredImage: 'si',
	theme: 't',
	watermark: 'wm',
	widthAdjustment: 'wa',
	windowControls: 'wc',
	windowTheme: 'wt'
};

const ignoredOptions = [
	// Can't pass these as URL (So no support now)
	'backgroundImage',
	'backgroundImageSelection',
	'backgroundMode',
	'squaredImage',
	'hiddenCharacters',
	'name',
	'lineHeight',
	'loading',
	'icon',
	'isVisible',
	'selectedLines'
];

export function validateBody(payload: any): object {
	let validatedBody: any = {};

	if (!payload['code']) {
		throw new Error('code is required for creating carbon');
	}

	for (let option in payload) {
		if (ignoredOptions.hasOwnProperty(option)) {
			console.log(`Unsupported option: ${option} found. Ignored!`);
		}

		if (!defaultOptions.hasOwnProperty(option)) {
			console.log(`Unexpected option: ${option} found. Ignored!`);
		}

		validatedBody[option] = payload[option];
	}

	return validatedBody;
}

export function createUrlString(validatedBody: any): string {
	const BASE_URL = 'https://carbon.now.sh/';
	let url = '';
	let first = true;

	// if (
	// 	validatedBody?.backgroundColor.length === 7 ||
	// 	validatedBody?.backgroundColor.startsWith('#')
	// ) {
	// 	validatedBody['backgroundColor'] = hexToRgb(
	// 		validatedBody['backgroundColor']
	// 	);
	// }

	for (let option in validatedBody) {
		if (first) {
			first = false;
			url += `${BASE_URL}?${optionToQueryParam[option]}=${validatedBody[option]}`;
		} else {
			url += `&${optionToQueryParam[option]}=${validatedBody[option]}`;
		}
	}

	return url;
}

// function hexToRgb(hex: string): string {
// 	let aRgbHex: any = hex.match(/.{1,2}/g);
// 	let aRgb = [
// 		parseInt(aRgbHex[0], 16),
// 		parseInt(aRgbHex[1], 16),
// 		parseInt(aRgbHex[2], 16)
// 	];

// 	return `rgba(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]})`;
// }
