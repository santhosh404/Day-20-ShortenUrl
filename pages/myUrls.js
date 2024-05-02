const tableBody = document.getElementById('tableBody');

const myUrls = JSON.parse(localStorage.getItem('myUrls')) || [];
document.addEventListener('DOMContentLoaded', () => {

    //If no records exists
    if (myUrls.length === 0) {
        // Create a table row
        const row = document.createElement('tr');

        row.innerHTML = 'No Records Exists'

        // Append the row to the table body
        tableBody.appendChild(row);
    }
    else {
        console.log(myUrls)
        myUrls.forEach(item => {
            // Create a table row
            const row = document.createElement('tr');

            // Create table data for long URL
            const longUrlCell = document.createElement('td');
            const longUrlLink = document.createElement('a');
            longUrlLink.href = item.longUrl;
            longUrlLink.textContent = item.longUrl;
            longUrlCell.appendChild(longUrlLink);
            row.appendChild(longUrlCell);

            // Create table data for short URL
            const shortUrlCell = document.createElement('td');
            const shortUrlLink = document.createElement('a');
            shortUrlLink.href = item.shortUrl;
            shortUrlLink.textContent = item.shortUrl;
            shortUrlCell.appendChild(shortUrlLink);
            row.appendChild(shortUrlCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        })
    }
})