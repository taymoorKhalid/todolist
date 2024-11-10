import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { fetchTodosAction } from "../../store/actions/todo";
import TodoList from "../todoList";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todoList.todos,
    isLoading: state.todoList.isFetching,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchTodos: () => dispatch(fetchTodosAction.STARTED()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
