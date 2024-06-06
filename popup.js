document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to refresh button
    document.querySelector('.refresh-button').addEventListener('click', () => {
        loadData();
    });

    // Initial load
    loadData();
});

async function fetchSharePointData() {
    const siteUrl = 'https://ryman.sharepoint.com/sites/LearningAndDevelopment';
    const listName = 'colorPicker';

    const response = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`, {
        headers: {
            'Accept': 'application/json;odata=verbose'
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    return data.d.results;
}

function displayData(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content
    const categories = {};

    // Group items by category
    data.forEach(item => {
        if (!categories[item.Category]) {
            categories[item.Category] = [];
        }
        categories[item.Category].push(item);
    });

    // Create elements for each category and its colors
    let firstCategory = true;
    for (const [category, items] of Object.entries(categories)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-div';

        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;

        if (firstCategory) {
            categoryTitle.setAttribute('aria-expanded', 'true');
        } else {
            categoryTitle.setAttribute('aria-expanded', 'false');
        }

        categoryTitle.addEventListener('click', () => {
            const expanded = categoryTitle.getAttribute('aria-expanded') === 'true';
            categoryTitle.setAttribute('aria-expanded', !expanded);
            const colorDivs = categoryDiv.querySelectorAll('.color-div');
            colorDivs.forEach(div => {
                div.style.display = expanded ? 'none' : 'flex';
            });
        });
        categoryDiv.appendChild(categoryTitle);

        items.forEach(item => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-div';
            colorDiv.style.display = firstCategory ? 'flex' : 'none';

            const colorSwatch = document.createElement('div');
            colorSwatch.className = 'color-swatch';
            colorSwatch.style.backgroundColor = item.Color;

            const colorName = document.createElement('span');
            colorName.className = 'color-name';
            colorName.textContent = `${item.Value}: ${item.Color}`;

            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(item.Color).then(() => {
                    copyButton.textContent = 'Copied';
                    copyButton.classList.add('copied');
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                        copyButton.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            });

            colorDiv.appendChild(colorSwatch);
            colorDiv.appendChild(colorName);
            colorDiv.appendChild(copyButton);

            categoryDiv.appendChild(colorDiv);
        });

        contentDiv.appendChild(categoryDiv);
        firstCategory = false; // Set to false after the first category
    }
}

function loadData() {
    fetchSharePointData().then(data => {
        displayData(data);
    }).catch(error => {
        console.error("Error fetching SharePoint data:", error);
    });
}
