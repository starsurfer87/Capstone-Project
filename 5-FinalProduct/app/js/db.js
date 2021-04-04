// real-time listener
db.collection("goals").onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added') {
            // add the document data to the web page
            //renderGoal(change.doc.data(), change.doc.id);
        }
    })
})