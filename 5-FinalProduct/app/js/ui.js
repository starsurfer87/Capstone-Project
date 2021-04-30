const main_goals = document.querySelector('.main-goals');

let current_goals;
let past_goals;
let instances;
let badge_modal;
let goal_modal;
let goal_modal_container;

document.addEventListener('DOMContentLoaded', function() {
  console.log(dayjs().format());
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

  current_goals = document.getElementById('current-goals-id');
  console.log("### DOMContentLoaded: set current_goals=" +current_goals);
  past_goals = document.getElementById('past-goals-id');
  goal_modal_container = document.querySelector('#goal-modal');

  var elems = document.querySelectorAll('.modal');
  if (elems) {
    instances = M.Modal.init(elems); 
  }
  var elem1 = document.querySelector('#badge-modal');
  if (elem1) {
    badge_modal = M.Modal.getInstance(elem1);
  }
  var elem2 = document.querySelector('#goal-modal');
  if (elem2) {
    goal_modal = M.Modal.getInstance(elem2);
  }
  
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
      <div class="card-panel goal white row valign-wrapper" data-id="${id}">
          <div class="col s3 left-align">
            <i class="material-icons medium" data-icon-id="${id}">${check_box_status}</i>
          </div>
          <div class="col s7" onclick="getGoalDetails('${id}', 'current')">
            <div class="goal-title">${goal.name}</div>
          </div>
          <div class="col s2 right-align" onclick="getGoalDetails('${id}', 'current')">
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
    <div class="card-panel goal white row valign-wrapper" data-id="${id}" onclick="getGoalDetails('${id}', 'past')">
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
    <div class="card-panel goal white row valign-wrapper" data-id="${id}" onclick="getGoalDetails('${id}', 'current')">
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

const renderGoalDetails = (goal, goal_status) => {
  console.log("rendering goal details");
  let longest_streak = pad(goal.longest_streak, 4);
  let percentage = Math.round((goal.total_completed / goal.total)*100) + "%";
  percentage = pad(percentage, 4);
  let start_date = dayjs(goal.start).format('MMMM D, YYYY');
  let end_date = dayjs(goal.end).format('MMMM D, YYYY');
  let goal_html;
  if (goal_status == 'current') {
    let current_streak = pad(goal.current_streak, 4);
    goal_html = `
    <div class="modal-content">
      <div class="row">
        <div class="col s2">
          <a href="#!" class="modal-close">
            <h6 class="grey-text text-darken-1">Back</h6>
          </a>
        </div>
        <div class="col s8 center-align">
          <h5>${goal.name}</h5>
        </div>
        <div class="col s2"></div>
      </div>
      <div class="goal-details-content grey-text text-darken-1">
        <h6>Description:</h6>
        <p>${goal.description}</p>
        <br>
        <div class="row">
          <div class="col s4 center-align goal-title">Current</div>
          <div class="col s4 center-align goal-title">Longest</div>
          <div class="col s4 center-align goal-title">Progress</div>
          <div class="col s4 center-align">
            <div class="streak-flame-large">
              <img src="/img/flame.png" height="90" width="auto">
              <p>${current_streak}</p>
            </div>
          </div>
          <div class="col s4 center-align">
            <div class="streak-flame-large">
              <img src="/img/flame.png" height="90" width="auto">
              <p>${longest_streak}</p>
            </div>
          </div>
          <div class="col s4 center-align">
            <div class="streak-flame-large">
              <img src="/img/flame.png" height="90" width="auto">
              <p>${percentage}</p>
            </div>
          </div>
        </div>
        <h6>Additional Information:</h6>
        <p>Start Date: ${start_date}</p>
        <p>End Date: ${end_date}</p>
        <p>Repeats every ${goal.interval} day(s) </p>
        <p>Completion Reward: ${goal.reward} gems </p>
      </div>
    </div>
    `
  } 
  else if (goal_status == 'past') {
    goal_html = `
    <div class="modal-content">
      <div class="row">
        <div class="col s2">
          <a href="#!" class="modal-close">
            <h6 class="grey-text text-darken-1">Back</h6>
          </a>
        </div>
        <div class="col s8 center-align">
          <h5>${goal.name}</h5>
        </div>
        <div class="col s2"></div>
      </div>
      <div class="goal-details-content grey-text text-darken-1">
        <h6>Description:</h6>
        <p>${goal.description}</p>
        <br>
        <div class="row">
          <div class="col s6 center-align goal-title">Longest</div>
          <div class="col s6 center-align goal-title">Progress</div>
          <div class="col s6 center-align">
            <div class="streak-flame-large">
              <img src="/img/flame.png" height="90" width="auto">
              <p>${longest_streak}</p>
            </div>
          </div>
          <div class="col s6 center-align">
            <div class="streak-flame-large">
              <img src="/img/flame.png" height="90" width="auto">
              <p>${percentage}</p>
            </div>
          </div>
        </div>
        <div class="col s12 center-align goal-title">Goal Completed!</div>
        <br>
        <h6>Additional Information:</h6>
        <p>Start Date: ${start_date}</p>
        <p>End Date: ${end_date}</p>
        <p>Repeats every ${goal.interval} day(s) </p>
        <p>Completion Reward: ${goal.reward} gems </p>
      </div>
    </div>
    `
  }
  if ( goal_modal_container !== null ) {
    goal_modal_container.innerHTML = goal_html;
    goal_modal.open(); 
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

const renderBadgeDetails = (id, badge_info, owned) => {
  let badge_html;
    let img_type = (badge_info.gif) ? 'gif' : 'png';
    let img_src = `/img/badges/${badge_info.collection}-${badge_info.number}.${img_type}`;
    if (owned) {
      badge_html = `
      <img class="responsive-img badge-owned" src="${img_src}" id="UobV7VPrAhYJ9pLXVGiY"></img>
      `
    }
    else {
      console.log("render badge: " + id);
      badge_html = `
      <img class="responsive-img badge-available" src="/img/badges/${badge_info.collection}-${badge_info.number}.png" id="UobV7VPrAhYJ9pLXVGiY">
      <div class="center">
        <button onclick="awardBadge('${id}', '${badge_info.price}', '${img_src}')" class="btn-small">Buy for ${badge_info.price} gems</button>
      </div>
      `
    }
    /*
      badge_html = `
      <h6>Details</h6>
      <p>Collection: ${badge_info.collection}</p>
      <p>Awarded: date </p>
      `
    */
    document.querySelector('.badge-details-content').innerHTML = badge_html;
    //console.log("$$$$$$$$ BADGE MODAL: " + badge_modal);
    badge_modal.open();
}

