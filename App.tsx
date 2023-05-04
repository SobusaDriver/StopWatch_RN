import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ActionButton from "./components/ActionButton";
import { TEXT_OR_ICONS } from "./assets/Palette";
import StopWatch from "./components/StopWatch";
import { TimeType, initTimer } from "./utils/TimeType";

enum StopWatchActions {
	ADD = "ADD",
	DELETE = "DELETE",
	INCREASE = "INCREASE",
	PAUSE = "PAUSE",
}

type StopWatchAction = {
	type: StopWatchActions;
	payload: { id: number };
};

export default function App() {
	const [listOfStopwatch, dispatch] = useReducer(reducer, []);

	const incrementCounter = () => {};

	function reducer(state: Array<TimeType>, action: StopWatchAction) {
		const { type, payload } = action;
		switch (type) {
			case StopWatchActions.ADD:
				return [...state, { ...initTimer, id: state.length }];
			case StopWatchActions.DELETE:
				return state.filter((item, id) => {
					if (item.id === id) {
						return true;
					}
					return false;
				});
			case StopWatchActions.INCREASE:
				const actualTimer = state[payload.id - 1];
				actualTimer.milliseconds += 100;
				if (actualTimer.milliseconds > 1000) {
					actualTimer.seconds++;
					if (actualTimer.seconds > 60) {
						actualTimer.minutes++;
						if (actualTimer.minutes > 60) {
							actualTimer.hours++;
						}
					}
				}
				return [
					...state.slice(payload.id - 2),
					actualTimer,
					...state.slice(payload.id, state.length - 1),
				];
			case StopWatchActions.PAUSE:
				return state;
			default:
				return state;
		}
	}

	// const addStopWatch = () => {
	// 	setStopwatchTimer((prevList) => {
	// 		return [...prevList, { ...initTimer, id: prevList.length }];
	// 	});
	// 	setInterval()
	// };
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={styles.titleText}>Ultimate Stopwatch</Text>
			<FlatList
				style={styles.list}
				data={listOfStopwatch}
				renderItem={({ item }) => <StopWatch {...item} />}
			/>
			<ActionButton
				onClick={() =>
					dispatch({
						type: StopWatchActions.ADD,
						payload: { id: listOfStopwatch.length },
					})
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	titleText: {
		fontSize: 32,
		color: TEXT_OR_ICONS,
		marginTop: 32,
		marginBottom: 16,
	},
	list: {
		flex: 1,
		width: "100%",
	},
});
