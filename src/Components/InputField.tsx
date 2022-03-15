import './styles.css'
import React, {useRef} from "react";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}


const InputField: React.FC<props> = ({todo, setTodo, handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null)
 

  return (
    
        <form 
        className='input' 
        onSubmit={(e)=> {
            handleAdd(e);
            inputRef.current?.blur();
            }}
        >

            <input 
            type="text" 
            placeholder='Type Task Here' 
            value={todo} 
            ref={inputRef}
            onChange={(e) => setTodo(e.target.value)} 
            className='input__box' 
            />
            <button className='input_submit' type='submit'>Add</button>
        </form>
    
  )
}

export default InputField