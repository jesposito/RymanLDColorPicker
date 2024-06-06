document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from SharePoint list
    fetchSharePointData().then(data => {
        // Process the data as required
        processData(data);
    }).catch(error => {
        console.error("Error fetching SharePoint data:", error);
    });
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

function processData(data) {
    // Example processing function - customize as needed
    data.forEach(item => {
        console.log(`Color: ${item.Color}, Value: ${item.Value}, Category: ${item.Category}`);
        // Add logic to update your extension UI with the fetched data
    });
}
