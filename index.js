import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form Event Listener
searchForm.addEventListener('submit', e => {

    // Get search term
    const searchTerm = searchInput.value;

    // Get sort by
    const sortBy = document.querySelector('input[name]:checked').value;
    // Get Limit
    const limit = document.getElementById('limit').value;

    // Validation Submission
    if (searchTerm === '' || sortBy === '' || limit === '') {
        showMessage('Please fill all required fields', 'alert-danger')
    }


    clearFields();

    // Search Reddit
    reddit.search(searchTerm, limit, sortBy).then(results => {
        console.log(results);
        let output = '<div class = "card-columns">';
        // loop through posts
        results.forEach(post => {
            // Check for image
            let image = post.preview ? post.preview.images[0].source.url : "https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_1600,c_limit/reddit-alien-red-st.jpg";
            output += `
            <div class="card">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
    <a href="#" class="btn btn-primary">Read More</a>
    <hr>
    <span class="badge badge-primary>Subreddit: ${post.subreddit}</span>
    <span class="badge badge-secondary>Score: ${post.score}</span>
  </div>
</div>`
        });
        output = output + '</div>'
        document.getElementById('results').innerHTML = output;
    });


    e.preventDefault();
});
// Alert message function
function showMessage(message, className) {
    // Create div
    const div = document.createElement('div');
    //  Add classes
    div.className = `alert ${className}`;
    //  Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent 
    const searchContainer = document.getElementById('search-container');
    // Get search
    const search = document.getElementById('search');
    // Insert Message
    searchContainer.insertBefore(div, search);
    // Set time for alert to disappear
    setTimeout(() =>
        document.querySelector('.alert').remove(), 2000
    )
};

// Function to clear fields after submission
function clearFields() {
    searchInput.value = "";
}

// Minimize text coming from fetch(selftext)

function truncateText(text, limit){
 const shortened = text.indexOf(' ', limit);
 if(shortened === -1) return text;
    return text.substring(0, shortened);
}
