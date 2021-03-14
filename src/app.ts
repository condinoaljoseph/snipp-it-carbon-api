import express, { Request, Response } from 'express';

import { join, resolve } from 'path';
import { validateBody, createUrlString } from './util';
import { getResponse } from './carbon';

const app = express();
const port = process.env.PORT || 3000;
const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://snipp-it-carbon-api.herokuapp.com/'
		: 'http://localhost:3000';

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req: Request, res: Response) {
	res.send('snipp it carbon api');
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req: Request, res: Response) =>
		res.sendFile(resolve(join(process.cwd(), 'public/example.png')))
	);
}

app.post('/', async function (req: Request, res: Response) {
	const validatedBody = validateBody(req?.body);
	const imageDir = join(process.cwd(), 'public/example.png');
	const carbonUrl = createUrlString(validatedBody);
	try {
		const path = await getResponse(carbonUrl, imageDir);
		res.status(200).json({ path: `${BASE_URL + path}` });
	} catch (err) {
		res.status(400).json({ err });
	}
});

app.listen(port, () => console.log('server running'));
