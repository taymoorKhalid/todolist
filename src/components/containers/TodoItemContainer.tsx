import { connect } from "react-redux";
import {
  toggleTodoAction,
  deleteTodoAction,
  editTodoAction,
} from "../../store/actions/actions";

import TodoItem from "../todoItem";

const mapDispatchToProps = (
  dispatch: any,
  ownProps: { index: number; todo: { text: string; isCompleted: boolean } }
) => ({
  onToggleTodo: () => dispatch(toggleTodoAction.STARTED(ownProps.index)),

  onDeleteTodo: () => dispatch(deleteTodoAction.STARTED(ownProps.index)),

  onEditTodo: (text: string) =>
    dispatch(editTodoAction.STARTED(ownProps.index, text)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
