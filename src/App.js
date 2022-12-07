import './App.css';
import { useState } from "react"
import BubleChat from './component/BubleChat';

function App() {
  // const initalValues = {content: '', from: 0}
  const [message, setMessage] = useState('');
  // const [reponse, setReponse] = useState({content: 'check ne', from: 1});
  const [mesList, setMesList] = useState([]);
  // const BubbleChat = (message) =>{
  //   return (
  //     <div className="chat-bubble me">{message}</div>

  //   )
  // }

  const BubbleChatSend = (mes) => {
    const temp = {"message": mes, "from": 0}
    
    setMessage('')
    mesList.push(temp)
    // setMesList([...mesList, temp])
    // return false
  } 

  const handleSubmit = (event) => {
    event.preventDefault();
    BubbleChatSend(message)
    // if (BubbleChatSend(message)) {
      const data= { "question": message}
      fetch("/post", {
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then((response) => response.json())
      .then((data) => {
        console.log(data)
        const answer= {"message": data.ans, "from": 1}
        // mesList.push(answer)
        setMesList([...mesList, answer])
        // console.log(answer)
      });
    // }
    

    // console.log(mesList)


    
  }
  
  
	return (
		<div className="App">
			<div className="chat-screen show-chat">
        <div className="chat-header">
            <div className="chat-header-title">
                Bot: "Mình ở đây để trò chuyện cùng cậu"
            </div>
        </div>
        
        <div className="chat-body h-100" id='chatBody'>
          <BubleChat mesList = {mesList}/>
        </div>
        <div className="chat-input">
          <form onSubmit={handleSubmit}>
            <input  type="text" placeholder="Type a message..." id="message" name='message'
              value={message} onChange={e => setMessage(e.target.value)} ></input>
            <div className="input-action-icon">
                <button className="btn btn-sm bi-send fs-3" type="submit"></button>
            </div>
          </form>
        </div>
        {/* <button type='button' className='btn btn-primary w-50 mt-5 ' onClick={()=>{printValue() }}> Xem chi tiết</button> */}
        {/* <button onClick={printValue()}> check</button> */}
      </div>
    </div>

	);
}

export default App;
