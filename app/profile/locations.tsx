import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { 
  ArrowLeft, 
  MapPin, 
  Star,
  ChevronRight,
  Plus
} from 'lucide-react-native';

const locations = [
  {
    id: '1',
    name: 'West Campus Food Court',
    address: 'West Campus, Ground Floor',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Library Cafe',
    address: 'Main Library, 1st Floor',
    isDefault: false,
  },
  {
    id: '3',
    name: 'Student Center',
    address: 'East Campus, Building 2',
    isDefault: false,
  },
];

export default function LocationsScreen() {
  const router = useRouter();

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
          Campus Locations
        </Typography>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.primary[500]} />
          <Typography variant="body1" color="primary" style={styles.addButtonText}>
            Add New Location
          </Typography>
        </TouchableOpacity>

        {locations.map(location => (
          <Card key={location.id} style={styles.locationCard}>
            <TouchableOpacity style={styles.locationContent}>
              <View style={styles.locationInfo}>
                <View style={styles.locationHeader}>
                  <Typography variant="subtitle1" style={styles.locationName}>
                    {location.name}
                  </Typography>
                  {location.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Star size={12} color={Colors.warning[500]} />
                      <Typography variant="caption" color="warning" style={styles.defaultText}>
                        Default
                      </Typography>
                    </View>
                  )}
                </View>

                <View style={styles.addressContainer}>
                  <MapPin size={16} color={Colors.gray[500]} />
                  <Typography variant="body2" color="gray" style={styles.address}>
                    {location.address}
                  </Typography>
                </View>
              </View>

              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
          </Card>
        ))}

        <Typography variant="caption" color="gray" style={styles.note}>
          These locations will be available as pickup points when ordering food
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.lg,
  },
  addButtonText: {
    marginLeft: Layout.spacing.sm,
  },
  locationCard: {
    marginBottom: Layout.spacing.md,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationInfo: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  locationName: {
    fontFamily: 'Poppins-SemiBold',
    marginRight: Layout.spacing.sm,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning[50],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.full,
  },
  defaultText: {
    marginLeft: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    marginLeft: Layout.spacing.xs,
  },
  note: {
    textAlign: 'center',
    marginTop: Layout.spacing.lg,
  },
});