import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from 'react-native';
import {
  User,
  CreditCard,
  MapPin,
  Bell,
  HelpCircle,
  LogOut,
  Moon,
  ChevronRight,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { colors, theme, toggleTheme } = useTheme();
  
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => signOut(),
        },
      ]
    );
  };
  
  const profileImage = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg';
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {user?.displayName || 'Wits Student'}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.inactiveText }]}>
              {user?.email || 'student@students.wits.ac.za'}
            </Text>
            <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
            <View style={styles.menuIcon}>
              <User size={20} color={colors.primary} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>Personal Information</Text>
            <ChevronRight size={20} color={colors.inactiveText} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
            <View style={styles.menuIcon}>
              <CreditCard size={20} color={colors.primary} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>Payment Methods</Text>
            <ChevronRight size={20} color={colors.inactiveText} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
            <View style={styles.menuIcon}>
              <MapPin size={20} color={colors.primary} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>Saved Locations</Text>
            <ChevronRight size={20} color={colors.inactiveText} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
            <View style={styles.menuIcon}>
              <Bell size={20} color={colors.primary} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>Notifications</Text>
            <ChevronRight size={20} color={colors.inactiveText} />
          </TouchableOpacity>
          
          <View style={[styles.menuItem, { borderBottomColor: colors.border }]}>
            <View style={styles.menuIcon}>
              <Moon size={20} color={colors.primary} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>Dark Mode</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={theme === 'dark' ? colors.secondary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
            <View style={styles.menuIcon}>
              <HelpCircle size={20} color={colors.primary} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>Help Center</Text>
            <ChevronRight size={20} color={colors.inactiveText} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleSignOut}
          >
            <View style={styles.menuIcon}>
              <LogOut size={20} color={colors.error} />
            </View>
            <Text style={[styles.menuText, { color: colors.error }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.version, { color: colors.inactiveText }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.xl,
  },
  profileCard: {
    flexDirection: 'row',
    padding: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    marginVertical: Layout.spacing.m,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: Layout.spacing.m,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginBottom: Layout.spacing.s,
  },
  editButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  section: {
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Layout.spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 35,
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  footer: {
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.xxl,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});