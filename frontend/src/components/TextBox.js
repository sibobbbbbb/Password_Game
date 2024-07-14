import React from 'react';

const TextBox = ({value,onChange}) => {
    return (
        <input 
            type='text' 
            className=' shadow 
                        appearance-none 
                        border 
                        rounded 
                        w-full
                        h-10
                        py-2 
                        px-3 
                        text-gray-700 
                        leading-tight 
                        focus:outline-none 
                        focus:shadow-outline'
            value={value}
            onChange={onChange}
            placeholder='Enter Your Password'   
        />  
    );
}

export default TextBox;