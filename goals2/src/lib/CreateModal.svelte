<script>
  export let hidden = false
  import { goals } from "../lib/store.js"
  import { modalHidden } from "../lib/store.js"
  let goalName = ""
  let deadline = new Date();
  let difficulty = ""
  let description = ""
  let category = ""
  let categories = Array.from(new Set(["All Categories", ...JSON.parse($goals).map((goal) => goal.category)]))
  function createGoal(goalName, deadline, difficulty, description, category) {
    window.localStorage.setItem("goals", JSON.stringify([
      ...JSON.parse(window.localStorage.getItem("goals")),
      {
	name: goalName,
	deadline: deadline,
	difficulty: difficulty,
	description: description,
	category: category,
      }
    ]))
    console.log(deadline)

    window.location.assign(`/goals?name=${goalName}`)
  }
	
</script>
{@debug deadline}
<div class="modal" class:is-active={!hidden}>
  <div class="modal-background"></div>
  <div class="modal-card is-rounded">
    <header class="modal-card-head">
      <span class="modal-card-title">Create new goal</span>
      <button class="delete" aria-label="close" on:click={() => modalHidden.set(true)}></button>
    </header>
    <div class="modal-card-body">
      <label>
	Goal name:
	<input class="input my-3" type="text" placeholder="Enter in the name of your goal" bind:value={goalName}>
      </label>
      <label>
	Deadline:
	<br/>
	<input class="my-3" type="date" bind:value={deadline}>
	<br/>
      </label>
      <label>
        Difficulty:
	<br/>
	<input class="input my-3" type="text" placeholder="Enter how difficult you think the goal will be." bind:value={difficulty}>
      </label>
      <label>
        Description:
	<br/>
	<textarea class="input my-3" type="text" placeholder="Why are you doing this goal? Be specific!" bind:value={description}/>
      </label>
      <label>
        Category:
	<!-- TODO: add in category search -->
	<br/>
	<input class="input my-3" type="text" placeholder="Enter the category of your goal." bind:value={category}/>
      </label>
      <p>Your categories are:</p>
      <ul>
	{#each categories as category}
	     <li>{category}</li>
	{/each}
      </ul>
    </div>
    <footer class="modal-card-foot">
      <button class="button is-success rounded is-size-4" on:click={() => createGoal(goalName, deadline, difficulty, description, category)}>Create!</button>
    </footer>
  </div>
</div>

    
