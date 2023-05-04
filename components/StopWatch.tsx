import { Pressable, StyleSheet, Text, View } from "react-native";
import {
	DARK_PRIMARY_COLOR,
	DELETE_COLOR,
	LIGHT_PRIMARY_COLOR,
	PRIMARY_COLOR,
	PRIMARY_TEXT,
	TEXT_OR_ICONS,
} from "../assets/Palette";
import { TimeType } from "../utils/TimeType";
import { AntDesign } from "@expo/vector-icons";

export default function StopWatch({
	milliseconds,
	seconds,
	minutes,
	hours,
}: TimeType) {
	return (
		<View style={styles.stopWatchContainer}>
			<Text style={styles.stopWatchTimer}>{`${hours === 0 ? "00" : hours}:${
				minutes === 0 ? "00" : minutes
			}:${seconds === 0 ? "00" : seconds}`}</Text>
			<View style={styles.stopWatchActions}>
				<AntDesign
					style={{
						...styles.actionButton,
						backgroundColor: LIGHT_PRIMARY_COLOR,
					}}
					name="pause"
					size={56}
					color={DARK_PRIMARY_COLOR}
				/>
				<AntDesign
					style={{ ...styles.actionButton, backgroundColor: DELETE_COLOR }}
					name="close"
					size={56}
					color={TEXT_OR_ICONS}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	stopWatchContainer: {
		height: 80,
		width: "95%",
		borderRadius: 8,
		backgroundColor: PRIMARY_COLOR,
		// flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	stopWatchTimer: {
		// height: 64,
		color: TEXT_OR_ICONS,
		fontSize: 56,
		paddingLeft: 8,
	},
	stopWatchActions: {
		flexDirection: "row",
		marginEnd: 8,
		// alignItems: "center",
		// justifyContent: "space-between",
	},
	actionButton: {
		height: 56,
		width: 56,
		borderRadius: 8,
		margin: 4,
		backgroundColor: TEXT_OR_ICONS,
	},
});
