import './App.css';
import { useState } from "react"
import BubleChat from './component/BubleChat';

function App() {
  const [message, setMessage] = useState('');
  const [mesList, setMesList] = useState([]);
  const [type, setType] = useState(1);
  const [show, setShow] = useState(0)

  const BubbleChatSend = (mes) => {
    const temp = { "message": mes, "from": 0 }
    setMessage('')
    mesList.push(temp)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    BubbleChatSend(message)
    // if (BubbleChatSend(message)) {
    const data = { "question": message }
    fetch("/post", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
      .then((data) => {
        console.log(data)
        const preMes = mesList
        const copy = []
        for (var i=0; i<type; i++)
        {
          let mesAdd = { "message": data.ans[i], "from": 1 }
          copy.push(mesAdd)
        }
        const newMes = preMes.concat(copy)
        console.log("new ne:", newMes)
        setMesList(newMes)

      });
  }

  const handleClick = (event) => {
    event.preventDefault();
    const type = event.target.name;
    if (type === 'top5') {
      setType(5)
    }
    setShow(1)
  }

  return (
    <div className="App">
      <div className="chat-screen show-chat">
        <div className="chat-header">
          <div className="chat-header-title">
            Bot: "Mình ở đây để trò chuyện cùng cậu"
          </div>
        </div>
        <div className={` ${show === 1 ? "hiddens" : ""}`}>
          <div className='chat-mail'>
            <div className="row">
              <div className="col-md-12 text-center mb-2">
                <p>Bạn muốn mình recomment theo hướng nào nè? Nhiều option hay 1 option ạ?</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-primary btn-rounded btn-block" onClick={handleClick} name="top5">Top 5</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary btn-rounded btn-block" onClick={handleClick} name="top1">Top 1</button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${show === 1 ? "" : "hiddens"}`}>
          <div className={`chat-body `} id='chatBody'>
            <BubleChat mesList={mesList} />
          </div>
          <div className={`chat-input `}>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Type a message..." id="message" name='message'
                value={message} onChange={e => setMessage(e.target.value)} ></input>
              <div className="input-action-icon">
                <button className="btn btn-sm bi-send fs-3" type="submit"></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
