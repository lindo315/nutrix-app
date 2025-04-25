import React from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { Link, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        <View style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/4393433/pexels-photo-4393433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              }}
              style={styles.logo}
            />
            <Typography variant="h1" color="white" style={styles.appName}>
              Nutrix
            </Typography>
          </View>

          <View style={styles.taglineContainer}>
            <Typography variant="h3" color="white" center>
              Fast campus food ordering
            </Typography>
            <Typography
              variant="body1"
              color="white"
              center
              style={styles.tagline}
            >
              Order from your favorite campus merchants and skip the lines
            </Typography>
          </View>

          <View style={styles.buttonContainer}>
            <Link href="/(auth)/login" asChild>
              <Button
                variant="filled"
                size="large"
                fullWidth
                style={styles.button}
              >
                Log In
              </Button>
            </Link>

            <Link href="/(auth)/register" asChild>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                color="secondary"
                style={[styles.button, styles.registerButton]}
              >
                Register
              </Button>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Layout.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Layout.spacing.xxl * 2,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: Layout.borderRadius.full,
  },
  appName: {
    marginTop: Layout.spacing.md,
    fontFamily: 'Poppins-Bold',
  },
  taglineContainer: {
    alignItems: 'center',
  },
  tagline: {
    marginTop: Layout.spacing.md,
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.white,
    marginBottom: Layout.spacing.md,
  },
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
