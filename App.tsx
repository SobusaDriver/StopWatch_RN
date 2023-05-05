import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ActionButton from "./components/ActionButton";
import { PRIMARY_COLOR, TEXT_OR_ICONS } from "./assets/Palette";
import StopWatch from "./components/StopWatch";
import { TimeType, initTimer } from "./utils/TimeType";

enum StopWatchActions {
	ADD = "ADD",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
	INCREASE = "INCREASE",
	PAUSE = "PAUSE",
}

type StopWatchAction = {
	type: StopWatchActions;
	payload: { id: number; intervalId?: ReturnType<typeof setTimeout> };
};

function getRandomIndex() {
	return Math.floor(Math.random() * 1000);
}

export default function App() {
	const [listOfStopwatch, dispatch] = useReducer(reducer, []);

	const incrementCounter = (id: number) => {
		const intervalId = setInterval(
			() =>
				dispatch({
					type: StopWatchActions.INCREASE,
					payload: { id: id },
				}),
			100,
		);
		dispatch({
			type: StopWatchActions.UPDATE,
			payload: { id: id, intervalId: intervalId },
		});
	};

	function reducer(state: Array<TimeType>, action: StopWatchAction) {
		const { type, payload } = action;
		switch (type) {
			case StopWatchActions.ADD:
				const newStopWatch = { ...initTimer, id: payload.id };
				return [...state, newStopWatch];
			case StopWatchActions.UPDATE:
				const newIndex = state.findIndex((item) => item.id === payload.id);
				const newTimer = state[newIndex];
				newTimer.intervalId = payload.intervalId;
				const newTempList = [...state];
				newTempList.splice(newIndex, 1, newTimer);
				return newTempList;
			case StopWatchActions.DELETE:
				const filterResult = state.filter((item) => {
					if (item.id === payload.id) {
						return false;
					}
					return true;
				});
				return filterResult;

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
				const newList = [...state];
				newList.splice(actualIndex, 1, actualTimer);
				return newList;
			case StopWatchActions.PAUSE:
				return state;
			default:
				return state;
		}
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={styles.titleText}>Classic Stopwatch</Text>
			{listOfStopwatch.length === 0 ? (
				<Text style={styles.emptyText}>Dont Be Shy, Add Something!</Text>
			) : (
				<FlatList
					style={styles.list}
					data={listOfStopwatch}
					renderItem={({ item }) => (
						<StopWatch
							{...item}
							deleteWatch={() => {
								clearInterval(item.intervalId);
								dispatch({
									type: StopWatchActions.DELETE,
									payload: { id: item.id },
								});
							}}
							toogleWatch={() => {
								if (item.intervalId !== undefined) {
									clearInterval(item.intervalId);
									dispatch({
										type: StopWatchActions.UPDATE,
										payload: { id: item.id, intervalId: undefined },
									});
									return;
								}
								incrementCounter(item.id);
							}}
						/>
					)}
				/>
			)}
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
		paddingTop: 32,
		marginBottom: 16,
		width: "100%",
		alignContent: "center",
		textAlign: "center",
		backgroundColor: PRIMARY_COLOR,
	},
	list: {
		flex: 1,
		width: "100%",
	},
	emptyText: {
		fontSize: 24,
		color: TEXT_OR_ICONS,
		alignSelf: "center",
	},
});
