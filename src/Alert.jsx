import React, {useEffect} from 'react'

const Alert = ({type, msg, removeAlert, list}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 1500)
    return () => clearTimeout(timeout)
  }, [list])
  

  return (
		<p
			className={`mb-4 h-5 grid items-center text-center text-[0.7rem] rounded-md tracking-[0.1rem] capitalize font-semibold ${type === 'success' ? 'text-green-700 bg-green-300' : ''} ${type === 'danger' ? 'text-red-700 bg-red-300' : ''}` }
		>
			{msg}
		</p>
	);
}

export default Alert