// main variables
let theInput = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');

getButton.onclick = function () {
    getRepos();
}

//get repos function
function getRepos() {
    if (theInput.value === '') {
        reposData.innerHTML = "<span>Please enter GitHub handle.</span>"
    } else {
        let handle = theInput.value;
        fetch(`https://api.github.com/users/${handle}/repos`)
            .then(res => res.json())
            .then(repos => {
                if (repos.length > 0) {
                    // empty the conainer
                    reposData.innerHTML = '';
                    repos.forEach(repo => {
                        // create main div
                        let mainDiv = document.createElement('div');

                        // create repo name node
                        let repoName = document.createTextNode(repo.name);

                        // append the name to the main div
                        mainDiv.appendChild(repoName);

                        // create repo url
                        let theUrl = document.createElement('a');

                        // create url text
                        let theUrlText = document.createTextNode('Vist');

                        // append the url text to the url
                        theUrl.appendChild(theUrlText);

                        //  add the href reference 
                        theUrl.href = `https://github.com/${repo.full_name}`;

                        // set attribut black
                        theUrl.setAttribute('target', '_blank');

                        // create stars count span
                        let starSpans = document.createElement('span');

                        // create stars count text
                        let starsText = document.createTextNode(`Stars: ${repo.stargazers_count}`);

                        // add stars count text to stars span
                        starSpans.appendChild(starsText);

                        // stars count span to main div
                        mainDiv.appendChild(starSpans);

                        // append url to main div
                        mainDiv.appendChild(theUrl);

                        // add repo-box to main div
                        mainDiv.className = 'repo-box';

                        // append the main div to container
                        reposData.appendChild(mainDiv);
                    })
                } else if (repos.length === 0) {
                    // reacttrr
                    let res = `<div>The <span>${handle}</span> repository has no public repositories</div>`
                    reposData.innerHTML = res;
                } else {
                    reposData.innerHTML = "Your search did not match any users."
                }

            }).catch(err => {
                console.log(err);
            })
    }
}