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

## 5장 리액트 내비게이션으로 여러 화면 관리하기
시작하기에 앞서 모멘토리로 OS 버전업을 한 후 에러 발생 해결 방법

에러 : 
```sh
info Found Xcode workspace "LearnReactNative.xcworkspace"
2021-12-11 21:42:24.516 simctl[32229:1209695] CoreSimulator detected version change.  Framework version (776.4) does not match existing job version (776.3).  Attempting to remove the stale service in order to add the expected version.
error Could not get the simulator list from Xcode. Please open Xcode and try running project directly from there to resolve the remaining issues.
SyntaxError: Unexpected token I in JSON at position 0
```

> `LearnReactNative.xcworkspace` 파일을 찾아서 직접 실행만 한번 해주면 해결된다.

### 요약
- 리액트 네이티브 앱에서는 화면을 전환할 때 브라우저의 History와 비슷한 사용성을 제공하기 위해 **네이티브 스태 내비게이터**를 사용한다
- 네비게이션 처리를 위해 필요한 라이브러리
  - `@react-navigation/native`: 자바스크립트로 구현되어있는 네비게이션
    - `react-native-screens`: 스크린 화면 정의
    - `react-native-safe-area-context`: Safe Area 매니저
  - `@react-navigation/native-stack`: 네이티브 스택 네비게이터
  - `@react-navigation/drawer` : 사이드바를 사용하기 위한 네비게이터 
    - `react-native-gesture-handler` : 사용자 제스처를 인식하기 위해 내부적으로 사용
    - `react-native-reanimated` : 리액트 네이티브 애니메이션 효과보다 더욱 개선된 성능
  - `@react-navigation/bottom-tabs` : 하단 탭 네비게이터
    - `react-native-vector-icons`
  - `@react-navigation/material-top-tabs` : 머터리얼 상단 탭 네비게이터
    - `react-native-tab-view` : 리액트 네이티브에서 탭 구현
    - `react-native-pager-view`
  - `@react-navigation/material-bottom-tabs` : 머터리얼 하단 탭 네비게이터
    - `react-native-paper`
- 스크린 name이 자동으로 상단에 타이틀로 붙고 스택이 쌓이면 자동으로 뒤로가기 버튼이 노출된다
- 포커스, 언포커스 를 캐치하려면 `useFocusEffect` 사용 (`useCallback`으로 감싸서 리렌더링 시마다 호출되지 않도록 한다)
```jsx
useFocusEffect(
    useCallback(() => {
      console.log('home focus');
      return () => {
        console.log('home unfocus ');
      };
    }, []),
  ); 
```

#### navigation
- push는 같은 스크린도 스택을 추가함 (native-stack 네비게이터 에만 존재)
- navigate 는 스크린이 같으면 스택을 추가하지 않음

#### Stack.Screen options
- name
- component
- options
  - title
  - headerStyle : 헤더 스타일
  - headerTintColor : 헤더 타이틀 색상
  - headerTitleStyle : 헤더 타이틀 스타일
  - headerLeft : 왼쪽 노출할 컴포넌트
  - headerTitle : 가운데 노출할 컴포넌트
  - headerRight : 오른쪽 노출할 컴포넌트
  - headerBackVisible (false) : back 버튼 제거


## 6장 다이어리앱 만들기
- android_ripple: 안드로이드에서 물결효과 스타일

- 고유한 값을 생성해주는 uuid 라이브러리 사용
- uuid는 Node.js의 cryptorlsmddmf 사용하는데 리액트 네이티브에는 이 기능이 기본적으로 내장되어 있지 않기 때문에 uuid가 정상 작동하도록 react-native-get-random-values를 설치해 호환시켜야 한다
```sh
yarn add uuid
yarn add react-native-get-random-values
```

- 날짜 포맷팅 라이브러리 설치
```sh
yarn add date-fns
```

- 애니메이션 활용하려면 Animated 를 useRef와 함께 사용한다
- 애니메이션 실행할때는 timing 함수와 start 사용
- 통통 튀기는 효과를 주고싶을때는 timing이 아닌 spring 으로 사용
```jsx
const animation = useRef(new Animated.Value(0)).current;
useEffect(() => {
  Animated.timing(animation, {
    toValue: 1,
    useNativeDriver: true
  }).start()
})
// sptring
useEffect(() => {
  Animated.timing(animation, {
    toValue: 1,
    useNativeDriver: true,
    
    tension: 40,  // 강도
    friction: 7,  // 감속 ( 이 두가지 옵션을 같이 사용 )
    
    spped: 12,    // 속도
    bounciness: 8 // 탄력성  ( 이 두가지 옵션을 같이 사용 )
  }).start()
})
return <Animated.View style={{opacity: animation}}>
```
- input값에 따라 다양한 out을 사용하려면 anmation 지정하면서 interpolate 함수 적용
```jsx
return <Animated.View style={{
  transform: [
    {
      translateX: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150]
      })
    }
  ],
  opacity: animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  }) 
}}
```
- 엘리먼트가 바닥에 닿았음을 확인하고 싶을때는 `onEndRached`함수와 `onEndReachedThreshold` 값을 사용한다