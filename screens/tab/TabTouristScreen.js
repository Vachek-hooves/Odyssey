import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import LogIn from '../../components/Lottie/LogIn';
import MainLayout from '../../components/layout/MainLayout';

const {height} = Dimensions.get('screen');
console.log(height);

const USER_STORAGE_KEY = 'userData';

const TabTouristScreen = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFirstName(parsedUser.firstName);
        setLastName(parsedUser.lastName);
        setImage(parsedUser.image);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        image: image,
      };

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const deleteUserData = async () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(USER_STORAGE_KEY);
              setUser(null);
              setFirstName('');
              setLastName('');
              setImage(null);
              Alert.alert('Success', 'Profile deleted successfully!');
            } catch (error) {
              console.error('Error deleting user data:', error);
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
        },
      ],
    );
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });

      if (result.assets && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const renderProfileForm = () => (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <View style={styles.imageWrapper}>
          {image ? (
            <Image source={{uri: image}} style={styles.profileImage} />
          ) : (
            <LinearGradient
              colors={['#FF2975', '#5114AF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.emptyImageContainer}>
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </LinearGradient>
          )}
        </View>
      </TouchableOpacity>
      <LogIn />
      <View style={styles.formFields}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>

        <TouchableOpacity onPress={saveUserData}>
          <LinearGradient
            colors={['#FF2975', '#5114AF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.saveButton}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* <View style={{height: 150}} /> */}
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <LinearGradient
          colors={['#FF2975', '#5114AF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.imageWrapper}>
          {image ? (
            <Image source={{uri: image}} style={styles.profileImage} />
          ) : (
            <Text style={styles.noPhotoText}>No Photo</Text>
          )}
        </LinearGradient>
      </View>

      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.nameText}>
        {firstName} {lastName}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}>
          <LinearGradient
            colors={['#FF2975', '#5114AF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={deleteUserData}>
          <LinearGradient
            colors={['#FF1493', '#FF2975']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Delete Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <LogIn />
    </ScrollView>
  );

  return (
    <MainLayout>
      <View style={styles.mainContainer}>
        {/* <LinearGradient
          colors={['#1a0033', '#330066']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBackground}
        /> */}
        <View style={styles.contentContainer}>
          {user && !isEditing ? renderProfile() : renderProfileForm()}
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flexGrow: 1,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 70,
    // height: '135%',
    height: height > 680 ? '115%' : '140%',
  },
  imageContainer: {
    marginTop: 60,
    marginBottom: 40,
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: 'hidden',
    backgroundColor: '#1a0033',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptyImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 160,
    borderRadius: 90,
  },
  addPhotoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  formFields: {
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '600',
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  input: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#fff',
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButton: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#FF2975',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },

  //  profile
  profileContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 70,
    height: '110%',
  },
  imageContainer: {
    marginBottom: 30,
  },
  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  noPhotoText: {
    color: '#fff',
    fontSize: 16,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  nameText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textShadowColor: '#FF2975',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  editButton: {
    width: '45%',
  },
  deleteButton: {
    width: '45%',
  },
  buttonGradient: {
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    padding: 15,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default TabTouristScreen;
