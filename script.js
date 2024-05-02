const urlInput = document.getElementById('urlInput');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');
const shortUrlInput = document.getElementById('shortUrlInput');
const copyButton = document.getElementById('copyButton');

//Toasts elements
const toastLiveExample = document.getElementById('liveToast')
const icon = document.getElementById('icon');
const messageHead = document.getElementById('message-head');
const messageBody = document.getElementById('message-body');

//Regex to check whether the url is a valid url
const regex = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*\.[a-zA-Z]{1,}[-a-zA-Z0-9+&@#\/%=~_|]/


let urls = JSON.parse(localStorage.getItem('myUrls')) || [];

//Handling the click event for url shortner 
submitBtn.addEventListener('click', () => {
    if (isValid()) {

        //Api call
        fetch('https://shrtlnk.dev/api/v2/link', {
            method: "POST",
            body: JSON.stringify({ url: urlInput.value }),
            headers: {
                'api-key': "ALJJdnVZiZqirWUdesCLjgfZTpNKrPEnUEglhZ8peP3qe",
                'Accept': "application/json",
                'Content-Type': "application/json",
            },
        })
            .then(response => response.json())
            .then(json => {
                icon.innerHTML = '<i class="fa-solid fa-check" style="color: green;"></i>';
                messageHead.innerHTML = 'Success';
                messageBody.innerHTML = 'URL Shorterned Successfully!';

                shortUrlInput.value = json.shrtlnk;

                //Adding the urls to localStorage to show it in my urls
                urls.push({ longUrl: urlInput.value, shortUrl: shortUrlInput.value });
                localStorage.setItem("myUrls", JSON.stringify(urls));

                urlInput.value = '' //clearing the url input field

                //Trigger the toast
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
            })
            .catch(err => {
                icon.innerHTML = '<i class="fa-solid fa-xmark" style="color: red;"></i>';
                messageHead.innerHTML = 'Error';
                messageBody.innerHTML = err.message;

                //Trigger the toast
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
            })


    }
})


//Handling the validations by onchange of input field
urlInput.addEventListener('input', () => {
    if (isValid()) {
        urlInput.classList.remove('is-invalid');
    }
})


//Handling copy to Clipboard function 
const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shortUrlInput.value)
            .then(() => {
                icon.innerHTML = '<i class="fa-solid fa-check" style="color: green;"></i>';
                messageHead.innerHTML = 'Success';
                messageBody.innerHTML = 'URL Copied!';

                // Trigger the toast
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                toastBootstrap.show();
            })
            .catch(err => {
                icon.innerHTML = '<i class="fa-solid fa-xmark" style="color: red;"></i>';
                messageHead.innerHTML = 'Error';
                messageBody.innerHTML = err.message;

                // Trigger the toast
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                toastBootstrap.show();
            });
    }

}


// Function to check the valid input
const isValid = () => {
    let isValid = true;

    if (!urlInput.value || urlInput.value === '') {
        urlInput.classList.add('is-invalid');
        errorMessage.innerHTML = 'Please enter url';
        isValid = false;
        return;
    }
    if (!regex.test(urlInput.value)) {
        urlInput.classList.add('is-invalid');
        errorMessage.innerHTML = 'Please enter the valid url';
        isValid = false;
        return;
    }
    return isValid;
}

