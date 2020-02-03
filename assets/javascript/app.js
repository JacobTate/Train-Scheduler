$(document).ready(function () {
    //firebase
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCr9t9QA1Wr1q6Jmkt9YMGy4Tz3V1yKfDk",
        authDomain: "train-scheduler-a1ead.firebaseapp.com",
        databaseURL: "https://train-scheduler-a1ead.firebaseio.com",
        projectId: "train-scheduler-a1ead",
        storageBucket: "train-scheduler-a1ead.appspot.com",
        messagingSenderId: "110599949226",
        appId: "1:110599949226:web:a1a68bdc28167dbb6639d3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
    //gets the data from firebase
    database.ref().on("child_added", function (snapshot) {
        //gets the train name
        name = snapshot.val().Name
        //the destination
        dest = snapshot.val().Dest
        //the frequency
        Frequency = snapshot.val().Frequency
        //the time of arrival
        nextArrival = snapshot.val().Arrival
        //the minutes to arrival
        waitTime = snapshot.val().Wait
        //creates a table row
        var tRow = $("<tr>")
        //appends td tags to the row
        tRow.append(
            //the name
            $("<td>").text(name),
            //the destinition
            $("<td>").text(dest),
            //the frequency
            $("<td>").text(Frequency),
            //the time if arrival
            $("<td>").text(nextArrival),
            //the munutes to arrival
            $("<td>").text(waitTime)
        )
        //appends table row to the table
        $(".table").append(tRow)

    });
    //the current time
    var currentTime = moment();
    //the add train buton
    $("#button").on("click", function (event) {
        event.preventDefault();
        //the train name input
        var trainName = $(".input1").val().trim();
        //the destination input
        var dest = $(".input2").val().trim();
        //the the first train time input
        var trainTime = $(".input3").val().trim();
        //the frequency input
        var Frequency = $(".input4").val().trim();
        //the nextArrival formats the trainTime input  
        var nextArrival = moment(trainTime, "HH:mm");
        //gets the number of minutes from the current time to train time
        var waitTime = currentTime.diff(moment(nextArrival, "HH:mm "), "minutes")
        //adds the freuency the the time
        nextArrival.add(Frequency, "m")
        //formats the time
        nextArrival.format("HH:mm")
        //pushes the data to firebase
        database.ref().push({
            //the train name    
            Name: trainName,
            //the destination
            Dest: dest,
            //the frequency
            Frequency: Frequency,
            //the number of minuter form current time to train time converted the positive
            Wait: Math.abs(waitTime),
            //the next arrival time formatted
            Arrival: nextArrival.format("HH:mm")
        })
        //clears the inputs
        $(".input1").val("")
        $(".input2").val("")
        $(".input3").val("")
        $(".input4").val("")

    });




});