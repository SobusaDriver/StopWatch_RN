import { StyleSheet, Text, View } from "react-native";
import {
	DARK_PRIMARY_COLOR,
	DELETE_COLOR,
	LIGHT_PRIMARY_COLOR,
	PRIMARY_COLOR,
	TEXT_OR_ICONS,
} from "../assets/Palette";
import { TimeType } from "../utils/TimeType";
import { AntDesign } from "@expo/vector-icons";

type stopWatchProps = {
	deleteWatch: () => void;
	toogleWatch: () => void;
} & TimeType;

function convertTwoDigits(numberToConvert: number) {
	return numberToConvert < 10 ? `0${numberToConvert}` : numberToConvert;
}

export default function StopWatch({
	seconds,
	minutes,
	hours,
	intervalId,
	deleteWatch,
	toogleWatch,
}: stopWatchProps) {
	return (
		<View style={styles.stopWatchContainer}>
			<Text style={styles.stopWatchTimer}>{`${convertTwoDigits(
				hours,
			)}:${convertTwoDigits(minutes)}:${convertTwoDigits(seconds)}`}</Text>
			<View style={styles.stopWatchActions}>
				<AntDesign
					style={{
						...styles.actionButton,
						backgroundColor: LIGHT_PRIMARY_COLOR,
					}}
					name={`${intervalId !== undefined ? "pause" : "caretright"}`}
					size={56}
					color={DARK_PRIMARY_COLOR}
					onPress={() => toogleWatch()}
				/>
				<AntDesign
					style={{ ...styles.actionButton, backgroundColor: DELETE_COLOR }}
					name="close"
					size={56}
					color={TEXT_OR_ICONS}
					onPress={() => deleteWatch()}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	stopWatchContainer: {
		height: 80,
		width: "92%",
		borderRadius: 8,
		marginBottom: 16,
		backgroundColor: PRIMARY_COLOR,
		alignSelf: "center",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	stopWatchTimer: {
		color: TEXT_OR_ICONS,
		fontSize: 48,
		paddingLeft: 16,
	},
	stopWatchActions: {
		flexDirection: "row",
		marginEnd: 8,
	},
	actionButton: {
		height: 56,
		width: 56,
		borderRadius: 8,
		margin: 4,
		backgroundColor: TEXT_OR_ICONS,
	},
});
