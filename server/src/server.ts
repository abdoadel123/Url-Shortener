import App from '@/app';
import UrlsRoute from '@/routes/urls.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new UrlsRoute()]);

app.listen();
