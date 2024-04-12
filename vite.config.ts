import {defineConfig} from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";

import react from '@vitejs/plugin-react'
import {ManifestV3Export, crx} from "@crxjs/vite-plugin";

import manifestJSON from './manifest.json';

const manifest: ManifestV3Export = manifestJSON as ManifestV3Export;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tsconfigPaths(), react(), crx({manifest})],
})
