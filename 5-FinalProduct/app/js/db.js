const checkStreak = (goal, id) => {
    console.log("checking streak");
    dateRequired = dayjs().subtract(goal.interval, 'day');
    if (dayjs(goal.last_checked).isBefore(dateRequired, 'day')) {
        const docRef = db.collection('goals').doc(id);
        docRef.update({
            current_streak: 0
        });
    }
}

// real-time listener
db.collection("goals").onSnapshot((snapshot) => {
    //console.log("### db.goals snapshot:  " + snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log("### db.goals changed:  " + change, change.doc.data(), change.doc.id);
        if(change.type === 'added') {
            // add the document data to the web page
            checkStreak(change.doc.data(), change.doc.id);
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

        const difference = dayjs(form.end.value).diff(form.start.value, 'day') + 1;
        console.log(difference);
        let total_days = Math.floor(difference / form.interval.value);
        console.log(total_days);
        if (difference % form.interval.value != 0) {
            total_days += 1;
        }
        console.log(total_days);


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
            total: total_days,
            total_completed: 0,
            last_checked: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),

        };

        db.collection('goals').add(goal)
            .then(() => {
                window.location.href = "/";
            })
            .catch(err => console.log(err));

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
                let new_longest_streak;
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        let goal = doc.data();
                        //console.log("current:", goal.current_streak, "longest: ", goal.longest_streak);
                        new_longest_streak = ((goal.current_streak + 1) > goal.longest_streak) ? (goal.current_streak + 1) : goal.longest_streak;
                        //console.log(new_longest_streak);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
                .then(() => {
                    //console.log(new_longest_streak);
                    docRef.update({
                    last_checked: dayjs().format('YYYY-MM-DD'),
                    current_streak: firebase.firestore.FieldValue.increment(1),
                    total_completed: firebase.firestore.FieldValue.increment(1),
                    longest_streak: new_longest_streak
                })})
                .catch((error) => {
                    console.log("Error getting document:", error);
                });

                const userRef = db.collection('users').doc('user1');
                userRef.update({
                    gems: firebase.firestore.FieldValue.increment(10)
                });
            }
            else if(evt.target.textContent === 'check_box') {
                const id = evt.target.getAttribute('data-icon-id');
                const docRef = db.collection('goals').doc(id);
                docRef.update({
                    last_checked: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
                    current_streak: firebase.firestore.FieldValue.increment(-1),
                    total_completed: firebase.firestore.FieldValue.increment(-1)
                });
                const userRef = db.collection('users').doc('user1');
                userRef.update({
                    gems: firebase.firestore.FieldValue.increment(-10)
                });
            }
        }
        else {
            //let goal_card = evt.target.parentElement.p;
            //console.log(goal_card);
            //console.log("found element");
            //console.log("view badge details");
            //goal_modal.open();  
        }
    });
}

const getGoalDetails = (id, goal_status) => {
    //console.log("getting goal details");
    var docRef = db.collection("goals").doc(id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            //console.log("Document data:", doc.data(), "id: ", doc.id);
            renderGoalDetails(doc.data(), goal_status);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// interacting with badges
badges_container = document.querySelector('.badges');
if (badges_container) {
    badges_container.addEventListener('click', evt => {
        //console.log(evt);
        if(evt.target.tagName === 'IMG') {
            const id = evt.target.getAttribute('id');
            const img_class = evt.target.getAttribute('class');
            const owned = (img_class == 'responsive-img badge-owned')
            //console.log(owned);
            //console.log(img_class);

            var docRef = db.collection("badges").doc(id);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    //console.log("Document data:", doc.data(), "id: ", doc.id);
                    renderBadgeDetails(doc.id, doc.data(), owned);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } 
    });
}

const awardBadge = (id, price, img_source) => {
    //console.log("award badge function activated");
    //console.log("award badge: " + id + "price: " + price);
    let gems;
    var docRef = db.collection("users").doc("user1");
    docRef.get()
    .then((doc) => {
        if (doc.exists) {
            //console.log("Document data:", doc.data(), "id: ", doc.id);
            gems = doc.data().gems;
            console.log(gems);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
    .then(() => {
        price = parseInt(price);
        console.log(gems, price);
        if (gems >= price) {
            console.log('buying badge');
            var docRef = db.collection("users").doc("user1");
            docRef.update({
                badges_owned: firebase.firestore.FieldValue.arrayUnion(`${id}`),
                gems: firebase.firestore.FieldValue.increment(-1 * price)
            })
            .then(() => {
                badge_html = `
                <img class="responsive-img badge-owned" src="${img_source}" id="UobV7VPrAhYJ9pLXVGiY"></img>
                `
                document.querySelector('.badge-details-content').innerHTML = badge_html;
            });
        }
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
    
}