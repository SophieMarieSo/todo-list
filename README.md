## 기능 정의

#### Todo-list

1. 할 일을 추가할 수 있다
2. 할 일 리스트를 볼 수 있다
3. 할 일에 대해 끝남/안끝남을 표시할 수 있다
4. 할 일을 삭제할 수 있다

#### 회원가입 / 로그인

1. 회원가입
2. 로그인
3. 유저 권한 확인(todo page는 로그인한 유저만 들어갈 수 있다)
4. 이미 로그인한 유저면, 로그인 없이 바로 메인 페이지에 들어갈 수 있다

---

### 사용스택 (package 포함)

백엔드 `Express` `Mongoose` `Cors` `BodyParser` `dotenv` `bcrpty` `jsonwebtoken`

프론트엔드 `React` `Axios`

Api Test `Postman`

---

### API 정의

1. 할 일을 추가할 수 있다: /api/tasks -> `post`
2. 할 일 리스트를 볼 수 있다: /api/tasks -> `get`
3. 할 일에 대해 끝남/안끝남을 표시할 수 있다: /api/tasks/:id -> `put`
4. 할 일을 삭제할 수 있다: /api/tasks/:id -> `delete`

---

### 배포

1. DB 배포 `MongonDb Atlas`
2. 백엔드 배포 `AWS BeanStalk`
3. 프론트엔드 배포 `Netlify`
