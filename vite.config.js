import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    {
      name: 'html-transform-data',
      transformIndexHtml(html) {
        return html.replace(/VITE_APP_NAME/g, pkg.name);
      },
    },
  ],
  // You can keep `define` if you ALSO need this variable inside your JS files
  define: {
    'process.env.VITE_APP_NAME': JSON.stringify(pkg.name),
  },
});
