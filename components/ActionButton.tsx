import { Pressable, StyleSheet, Text } from "react-native";
import { DARK_PRIMARY_COLOR } from "../assets/Palette";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
const ActionButton = () => {
	return (
		<Pressable style={styles.actionButton} onPress={() => {}}>
			<AntDesign name="pluscircle" size={64} color={DARK_PRIMARY_COLOR} />
		</Pressable>
	);
};

export default ActionButton;

const styles = StyleSheet.create({
	actionButton: {
		position: "absolute",
		bottom: 32,
		right: 32,
	},
});
