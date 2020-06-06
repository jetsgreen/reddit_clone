const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form Event Listener
searchForm.addEventListener('submit', e =>{
    
    // Get search term
    const searchTerm = searchInput.value;
    // Get sort by
    const sortBy = document.querySelector('input[name]:checked').value;
    // Get Limit
    const limit = document.getElementById('limit').value;

    // Validation Submission
    if(searchTerm === '' || sortBy === '' || limit === ''){
        showMessage('Please fill all required fields', 'alert-danger')
    }

    
    e.preventDefault();
});

function showMessage(message, className){
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
setTimeout(()=>
    document.querySelector('.alert').remove(), 2000
)
}