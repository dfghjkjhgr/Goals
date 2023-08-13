<script>
  import { params } from '@roxi/routify'
  import { goals } from '../lib/store.js'
  let parsedGoals = JSON.parse($goals)
  let goal = parsedGoals.filter(goal => goal.name === $params.name)[0]
  $: parsedGoals, window.localStorage.setItem("goals", JSON.stringify(parsedGoals))
  let goalIndex = parsedGoals.findIndex((g) => g.name === goal.name)
  let checked = {}
  $: stepPressed = false
  // Largely temporary variable; just there to hold the
  // name of the TODO the user is editing
  let todoName = "";

  function updateGoals() { parsedGoals[goalIndex] = goal }
    
  if (goal.todos === undefined) {
    // Prevent errors
    goal.todos = {}
  }
			       
  function addTodo(todoName) {
    goal.todos[todoName] = false
    stepPressed = false
    updateGoals()
    todoName = ""
  }

  function removeTodo(todoName) {
    delete goal.todos[todoName]
    updateGoals()
    todoName = ""
  }
</script>
<header class="mb-5 ml-1">
  <a href="/">← Back</a>
  <br>
  <span class="is-size-5 has-text-grey my-2">Goal name:</span>
  <h1 class="title is-1 my-2">{goal.name}</h1>
  <h2 class="is-size-4 my-2"><em>{goal.difficulty} Goal</em></h2>
  {#if (new Date(goal.deadline) < Date.now())}
    <span class="is-size-5 has-text-danger is-italic">This goal is past its {new Date(goal.deadline).toLocaleString()} deadline. Remember to finish it!</span>
  {:else}
    <span class="is-size-5">Finish by: <em>{new Date(goal.deadline).toLocaleString()}</em></span>
  {/if}
</header>
<main class="ml-1">
  <p class="is-size-5">{goal.description}</p>
  <form>
    {#if goal.todos.length !== 0}
      <span>Your TODO list:</span>
      <br>
      {#each Object.keys(goal.todos) as todokey}
	<label class="checkbox">
	  <input type="checkbox" class="is-size-3 has-background-danger" bind:checked={parsedGoals[goalIndex]["todos"][todokey]}>
          {todokey}
	</label>
	<span class="has-text-info is-clickable" on:click={() => removeTodo(todokey)}> remove</span>
	<br>
      {/each}
    {:else}
      <span>You have no todo list items assigned for this goal. </span>
    {/if}
  </form>
  {#if stepPressed === true}
    <div class="field is-grouped">
      <div class="control">
	<input type="input" class="input" placeholder="TODO name" bind:value={todoName}>
      </div>
      <div class="control">
	<button class="button has-background-primary has-text-white" on:click={() => addTodo(todoName)}>Add!</button>
      </div>
    </div>
  {:else}
    <span on:click={() => (stepPressed = true)} class="p-0 is-clickable has-text-grey">+ Add new step</span>
  {/if}
							    
</main>
  
