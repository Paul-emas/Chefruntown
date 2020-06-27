// ///////////////////////////////////////////////////
// SCIRPTING FILE

/////////////////////////////////////////////////////////////////////////////////////////////////
// Script for Chefruntown 


// Search Bar
const getDOMStrings = {
    loader: `
    <svg class="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path fill="none" stroke="#8db500" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.8);transform-origin:50px 50px"><animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate></path></svg>`,
    search: document.querySelector('.search-input'),
    tableContainer: document.querySelector('.table'),
    table: document.getElementById('myTable'),
    svgLoader: 'svg'
};


let resultTemplate;
const renderLoader = function (parent) {
    parent.insertAdjacentHTML('afterbegin', getDOMStrings.loader);
}

const clearLoader = () => {
    const loader = document.querySelector(`.${getDOMStrings.svgLoader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

getDOMStrings.search.addEventListener('keyup', (e) => {
    
    const searchString = e.target.value;
    const searchData = [];

    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 8 || event.which === 8) {
            clearLoader();
            console.log('I was clicked');
        }
    });

    console.log(searchData);

    if (searchString !== '') {
        getDOMStrings.tableContainer.classList.add('display')
        const FetchSearchInput = async () => {

            renderLoader(getDOMStrings.tableContainer);

            axios.get(`https://restcountries.eu/rest/v2/region/${searchString}`)
                .then(response => {
                    console.log(response)
                    searchData.push(response.data);
                    console.log(searchData);
                    

                    let searchResults = searchData.forEach(el => {
                        resultTemplate = el.map(searchDetail => {
                            return `<tr><td class="searchList">${ searchDetail.name }</td></tr>`;
                        });
                    });

                    const rendersize = 5;
                    if (resultTemplate.length > 10) {
                        resultTemplate.reverse();
                        resultTemplate.forEach(el => {
                            clearLoader();
                            getDOMStrings.table.insertAdjacentHTML('afterbegin', el);
                        });
                        console.log(resultTemplate);
                    }

                }).catch(error => {
                    console.log(error);
                })
        }
        FetchSearchInput();
    } else {
        getDOMStrings.tableContainer.classList.remove('display');
        resultTemplate = [];
        getDOMStrings.table.innerHTML = '';
        clearLoader();
    }
});
