import pc from 'picocolors';

import app from './app';
import { env } from './config/env.config';

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(pc.blue(`> Server is running on Port: ${port}`));
});
