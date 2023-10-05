
function orangeColor(buttonId) {
    localStorage.setItem(`buttonText_${buttonId}`, "UNREAD");
    localStorage.setItem(`buttonColor_${buttonId}`, "rgb(239, 57, 75)");
}

function blueColor(buttonId) {
    localStorage.setItem(`buttonText_${buttonId}`, "READ");
    localStorage.setItem(`buttonColor_${buttonId}`, "rgb(127, 210, 255)");
}

function appendButtonsToJSON(jsonArray) {
    jsonArray.forEach(function (obj, index) {
        let button = document.createElement("button");
        let buttonId = `button_${index}`;
        
        button.textContent = localStorage.getItem(`buttonText_${buttonId}`) || "UNREAD";
        button.style.backgroundColor = localStorage.getItem(`buttonColor_${buttonId}`) || "rgb(239, 57, 75)";
        
        button.addEventListener("click", () => {
            if (button.style.backgroundColor === "rgb(127, 210, 255)" && button.textContent === "READ") {
                orangeColor(buttonId);
            } else {
                blueColor(buttonId);
            }
            button.textContent = localStorage.getItem(`buttonText_${buttonId}`);
            button.style.backgroundColor = localStorage.getItem(`buttonColor_${buttonId}`);
        });
        obj.button = button;
    });
}

function fetchJSONDataAndAppendButtons() {
    fetch('books.json') 
        .then(response => response.json())
        .then(jsonData => {
            data=jsonData;

            appendButtonsToJSON(data);
            displayFilteredData(data)
         })
        .catch(error => {
            console.error('Error fetching or processing JSON data:', error);
        });
}

window.onload = fetchJSONDataAndAppendButtons;

function handleFilterChange() {
    let filterSelect = document.getElementById('filter');
    let selectedColor = filterSelect.value;
    let filteredData = filterDataByButtonColor(data, selectedColor);
     displayFilteredData(filteredData);
}

function filterDataByButtonColor(data, color) {
    if (color === "all") {
        return data;
    } else {
        return data.filter(obj => {
            const buttonColor = obj.button.style.backgroundColor;
            return buttonColor === color;
        });
    }
}
   
   function displayFilteredData (filteredData) {
    let contentDiv = document.getElementById('thediv');
    contentDiv.innerHTML = '';
    filteredData.forEach(function (obj) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = obj.image; 
        let title = document.createElement('h2')
        title.innerHTML = obj.name
        let author = document.createElement('h3')
        author.innerHTML = obj.author
        let button = obj.button;
        
       div.appendChild(img);
       div.appendChild(title)
       div.appendChild(author)
       div.appendChild(button);
    contentDiv.appendChild(div);
    });
}
