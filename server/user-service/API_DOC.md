POST
/auth/register

BODY
 {
  "company_name": "ABC Technologies Pvt Ltd",
  "email": "admin@abctech.com",
  "password": "StrongPass@123",
  "name": "Vishnu Prakash"
}


Res
{
    "data": null,
    "message": "Tenant and Root User created successfully",
    "success": true
}



POST 
/auth/login


BODY 
{
  "email": "asdfddm21n@cdfstech.com",
  "password": "StrongPass@123"
}


RES
{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ0ZW5hbnRfaWQiOjEzLCJ1c2VyX3R5cGUiOiJyb290Iiwicm9sZXMiOltdLCJwZXJtaXNzaW9ucyI6W10sInN1YnNjcmlwdGlvbl9zdGF0dXMiOiJub25lIiwiZXhwIjoxNzcxMjQ1ODMxLCJpYXQiOjE3NzExNTk0MzF9.i-qzTqtLuygnuLEgSIV2PTaBlWGshRqT5W1XqJipfEI"
    },
    "message": "Login successful",
    "success": true
}
