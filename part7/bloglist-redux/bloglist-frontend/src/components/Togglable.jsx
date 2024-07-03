import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="outline-primary"
          onClick={toggleVisibility}
          style={{ marginBottom: 10, marginTop: 5 }}
        >
          {props.showButtonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="outline-danger"
          onClick={toggleVisibility}
          style={{ marginBottom: 10, marginTop: 5 }}
        >
          {props.hideButtonLabel}
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
