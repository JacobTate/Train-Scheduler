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

var currentTime = moment();
    $("#button").on("click", function (event) {
        event.preventDefault();
       
        var trainName = $(".input1").val().trim();
        var dest = $(".input2").val().trim();
        var trainTime = $(".input3").val().trim();
        var Frequency = $(".input4").val().trim();
        var waitTime = currentTime.diff(moment(trainTime, "HH:mm"), "minutes")
        var nextArrival = moment(trainTime, "HH:mm");
        nextArrival.add(Frequency, "m")
        
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(dest),
            $("<td>").text(Frequency),
            $("<td>").text(nextArrival.format("HH:mm")),
            $("<td>").text(waitTime)
        )
        $(".table").append(newRow)

        database.ref().push({
            Name: trainName,
            Dest: dest,
            Time: trainTime,
            Frequency: Frequency,
            Wait: waitTime,
            Arrival: nextArrival.format("HH:mm")
        })

        $(".input1").val("")
        $(".input2").val("")
        $(".input3").val("")
        $(".input4").val("")

    });




});