async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const parsedResponse = await response.json();
        //console.log(parsedResponse);
        addUsersToDOM(parsedResponse);
    } catch (err) {
        console.log(err)
    }

}

getUsers();

function addUsersToDOM(data) {
    // targets class where users will render (parent class)
    let table = document.getElementsByClassName('users')[0];

    data.forEach(users => {
        // creates new elements for users (child elements)
        let tr = document.createElement('tr')
        let id = document.createElement('th')
        let name = document.createElement('th')
        let userName = document.createElement('th')
        let email = document.createElement('th')
        let adress = document.createElement('th')
        let phone = document.createElement('th')
        let website = document.createElement('th')
        let company = document.createElement('th')

        userName.onclick = () => {
            // clearPost will always clear out the inner HTML in order to render new posts when clicked
            clearPosts();
            // passing the text value 
            getPosts(id.innerText)
        }
        // renders id in this element
        id.innerHTML = users.id;
        // renders name in this element
        name.innerHTML = users.name;
        // renders username in this element
        userName.innerHTML = users.username;
        // renders email in this element
        email.innerHTML = users.email;
        // renders adress(object) in this element
        adress.innerHTML =
            'Street: ' + users.address.street + ', ' +
            'Suite: ' + users.address.suite + ', ' +
            'City: ' + users.address.city + ', ' +
            'zipcode: ' + users.address.zipcode + ', ' +
            'Geo: ' + Object.values(users.address.geo);
        // renders phone in this element
        phone.innerHTML = users.phone;
        // renders website in this element
        website.innerHTML = users.website;
        // renders company(object) in this element
        company.innerHTML =
            'Name: ' + users.company.name + ', ' +
            'Catch-Phrase: ' + users.company.catchPhrase + ', ' +
            'Bs: ' + users.company.bs;
        // appends id/name/username...etc elemets inside tr
        tr.appendChild(id)
        tr.appendChild(name)
        tr.appendChild(userName)
        tr.appendChild(email)
        tr.appendChild(adress)
        tr.appendChild(phone)
        tr.appendChild(website)
        tr.appendChild(company)
        // finally tr gets appended to table(parent) where all subordinate childs will now live
        table.appendChild(tr);
    });
}

// this function takes in the value of the user's id as an argument and returns it's respective posts
async function getPosts(data) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${data}`);
        const parsedResponse = await response.json();
        //console.log(parsedResponse);
        renderPosts(parsedResponse);
    } catch (err) {
        console.log(err)
    }

}

// renders posts
function renderPosts(data) {
    data.forEach(post => {
        let parent = document.getElementsByClassName('posts')[0];
        let button = document.getElementsByClassName('clr-btn')[0];
        // button will render then posts right after
        button.innerHTML = '<button onclick="clearPosts()">Clear</button>'
        parent.innerHTML += `
        <div> 
            <h4>UserId: ${post.userId}</h4>
            <h4>id: ${post.id}</h4>
            <h1>Title: ${post.title}</h1>
            <h2>Body: ${post.body}</h2>
        </div>`;
        //console.log(post)
    })
}

// clears values for posts and button
function clearPosts() {
    let button = document.getElementsByClassName('clr-btn')[0];
    button.innerHTML = '';

    let parent = document.getElementsByClassName('posts')[0];
    parent.innerHTML = ``;
}