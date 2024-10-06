function validateForm(event) {
    event.preventDefault();
    alert("hello");
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
    const tableEntries = user_entries.map((entry) => {

        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.date}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.atc ? 'true' : 'false'}</td>`;
      
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        
        return row;
      }).join("\n");

      const table = `<table class="table-auto w-full"><tr>
<th class="px-4 py-2">Name</th>
  <th class="px-4 py-2">Email</th>
  <th class="px-4 py-2">Password</th>
  <th class="px-4 py-2">Dob</th>
  <th class="px-4 py-2">Accepted terms?</th>
</tr>
${tableEntries} </table>`;

let details = document.getElementById("user-entries");
details.innerHTML = table;
   
}

// Call displayEntries() on page load to display the existing entries
window.onload = function() {
    displayEntries();
};
