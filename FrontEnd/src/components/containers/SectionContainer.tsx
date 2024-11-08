import { connect } from "react-redux";
import { RootState } from "../../store/store";
import Section from "../section";
import { TODO } from "../../types/types";

const mapStateToProps = (state: RootState) => {
  const todos = state.todoList.todos || [];
  const completedCount = todos.filter((todo: TODO) => todo.isCompleted).length;
  return {
    completedCount,
    todosLength: todos.length,
  };
};

export default connect(mapStateToProps)(Section);
