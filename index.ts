import { Bundler, defaultPlugins } from "https://deno.land/x/bundler/mod.ts";
import * as path from "https://deno.land/std@0.102.0/path/mod.ts";

const defaultBundle = async (inputPath: string | undefined, outputPath: string | undefined) => {

    const plugins = defaultPlugins()
    const bundler = new Bundler(plugins);
    const input = inputPath || "src/index.html";
    const output = outputPath || "index.html";
    const outputMap = { [input]: output };


    console.log("outputMap >>>>>>>>>>>> ", inputPath, output);

    const graph = await bundler.createGraph([input], { outputMap });
    const chunks = await bundler.createChunks([input], graph);
    const bundle = await bundler.createBundles(chunks, graph);

    for (let prop in bundle) {

    }

    console.log("bundles >>>>>>>>>>>> ", bundle);

}

const cwd = Deno.cwd();

const watcher = await Deno.watchFs(`${cwd}/src`, { recursive: true });
for await (const evt of watcher) {

    let paths = evt.paths;
    for await (let p of paths) {

        console.log("fromFileUrl  ", path.fromFileUrl(path.toFileUrl(p).href));
        p = p.replace(cwd.concat('/'), '');
        defaultBundle(p, p);
    }

}


defaultBundle(undefined, undefined);