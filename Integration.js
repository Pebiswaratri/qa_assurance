import http from 'k6/http'
import {check,group,sleep} from 'k6'


export default function(){
    const name = "pei";
    const job = "qa";


    group('Create User Scenarios', function(){

    const full_url = 'https://reqres.in/api/users';
    const payload = JSON.stringify({
        name : name,
        job:job,
    })

    const params = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    
    let createUser = http.post(full_url,payload, params)

    check(createUser, {
        'response code was 201': (createUser) => createUser.status==201
    })

    check(createUser,{
        'response job should same with request': (createUser)=> {
            const response  = JSON.parse(createUser.body);
            return response.job ==job
        }
    })

    check(createUser,{
        'response name should same with request': (createUser)=> {
            const response  = JSON.parse(createUser.body);
            return response.name == name
        }
    })

    sleep(1);

    })
   


    group('Update User Scenarios', function() {
        const full_url = 'https://reqres.in/api/users/1';
        const payload = JSON.stringify({
            name : name,
            job:job,
        })
    
        const params = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
    
        
        let updateUser = http.put(full_url,payload, params)

         check(updateUser,{
             'response code was 200' : (updateUser)=> updateUser.status== 200
    })
    check(updateUser,{
        'response job should same with request' : (updateUser)=> {
            const respons = JSON.parse(updateUser.body)
            return respons.job == job
        }
    })

    check(updateUser,{
        'response name should same with request' : (updateUser)=> {
            const respons = JSON.parse(updateUser.body)
            return respons.name == name
        }
    })

    
    sleep(1);

   
    });

}
