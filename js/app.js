
// Variables
const profile = document.querySelector('#profile_details');
const repositories = document.querySelector('#respositories');
const num_of_repo = document.querySelector('.number_of_repo')
const searchGithub = document.querySelector('#search')
const menuBtn = document.querySelector('.menuBtn');
const searchInput = document.querySelector('.form')
const navLinks = document.querySelector('.right')
const main = document.querySelector('main')

let userInput = 'kehindecodes';
console.log(GITHUB_API_KEY)


// search github when the enter key is pressed

const getUser = async (user) => {
	const data = JSON.stringify({
		query : `
     query GithubUserProfile($userName:String!){
        user(login:$userName){
          avatarUrl
          location
          name
          email
          bio
          login
          status{
            emoji
            message
          }
          followers(first:2){
            totalCount
          }
          repositories(first:20){
            totalCount
            edges{
              node{
                name
                description
  url
  forks{
    totalCount
  }
  primaryLanguage{
    color
    name
  }
  forkCount
              }
            }
          }
        }
      }
           
       
         `,
         variables :{
          "userName":user
       },
         
	});

 
 
  // fetch data from API
 
	const response = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': data.length,
			"Authorization": `Bearer ${GITHUB_API_KEY}`,
		},
	});
	const output = await response.json();

 console.log(output)
  if (output.data.user === null) {
      main.innerHTML=`
        <div class="errorMessage">
        <div class="container">
        <h1>User not found</h1>
        <h3> Check your spellings again</h3>
        </div>
        </div>
      `
      
  }else{
    ShowRepo(output.data.user.repositories.edges);
    showProfile(output.data.user);
  }

  num_of_repo.innerHTML= ` Repositories <span class=" repo_number" >
   ${output.data.user.repositories.totalCount}</span>`
};

// display user when the page loads 
window.onload =  getUser(userInput);

// get users details when the enter key is pressed
searchGithub.addEventListener('keyup',(e) =>{
const userInput = e.target.value
  if (e.key === 'Enter') {
     getUser(userInput)
   console.log(userInput)
  }
  
})



// display list of repository
function ShowRepo(userRepo) {
	let repos = '';
	userRepo.forEach((repo) => {
		repos += `
    <div class="repo">
    <div class="name_wrapper">
    <p class="repo_name">
    <a href=${repo.node.url}>${repo.node.name}</a>
    </p>
    <button>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    <span>Star</span>
    </button>
    </div>
   
    <p class="repo_desc"> ${repo.node.description === null ? '': repo.node.description}<p>
   <div class=" lang_wrapper">
   <span class="lang_color" style="background-color:${repo.node.primaryLanguage === null ? '':repo.node.primaryLanguage.color}"></span>
   <span class="lang">${repo.node.primaryLanguage === null ? '': repo.node.primaryLanguage.name}</span>
   <span class="time"></span>
   </div> 
   
  </div>
    `;
	});

	repositories.innerHTML = repos;

 
}

//  display profile
function showProfile(userInfo) {
	profile.innerHTML = `
      <div class="avatar_wrapper">
      <img src=${userInfo.avatarUrl}" alt=${userInfo.name} class="avatar"/>
      <p class="name">
${userInfo.name}
<span class="login">
 ${userInfo.login}
</span>
</p>

   
   </div>
<div class="bio">
<p class="title">${userInfo.bio}</p>

</div>

      `;
      document.querySelector('.user_Avatar').innerHTML=`
      <img src=${userInfo.avatarUrl}" alt=${userInfo.name} class="user_img"/>
      <span class="caret"></span>
      `
}

// show nav links when the hamburger menu is clicked

menuBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  menuBtn.classList.toggle('active');
 
  if(menuBtn.classList.contains('active')){
      navLinks.classList.add('active');
      searchInput.classList.add('active');
  }else{
      navLinks.classList.remove('active');
      searchInput.classList.remove('active');
  }

})
// show loader 



