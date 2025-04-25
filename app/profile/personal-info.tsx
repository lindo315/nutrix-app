import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { ArrowLeft, Camera, Mail, User, Hash } from 'lucide-react-native';

export default function PersonalInfoScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Sarah Smith',
    email: 's.smith@students.wits.ac.za',
    studentId: '2180123',
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
  });

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 1000);
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
          Personal Information
        </Typography>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageSection}>
          <Image 
            source={{ uri: formData.profileImage }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            leftIcon={<User size={20} color={Colors.gray[500]} />}
          />

          <Input
            label="Student Email"
            value={formData.email}
            editable={false}
            leftIcon={<Mail size={20} color={Colors.gray[500]} />}
          />

          <Input
            label="Student ID"
            value={formData.studentId}
            editable={false}
            leftIcon={<Hash size={20} color={Colors.gray[500]} />}
          />

          <Typography variant="caption" color="gray" style={styles.note}>
            Student email and ID cannot be changed. Contact student services for assistance.
          </Typography>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          variant="filled"
          size="large"
          fullWidth
          loading={isLoading}
          onPress={handleSave}
        >
          Save Changes
        </Button>
      </View>
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
  imageSection: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: Layout.borderRadius.full,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: Colors.primary[500],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  form: {
    marginBottom: Layout.spacing.xl,
  },
  note: {
    marginTop: Layout.spacing.sm,
    textAlign: 'center',
  },
  footer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
});