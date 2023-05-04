import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "./components/ActionButton";
import { TEXT_OR_ICONS } from "./assets/Palette";
import StopWatch from "./components/StopWatch";
import { TimeType, initTimer } from "./utils/TimeType";

export default function App() {
	const [stopwatchTimer, setStopwatchTimer] = useState<TimeType>();
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={styles.titleText}>Ultimate Stopwatch</Text>
			<StopWatch {...initTimer} />
			<ActionButton />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	titleText: {
		fontSize: 32,
		color: TEXT_OR_ICONS,
		marginTop: 32,
		marginBottom: 16,
	},
});
