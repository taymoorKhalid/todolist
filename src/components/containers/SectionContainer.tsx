import { connect } from "react-redux";
import { RootState } from "../../store/store";
import Section from "../section";

const mapStateToProps = (state: RootState) => {
  const todos = state.todoList.todos;
  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  return {
    completedCount,
    todosLength: todos.length,
  };
};

export default connect(mapStateToProps)(Section);
