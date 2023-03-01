import { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
	const [name, setName] = useState('');
	const [list, setList] = useState(getLocalStorage());
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	const [alert, setAlert] = useState({ show: true, msg: '', type: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) {
			showAlert(true, `c'mon man at least enter something`, 'danger');
		} else if (name && isEditing) {
			setList(
				list.map((item) => {
					if (item.id === editID) {
						return { ...item, title: name };
					}
					return item;
				})
			);
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'edit successful', 'success')
		} else {
			showAlert(true, 'item added', 'success');
			const newItem = { id: new Date().getTime().toString(), title: name };
			setList([...list, newItem]);
			setName('');
		}
	};

	const showAlert = (show = false, msg = '', type = '') => {
		setAlert({ show, msg, type });
	};

	const clearList = () => {
		showAlert(true, 'emptied list', 'danger');
		setList([]);
	};

	const removeItem = (id) => {
		showAlert(true, 'item removed', 'danger');
		setList(list.filter((item) => item.id != id));
	};

	const editItem = (id) => {
		const specificItem = list.find((item) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		setName(specificItem.title);
	};

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  

	return (
		<>
			<section className='section-center'>
				<form className='' onSubmit={handleSubmit}>
					{alert.show && (
						<Alert {...alert} removeAlert={showAlert} list={list} />
					)}
					<h3 className='mb-6 text-center text-teal-800 font-bold'>
						shopping list
					</h3>
					<div className='flex justify-center'>
						<input
							type='text'
							className='bg-gray-100 text-gray-800 font-semibold  p-1 pl-4 rounded-l-md text-base flex-[1_0_auto]'
							placeholder='e.g. potatoes'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<button
							type='submit'
							className='bg-teal-500 flex-[0_0_5rem] p-1 capitalize tracking-[0.05rem] rounded-r-md font-semibold hover:bg-teal-700 active:scale-95'
						>
							{isEditing ? 'edit' : 'add'}
						</button>
					</div>
				</form>
				{list.length > 0 && (
					<div className='mt-8'>
						<List items={list} removeItem={removeItem} editItem={editItem} />
						<button
							className='capitalize w-40 h-6 grid items-center bg-transparent border-transparent text-red-600 mx-auto text-sm tracking-[0.1rem] font-semibold hover:text-red-800 active:scale-95 transition-all duration-200'
							onClick={clearList}
						>
							clear items
						</button>
					</div>
				)}
			</section>
		</>
	);
}

export default App;
