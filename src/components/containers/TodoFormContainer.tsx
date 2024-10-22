// TodoFormContainer.tsx

import { connect } from "react-redux";
import { addTodo } from "../../store/todo/todoSlice";
import TodoForm from "../todoForm";

const mapDispatchToProps = (dispatch: any) => ({
  addTodo: (todo: { text: string; isCompleted: boolean }) =>
    dispatch(addTodo(todo)),
});

export default connect(null, mapDispatchToProps)(TodoForm);
