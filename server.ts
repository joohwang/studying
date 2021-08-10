import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get('/hello', (context) => {
    context.response.body = 'test!!';
});

app.use(async (context) => {
    console.log(context.request.url);
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}`,
        index: `index.html`
    });
}).use(router.routes());

app.use(router.allowedMethods());

await app.listen({ port: 9090 });