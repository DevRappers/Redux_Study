import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

function TodosContainer() {
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();

	// useCallback을 사용하여 재사용 가능하도록 해줌
	const onCreate = useCallback((text) => dispatch(addTodo(text)), [ dispatch ]);
	const onToggle = useCallback((id) => dispatch(toggleTodo(id)), [ dispatch ]);

	return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
