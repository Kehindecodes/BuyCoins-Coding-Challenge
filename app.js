const getUser = async () =>{
     const data = JSON.stringify({
         query:`{
            user(login:"kehindecodes"){
                avatarUrl
                location
                name
                email
                followers(first:2){
                  totalCount
                }
                repositories(first:20){
                  edges{
                    node{
                      name
                      
                    }
                  }
                }
              }
         }`
     });

     const response = await fetch(
         'https://api.github.com/graphql',
         {
             method:'POST',
             body:data,
             headers:{
                 'Content-Type':'application/json',
                 'Content-Length': data.length,
                 Authorization: ' Bearer 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'

             }
         }
     );
     const output = await response.json()
    
     console.log(output.data.user.repositories.edges.map((repo)=>{
      return repo.node.name
    }))
    
}

getUser()