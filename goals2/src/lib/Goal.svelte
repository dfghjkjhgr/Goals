<script>
  export let category;
  export let searchTerm;
  export let completed;
  let areYouSure = -1;
  import { goals } from "../lib/store.js"
  function filterGoals(goals, completed, category, searchTerm) {
    // Filter categories
    let categoryFilteredGoals = goals.filter((goal) => goal.category === category)
    if (category === "All Categories") {
      categoryFilteredGoals = goals
    }
    
    let searchFilteredGoals = categoryFilteredGoals
    try {
      searchFilteredGoals = categoryFilteredGoals.filter((goal) => new RegExp(searchTerm, "i").test(goal.name))
    } catch (error) {
      // If the regex is malformed, treat it as if the search term was nothing
    }
	     
    let filteredGoals = []
    for (const goal of searchFilteredGoals) {
      let todos = Object.values(goal.todos)
      // If completed is false, don't include goals that have already been completed
      if (completed === false) {
	if (todos.includes(false)) {
	  filteredGoals = [...filteredGoals, goal]
	}
      } else {
	filteredGoals = [...filteredGoals, goal]
      }
    }
    filteredGoals = filteredGoals.sort((g1, g2) => new Date(g1.deadline) - new Date(g2.deadline))
    return filteredGoals
  }
  $: parsedGoals = filterGoals(JSON.parse(window.localStorage.getItem('goals')), completed, category, searchTerm)
  function deleteGoal(goalName) {
    // let index = parsedGoals.findIndex((g) => g.name === goalName)
    // parsedGoals.splice(index, 1)
    // parsedGoals = parsedGoals
    // window.localStorage.setItem("goals", JSON.stringify(parsedGoals))
    areYouSure = parsedGoals.findIndex((g) => g.name === goalName)
  }

  function accept(goalName) {
    let index = parsedGoals.findIndex((g) => g.name === goalName)
    parsedGoals.splice(index, 1)
    parsedGoals = parsedGoals
    window.localStorage.setItem("goals", JSON.stringify(parsedGoals))
    areYouSure = -1
  }
    
</script>

<div>
  <table class="table is-fullwidth">
    <thead>
      <tr class="is-size-5">
	<th>Name:</th>
	<th>Difficulty:</th>
	<th>Category:</th>
	<th>Deadline:</th>
	<th class="is-invisible"></th>
      </tr>
    </thead>
    <tbody>
      {#each parsedGoals as goal}
        <tr class="is-size-5">
	  <td class="has-text-semibold"><a href="/goals?name={goal.name}">{goal.name}</a></td>
          <td>{goal.difficulty}</td>
          <td>{goal.category}</td>
	  <td class="is-hidden-mobile">{new Date(goal.deadline).toLocaleString()}</td>
	  <td>
	    <button class="button has-background-danger has-text-weight-bold" on:click={() => deleteGoal(goal.name)}>DELETE!</button>
	    {#if areYouSure === parsedGoals.findIndex((g) => g.name === goal.name)}
	      <span>Are you sure? <span class="is-clickable" on:click={accept(goal.name)}>✓</span>/<span class="is-clickable" on:click={() => areYouSure = -1}>x</span></span>
	    {/if}
	  </td>
	</tr>
      {/each}
    </tbody>
  </table>
</div>


