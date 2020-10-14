import React from 'react'
import ReactDOM from 'react-dom'
import '../CSS/style.css'

if(!localStorage.coments){
localStorage.coments = JSON.stringify([]);
}

class Coments extends React.Component {
  constructor() {
    super();
    this.state = {
      coments: [...JSON.parse(localStorage.coments)],
      newAuthor: [''],
      newTextComent: ['']
    };
  }

  addComent() {
    let newData= new Date();

    let coments=JSON.parse(localStorage.coments);

    coments.push({
      author: this.state.newAuthor,
      textComent: this.state.newTextComent,
      data: newData.toLocaleString("ru")
    });

    localStorage.coments=JSON.stringify(coments);

    this.setState({ 
      coments,
      newAuthor: [''],
      newTextComent: ['']
     });
  }

  delComent(key){
    
    let coments = JSON.parse(localStorage.coments);
    coments.splice(key, 1);
    localStorage.coments=JSON.stringify(coments);

    this.setState({ coments });
  }

  render() {
    return(
      <div>
        <hr></hr>
          <ul>          
            {
              this.state.coments.map((coment, i) => {
                return(
                  <li key={i}>
                    <div>
                      <span>
                        {coment.author}
                      </span>
                      <span
                        className="data"
                      >
                        {coment.data}
                      </span>
                    </div>
                    <div>
                      {coment.textComent}
                    </div>
                    <button onClick={e => this.delComent(i, e)}>
                      Удалить коментарий
                    </button>
                    <hr></hr>
                  </li>
                )
              })
            }
          </ul>
          <div>  
            <input
              type="text"
              placeholder="Автор коментария"
              value={this.state.newAuthor}
              onChange={e => {
                  this.setState({newAuthor: e.target.value})
                }
              }
            />
          </div>
          <div>
            <textarea
             type="text"
             rows="7"
             cols="50"
             placeholder="Текст коментария"
             value={this.state.newTextComent}
             onChange={e => {
                this.setState({newTextComent: e.target.value})
              }
            }
            ></textarea>
          </div>
          <button
            onClick={e => this.addComent(e)}>
              Опубликовать коментарий
          </button>
      </div>  
    )
  }
}

ReactDOM.render(
  <Coments />,
  document.querySelector("#comentsList")
)