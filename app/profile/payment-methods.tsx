import React from 'react';
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
import { Card } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import { 
  ArrowLeft,
  Plus,
  CreditCard,
  Wallet,
  ChevronRight,
  Star
} from 'lucide-react-native';

const paymentMethods = [
  {
    id: '1',
    type: 'card',
    name: 'Visa ending in 4242',
    image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
    isDefault: true,
  },
  {
    id: '2',
    type: 'wallet',
    name: 'Campus Wallet',
    balance: 'R250.00',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
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
          Payment Methods
        </Typography>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.primary[500]} />
          <Typography variant="body1" color="primary" style={styles.addButtonText}>
            Add Payment Method
          </Typography>
        </TouchableOpacity>

        {paymentMethods.map(method => (
          <Card key={method.id} style={styles.methodCard}>
            <TouchableOpacity style={styles.methodContent}>
              <View style={styles.methodLeft}>
                {method.type === 'card' ? (
                  <View style={styles.cardIconContainer}>
                    <CreditCard size={24} color={Colors.primary[500]} />
                  </View>
                ) : (
                  <View style={styles.walletIconContainer}>
                    <Wallet size={24} color={Colors.primary[500]} />
                  </View>
                )}

                <View style={styles.methodInfo}>
                  <View style={styles.methodHeader}>
                    <Typography variant="subtitle1" style={styles.methodName}>
                      {method.name}
                    </Typography>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Star size={12} color={Colors.warning[500]} />
                        <Typography variant="caption" color="warning" style={styles.defaultText}>
                          Default
                        </Typography>
                      </View>
                    )}
                  </View>

                  {method.type === 'wallet' && (
                    <Typography variant="caption" color="gray">
                      Available Balance: {method.balance}
                    </Typography>
                  )}
                </View>
              </View>

              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
          </Card>
        ))}

        <Typography variant="caption" color="gray" style={styles.note}>
          Your payment information is securely stored
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
  methodCard: {
    marginBottom: Layout.spacing.md,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: Layout.borderRadius.sm,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletIconContainer: {
    width: 48,
    height: 48,
    borderRadius: Layout.borderRadius.sm,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodInfo: {
    marginLeft: Layout.spacing.md,
    flex: 1,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  methodName: {
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
  note: {
    textAlign: 'center',
    marginTop: Layout.spacing.lg,
  },
});