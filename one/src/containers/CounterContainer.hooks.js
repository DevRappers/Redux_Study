import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
	// shallowEqual을 써주지 않았을경우에는 number만 바뀌어도 diff도 리렌더링을 한다.
	// shallowEqual을 사용하면 최적화 가능
	const { number, diff } = useSelector(
		(state) => ({
			number: state.counter.number,
			diff: state.counter.diff
		}),
		shallowEqual
	);

	const dispatch = useDispatch();

	const onIncrease = () => dispatch(increase());
	const onDecrease = () => dispatch(decrease());
	const onSetDiff = (diff) => dispatch(setDiff(diff));

	return (
		<Counter number={number} diff={diff} onIncrease={onIncrease} onDecrease={onDecrease} onSetDiff={onSetDiff} />
	);
}

export default CounterContainer;
