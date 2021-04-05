const main_goals = document.querySelector('.main-goals');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  //const forms = document.querySelectorAll('.side-form');
  //M.Sidenav.init(forms, {edge: 'left'});
});

// render goal data
const renderGoal = (data, id) => {
  
  let current_streak = pad(data.current_streak, 3);
  let check_box_status = (data.checked == true) ? "check_box" : "check_box_outline_blank";
  
  const html = `
    <div class="card-panel white row valign-wrapper" data-id="${id}">
        <div class="col s3 left-align">
          <i class="material-icons medium" data-id="${id}">${check_box_status}</i>
        </div>
        <div class="col s7">
          <div class="goal-title">${data.name}</div>
        </div>
        <div class="col s2 right-align">
          <div class="streak-flame-small">
            <img src="/img/flame.png" height="65" width="auto">
            <p>${current_streak}</p>
          </div>
        </div>
    </div>
  `;

  main_goals.innerHTML += html;
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