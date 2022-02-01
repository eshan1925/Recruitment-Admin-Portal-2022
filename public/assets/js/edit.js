function btnSave() {

    var but = document.getElementById("change").innerHTML;
    if (but === "Save Changes") {
        document.getElementById("change").innerHTML = "Edit";
        var e1 = document.getElementsByClassName("content");
        for (var i = 0; i < e1.length; i++) {
            e1[i].disabled = true;
        }
    }
    if (but === "Edit") {
        document.getElementById("change").innerHTML = "Save Changes";
        var e1 = document.getElementsByClassName("content");
        for (var i = 0; i < e1.length; i++) {
            e1[i].disabled = false;
        }
    }
}


function getId(btn) {
    // var Questions = "<%= passer %>";
    var editableQuestion = btn.id;
    document.getElementById("qnum").innerHTML = "Question " + editableQuestion;
    // document.getElementById("question-content").innerHTML = Questions[editableQuestion]['Question'];
}

function selectCategory() {
    var category = document.getElementById("category");
    var selectedCategory = category.options[category.selectedIndex].text;
    console.log(selectedCategory);
    let e2 = document.getElementById("easy");
    let e3 = document.getElementById("medium");
    let e4 = document.getElementById("hard");

    switch (selectedCategory) {
        case "All":
            e2.classList.remove("hidden");
            e3.classList.remove("hidden");
            e4.classList.remove("hidden");
            break;
        case "Easy":
            e2.classList.remove("hidden");
            e3.classList.add("hidden");
            e4.classList.add("hidden");
            break;
        case "Medium":
            e2.classList.add("hidden");
            e3.classList.remove("hidden");
            e4.classList.add("hidden");
            break;
        case "Hard":
            e3.classList.add("hidden");
            e2.classList.add("hidden");
            e4.classList.remove("hidden");
            break;

    }
}