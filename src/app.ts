import express from 'express';
import { getResp } from './carbon';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	getResp('hehe', 'huhu');
	res.send('hello');
});

app.listen(port, () => console.log('server running'));
