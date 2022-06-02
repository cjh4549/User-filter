const result = document.getElementById('result');
const filter = document.getElementById('filter');

const listItems = [];

filter.addEventListener('input', function(e){
    filterData(e.target.value);
})

getData();

async function getData(){
    const response = await fetch('https://randomuser.me/api?results=50');

    //Taking the results property out of the api object using destructuring
    const { results } = await response.json();

    result.innerHTML = '';
    
    results.forEach(user => {
        const li = document.createElement('li');

        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `
        //pushing the newly created li with innerHTML to listItems array for search term use
        listItems.push(li);

        result.append(li);
    })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerHTML.toLowerCase().includes(`<h4>${searchTerm.toLowerCase()}`)) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    })
}
