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

function getRandomIndex() {
	return Math.floor(Math.random() * 1000);
}

export default function App() {
	const [listOfStopwatch, dispatch] = useReducer(reducer, []);

	const incrementCounter = (id: number) => {
		setInterval(
			() =>
				dispatch({
					type: StopWatchActions.INCREASE,
					payload: { id: id },
				}),
			100,
		);
	};

	function reducer(state: Array<TimeType>, action: StopWatchAction) {
		const { type, payload } = action;
		switch (type) {
			case StopWatchActions.ADD:
				console.log(state);
				console.log({ ...initTimer, id: payload.id });
				return [...state, { ...initTimer, id: payload.id }];
			case StopWatchActions.DELETE:
				return state.filter((item, id) => {
					if (item.id === id) {
						return true;
					}
					return false;
				});
			case StopWatchActions.INCREASE:
				const actualIndex = state.findIndex((item) => item.id === payload.id);
				const actualTimer = state[actualIndex];
				actualTimer.milliseconds += 100;
				if (actualTimer.milliseconds >= 1000) {
					actualTimer.milliseconds = 0;
					actualTimer.seconds++;
					if (actualTimer.seconds >= 60) {
						actualTimer.seconds = 0;
						actualTimer.minutes++;
						if (actualTimer.minutes >= 60) {
							actualTimer.minutes = 0;
							actualTimer.hours++;
						}
					}
				}
				return [...state.splice(actualIndex, 1, actualTimer)];
			case StopWatchActions.PAUSE:
				return state;
			default:
				return state;
		}
	}

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
				onClick={() => {
					const newId = getRandomIndex();
					dispatch({
						type: StopWatchActions.ADD,
						payload: { id: newId },
					});
					incrementCounter(newId);
				}}
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
