// real-time listener
db.collection("goals").onSnapshot((snapshot) => {
    console.log("### db.goals snapshot:  " + snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        console.log("### db.goals changed:  " + change, change.doc.data(), change.doc.id);
        if(change.type === 'added') {
            // add the document data to the web page
            renderMainGoal(change.doc.data(), change.doc.id);
            renderGoal(change.doc.data(), change.doc.id);
        }
    });
});

// add new goal
// const form2 = document.getElementById('add-goal-SKIP');
// form2.addEventListener('sumbit', evt => {
//     console.log('submitting form');
//     evt.preventDefault();
//     //let total_days = form.start.value.diff(form.end.value);
//     const goal = {
//         name: form2.name.value,
//         description: form2.description.value,
//         start: form2.start.value,
//         end: form2.end.value,
//         reward: form2.reward.value,
//         interval_type: 1,
//         interval: form2.interval.value,
//         longest_streak: 0,
//         current_streak: 0,
//         total: 0,
//         total_completed: 0,
//         checked: false
//     };

//     db.collection('goals').add(goal)
//         .catch(err => console.log(err));
    
//     //form.reset();
//     console.log('SUBMITTED');
// })

const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    console.log('--  submitting form  -----------------------------------');

    evt.preventDefault();

    const goal = {
        name: (form.name) ? form.name.value : "Unnamed",
        description: form.description.value,
        start: form.start.value,
        end: (form.end) ? form.end.value : "12/22/2222",
        reward: (form.reward) ? form.reward.value : 100,
        interval_type: 1,
        interval: (form.interval) ? form.interval.value : 1,
        longest_streak: 0,
        current_streak: 0,
        total: 0,
        total_completed: 0,
        checked: false
    };

    db.collection('goals').add(goal)
        .catch(err => console.log(err));

    form.name.value = '';

    console.log('--  submitted form  -----------------------------------');

});