const main_goals = document.querySelector('.main-goals');
let current_goals;
let past_goals;

document.addEventListener('DOMContentLoaded', function() {
  console.log(dayjs().format());
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

  current_goals = document.getElementById('current-goals-id');
  console.log("### DOMContentLoaded: set current_goals=" +current_goals);
  past_goals = document.getElementById('past-goals-id');

  // add recipe form
  //const forms = document.querySelectorAll('.side-form');
  //M.Sidenav.init(forms, {edge: 'left'});
});

// render goal data
const renderMainGoal = (goal, id) => {
  
  let current_streak = pad(goal.current_streak, 3);
  let check_box_status = (goal.checked == true) ? "check_box" : "check_box_outline_blank";
  
  const html = `
    <div class="card-panel white row valign-wrapper" data-id="${id}">
        <div class="col s3 left-align">
          <i class="material-icons medium" data-id="${id}">${check_box_status}</i>
        </div>
        <div class="col s7">
          <div class="goal-title">${goal.name}</div>
        </div>
        <div class="col s2 right-align">
          <div class="streak-flame-small">
            <img src="/img/flame.png" height="65" width="auto">
            <p>${current_streak}</p>
          </div>
        </div>
    </div>
  `;
  if ( main_goals !== null ) {
    main_goals.innerHTML += html;
  }
}

var renderGoal = (goal, id) => {
  let today = new Date();
  let goal_end = goal.end ? dayjs(goal.end) : dayjs(today);  // HACK TODO
  let html;
  console.log(" ###  renderGoal:  today,goal_end,end: ", today, goal_end, goal.end);
  if (goal_end.isBefore(today, 'day')) {
    console.log("this goal has ended:  " + goal.name);

    let longest_streak = pad(goal.longest_streak, 3);
    let formatted_date = dayjs(goal_end).format('MMMM D, YYYY');

    html = `
    <div class="card-panel white row valign-wrapper">
      <div>
        <div class="goal-title">${goal.name}</div>
        <div class="goal-details">Completed ${formatted_date}</div>
      </div>
      <div class="col s2 right-align">
        <div class="streak-flame-small">
          <img src="/img/flame.png" height="65" width="auto">
          <p>${longest_streak}</p>
        </div>
      </div>
    </div>
    `
    
    if ( past_goals !== null ) {
      past_goals.innerHTML += html;
    }

  } else {
    console.log("this goal is in progress: " + goal.name);

    let current_streak = pad(goal.current_streak, 3);
    
    html = `
    <div class="card-panel recipe white row valign-wrapper">
        <div class="goal-title">${goal.name}</div>
        <div class="col s2 right-align">
          <div class="streak-flame-small">
            <img src="/img/flame.png" height="65" width="auto">
            <p>${current_streak}</p>
          </div>
        </div>
    </div>
    `
    //console.log("  #### renderGoals:  current_goals=" +goals);
    
    if ( current_goals !== null ) {
      current_goals.innerHTML += html;
    }
  }
}

const pad = (input, maxLen) => {
  //console.log(input.toString(10), input.toString(10).length);
  let output = "";
  for (let spaces = input.toString(10).length; spaces < maxLen; spaces += 1) {
    output += "&nbsp;";
  }
  output += input;
  return output;
}

/*
const mock_goal = (name) => {
  return {
    name: name,
    longest_streak: 42,
    current_streak: 3
  }
}

console.log(" ### mock_goal: ", mock_goal('second-goal'));
*/

const set_gem_amount = (amount) => {
  var elms = document.getElementsByClassName('gems')
  console.log("setting gem amount=" + amount +',  elements.length=' + elms.length);
  for (var i = 0; i < elms.length; i++) {
    console.log("setting gems #" + i);
    elms[i].textContent = amount;  // innerHTML or textContent
  }
}