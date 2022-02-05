var editableQuestion;
var updatedContent = {};

function show_button() {

    var form = document.getElementById("form-controller");
    var submitter = document.getElementById("delete");
    var domain = document.getElementsByClassName("selected_question");
    var presentDomain = domain[0].id;
    updatedContent.SNo = parseInt(document.getElementById("qnum").value);
    updatedContent.currentDomain = presentDomain;
    updatedContent.action = "Delete";
    document.getElementById("hidden-input").value = JSON.stringify(updatedContent);
    submitter.type = "submit";
    form.method = "post";
}

function btnSave() {

    var but = document.getElementById("change").innerHTML;
    var form = document.getElementById("form-controller");
    var submitter = document.getElementById("change");
    var domain = document.getElementsByClassName("selected_question");
    var presentDomain = domain[0].id;
    if (but === "Save Changes") {
        document.getElementById("delete").style.display = "none";
        updatedContent.SNo = parseInt(document.getElementById("qnum").value);
        updatedContent.Question = document.getElementById("mainQuestion").value;
        updatedContent.OptionA = document.getElementById("mainOptionA").value;
        updatedContent.OptionB = document.getElementById("mainOptionB").value;
        updatedContent.OptionC = document.getElementById("mainOptionC").value;
        updatedContent.OptionD = document.getElementById("mainOptionD").value;
        updatedContent.currentDomain = presentDomain;
        updatedContent.action = "Edit";
        document.getElementById("hidden-input").value = JSON.stringify(updatedContent);
        submitter.type = "submit";
        form.method = "post";
        document.getElementById("change").innerHTML = "Edit";
        var e1 = document.getElementsByClassName("content");
        for (var i = 0; i < e1.length; i++) {
            e1[i].disabled = true;
        }
    }
    if (but === "Edit") {
        document.getElementById("delete").style.display = "block";
        submitter.type = "button";
        form.method = "";
        document.getElementById("change").innerHTML = "Save Changes";
        var e1 = document.getElementsByClassName("content");
        for (var i = 0; i < e1.length; i++) {
            e1[i].disabled = false;
        }
    }
}


function getId(btn) {
    editableQuestion = JSON.parse(btn.id);
    document.getElementById("qnum").innerHTML = editableQuestion["SNo"];
    document.getElementById("mainQuestion").innerHTML = editableQuestion["Question"];
    document.getElementById("mainOptionA").innerHTML = editableQuestion["OptionA"];
    document.getElementById("mainOptionB").innerHTML = editableQuestion["OptionB"];
    document.getElementById("mainOptionC").innerHTML = editableQuestion["OptionC"];
    document.getElementById("mainOptionD").innerHTML = editableQuestion["OptionD"];
}

function selectCategory() {
    var category = document.getElementById("category");
    var selectedCategory = category.options[category.selectedIndex].text;
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