import { Bundler, defaultPlugins } from "https://deno.land/x/bundler/mod.ts";
import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { Source } from "https://deno.land/x/bundler@0.8.1/plugins/plugin.ts";

type InOutData = {
    input: string
    outMap: {}
    bundler: Bundler
};

type Param = {
    in: string | undefined
    out: string | undefined
};

const createInOutData = (inputPath: string | undefined, outputPath: string | undefined): InOutData => {
    const plugins = defaultPlugins();
    const bundler = new Bundler(plugins);


    const input = inputPath || "src/index.html";
    const output = outputPath || "index.html";
    const outputMap = { [input]: output };

    return {
        input: input,
        outMap: outputMap,
        bundler: bundler
    };
}

const createBundle = async (param: Param) => {
    const result = createInOutData(param.in, param.out);
    const graph = await result.bundler.createGraph([result.input], result.outMap);
    const chunks = await result.bundler.createChunks([result.input], graph);
    const bundle: Record<string, Source> = await result.bundler.createBundles(chunks, graph);

    return bundle;
}

const createFile = async (bundle: Record<string, Source>) => {
    for (const prop in bundle) {

        const val = String(bundle[prop]);

        const encdoer = new TextEncoder();
        const data: Uint8Array = encdoer.encode(val);

        const newFile = await Deno.create(path.join(Deno.cwd(), prop));
        newFile.writeSync(data);
        newFile.close();

    }
}


const defaultBundle = async (
    inputPath: string | undefined,
    outputPath: string | undefined
) => {

    const param: Param = {
        in: inputPath,
        out: outputPath
    }

    const bundle: Record<string, Source> = await createBundle(param);
    createFile(bundle);

};

const cwd = Deno.cwd();

const watcher = await Deno.watchFs(`${cwd}/src`, { recursive: true });
for await (const evt of watcher) {
    let paths = evt.paths;
    for await (let p of paths) {
        p = p.replace(cwd.concat("/"), "");
        defaultBundle(p, p);
    }
}

defaultBundle(undefined, undefined);
