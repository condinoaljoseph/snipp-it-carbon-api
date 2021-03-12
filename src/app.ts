import express from 'express';
import { validateBody, createUrlString } from './util';
import { getResponse } from './carbon';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.post('/', async function (req, res) {
	const validatedBody = validateBody(req.body);
	const carbonUrl = createUrlString(validatedBody);
	const path = await getResponse(carbonUrl, 'example.png');
	res.send('hello');
});

app.listen(port, () => console.log('server running'));
