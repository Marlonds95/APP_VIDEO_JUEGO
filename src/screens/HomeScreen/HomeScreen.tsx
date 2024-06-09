import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import firebase, { updateProfile, signOut } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import { ref, get, update, set } from 'firebase/database';

// Interface - formulario perfil
interface FormUser {
    name: string;
    phone: string;
    // photoURL: string;
}

export const HomeScreen = () => {
    const [formUser, setFormUser] = useState<FormUser>({
        name: '',
        phone: '',
        // photoURL: ''
    });
    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
    const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

    useEffect(() => {
        setUserAuth(auth.currentUser);
        if (auth.currentUser) {
            const userRef = ref(dbRealTime, `users/${auth.currentUser.uid}`);
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setFormUser((prevUser) => ({
                            ...prevUser,
                            phone: userData.phone || '',
                        }));
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const handlerSetValues = (key: string, value: string) => {
        setFormUser((prevUser) => ({
            ...prevUser,
            [key]: value
        }));
    };

    const handlerUpdateUser = async () => {
        try {
            await updateProfile(userAuth!, {
                displayName: formUser.name,
                // photoURL: formUser.photoURL
            });

            const userRef = ref(dbRealTime, `users/${userAuth?.uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                await update(ref(dbRealTime, `users/${userAuth?.uid}`), { phone: formUser.phone });
            } else {
                await set(ref(dbRealTime, `users/${userAuth?.uid}`), { phone: formUser.phone });
            }

            setShowModalProfile(false);
        } catch (error) {
            console.error('Error updating phone number:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.header}>
                    
                    <View>
                        <Text variant='bodySmall'>Bienvenida</Text>
                        <Text variant='labelLarge'>{userAuth?.displayName}</Text>
                        <Text variant='labelLarge'>{formUser.phone}</Text>
                    </View>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon="account-edit"
                            size={30}
                            mode='contained'
                            onPress={() => setShowModalProfile(true)}
                        />
                        <IconButton
                            icon="logout"
                            size={30}
                            mode='contained'
                            onPress={handleLogout}
                        />
                    </View>
                </View>
                <View>

                </View>
            </View>
            <Portal>
                <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineMedium'>Mi Perfil</Text>
                        <View style={styles.iconEnd}>
                            <IconButton 
                                icon='close-circle-outline'
                                size={30}
                                onPress={() => setShowModalProfile(false)} />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        mode='outlined'
                        label='Nombre'
                        value={formUser.name}
                        onChangeText={(value) => handlerSetValues('name', value)}
                    />
                    <TextInput
                        mode='outlined'
                        label='Correo'
                        value={userAuth?.email || ''}
                        disabled
                    />
                    <TextInput
                        mode='outlined'
                        label='Teléfono'
                        keyboardType='numeric'
                        value={formUser.phone}
                        onChangeText={(value) => handlerSetValues('phone', value)}
                    />
                    <Button mode='contained'  onPress={handlerUpdateUser}>Actualizar</Button>
                </Modal>
            </Portal>
        </>
    );
}