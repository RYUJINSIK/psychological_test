import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";

const Index = () => {
  const [user, setUser] = useState({
    name : "",
    gender : ""
  });

  const onChangeAction = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const onSubmitAction = (e) => {
    console.log(e.target)
    e.preventDefault();
  }

  // useEffect(() => {
  //   console.log(user)
  // },[user])

  return (
    <div>
        <h1>직업가치관검사</h1>
        <p>이름</p>
        <input type="text" name="name" value={user.name} onChange={onChangeAction}/><br/>
        <p>성별</p>
        <label><input type="radio" name="gender" value="male" onChange={onChangeAction}/>남성</label>
        <label><input type="radio" name="gender" value="female" onChange={onChangeAction}/>여성</label>
        <Button onClick={onSubmitAction} type="submit" disabled={ user.name && user.gender ? false : true } >검사시작</Button>
    </div>
  )
};

export default Index;