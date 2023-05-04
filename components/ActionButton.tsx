import { Pressable, StyleSheet, Text } from "react-native";
import { DARK_PRIMARY_COLOR, TEXT_OR_ICONS } from "../assets/Palette";
import { AntDesign } from "@expo/vector-icons";
type props = {
	onClick: () => void;
};
const ActionButton = ({ onClick }: props) => {
	return (
		<Pressable style={styles.actionButton} onPress={() => onClick()}>
			<AntDesign name="plus" size={64} color={DARK_PRIMARY_COLOR} />
		</Pressable>
	);
};

export default ActionButton;

const styles = StyleSheet.create({
	actionButton: {
		position: "absolute",
		bottom: 32,
		right: 32,
		borderRadius: 8,
		backgroundColor: TEXT_OR_ICONS,
	},
});
