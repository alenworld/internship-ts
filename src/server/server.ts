import express from 'express';
import { Express } from 'express-serve-static-core';
import middleware from '../config/middleware';
import routes from '../config/router';


/**
 * @type {express}
 * @constant {express.Application}
 */
const app: Express = express();

/**
 * @description express.Application Middleware
 */
middleware.init(app);

/**
 * @description express.Application Routes
 */
routes.init(app);

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

export default app;
