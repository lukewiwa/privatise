const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs/promises");

const OUTDIR = path.join(__dirname, "dist");
const SRCDIR = path.join(__dirname, "src");

(async () => {
  try {
    await fs.rm(OUTDIR, { recursive: true, force: true });
    await fs.mkdir(OUTDIR);
    console.log(`${OUTDIR} folder cleared`);

    fs.cp(SRCDIR, OUTDIR, {
      filter: (source) => path.extname(source) !== ".ts",
      recursive: true,
    });
  } catch (err) {
    console.error(err);
  }
  esbuild
    .build({
      entryPoints: [path.join(SRCDIR, "background.ts")],
      bundle: true,
      platform: "browser",
      outdir: OUTDIR,
    })
    .catch((e) => console.error(e.message));
})();
