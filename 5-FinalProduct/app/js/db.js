// real-time listener
db.collection("goals").onSnapshot((snapshot) => {
    //console.log("### db.goals snapshot:  " + snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log("### db.goals changed:  " + change, change.doc.data(), change.doc.id);
        if(change.type === 'added') {
            // add the document data to the web page
            renderMainGoal(change.doc.data(), change.doc.id);
            renderGoal(change.doc.data(), change.doc.id);
        } 
        else if(change.type === 'modified') {
            updateGoal(change.doc.data(), change.doc.id);
        }
    });
});

db.collection("users").onSnapshot((snapshot) => {
    console.log("### db.users snapshot:  " + snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        console.log("##### db.users changed:  " + change, change.doc.data(), change.doc.id, change.doc.data().gems);
        if(change.type === 'added' || change.type === 'modified') {
            // add the document data to the web page
            set_gem_amount(change.doc.data().gems);
            var badges = change.doc.data().badges_owned;
            badges.forEach(badge => {
                set_badge_display(badge);
            })
        }
    });
});

const form = document.querySelector('form');
if (form) {
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
}

// interacting with goals
goals_container = document.querySelector('.main-goals');
if (goals_container) {
    goals_container.addEventListener('click', evt => {
        console.log(evt);
        if(evt.target.tagName === 'I') {
            if(evt.target.textContent === 'check_box_outline_blank') {
                const id = evt.target.getAttribute('data-icon-id');
                const docRef = db.collection('goals').doc(id);
                docRef.update({
                    checked: true,
                    current_streak: firebase.firestore.FieldValue.increment(1),
                    total_completed: firebase.firestore.FieldValue.increment(1)
                });
            }
            if(evt.target.textContent === 'check_box') {
                const id = evt.target.getAttribute('data-icon-id');
                const docRef = db.collection('goals').doc(id);
                docRef.update({
                    checked: false,
                    current_streak: firebase.firestore.FieldValue.increment(-1),
                    total_completed: firebase.firestore.FieldValue.increment(-1)
                });
            }
        }
    });
}