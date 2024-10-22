import { connect } from "react-redux";
import { RootState } from "../../store/store";
import TodoList from "../todoList";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todoList.todos,
  };
};

export default connect(mapStateToProps)(TodoList);
