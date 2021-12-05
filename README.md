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

## 요약
- 자바스크립트 코드를 네이티브 코드로 변환하는것이 아닌 프로젝트내에 존재하는 JavascriptCore라는 자바스크립트 엔진이 앱 내에서 자바스크립트 코드를 실행시켜주는 원리
- Metro는 Webpack 과 비슷한 리액트 네이티브용 HMR 기능을 포함한 자바스크립트 번들러이다
  - `android` or `ios` 실행시 새 터미널에서 `start`를 실행하여 `Metro`를 구동한다
  - 새로고침 단축키는 `r`
  - IDE내 터미널이 아닌 새로운 터미널에서 구동이 되었기 때문에 IDE를 닫아도 실행 유지됨힣
 
## 2장: 컴포넌트
### 요약
- 리액트 네이티브에서 `display` `flex`와 `none` 밖에 없고 기본 `flex`이다
- `flex-direction`의 기본이 웹 처럼 `row` 가 아닌 `column`이다
- `border`옵션을 통으로 지정할수 없고 `borderWidth`, `borderStyle`, `borderColor`를 별도 지정해주어야 한다

## 3장 할일 목록 만들기
### 요약
#### 콘솔
- 콘솔 로그는 Metro 번들러 혹은 크롬 디버거 콘솔에서 확인 가능하다.
- 개발자 메뉴는 Ios `command`+`D` Android `command`+`M`로 열수있다.
- 콘솔 디버거를 끄려면 Ios Stop Debugging, Android Debug 메뉴 한번더 누른다

#### 라이브러리 네이티브 코드 적용
- 서드파티 라이브러리 설치후 라이브러리 내에 있는 네이티브코드를 프로젝트에 적용해주어야 한다.
- android같은 경우는 `yarn android`시에 자동 적용 되지만 ios는 별도 연동해주어야 한다.
- `cd ios`에서 `pod install` or `npx pod-install`

#### react-native-safe-area-context

> 아이폰의 Safe Area를 유연하게 대응하기 위한 라이브러리

- 해당 라이브러리에서 제공하는 `SafeAreaProvider`와 하위 `SafeAreaView`모듈 사용
- `SafeAreaProvider`가 화면 전체 영역을 차지하는것으로 봤을때 기본 `flex: 1`이 적용되어 있는것 같다
- `SafeAreaView`의 `edges` props으로 Safe Area 를 사용할 방향을 지정할수 있다. (`['top', 'bottom', 'left', 'right']`)
- `useSafeAreaInsets` 훅으로 디바이스별 StatusBar 높이를 구할수 있다. (return: `{top, bottom, left, right}`)
  - 해당높이만큼 빈 View의 height를 지정해주거나 상단 컴포넌트의 padding 값을 주는 식으로 처리

#### 시뮬레이터 디바이스 추가
- `xcrun simctl list devices`로 리스트 내역 보기
- `yarn react-native run-ios --simulator="iPhone 13 mini"`로 시뮬레이터 추가 실행
- android 의 경우 Android Virtual Device Manager의 Create Virtual Device 실행

#### 아이폰 키보드 가리지 않게 설정
- `KeyboardAvoidingView`사용하여 아이폰의 경우 `behavior`(`poadding`|`height`|`position`) props을 추가한다.
- `Plastform.OS` (`android`|`ios`)을 사용하여 OS를 체크할수있다.
- `Platform.select({ios: 'padding', android: undefined})`를 사용하여 객체로 os별 값을 직관적으로 반환할수 있다.
- `Keyboard.dismiss()`: 키보드 닫기

#### 버튼 설정 컴포넌트
- `TouchableOpacity`: 터치했을때 투명도 (props: `activeOpacity: number (0.2)`)
- `TouchableNativeFeedback`: 안드로이드 물결효과 (ios 에서는 오류 발생, 분기 필요)

#### 폼
- `onSubmitEditing` 이벤트는 Enter(return) 누를때 발생하는 이벤트
- `returnKeyType` Enter 버튼 타입을 변경한다. (OS별 지원하지 않는값 적용시 오류 나므로 분기 필요)
  - 공통: `done`|`go`|`next`|`search`|`send`
  - IOS: `default`|`emergency-call`|`google`|`join`|`route`|`yahoo`
  - Android: `none`|`previos`
  
## 4장 할일 목록 만들기 II
### 요약

#### 리스트
- `FlatList`로 리스트 UI를 만들수 있다
  - `data`: 리스트 데이터
  - `renderItem({item, index, separators})`: 랜더링할 리스트 어이템 컴포넌트 반환 콜백 함수
  - `keyExtractor(item)`: 리스트 아이템 키 반환 콜백 함수
  - `ItemSeparatorComponent({highlighted, leadingItem})`: 리스트 구분자 컴포넌트 반환 콜백 함수

#### react-native-vector-icons
> 오픈소스 벡터 아이콘을 리액트 네이티브 프로젝트에서 간편하게 컴포넌트처럼 사용할수있는 라이브러리

##### UIAppFonts 속성 추가

###### IOS
`ios/[프로젝트명]/info.plist`
> `.plist 파일`: ios 앱의 프로퍼티 리스트 파일로 앱의 이름, 아이콘, 버전 등 앱에서 필요한 설정값을 가짐 

```plist
<dict>
...
  <key>UIAppFonts</key>
  <array>
      <string>MaterialIcons.ttf</string>
  </array>
</<dict>
```

###### Android
`android/app/build.gradle`
> `build.gradle`: 안드로이드의 범용 빌드 도구인 Gradle에서 사용하는 파일로 프로젝트의 의존성 플러그인 및 빌드에 필요한 설정에 대한 정보를 가짐

```gradle
...
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
``` 

#### Alert 컴포넌트
> `Alert.aert`

- 제목, 내용, 버튼배열, 옵션객체 순서의 파라미터
- 버튼배열내 객체는 `title`, `onPress`, `style`(`default`|`cancel`|`destructive`) (ios 용)
- 옵션객체 내 `cancelable`(android용): 안드로이드에서 Alert 박스 바깥 터치시 닫히도록 설정
- 옵션객체 내 `onDismiss`(android용): 바깥 터치로 닫힌 후 실행되는 콜백함수

#### @react-native-community/async-storage
> 리액트 네이티ㅡ에서 사용할 수 있는 key-value 형식의 저장소(브라우저에서의 localStorage와 비슷)
- Android 기본용량: `6MB`
- IOS는 용량제한이 없다
- 소규모 데이터를 다룰때 사용하는것이 좋고 데이터의 규모가 커지면 성능이 떨어진다
- 데이터의 규모가 커졌을때는 `realm`이나 `react-native-sqlite-storage`(인덱싱 기능 지원)가 있다

Android 기본 용량늘리기: `gradle.properties`
```properties
AsyncStorage_db_size_in_MB=10
```

