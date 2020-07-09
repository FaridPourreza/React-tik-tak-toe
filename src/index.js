import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Typography, Button, Fab } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xTurn: true,
      winner: false,
      board: ['', '', '', '', '', '', '', '', ''],
    };
  }
  handle(index) {
    if (this.state.board[index] || this.state.winner) return;
    let board = this.state.board.slice();
    board[index] = this.state.xTurn ? "X" : "O";
    this.setState((prevState) => {
      return {
        xTurn: !prevState.xTurn
      }
    })
    let winner;
    let lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
        break;
      }
    }
    this.setState({
      board: board,
      xIsNext: !this.state.xTurn,
      winner: winner
    });
    return board[index];
  }
  reset() {
    this.setState({
      board: ['', '', '', '', '', '', '', '', ''],
      xIsNext: true,
      winner: false
    });
  }

  render() {
    return (
      <Grid container alignItems="center" justify="center" direction="column" style={{ minHeight: "100vh" }}>
        <div style={{ width: '290px' }}>
          <Item i={0} b={this.state.board} click={() => this.handle(0)} />
          <Item i={1} b={this.state.board} click={() => this.handle(1)} />
          <Item i={2} b={this.state.board} click={() => this.handle(2)} />
          <Item i={3} b={this.state.board} click={() => this.handle(3)} />
          <Item i={4} b={this.state.board} click={() => this.handle(4)} />
          <Item i={5} b={this.state.board} click={() => this.handle(5)} />
          <Item i={6} b={this.state.board} click={() => this.handle(6)} />
          <Item i={7} b={this.state.board} click={() => this.handle(7)} />
          <Item i={8} b={this.state.board} click={() => this.handle(8)} />
        </div>
        <Fab onClick={() => { this.reset(); }} color="secondary " aria-label="add" style={{ position: "absolute", bottom: '15px', left: '15px' }}>
          <RefreshIcon />
        </Fab>
        <Typography variant="h6" component="h6">
          {this.state.winner ? `${this.state.winner} won` : this.state.xTurn ? "O turn :" : "X turn :"}
        </Typography>
      </Grid>
    );
  }
}

function Item(props) {
  return (
    <Button onClick={props.click} variant="contained" color="secondary" style={{ margin: '15px' }}>
      {props.b[props.i] || '.'}
    </Button>
  )
}


function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();