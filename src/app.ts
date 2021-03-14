import express, { Request, Response } from 'express';

import { join } from 'path';
import { validateBody, createUrlString } from './util';
import { getResponse } from './carbon';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req: Request, res: Response) {
	res.send('snipp it carbon api');
});

app.post('/', async function (req: Request, res: Response) {
	const validatedBody = validateBody(req?.body);
	const imageDir = join(process.cwd(), 'public/example.png');
	const carbonUrl = createUrlString(validatedBody);
	try {
		const path = await getResponse(carbonUrl, imageDir);
		res.status(200).json({ path });
	} catch (err) {
		res.status(400).json({ err });
	}
});

app.listen(port, () => console.log('server running'));
