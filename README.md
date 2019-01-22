1) Start PostgresQL

2) $ npm run start:dev

3) http://localhost:8000/


4) $ node server/services/auth_crypt.js

  -> creates hash+salt password :)


## NOTES:

ADD COLUMN TO TABLE:
sequelize migration:create --name Users



Dev Strategy:

[1] 2-Factor SMS Authentication (Twillio)
[2] Create "user_model": {phone #}
  -> Confirm User via SMS
[3] Use 'bcrypt' npm pkg to {'hash' + 'salt'} pw
[4] Facebook Auth
[5] Reset Password Route
[6] Linkedin Auth + Google Auth
