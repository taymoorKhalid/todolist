import { connect } from "react-redux";

import { toggleTodo, deleteTodo, editTodo } from "../../store/todo/todoSlice";
import TodoItem from "../todoItem";

const mapDispatchToProps = (
  dispatch: any,
  ownProps: { index: number; todo: { text: string; isCompleted: boolean } }
) => ({
  onToggleTodo: () => dispatch(toggleTodo(ownProps.index)),
  onDeleteTodo: () => dispatch(deleteTodo(ownProps.index)),
  onEditTodo: (newText: string) =>
    dispatch(editTodo({ index: ownProps.index, text: newText })),
});

export default connect(null, mapDispatchToProps)(TodoItem);
