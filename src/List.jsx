import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'

const List = ({items, removeItem, editItem}) => {
  
  return (
    <div className=''>
      {items.map((item) => {
        const {id, title} = item;
        return (
					<article
						key={id}
						className='flex itms-center justify-between mb-2 py-1 px-4 rounded-md capitalize hover:bg-gray-100'
					>
						<p className='mb-0 text-gray-800 font-semibold tracking-[0.05rem]'>{title}</p>
						<div className=''>
							<button
								type='button'
								className='text-[0.7rem] mx-[0.15rem] text-green-500 hover:text-green-700 active:scale-95' onClick={() => editItem(id)}
							>
								<FaEdit />
							</button>
							<button
								type='button'
								className='text-[0.7rem] mx-[0.15rem] text-red-600 hover:text-red-800 active:scale-95' onClick={() => removeItem(id)}
							>
								<FaTrash />
							</button>
						</div>
					</article>
				);
      })}
    </div>
  )
}

export default List