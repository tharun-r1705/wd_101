function validateForm(event) {
    event.preventDefault();
    let name = document.forms["my_form"]["form3Example1c"].value;
    let email = document.forms["my_form"]["form3Example3c"].value;
    let date = document.forms["my_form"]["form3Example4cd"].value;
    let password = document.forms["my_form"]["form3Example4c"].value;
    let atc = document.forms["my_form"]["form2Example3c"].checked;

    const emailP= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailP.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    let today = new Date();
    let birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth month hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Set the age limits
    const minAge = 18;
    const maxAge = 55;

    // Age validation
    if (age < minAge || age > maxAge) {
        alert(`Your age must be between ${minAge} and ${maxAge} years old.`);
        return; // Stop form submission if age is not valid
    }

    let data = { name, email, password, date, atc };
            
    let user_entries = JSON.parse(localStorage.getItem("user_entries")) || [];

    user_entries.push(data);
    localStorage.setItem("user_entries",JSON.stringify(user_entries));

    let tableEntries = user_entries.map((entries) => `
        
        <tr>
            <td scope = "row">${entries.name}</td>
            <td scope = "row">${entries.email}</td>
            <td scope = "row">${entries.password}</td>
            <td scope = "row">${entries.date}</td>
            <td scope = "row">${entries.atc ? 'true' : 'false'}</td>
        </tr>
    `).join("");
    document.getElementById("user-entries").innerHTML = tableEntries;
}


