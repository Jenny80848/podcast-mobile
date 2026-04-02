import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (name && email && message) {
      Alert.alert('Success', 'Your message has been sent!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Get in Touch</Text>
        <Text style={styles.subtitle}>Have a question or feedback? We'd love to hear from you.</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Name" 
            placeholderTextColor="#64748b" 
          />
          
          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            placeholder="email@example.com" 
            placeholderTextColor="#64748b"
            keyboardType="email-address"
          />
          
          <Text style={styles.label}>Message</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            value={message} 
            onChangeText={setMessage} 
            placeholder="Your message here..." 
            placeholderTextColor="#64748b"
            multiline
            numberOfLines={4}
          />
          
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1c' },
  content: { padding: 20, paddingTop: 40 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#94a3b8', fontSize: 16, marginBottom: 32 },
  form: { gap: 16 },
  label: { color: '#cbd5e1', fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: '#1e293b', borderRadius: 8, padding: 12, color: '#fff', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  textArea: { height: 120, textAlignVertical: 'top' },
  button: { backgroundColor: '#3b82f6', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
