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

const submitItem = () => {
    console.log('ok')
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const brand = document.getElementById('brand').value
    const image = document.getElementById('image').value
    const price = document.getElementById('price').value

    const itemData = JSON.stringify({"name": name, "description": description, "brand": brand, "imageUrl": image, "price": price})

    getData("POST", itemData)
}