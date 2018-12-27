import React from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { SNACKBAR_CLOSE } from '../../store/reducers/SnackbarReducer';
import { snackbarMsg, snackbarError, snackbarClose } from '../../store/actions/SnackbarActions'

const style = ({
  error: {
    backgroundColor: 'rgb(219, 26, 67)',
  },
  success: {
    backgroundColor: 'rgb(14, 163, 15)',
  },
})
class SnackBar extends React.Component {
  handleClose = () => {
      this.props.dispatch(snackbarClose());
  };

  render() {
    const { open, text, error } = this.props;
    const typeOfStyle = error ? style.error : style.success;
    return (
      <div>
        <Snackbar
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Slide}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            style={typeOfStyle}
            variant="success"
            message={text}
          >
          </SnackbarContent>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (store) =>({
  open: store.snackbar.open,
  text: store.snackbar.data,
  error: store.snackbar.error
})

export default connect(mapStateToProps)(SnackBar);
