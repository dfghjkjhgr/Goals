<script>
  import { goals } from "../lib/store.js"
  import { modalHidden } from "../lib/store.js"
  import Goal from "../lib/Goal.svelte";
  import CreateModal from "../lib/CreateModal.svelte";
  let completed = false
  // Get rid of repeated categories
  let categories = Array.from(new Set(["All Categories", ...JSON.parse($goals).map((goal) => goal.category)]))
  let category;
  let searchTerm = "";
</script>

<header class="ml-2">
  <span class="is-size-1">Your Goals:</span>
  <label for="search-bar" class="hidden">Search goals</label>
  <br/>
  <fieldset class="control">
    <input type="search" placeholder="Search 🔎" class="input is-3 column block is-rounded is-italic has-text-weight-semibold" bind:value={searchTerm}>

    <span>Sort by: </span>
    
    <select name="categories" class="category-sort select" bind:value={category}>
      {#each categories as category}
	<option value={category}>{category}</option>
      {/each}
    </select>

    <label class="checkbox is-size-5">
      Include completed goals?
      <input type="checkbox" class="completed-checkbox" bind:checked={completed}>
    </label>
  </fieldset>
</header>

<hr/>

<main>
  <!-- TODO: Change name of component to 'Goals' -->
  <Goal category={category} completed={completed} searchTerm={searchTerm}/>
  <span class="has-text-grey ml-1 is-clickable" on:click={() => $modalHidden = false}>+ add new goal</span>
</main>

<CreateModal hidden={$modalHidden}/>
<style>  
  .header-text {
    font-size: 30pt;
  }
  
  .inline-flex {
    display: inline-flex;
  }

  .hidden {
    visibility: hidden;
    width: 0;
    height: 0;
  }

</style>
