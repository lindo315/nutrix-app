import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { 
  User, 
  CreditCard, 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  MapPin
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  // Mock user data
  const user = {
    name: 'Sarah Smith',
    email: 's.smith@students.wits.ac.za',
    studentId: '2180123',
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };
  
  const handleLogout = () => {
    // In a real app, this would handle the logout process
    router.replace('/(auth)/welcome');
  };
  
  const handleNotificationsToggle = () => {
    setNotificationsEnabled(prev => !prev);
  };
  
  // Render a profile menu item
  const renderMenuItem = (
    icon: React.ReactNode,
    title: string,
    onPress: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        {icon}
        <Typography variant="body1" style={styles.menuItemTitle}>
          {title}
        </Typography>
      </View>
      
      {rightElement || <ChevronRight size={20} color={Colors.gray[400]} />}
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Typography variant="h3" style={styles.headerTitle}>
            Profile
          </Typography>
        </View>
        
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: user.profileImage }} 
            style={styles.profileImage} 
          />
          
          <View style={styles.profileInfo}>
            <Typography variant="h4" style={styles.profileName}>
              {user.name}
            </Typography>
            
            <Typography variant="body2" color="gray">
              {user.email}
            </Typography>
            
            <View style={styles.studentIdContainer}>
              <Typography variant="caption" color="primary">
                Student ID: {user.studentId}
              </Typography>
            </View>
          </View>
        </View>
        
        <Card style={styles.menuCard}>
          <Typography variant="subtitle2" color="gray" style={styles.menuSection}>
            Account
          </Typography>
          
          {renderMenuItem(
            <User size={20} color={Colors.primary[600]} />,
            'Personal Information',
            () => router.push('/profile/personal-info')
          )}
          
          {renderMenuItem(
            <MapPin size={20} color={Colors.primary[600]} />,
            'Campus Locations',
            () => router.push('/profile/locations')
          )}
          
          {renderMenuItem(
            <CreditCard size={20} color={Colors.primary[600]} />,
            'Payment Methods',
            () => router.push('/profile/payment-methods')
          )}
        </Card>
        
        <Card style={styles.menuCard}>
          <Typography variant="subtitle2" color="gray" style={styles.menuSection}>
            Preferences
          </Typography>
          
          {renderMenuItem(
            <Bell size={20} color={Colors.primary[600]} />,
            'Notifications',
            handleNotificationsToggle,
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[300] }}
              thumbColor={notificationsEnabled ? Colors.primary[600] : Colors.white}
            />
          )}
          
          {renderMenuItem(
            <Lock size={20} color={Colors.primary[600]} />,
            'Privacy & Security',
            () => router.push('/profile/privacy')
          )}
        </Card>
        
        <Card style={styles.menuCard}>
          <Typography variant="subtitle2" color="gray" style={styles.menuSection}>
            Support
          </Typography>
          
          {renderMenuItem(
            <HelpCircle size={20} color={Colors.primary[600]} />,
            'Help & FAQ',
            () => router.push('/profile/help')
          )}
        </Card>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={Colors.error[500]} />
          <Typography variant="body1" color="error" style={styles.logoutText}>
            Logout
          </Typography>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Typography variant="caption" color="gray" center>
            Version 1.0.0
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.lg,
    paddingTop: 0,
    marginBottom: Layout.spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.full,
  },
  profileInfo: {
    flex: 1,
    marginLeft: Layout.spacing.lg,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
  },
  studentIdContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.full,
    marginTop: Layout.spacing.xs,
  },
  menuCard: {
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  menuSection: {
    marginBottom: Layout.spacing.sm,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    marginLeft: Layout.spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
    marginHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.error[50],
    borderRadius: Layout.borderRadius.md,
  },
  logoutText: {
    marginLeft: Layout.spacing.sm,
  },
  versionContainer: {
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.xxl,
    alignItems: 'center',
  },
});