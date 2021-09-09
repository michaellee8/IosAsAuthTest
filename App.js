/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Platform,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SafariWebAuth from "react-native-safari-web-auth";

import OpenloginReactNativeSdk, {
  AuthState,
  LoginProvider,
  OpenloginNetwork,
} from 'openlogin-react-native-sdk'; 

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {

    OpenloginReactNativeSdk.init({
      clientId:
        'BFDssx7rrb7p90lZ9l28PxB9fcIIai81pmOaMt1rMwzyQ-uWuG2srWRK_07Y55cNWbv2qVXVXNM-OXCW95c3TuQ',
      network: OpenloginNetwork.TESTNET,
      redirectUrl: 'com.example.openloginreactnativesdk://auth',
    })
      .then((result) => console.log(`success: ${result}`))
      .catch((err) => console.log(`error: ${err}`));
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="Run Login" onPress={()=>{
            if (Platform.OS === "ios" && parseInt(Platform.Version, 10) >= 12) {
              SafariWebAuth.requestAuth(`https://sdk.openlogin.com/login`);
            }
          }}/>
	  <Button
        title="OpenLogin"
        onPress={() =>
          OpenloginReactNativeSdk.login({
            provider: LoginProvider.GOOGLE,
          })
            .then((result) => console.log(`success: ${result}`))
            .catch((err) => console.log(`error: ${err}`))
        }
      />
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
