//popup.js
document.addEventListener('DOMContentLoaded', function() {
    const colorList = document.getElementById('colorList');

    chrome.storage.local.get(['smartsheetSheetId', 'smartsheetAccessToken'], function(config) {
        if (config.smartsheetSheetId && config.smartsheetAccessToken) {
            fetchCategoriesFromSmartsheet(config.smartsheetSheetId, config.smartsheetAccessToken);
        } else {
            console.error('Smartsheet configuration is missing.');
        }
    });

    async function fetchCategoriesFromSmartsheet(sheetId, accessToken) {
        const url = `https://api.smartsheet.com/2.0/sheets/${sheetId}`;
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(url, { method: 'GET', headers: headers });
            const data = await response.json();
            const categories = processSmartsheetData(data);
            updateUI(categories);
        } catch (error) {
            console.error('Failed to fetch data from Smartsheet', error);
        }
    }

    function processSmartsheetData(data) {
        let categories = {};
        data.rows.forEach(row => {
            const category = row.cells[0].value;
            const name = row.cells[1].value;
            const hex = row.cells[2].value;

            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push({name, hex});
        });

        return categories;
    }

    function updateUI(categories) {
        for (let category in categories) {
            const categoryHeader = document.createElement('h2');
            categoryHeader.textContent = category;
            colorList.appendChild(categoryHeader);

            categories[category].forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.className = 'color-div';

                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color.hex;

                const button = document.createElement('button');
                button.textContent = 'Copy';
                button.className = 'copy-button';
                button.addEventListener('click', function() {
                    navigator.clipboard.writeText(color.hex)
                        .then(() => {
                            button.textContent = 'Copied!';
                            setTimeout(() => { button.textContent = 'Copy'; }, 1500);
                        })
                        .catch(err => {
                            console.error('Failed to copy hex code', err);
                        });
                });

                const colorName = document.createElement('span');
                colorName.textContent = `${color.name}: ${color.hex}`;
                colorName.className = 'color-name';

                colorDiv.appendChild(colorName);
                colorDiv.appendChild(swatch);
                colorDiv.appendChild(button);
                colorList.appendChild(colorDiv);
            });
        }
    }
});
