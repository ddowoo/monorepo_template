# Yarn(1.x) - Workspace

## package.json

- **private: true**
- **`workspaces`** <string[]>
  - monorepo에서 관리할 project 리스트
  - workspaces: { “packages” : [string[]] } 형식으로도 가능
    ```jsx
    // workspace 루트 경로 package.json
    // pakcages내 디렉토리 내부 모든 프로젝트
    ...
    "workspaces": {
      "packages": [
        "packages/*"
      ]
    }
    ```
- **`nohoist` <string[]>**
  - 최상위로 호이스팅 되지 않는 종속성 패키지 리스트
  - packages내 프로젝트 위치에서 관리할 패키지
  ```jsx
  "workspaces": {
      ...
      "nohoist": [
        "**/@react-native-async-storage/async-storage",
        "**/react",
        "**/react-dom",
        "**/react-native",
        "**/react-native/**",
        "**/react-native-codegen",
        "**/react-native-dev-menu",
        "**/react-native-macos",
        "**/react-native-windows",
        "jetifier",
        "react-native-safe-area-context",
        "react-native-screens",
        "@react-native-community/**",
        "@react-navigation/**",
        "react-query"
      ]
    },
  ```
- **scripts**
  - 내부 프로젝트를 root위치에서 실행 시킬수 있게 script 생성
  - packages project의 packages.json의 name 참조
  - 하위 모든 node_modules를 제거하는 reset script 추가
  ```jsx
   "scripts": {
      "reset": "find . -type dir -name node_modules | xargs rm -rf && rm -rf yarn.lock",
      "web:start": "yarn workspace web start",
      "app:android": "yarn workspace app android",
      "app:ios": "yarn workspace app ios"
    },
  ```

<br/>
<br/>

---

# 1. CRA

## Load Typescript Error

- cra 프로젝트에서 common 패키지 코드 사용시 에러
- **이유**
  - cra내부 코드는 webpack에 의해 babel loader 사용
  - 하지만 외부 패키지 common은 사용하지 않음
  - 결론, common코드도 babel loader를 사용해 가져올 수 있게 한다.
- CRACO를 이용해 CRA의 webpack의 Config를 override
- **package.json**
  ```jsx
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test --watchAll --detectOpenHandles",
    "eject": "craco eject"
  },
  ```

<br/>
<br/>

---

# 2. React Native

## Metro

- 외부 프로젝트에 참조를 위한 Metro Config 수정
- **watchFolders**

  - 변화를 감지할 디렉토리들의 경로 string 배열 ⇒ 프로젝트 외부의 패키지도 볼수있게 해준다.
  - monorepo root위치 node_modules, 참조할 pakcages내 디렉토리 등
  - 직접 설정하기

    - 필요한 패키지만 추가할 수 있음
    - 추가 패키지 생길때마다 추가해줘야함

    ```jsx
    // metro.config.js
    module.exports = {
      ...
      watchFolders: ['../../node_modules', '../common'],
    	...
    };

    ```

  - **react-native-monorepo-tools 사용**

    - workspaces의 모든 디렉토리 혹은 workspaces의 packages의 모든 배열의 디렉토리들을 다 감시함
    - 추가 참조 패키지 생겨도 알아서 추가됨

    ```jsx
    // metro.config.js
    const {getMetroTools} = require('react-native-monorepo-tools');

    const monorepoMetroTools = getMetroTools();

    module.exports = {
      ...
      watchFolders: monorepoMetroTools.watchFolders,
    	...
    };

    ```

    ```jsx
    // react-native-monorepo-tools/src/get-metro.tools/js
    const monorepoRoot = getMonorepoRoot({ cwd });
    const watchFolders = [
      // monorepo 루트 경로의 node_modules 디렉토리 감시
      path.join(monorepoRoot, "/node_modules"),
      // workspaces의 packages 하위 디렉토리 감시
      ...getWorkspaces({ cwd }),
    ];
    ```

- **unstable_enableSymlinks**

      - true인 경우 resolution과정에서 심링크를 무시 하지 않는다.
      - 심링크 타겟이 되는 디렉토리는 watchFolders안에 있어야함
      - 0.79 부터 default ``true``

  > 메트로 향후 버전에서는 옵션 삭제됨 (심링크는 기본 지원으로)
