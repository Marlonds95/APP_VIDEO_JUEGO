import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        
        justifyContent: 'center',
    },
    container: {
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    inputs: {
        width: "90%"
    },
    text: {
        paddingTop:10,
        marginBottom:10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    button: {
        width: "90%"
    },
    textRedirect: {
        marginTop: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'green'
    },
    rootHome: {
        flex: 1,
        marginVertical: 55,
        marginHorizontal: 25
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    iconEnd: {
        flex: 1,
        alignItems: 'flex-end'
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        gap: 10
    },
    rootMessage: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 20,
        alignItems:'center'
    },
    fabMessage:{
        position:'absolute',
        bottom:20,
        right:15
    },
    containerMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backgroundImageMain: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    titleMain: {
        fontSize: 30,
        marginBottom: 40,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed', 
    },
    spaceMain: {
        height: 20,
    },
    buttonMain: {
        marginVertical: 10,
    },
    buttonTextMain: {
        fontSize: 18,
        fontFamily: 'sans-serif-condensed', 
    },
    backgroundImageScoreSa: {
        flex: 1,
        resizeMode: 'cover',
    },
    containerScoreSa: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 20,
    },
    titleScoreSa: {
        fontSize: 24,
        marginTop: 40,
        marginBottom: 20,
        color: '#ffffff',
    },
    scoreItemScoreSa: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: '100%',
    },
    scoreTextScoreSa: {
        fontSize: 18,
        color: '#000000',
    },
    snake:{
        width:15,
        height:15,
        borderRadius:7,
        backgroundColor: Colors.primary,
        position: "absolute",
    },
    centeredViewScore: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalViewScore: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTextScore: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    openButtonScore: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
    },
    textStyleScore: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textScoreG: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.primary,
      },
      containerHeader: {
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
      centeredViewGameOver: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalViewGameOver: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalTextGameOver: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
      },
      openButtonGameOver: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyleGameOver: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      food:{
        width:20,
        height:20,
        borderRadius:7,
        position:"absolute"
    }
})