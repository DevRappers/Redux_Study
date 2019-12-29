import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
// 액션 타입
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

function* increaseSaga() {
	yield delay(1000);
	yield put(increase());
}

function* decreaseSaga() {
	yield delay(1000);
	yield put(decrease());
}

export function* counterSaga() {
	yield takeEvery(INCREASE_ASYNC, increaseSaga);
	yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
const initialState = 0;

export default function counter(state = initialState, action) {
	switch (action.type) {
		case INCREASE:
			return state + 1;
		case DECREASE:
			return state - 1;
		default:
			return state;
	}
}
