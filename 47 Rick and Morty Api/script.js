// Variables
const requestTarget = document.querySelector('#request-target');
const itemContainer = document.querySelector('#item-container');
const intersectionOptions = {
    threshold: 1
}

let apiUrl = 'https://rickandmortyapi.com/api/character';
let loading = false;

const onIntersect = ([entry]) => {
    if(apiUrl && !loading && entry.isIntersecting)
        makeRequest();
}

const makeRequest = () => {
    loading = true;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cleanUp(data.info.next);
            renderItems(data.results);
        });
}

const cleanUp = nextPage => {
    apiUrl = nextPage;
    loading = false;
}

const renderItems = results => {
    results.forEach(item => {
        itemContainer.appendChild(createItem(item));
    });
}

const createItem = item => {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = (
        `
            <div class="char-id">${item.id}</div>
            <div class="char-name">${item.name}</div>
            <img class="char-img" src=${item.image} />
            <div class="char-species">${item.species}</div>
        `
    );
    return newItem;
}

let observer = new IntersectionObserver(onIntersect, intersectionOptions);

observer.observe(requestTarget);