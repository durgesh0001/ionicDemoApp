/**
 * Created by root on 26/12/16.
 */
import { Injectable } from '@angular/core';
import { Http,Headers }  from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()

export class Httpservices
{

    constructor(private _http:Http)
    {

    }

    getUser()
    {
        return this._http.get('https://systematixindiademo1.herokuapp.com/users')
            .map(res=>res.json())
    }

    addUser(data)
    {

        var json=JSON.stringify(data);
        var params='json='+json;
        var headers=new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');


        return this._http.post('https://systematixindiademo1.herokuapp.com/users/add',
            params,{
                headers:headers,
            }
        ).map(res=>res.json())


    }
  login(data)
  {

    var json=JSON.stringify(data);
    var params='json='+json;
    var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');


    return this._http.post('https://systematixindiademo1.herokuapp.com/users/login',
      params,{
        headers:headers,
      }
    ).map(res=>res.json())


  }

  updatebyemail(data)
  {
    var json=JSON.stringify(data);
    var params='json='+json;
    var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');


    return this._http.post('https://systematixindiademo1.herokuapp.com/users/updatebyemail',
      params,{
        headers:headers,
      }
    ).map(res=>res.json())


  }

    updateUser(data)
    {
        console.log(data);
        var json=JSON.stringify(data);
        var params='json='+json;
        var headers=new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');


        return this._http.post('https://systematixindiademo1.herokuapp.com/users/update',
            params,{
                headers:headers,
            }
        ).map(res=>res.json())


    }
    deleteUser(id)
    {
        console.log(id);
        var json=JSON.stringify(id);
        var params='json='+json;
        var headers=new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');


        return this._http.post('https://systematixindiademo1.herokuapp.com/users/delete',
            params,{
                headers:headers,
            }
        ).map(res=>res.json())


    }




}

