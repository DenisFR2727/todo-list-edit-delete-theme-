import { StateProvider } from './Context/context';
import TodoList from './Components/Todo/TodoList';
// import AddTodo from './Components/Add/AddTodo';
import CompleteAllTasks from './Components/Todo/CompleteAllTasks';
import DeleteCompTasks from './Components/Todo/DeleteCompTasks';
import { FaListUl } from 'react-icons/fa';
import { useContext } from 'react';
import ThemeContextTodo from './Context/theme/ThemeContext';
import ThemeProvider from './Context/theme/ThemeProvider';

import './App.scss';
import AddUpdateComponent from './Components/Add/AddTodo';

function App() {
    const { theme, title } = useContext(ThemeContextTodo);
    return (
        <StateProvider>
            <div className="App" style={theme}>
                <div className="icon-h2">
                    <FaListUl className="icon-list-todo" />
                    <h2 style={title}>Todo List</h2>
                </div>

                <AddUpdateComponent />
                <div className="com-del-btn">
                    <CompleteAllTasks />
                    <DeleteCompTasks />
                </div>
                <TodoList />
            </div>
        </StateProvider>
    );
}

function AppTheme() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
}
export default AppTheme;
