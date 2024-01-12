import { useState } from 'react'
import ThemeContextTodo from './ThemeContext';

function ThemeProvider({children}) {
       const [theme, setTheme] = useState({
           backgroundColor: "#fff",
           color: "black"
       },);
       const [title, setTitle] = useState({color: "blue"})
       const [deleteBtn, setDeleteBtn] = useState({color: "black"})

const toggleTheme = () => {
      const newTheme = theme.backgroundColor === "#fff"
      ? { backgroundColor: "black",  color: "#fff"} :
        { backgroundColor: "#fff", color: "black"}

      const titleColor = title.color === "blue"
      ? { color: "red" } : { color: "blue" };
      
      const deleteButton = deleteBtn.color === "black"
      ? { color: "red" } : { color: "black"}
      setTheme(newTheme);
      setTitle(titleColor);
      setDeleteBtn(deleteButton);
}
       
  return (
    <ThemeContextTodo.Provider value={{theme, toggleTheme, title, deleteBtn}}>
                   {children}
    </ThemeContextTodo.Provider>
  )
}
export default ThemeProvider;