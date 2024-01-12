import React from 'react'
import { useTodosValues } from '../../Context/context'

import "./filter.scss";

export default function Filter() {
       const { setFilteredTask } = useTodosValues();

const handleFilterChange = (filterType) => {
      setFilteredTask(filterType);
}

  return (
    <div className='filters'>
         <div className='dropdown'>
           <button className='dropbtn'>Filter</button>
           <div className='dropdown-content'>
            <button id="all" onClick={() => handleFilterChange('all')}>
              All
            </button>
            <button id="rem" onClick={() => handleFilterChange('uncompleted')}>
              Uncompleted
            </button>
            <button id="com" onClick={() => handleFilterChange('completed')}>
              Completed
            </button>
           </div>
         </div>
    </div>
  )
}
