const getData = async (method='GET', body=false) => {
    
    let bodyContent
    let headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFlMzU3MWNlYWY0ODAwMTVjOTE4NjIiLCJpYXQiOjE2MjIwMjk2ODEsImV4cCI6MTYyMzIzOTI4MX0.hWEhrY4Maa8j-xYWTEzS0vKjwvhbQ5eSApEaI2_tZKg'}
    if(method == 'POST' && body) {
        bodyContent = body
    }

    try {
        const response =  await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: method,
            body: bodyContent,
            headers: headers
        })
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            if (response.status === 400) {
            throw new Error("Bad request with status 400");
            } else if (response.status === 401) {
            throw new Error("Anauthorized with status 401");
            } else if (response.status === 404) {
            throw new Error("Not found with status 404");
            }
        }
    }
    catch (err) {
        alert(err.message)
    }
}

const generateCard = (item) => {
    const col = document.createElement('div')
    col.classList = 'col col-md-3'

    col.innerHTML = `
    <div class="card mb-3">
        <img src=${item.imageUrl} class="card-img-top w-100" alt="...">
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="sub-title">Brand: ${item.brand}</p>
            <p class="card-text">${item.description}</p>
            <span class="badge">Price: ${item.price}$</span>
        </div>
    </div>
    `
    return col.outerHTML
}

const display = (items) => {
    if(items.length > 0) {
        document.getElementById('cards').innerHTML = items.map(item => generateCard(item)).join('')
    } else {
        alert('No items')
    }
}

window.onload = async () => {
    display(await getData())
}