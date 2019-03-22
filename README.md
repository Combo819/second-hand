# ECE 1779 assignment3
## API
### 1. `/signin`,`/signup`,`/`,`/profile`  
GET  
return `index.html`
### 2. `/signin`
POST  `{'email':email,'password':password}`
return `jsonfiy({'username':username,'avatar':url})`
### 3. `/get_all_list`
GET   
return `[{ 'type':string,'title':string,'timestamp':string,'description':string,'owner':string,'email':string,'photo':[string,],'statue':boolean,'avatar':string,'id':string },]`
### 4. `/contact`  
POST  `{'content':string,'target_email':string}`
return `{'status':boolean}`
### 5. `/get_profile`
GET
return `{'username':string,'email':string,'avatar':string,'post_list':[{ 'type':string,'title':string,'timestamp':string,'description':string,'owner':string,'email':string,'photo':[string,],'statue':boolean,'avatar':string,'id':string},]}`
### 6. `/edit`
POST `{'title':string,'description':string,'photo':[photoObject,],'id':string}`
return `{'photo':[string,]}`
