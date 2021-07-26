import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get('/hello', (context) => {
    context.response.body = 'test!!';
});

app.use(router.routes()).use(async (context) => {
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/dist`,
        index: `index.html`
    });
})

app.use(router.allowedMethods());

await app.listen({ port: 9090 });