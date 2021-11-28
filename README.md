# 리엑트 네이티브를 다루는 기술

## 1장: 리액트 네이티브 첫걸음 (환경구성)

### JDK(Java Development Kit, 안드로이드앱 개발) 설치

```zsh
brew install --cask adoptopenjdk/openjdk/adoptopenjdk8
```

### Watchman(파일 모니터링 도구) 설치

```zsh
brew install watchman
```

### 안드로이드 스튜디오(안드로이드 앱 개발) 설치

https://developer.android.com/studio/index.html

### 환경변수설정

```zsh
# React Native
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Xcode, CocoaPods(IOS 개발) 설치

```zsh
sudo gem install cocoapods
```

### 프로젝트 만들기

```zsh
npx react-native init LearnReactNative
```

### ios에서 사용되는 라이브러리 설치

```zsh
cd ios
pod install
```

### 요약
- 자바스크립트 코드를 네이티브 코드로 변환하는것이 아닌 프로젝트내에 존재하는 JavascriptCore라는 자바스크립트 엔진이 앱 내에서 자바스크립트 코드를 실행시켜주는 원리
- Metro는 Webpack 과 비슷한 리액트 네이티브용 HMR 기능을 포함한 자바스크립트 번들러이다
  - `android` or `ios` 실행시 새 터미널에서 `start`를 실행하여 `Metro`를 구동한다
  - 새로고침 단축키는 `r`
  - IDE내 터미널이 아닌 새로운 터미널에서 구동이 되었기 때문에 IDE를 닫아도 실행 유지됨힣
 
## 2장: 컴포넌트
### 요약
- 리액트 네이티브는 순수 css는 먹히지 않고 `StyleSheet`를 사용해서 css 적용
- 리액트 네이티브에서 `display` `flex`와 `none` 밖에 없고 기본 `flex`이다
- `flex-direction`의 기본이 웹 처럼 `row` 가 아닌 `column`이다
- `border`옵션을 통으로 지정할수 없고 `borderWidth`, `borderStyle`, `borderColor`를 별도 지정해주어야 한다