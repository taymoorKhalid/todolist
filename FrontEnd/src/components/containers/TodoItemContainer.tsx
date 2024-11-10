import { connect } from "react-redux";
import {
  // toggleTodoAction,
  deleteTodoAction,
  // editTodoAction,
  updateTodoAction,
} from "../../store/actions/todo";

import TodoItem from "../todoItem";

const mapDispatchToProps = (
  dispatch: any,
  ownProps: { todo: { id: string; text: string; isCompleted: boolean } }
) => {
  const { id } = ownProps.todo; // Extract the ID from ownProps
  return {
    onDeleteTodo: () => dispatch(deleteTodoAction.STARTED(id)), // Dispatch delete action with ID
    onToggleTodo: () => dispatch(updateTodoAction.STARTED(id)),
    onEditTodo: (id: string, newText: string) => {
      dispatch(updateTodoAction.STARTED(id, newText));
    },
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);
