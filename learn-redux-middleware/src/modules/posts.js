import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
	createPromiseThunk,
	reducerUtils,
	handleAsyncActions,
	createPromiseThunkById,
	handleAsyncActionsById
} from '../lib/asyncUtils';
import { call, put, takeEvery } from 'redux-saga/effects';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });

function* getPostsSaga() {
	try {
		const posts = yield call(postsAPI.getPosts);
		yield put({
			type: GET_POSTS_SUCCESS,
			payload: posts
		});
	} catch (e) {
		yield put({
			type: GET_POSTS_ERROR,
			payload: e,
			error: true
		});
	}
}

function* getPostSaga(action) {
	const id = action.payload;
	try {
		const post = yield call(postsAPI.getPostById, id);
		yield put({
			type: GET_POST_SUCCESS,
			payload: post,
			meta: id
		});
	} catch (e) {
		yield put({
			type: GET_POST_ERROR,
			payload: e,
			error: true,
			meta: id
		});
	}
}

export function* postsSaga() {
	yield takeEvery(GET_POSTS, getPostsSaga);
	yield takeEvery(GET_POST, getPostSaga);
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
	posts: reducerUtils.initial(),
	post: {}
};

// 3번째 인자를 사용하면 withExtraArgument 에서 넣어준 값들을 사용 할 수 있습니다.
export const goToHome = () => (dispatch, getState, { history }) => {
	history.push('/');
};

export default function posts(state = initialState, action) {
	switch (action.type) {
		case GET_POSTS:
		case GET_POSTS_SUCCESS:
		case GET_POSTS_ERROR:
			return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
		case GET_POST:
		case GET_POST_SUCCESS:
		case GET_POST_ERROR:
			return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
		default:
			return state;
	}
}
