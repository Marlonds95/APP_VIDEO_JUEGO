import React from 'react'
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import { Colors } from '../theme/colors';
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
interface HeaderPorps{
    reloadGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
}
export function Header ({
    children,
    reloadGame,
    pauseGame,
    isPaused,
}: HeaderPorps): JSX.Element {
    const navigation = useNavigation()
    const handleGoBack = () => {
        navigation.goBack(); // Función para navegar atrás
    };
  return( 
    <View style={styles.container}>
      <TouchableOpacity onPress={reloadGame}>
        <Ionicons name="reload-circle" size={35} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={pauseGame}>
        <FontAwesome
          name={isPaused ? "play-circle" : "pause-circle"}
          size={35}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoBack}>
                <FontAwesome name="arrow-left" size={35} color={Colors.primary} />
            </TouchableOpacity>
      {children}
    </View>
)
  
}

const styles = StyleSheet.create({
    container: {
      flex: 0.05,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: Colors.primary,
      borderWidth: 12,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomWidth: 0,
      padding: 15,
      backgroundColor: Colors.background,
    },
})


