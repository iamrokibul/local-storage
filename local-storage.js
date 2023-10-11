// Get form value by hadler

const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const submitBtn = document.getElementById('submit_btn');
const clearData = document.getElementById('clear-data');
submitBtn.addEventListener('click', (e) => {
    const name = nameField.value;
    const email = emailField.value;
    const phone = phoneField.value;
    // check duplicate data
    let matched = 0;

    // Get data into local storage
    let userData = JSON.parse(localStorage.getItem('userInfo')) ?? [];

     // check duplicate data
    for(let data of userData){
        if(data.email === email || data.phone === phone){
            matched = 1;
            break;
        }
    }
    // Set alert for duplicate data
    if(matched === 1){
        alert("Sorry! email or phone already exists.");
    }else{
        userData.push({
            'name': name,
            'email': email,
            'phone': phone
        });

        // Set data into local storage
        localStorage.setItem('userInfo', JSON.stringify(userData));
        // Clear form data
        nameField.value = '';
        emailField.value = '';
        phoneField.value = '';
    }
    
    // Show Data after button click
    displayData();
});


// Display data from Local Storage
const displayData = () => {
    let userData = JSON.parse(localStorage.getItem('userInfo')) ?? [];
    const mainDiv = document.querySelector('.main');
    let finalData = '';
    userData.forEach((data, i) => {
        console.log(data, i);
        finalData += `
        <div class="card">
            <span onclick="deleteCard(${i})" id="close">x</span>
            <h3>Name: ${data.name}</h3>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
        </div>
        `;
        mainDiv.innerHTML = finalData;
    });
}

// Remove single card 
const deleteCard = (index) => {
    let userData = JSON.parse(localStorage.getItem('userInfo')) ?? [];
    userData.splice(index, 1);

    localStorage.setItem('userInfo', JSON.stringify(userData));
    displayData();
}

// Clear all cards
clearData.addEventListener('click', ()=>{
    localStorage.clear("userInfo");
    displayData();
})


// Display card on page load
displayData();
