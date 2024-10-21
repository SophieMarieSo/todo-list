## 기능 정의

#### Todo-list

1. 할 일을 추가할 수 있다
2. 할 일 리스트를 볼 수 있다
3. 할 일에 대해 끝남/안끝남을 표시할 수 있다
4. 할 일을 삭제할 수 있다

#### 회원가입

1. 유저가 이메일, 비밀번호, 이름을 입력해서 보낸다 (프론트엔드) 
2. 가입되어 있지 않은 사용자만 가입할 수 있다
3. 프론트엔드로부터 받은 정보를 저장한다 (DB model 필수)
4. 비밀번호를 암호화 시켜서 저장한다

#### 로그인

 1. 이메일과 비밀번호를 입력해서 보낸다 (프론트엔드)
 2. 데이터베이스에 해당 이메일과 비밀번호를 가진 사용자가 있는지 확인
 3. 없으면? 로그인 실패 ➡ 에러메시지 
 4. 있으면? 사용자 정보 + 토큰 발행
 
#### 권한

1. 유저 권한 확인(todo page는 로그인한 유저만 들어갈 수 있다)
2. 이미 로그인한 유저면, 로그인 없이 바로 메인 페이지에 들어갈 수 있다

---

### 사용스택 (package 포함)

백엔드 `Express` `Mongoose` `Cors` `BodyParser` `dotenv` `bcrpty` `jsonwebtoken`

프론트엔드 `React` `Axios`

---

### API 정의

1. 할 일을 추가할 수 있다: /api/tasks -> `post`
2. 할 일 리스트를 볼 수 있다: /api/tasks -> `get`
3. 할 일에 대해 끝남/안끝남을 표시할 수 있다: /api/tasks/:id -> `put`
4. 할 일을 삭제할 수 있다: /api/tasks/:id -> `delete`

---

### 백엔드 준비

1. 기본 세팅
2. 라우터 주소 정의
3. 데이터베이스 스키마 정의
4. 기능 정의 (CRUD)
5. 테스트 `postman`

---

### 프론트엔드 준비

1. 깃 clone
2. 기능 만들기 (CRUD)
3. 테스트

(forked from https://github.com/legobitna/todo-fe-login-student)

---

### 배포

1. DB 배포 `MongonDB Atlas`
2. 백엔드 배포 `Heroku`
3. 프론트엔드 배포 `Netlify`

[todo list site](https://inquisitive-pothos-3bcc17.netlify.app/)
