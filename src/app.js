import { createSSRApp, h } from "vue";
import algoliasearch from "algoliasearch/lite";
import { createServerRootMixin } from "vue-instantsearch/dist/vue3/es";
import App from "./App.vue";

export default function() {
  const searchClient = algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
  );

  let resultsState;

  const app = createSSRApp({
    mixins: [
      createServerRootMixin({
        indexName: "instant_search",
        searchClient
      })
    ],
    async serverPrefetch() {
      resultsState = await this.instantsearch.findResultsState(this);
      return resultsState;
    },
    beforeMount() {
      if (typeof window === "object" && window.__ALGOLIA_STATE__) {
        this.instantsearch.hydrate(window.__ALGOLIA_STATE__);
        delete window.__ALGOLIA_STATE__;
      }
    },
    render: () => h(App)
  });

  return { app, getResultsState: () => resultsState };
}
