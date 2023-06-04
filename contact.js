import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const App = () => {
  const [contactList, setContactList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    Contacts.getAll().then((contacts) => {
      setContactList(contacts);
    });
  };

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
  };

  const handleClosePopup = () => {
    setSelectedContact(null);
  };

  const filteredContacts = contactList.filter((contact) =>
    contact.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <Text>{item.displayName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{ marginBottom: 16, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
        placeholder="Search contacts"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.recordID}
        renderItem={renderItem}
      />

      <Dialog visible={selectedContact !== null} onTouchOutside={handleClosePopup}>
        <DialogContent>
          {selectedContact && (
            <View>
              <Text>{selectedContact.displayName}</Text>
              <Text>{selectedContact.phoneNumbers[0]?.number}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleClosePopup}>
            <Text style={{ color: 'blue', marginTop: 16 }}>Dismiss</Text>
          </TouchableOpacity>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default App;