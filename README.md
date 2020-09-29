# express_rest_api_server_test

정밀측정장비를 원격으로 다루기 위한 node.js express 기반 REST API 서버입니다.
GET, POST, PUT, DELETE 명령어를 서버로 보내면, 서버에서 측정장비로 부터 측정된 데이터를 가져와 json 형식의 파일로 클라이언트에게 보내줍니다.

## 시작하기  (windows 환경)

1. node.js LTS 버전 설치하기. https://nodejs.org/ko/

2. git 설치하기. https://git-scm.com/

3. git 환경변수 등록하기. (https://cofs.tistory.com/421 참고 사이트)

4. 본 프로젝트 로컬 PC에 클론하기.

   터미널을 열고 (git 설치할 때 같이 딸려온 git bash 추천) 
   ``` git clone https://github.com/fjvbn2003/express_rest_api_server_test```

5. 해당 폴더에서 종속 라이브러리 설치

   ``` cd express_rest_api_server_test```

   ```npm install```

6.  서버 실행

   ``` node ./app.js ```

7.  실행 확인 

   아래 URL에 접속하여 테스트 

   ```
   http://localhost:2020
   http://localhost:2020/meas/volt/AC
   http://localhost:2020/meas/curr/AC
   ```



## GET
* voltage

  전압 값을 가져오기

  ``` 
  GET /meas/volt/AC
  GET /meas/volt/DC
  ```

  return 예시
  ```
  {"volt":300}
  ```

  

* current

  전류값을 가져오기

  ``` 
  GET /meas/curr/AC
  GET /meas/curr/DC
  ```

   return 예시 
  ```
   {"curr":20}
  ```

* frequency

*  period

## POST

* configuration
    설정값 지정하기


## PUT

## DELETE
