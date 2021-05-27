const handleData = async (method='GET', body=false, id='') => {
    
    let bodyContent
    let url = 'https://striveschool-api.herokuapp.com/api/product'
    let headers = {'Content-Type': 'application/json',
                   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFlMzU3MWNlYWY0ODAwMTVjOTE4NjIiLCJpYXQiOjE2MjIwMjk2ODEsImV4cCI6MTYyMzIzOTI4MX0.hWEhrY4Maa8j-xYWTEzS0vKjwvhbQ5eSApEaI2_tZKg'
                  }
    
    if(method != 'GET' && method != 'POST') {
        url += '/' + id
        console.log(url)
    }
    if(method == 'POST' && body) {
        bodyContent = body
    } 

    try {
        const response =  await fetch(url, {
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

const formVars = () => {
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const brand = document.getElementById('brand').value
    const image = document.getElementById('image').value
    const price = document.getElementById('price').value
    return [name, description, brand, image, price]
}

const submitItem = async () => {

    let formFields = formVars()

    const itemData = JSON.stringify({"name": formFields[0], "description": formFields[1], "brand": formFields[2], "imageUrl": formFields[3], "price": formFields[4]})

    await handleData("POST", itemData)
}

const genForm = async (type) => {
    
    const collapseBody = document.getElementById('formcollapse')
    const formCol = document.getElementById('formcol')

    let bg_color = '#198754'

    if(type == 'add') {
        collapseBody.innerHTML = `
            <form>
                <div class="mb-3 mt-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Example">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="brand" class="form-label">Brand</label>
                    <input class="form-control" id="brand" placeholder="Example"></input>
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Image URL</label>
                    <input class="form-control" id="image" placeholder="Image url"></input>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control" id="price" placeholder="100" min="0"></input>
                </div>
            </form>
        `
    } else {
        let btn
        if(type == 'edit') {
            bg_color = '#ffc107'
            btn = (id) => {
                let btn1 = `
                    <button type="button" class="btn btn-warning w-100 border-white">Edit Item</button>
                `
                return btn1
            }
        } else {
            bg_color = '#dc3545'
            btn = (id) => {
                let btn1 = `
                    <button type="button" class="btn btn-danger w-100 border-white" onclick="deleteItem('${id}')">Delete Item</button>
                `
                return btn1
            }
        }

        let fetchedData = await handleData()
        console.log(fetchedData)
        let carouselItems = fetchedData.map((item, index) => {
            let active = index > 0 ? '' : 'active'
            return `
            <div class="carousel-item ${active} d-flex justify-content-center flex-column">
                <div class="card mb-3">
                    <img src=${item.imageUrl} class="card-img-top w-100" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="sub-title">Brand: ${item.brand}</p>
                        <p class="card-text">${item.description}</p>
                        <span class="badge">Price: ${item.price}$</span>
                    </div>
                </div>
                ${btn(item._id)}
            </div>
            `
        }).join('')

        collapseBody.innerHTML = `
            <div id="carouselExampleControls" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner p-5">
                    ${carouselItems}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `
    }
    formCol.style.backgroundColor = bg_color
}

const collapse = (type) => {
    const collapseEl = document.getElementById('formcollapse')
    genForm(type)   
    if(collapseEl.classList.contains('show')) {
        console.log('Already opened')
    } else {
        new bootstrap.Collapse(collapseEl)

    }
}

const deleteItem = (id) => {
    console.log(id)
    handleData('DELETE', false, id)
}

window.onload = () => {
    document.querySelectorAll('#methodBtns > button').forEach(b => b.addEventListener('click', () => collapse(b.innerText.toLowerCase().split(' ')[0])))
}