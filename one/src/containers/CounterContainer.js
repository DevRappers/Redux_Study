import React from 'react';
import { bindActionCreators } from 'redux';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer({ number, diff, increase, decrease, setDiff }) {
	return <Counter number={number} diff={diff} onIncrease={increase} onDecrease={decrease} onSetDiff={setDiff} />;
}

const mapStateToProps = (state) => ({
	number: state.counter.number,
	diff: state.counter.diff
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			increase,
			decrease,
			setDiff
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
