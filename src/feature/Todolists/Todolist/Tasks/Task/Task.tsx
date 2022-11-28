import s from '../../../Style/Todolists.module.css';

export const Task = () =>{

  return <div className={s.task}>
    <input type="checkbox"/>
    <div>Title</div>
    <button>delete</button>
  </div>
}