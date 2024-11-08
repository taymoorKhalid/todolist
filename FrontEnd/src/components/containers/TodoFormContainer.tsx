// TodoFormContainer.tsx

import { connect } from "react-redux";
import TodoForm from "../todoForm";
import { TODO } from "../../types/types";
import { addTodoAction } from "../../store/actions/todoActions";

const mapDispatchToProps = (dispatch: any) => ({
  addTodo: (todo: TODO) => dispatch(addTodoAction.STARTED(todo)),
});

export default connect(null, mapDispatchToProps)(TodoForm);
