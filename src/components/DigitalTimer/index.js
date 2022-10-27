// Write your code here

import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isTimeRunning: false, timeInMinutes: 25, timeInSeconds: 0}

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.timerId)

  incrementTimeInSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state

    const isTimeCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimeCompleted) {
      this.clearTimeInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onResetButton = () => {
    this.clearTimeInterval()
    this.setState({isTimeRunning: false, timeInMinutes: 25, timeInSeconds: 0})
  }

  onClickStartButton = () => {
    const {timeInMinutes, timeInSeconds, isTimeRunning} = this.state

    const isTimeCompleted = timeInSeconds === timeInMinutes * 60
    if (isTimeCompleted) {
      this.clearTimeInterval()
      this.setState({timeInSeconds: 0})
    }
    if (isTimeRunning === true) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeInSeconds, 1000)
    }

    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  getElapsedTimeInSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state

    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onIncrementButton = () => {
    this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
  }

  ondecrementButton = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  render() {
    const {isTimeRunning, timeInMinutes, timeInSeconds} = this.state
    const isButtonDisabled = timeInSeconds > 0

    const displayText = isTimeRunning ? 'Pause' : 'Start'
    const displayIcon = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimeRunning ? 'pause icon' : 'play icon'
    const statusText = isTimeRunning ? 'Running' : 'Paused'

    return (
      <div className="digital-timer-container">
        <h1 className="main-heading">Digital Timer</h1>

        <div className="main-container">
          <div className="timer-image-container">
            <div className="back-image">
              <div className="white-image">
                <h1 className="time">{this.getElapsedTimeInSeconds()}</h1>
                <p className="time-status">{statusText}</p>
              </div>
            </div>
          </div>

          <div className="time-controls-container">
            <div className="start-reset-container">
              <div className="start">
                <button
                  className="btn"
                  type="button"
                  onClick={this.onClickStartButton}
                >
                  <img className="start-icon" alt={altText} src={displayIcon} />
                  <p className="start-status">{displayText}</p>
                </button>
              </div>
              <div className="reset">
                <button
                  className="btn"
                  type="button"
                  onClick={this.onResetButton}
                >
                  <img
                    className="reset-icon"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                  <p className="reset-status">Reset</p>
                </button>
              </div>
            </div>

            <p className="set-time-limit">Set Timer Limit</p>

            <div className="increment-decrement-container">
              <button
                className="btn2"
                type="button"
                disabled={isButtonDisabled}
                onClick={this.ondecrementButton}
              >
                -
              </button>
              <div className="number-container">
                <p className="number">{timeInMinutes}</p>
              </div>
              <button
                className="btn2 btn3"
                type="button"
                disabled={isButtonDisabled}
                onClick={this.onIncrementButton}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
