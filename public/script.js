$('#btn').click(function () {
    $.post("/post", {name: "Roee", role: "Climber"});
    console.log("clicked")
});