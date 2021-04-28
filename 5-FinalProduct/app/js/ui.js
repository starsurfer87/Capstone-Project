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
  if (dayIsBetween(dayjs(), goal.start, goal.end) && isIntervalDay(goal.start, goal.interval)) {
    let current_streak = pad(goal.current_streak, 3);
    let check_box_status = (dayjs().isSame(dayjs(goal.last_checked), 'day')) ? "check_box" : "check_box_outline_blank";
    
    const html = `
      <div class="card-panel white row valign-wrapper" data-id="${id}">
          <div class="col s3 left-align">
            <i class="material-icons medium" data-icon-id="${id}">${check_box_status}</i>
          </div>
          <div class="col s7">
            <div class="goal-title">${goal.name}</div>
          </div>
          <div class="col s2 right-align">
            <div class="streak-flame-small">
              <img src="/img/flame.png" height="65" width="auto">
              <p data-streak-id="${id}">${current_streak}</p>
            </div>
          </div>
      </div>
    `;
    if ( main_goals !== null ) {
      main_goals.innerHTML += html;
    }
  }
}

var renderGoal = (goal, id) => {
  let today = new Date();
  let goal_end = goal.end ? dayjs(goal.end) : dayjs(today);  // HACK TODO
  let html;
  //console.log(" ###  renderGoal:  today,goal_end,end: ", today, goal_end, goal.end);
  if (goal_end.isBefore(today, 'day')) {
    console.log("this goal has ended:  " + goal.name);

    let longest_streak = pad(goal.longest_streak, 3);
    let formatted_date = dayjs(goal_end).format('MMMM D, YYYY');

    html = `
    <div class="card-panel white row valign-wrapper" data-id="${id}">
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
    <div class="card-panel white row valign-wrapper" data-id="${id}">
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

var updateGoal = (goal, id) => {
  const checkbox = document.querySelector(`[data-icon-id=${id}]`);
  checkbox.textContent = (dayjs().isSame(dayjs(goal.last_checked), 'day'))? "check_box" : "check_box_outline_blank";  // innerHTML or textContent
  const streak = document.querySelector(`[data-streak-id=${id}]`);
  streak.innerHTML = pad(goal.current_streak, 3);
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

const dayIsBetween = (day, start, end) => {
  return (dayjs(day).isSame(start, 'day') || dayjs(day).isSame(end, 'day') || (dayjs(day).isAfter(start, 'day') && dayjs(day).isBefore(end, 'day'))) ? true : false;
}

const isIntervalDay = (start, interval) => {
  let daysSinceStart = dayjs().diff(start, 'day');
  console.log("$$$ today and start: " + dayjs().format('YYYY-MM-DD') + "and" + dayjs(start).format('YYYY-MM-DD'));
  console.log("DAYS SINCE START: " + daysSinceStart);
  console.log(daysSinceStart % interval)
  return (daysSinceStart % interval == 0) ? true : false;
}

const set_gem_amount = (amount) => {
  var elms = document.getElementsByClassName('gems')
  //console.log("setting gem amount=" + amount +',  elements.length=' + elms.length);
  for (var i = 0; i < elms.length; i++) {
    //console.log("setting gems #" + i);
    elms[i].textContent = amount;  // innerHTML or textContent
  }
}

const set_badge_display = (badge) => {
  var elms = document.getElementById(badge);
  if(elms) {
    elms.setAttribute("class", "responsive-img badge-owned")
  }
}