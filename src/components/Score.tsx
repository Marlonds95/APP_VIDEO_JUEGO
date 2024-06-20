import { Text, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";
import { styles } from "../theme/styles";

interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps): JSX.Element {
  return <Text style={styles.textScoreG}>🍎 {score}</Text>;
}

