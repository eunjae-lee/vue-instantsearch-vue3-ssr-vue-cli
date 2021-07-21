<template>
  <ais-instant-search :search-client="searchClient" index-name="instant_search">
    <ais-search-box />
    <ais-stats />
    <ais-refinement-list attribute="brand" />
    <ais-hits>
      <template v-slot:item="{ item }">
        <p>
          <ais-highlight attribute="name" :hit="item" />
        </p>
        <p>
          <ais-highlight attribute="brand" :hit="item" />
        </p>
      </template>
    </ais-hits>
    <ais-pagination />
  </ais-instant-search>
</template>

<script>
import {
  AisInstantSearch,
  // AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination
} from "vue-instantsearch/dist/vue3/es";
import algoliasearch from "algoliasearch/lite";
const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default {
  components: {
    AisInstantSearch,
    // AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination
  },
  data() {
    return {
      searchClient
    };
  }
};
</script>
