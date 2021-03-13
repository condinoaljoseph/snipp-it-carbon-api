import express, { Request, Response } from 'express';
import { validateBody, createUrlString } from './util';
import { getResponse } from './carbon';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('dist/app.js'));
}

app.get('/', function (req: Request, res: Response) {
	res.send('snipp it carbon api');
});

app.post('/', async function (req: Request, res: Response) {
	const validatedBody = validateBody(req?.body);
	const carbonUrl = createUrlString(validatedBody);
	const path = await getResponse(carbonUrl, 'example.png');

	res.send(path);
});

app.listen(port, () => console.log('server running'));
