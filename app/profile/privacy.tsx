import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { 
  ArrowLeft,
  Bell,
  Mail,
  Lock,
  Shield,
  ChevronRight
} from 'lucide-react-native';

export default function PrivacyScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    orderNotifications: true,
    emailNotifications: false,
    locationServices: true,
    dataCollection: true,
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
        <Typography variant="h3" style={styles.headerTitle}>
          Privacy & Security
        </Typography>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.section}>
          <Typography variant="subtitle2" color="gray" style={styles.sectionTitle}>
            Notifications
          </Typography>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={Colors.primary[600]} />
              <View style={styles.settingText}>
                <Typography variant="body1" style={styles.settingTitle}>
                  Order Notifications
                </Typography>
                <Typography variant="caption" color="gray">
                  Get updates about your orders
                </Typography>
              </View>
            </View>
            <Switch
              value={settings.orderNotifications}
              onValueChange={() => toggleSetting('orderNotifications')}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[300] }}
              thumbColor={settings.orderNotifications ? Colors.primary[600] : Colors.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Mail size={20} color={Colors.primary[600]} />
              <View style={styles.settingText}>
                <Typography variant="body1" style={styles.settingTitle}>
                  Email Notifications
                </Typography>
                <Typography variant="caption" color="gray">
                  Receive promotional emails
                </Typography>
              </View>
            </View>
            <Switch
              value={settings.emailNotifications}
              onValueChange={() => toggleSetting('emailNotifications')}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[300] }}
              thumbColor={settings.emailNotifications ? Colors.primary[600] : Colors.white}
            />
          </View>
        </Card>

        <Card style={styles.section}>
          <Typography variant="subtitle2" color="gray" style={styles.sectionTitle}>
            Privacy
          </Typography>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Lock size={20} color={Colors.primary[600]} />
              <View style={styles.settingText}>
                <Typography variant="body1" style={styles.settingTitle}>
                  Location Services
                </Typography>
                <Typography variant="caption" color="gray">
                  Use your location to find nearby merchants
                </Typography>
              </View>
            </View>
            <Switch
              value={settings.locationServices}
              onValueChange={() => toggleSetting('locationServices')}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[300] }}
              thumbColor={settings.locationServices ? Colors.primary[600] : Colors.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={20} color={Colors.primary[600]} />
              <View style={styles.settingText}>
                <Typography variant="body1" style={styles.settingTitle}>
                  Data Collection
                </Typography>
                <Typography variant="caption" color="gray">
                  Help improve our services
                </Typography>
              </View>
            </View>
            <Switch
              value={settings.dataCollection}
              onValueChange={() => toggleSetting('dataCollection')}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[300] }}
              thumbColor={settings.dataCollection ? Colors.primary[600] : Colors.white}
            />
          </View>
        </Card>

        <Card style={styles.section}>
          <Typography variant="subtitle2" color="gray" style={styles.sectionTitle}>
            Security
          </Typography>

          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Lock size={20} color={Colors.primary[600]} />
              <Typography variant="body1" style={styles.linkText}>
                Change Password
              </Typography>
            </View>
            <ChevronRight size={20} color={Colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Shield size={20} color={Colors.primary[600]} />
              <Typography variant="body1" style={styles.linkText}>
                Two-Factor Authentication
              </Typography>
            </View>
            <ChevronRight size={20} color={Colors.gray[400]} />
          </TouchableOpacity>
        </Card>

        <Typography variant="caption" color="gray" style={styles.note}>
          We take your privacy and security seriously. Read our{' '}
          <Typography variant="caption" color="primary">Privacy Policy</Typography>
          {' '}to learn more.
        </Typography>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  backButton: {
    marginRight: Layout.spacing.md,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  section: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: Layout.spacing.md,
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Poppins-Medium',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  linkText: {
    marginLeft: Layout.spacing.md,
    fontFamily: 'Poppins-Medium',
  },
  note: {
    textAlign: 'center',
    marginTop: Layout.spacing.lg,
    marginBottom: Layout.spacing.xxl,
  },
});