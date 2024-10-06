function validateForm(event) {
    event.preventDefault();
    let name = document.forms["my_form"]["formName"].value;
    let email = document.forms["my_form"]["formEmail"].value;
    let date = document.forms["my_form"]["formDate"].value;
    let password = document.forms["my_form"]["formPassword"].value;
    let atc = document.forms["my_form"]["formTerms"].checked;

    // Email validation pattern
    const emailP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailP.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Date of birth validation (18-55 years old)
    const dob1 = new Date(date);
    const age = (Date.now() - dob1.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    if (age < 18 || age > 55) {
        alert("Please enter a date of birth for users between 18 and 55 years old.");
        return;
    }

    // Storing data
    let data = { name, email, password, date, atc };
    let user_entries = JSON.parse(localStorage.getItem("user_entries")) || [];

    user_entries.push(data);
    localStorage.setItem("user_entries", JSON.stringify(user_entries));

    displayEntries(); // Call displayEntries() to update the table after submission
    event.target.reset(); // Clear the form after submission
}

const displayEntries = () => {
    let user_entries = JSON.parse(localStorage.getItem("user_entries")) || [];
    console.log("Displaying entries: ", user_entries); // Debug: Log the entries to check

    let tableEntries = user_entries.map((entries) => `
        <tr>
            <td scope="row">${entries.name}</td>
            <td scope="row">${entries.email}</td>
            <td scope="row">${entries.password}</td>
            <td scope="row">${entries.date}</td>
            <td scope="row">${entries.atc ? 'true' : 'false'}</td>
        </tr>
    `).join("");
   
    document.getElementById("user-entries").innerHTML = tableEntries;
    console.log("Table updated!"); // Debug: Check if table update is happening
}

// Call displayEntries() on page load to display the existing entries
window.onload = function() {
    console.log("Page loaded, calling displayEntries...");
    displayEntries();
};
