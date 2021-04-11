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
    })
})