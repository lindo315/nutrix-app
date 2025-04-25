import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import {
  ArrowLeft,
  CircleHelp as HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  ExternalLink,
} from 'lucide-react-native';

const faqs = [
  {
    id: '1',
    question: 'How do I place an order?',
    answer:
      'Browse merchants, select items, add to cart, and checkout. Choose your pickup time and payment method.',
  },
  {
    id: '2',
    question: 'What payment methods are accepted?',
    answer: 'We accept credit cards and campus wallet payments.',
  },
  {
    id: '3',
    question: 'How long does order preparation take?',
    answer:
      'Preparation times vary by merchant and are shown before ordering, typically 15-30 minutes.',
  },
  {
    id: '4',
    question: 'Can I cancel my order?',
    answer:
      'Orders can be cancelled within 2 minutes of placing them. After that, contact support.',
  },
];

export default function HelpScreen() {
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
          Help & FAQ
        </Typography>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.section}>
          <Typography
            variant="subtitle2"
            color="gray"
            style={styles.sectionTitle}
          >
            Contact Support
          </Typography>

          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactInfo}>
              <MessageSquare size={20} color={Colors.primary[600]} />
              <View style={styles.contactText}>
                <Typography variant="body1" style={styles.contactTitle}>
                  Live Chat
                </Typography>
                <Typography variant="caption" color="gray">
                  Chat with our support team
                </Typography>
              </View>
            </View>
            <ChevronRight size={20} color={Colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactInfo}>
              <Phone size={20} color={Colors.primary[600]} />
              <View style={styles.contactText}>
                <Typography variant="body1" style={styles.contactTitle}>
                  Call Us
                </Typography>
                <Typography variant="caption" color="gray">
                  +27 11 234 5678
                </Typography>
              </View>
            </View>
            <ExternalLink size={20} color={Colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactInfo}>
              <Mail size={20} color={Colors.primary[600]} />
              <View style={styles.contactText}>
                <Typography variant="body1" style={styles.contactTitle}>
                  Email Support
                </Typography>
                <Typography variant="caption" color="gray">
                  support@nutrix.wits.ac.za
                </Typography>
              </View>
            </View>
            <ExternalLink size={20} color={Colors.gray[400]} />
          </TouchableOpacity>
        </Card>

        <Card style={styles.section}>
          <Typography
            variant="subtitle2"
            color="gray"
            style={styles.sectionTitle}
          >
            Frequently Asked Questions
          </Typography>

          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={faq.id}
              style={[
                styles.faqItem,
                index === faqs.length - 1 && styles.lastFaqItem,
              ]}
            >
              <View style={styles.faqHeader}>
                <HelpCircle size={20} color={Colors.primary[600]} />
                <Typography variant="body1" style={styles.question}>
                  {faq.question}
                </Typography>
              </View>
              <Typography variant="body2" color="gray" style={styles.answer}>
                {faq.answer}
              </Typography>
            </TouchableOpacity>
          ))}
        </Card>

        <Typography variant="caption" color="gray" style={styles.note}>
          Can't find what you're looking for?{' '}
          <Typography variant="caption" color="primary">
            Visit our Help Center
          </Typography>
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactText: {
    marginLeft: Layout.spacing.md,
  },
  contactTitle: {
    fontFamily: 'Poppins-Medium',
  },
  faqItem: {
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  lastFaqItem: {
    borderBottomWidth: 0,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  question: {
    marginLeft: Layout.spacing.md,
    fontFamily: 'Poppins-Medium',
  },
  answer: {
    marginLeft: Layout.spacing.xl + Layout.spacing.md,
  },
  note: {
    textAlign: 'center',
    marginTop: Layout.spacing.lg,
    marginBottom: Layout.spacing.xxl,
  },
});
