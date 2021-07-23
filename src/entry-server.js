import { renderToString } from "@vue/server-renderer";
import createApp from "./app";

export async function render() {
  const { app, getResultsState } = createApp();
  const appContent = await renderToString(app);
  const algoliaStateScript = `<script>window.__ALGOLIA_STATE__ = ${JSON.stringify(
    getResultsState()
  )}</script>`;

  const html = `${appContent}${algoliaStateScript}`;
  return { html };
}
